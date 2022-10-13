---
title: Laravel Ioc 服务容器原理解析
date: 2018-11-29
---

Laravel 中的服务容器，其实就是一个全局的单例对象。通过入口文件可以清楚地知道，访问一个 Laravel 应用后台其实就是做了这几件事：1. 实例化一个服务容器（app）2. 服务容器处理请求，返回响应，所以说，服务容器就是一个全局环境。服务容器主要有两个作用，一个是提供程序所需要的各种资源、配置信息和服务，另一个是实现了控制反转（Ioc）容器。这篇文章深入讨论后者的源码实现。

服务容器是通过 `Illuminate/Container/Container.php` 类实现的。

文件 `Illuminate/Container/Container.php`：
``` php
protected $bindings = [];

protected $instances = [];
```



服务容器类中定义了两个用于管理服务的属性：`$bindings` 和 `$instances`，其中 $bindings 用来存储提供服务的回调函数，而 $instances 用于存储程序中共享的实例，即单例。


文件 `Illuminate/Container/Container.php`：
``` php
    // 注册一个绑定到容器中
    public function bind($abstract, $concrete = null, $shared = false)
    {
        $this->dropStaleInstances($abstract);

        if (is_null($concrete)) {
            $concrete = $abstract;
        }

        if (! $concrete instanceof Closure) {
            $concrete = $this->getClosure($abstract, $concrete);
        }

        $this->bindings[$abstract] = compact('concrete', 'shared');

        if ($this->resolved($abstract)) {
            $this->rebound($abstract);
        }
    }

    protected function getClosure($abstract, $concrete)
    {
        return function ($container, $parameters = []) use ($abstract, $concrete) {
            if ($abstract == $concrete) {
                return $container->build($concrete);
            }

            return $container->make($concrete, $parameters);
        };
    }

    public function singleton($abstract, $concrete = null)
    {
        $this->bind($abstract, $concrete, true);
    }
```
bind() 函数实现了服务绑定功能，所谓服务绑定有时也称为服务注册，意义是一样的，实际上做的事情是在 $bindings 数组中添加一个键值对记录，键是一个名字，值是待绑定的服务对应的回调函数，即服务绑定一个名字，之后依赖注入时 Laravel 自动寻找该名字绑定来找到对应的类，然后实例化之。

由于绑定的是一个回调函数，所以先判断 bind() 函数第二个参数是否是回调函数，如果是则直接绑定，不是则通过 getClosure() 函数创建一个服务对应的回调函数。

singleton() 函数实现单例绑定，是绑定的一个特殊情况。


接下来是服务解析的实现。

文件 Illuminate/Container/Container.php：
``` php
    public function make($abstract, array $parameters = [])
    {
        return $this->resolve($abstract, $parameters);
    }
```
在 Laravel 中，我们通常直接使用 make() 就能解析服务，很神奇，但它只是简单地调用了 resolve()，所以我们还要继续看 resolve() 的内容。
``` php
    protected function resolve($abstract, $parameters = [])
    {
        $abstract = $this->getAlias($abstract);

        $needsContextualBuild = ! empty($parameters) || ! is_null(
            $this->getContextualConcrete($abstract)
        );

        if (isset($this->instances[$abstract]) && ! $needsContextualBuild) {
            return $this->instances[$abstract];
        }

        $this->with[] = $parameters;

        $concrete = $this->getConcrete($abstract);

        if ($this->isBuildable($concrete, $abstract)) {
            $object = $this->build($concrete);
        } else {
            $object = $this->make($concrete);
        }

        foreach ($this->getExtenders($abstract) as $extender) {
            $object = $extender($object, $this);
        }

        if ($this->isShared($abstract) && ! $needsContextualBuild) {
            $this->instances[$abstract] = $object;
        }

        $this->fireResolvingCallbacks($abstract, $object);

        $this->resolved[$abstract] = true;

        array_pop($this->with);

        return $object;
    }

    protected function getConcrete($abstract)
    {
        if (! is_null($concrete = $this->getContextualConcrete($abstract))) {
            return $concrete;
        }

        if (isset($this->bindings[$abstract])) {
            return $this->bindings[$abstract]['concrete'];
        }

        return $abstract;
    }

    protected function isBuildable($concrete, $abstract)
    {
        return $concrete === $abstract || $concrete instanceof Closure;
    }
```
所谓服务解析，实际上分为两个阶段，第一个阶段是解析名字，即把参数中提供的类名，通过一番查找，找到对应的在容器中已绑定的名字；第二阶段便是使用该名字实例化对象返回。

resolve() 完成了服务解析的第一阶段——名字解析，然后调用 build() 完成对象的实例化，最后将服务实例添加到 resolved 数组中。

首先，通过 getAlias() 查找服务是否有别名，如果有则使用别名对应的服务。服务别名的管理是通过 $alias 数组来实现的。

然后，行 5-11 判断是否有参数，以及是否是实例绑定，如果是则直接返回，不需要再解析了，因为服务实例已经直接找到了。

然后是 getConcrete()，其实就是在 $bindings 数组中找一下有没有对应的名字。如果找到了，则返回该名字所对应的回调函数，如果没有，还是返回该名字。

然后是 isBuildable()，其实就是判断一下上面 getConcrete() 的结果，如果是回调函数，则把它传入 build() 进行服务的实例化，否则，递归调用 make() 继续解析。

后面的就不重要，最后返回了该对象。


上面提到过，服务对象的实例化在 build() 中实现：
``` php
    public function build($concrete)
    {
        if ($concrete instanceof Closure) {
            return $concrete($this, $this->getLastParameterOverride());
        }

        $reflector = new ReflectionClass($concrete);

        if (! $reflector->isInstantiable()) {
            return $this->notInstantiable($concrete);
        }

        $this->buildStack[] = $concrete;

        $constructor = $reflector->getConstructor();

        if (is_null($constructor)) {
            array_pop($this->buildStack);

            return new $concrete;
        }

        $dependencies = $constructor->getParameters();

        $instances = $this->resolveDependencies(
            $dependencies
        );

        array_pop($this->buildStack);

        return $reflector->newInstanceArgs($instances);
    }

    protected function resolveDependencies(array $dependencies)
    {
        $results = [];

        foreach ($dependencies as $dependency) {
            if ($this->hasParameterOverride($dependency)) {
                $results[] = $this->getParameterOverride($dependency);

                continue;
            }

            $results[] = is_null($dependency->getClass())
                            ? $this->resolvePrimitive($dependency)
                            : $this->resolveClass($dependency);
        }

        return $results;
    }

    protected function resolveClass(ReflectionParameter $parameter)
    {
        try {
            return $this->make($parameter->getClass()->name);
        }

        catch (BindingResolutionException $e) {
            if ($parameter->isOptional()) {
                return $parameter->getDefaultValue();
            }

            throw $e;
        }
    }
```
参数 concrete 如果是一个回调函数，则直接调用回调函数，返回即可。否则只是一个具体类的类名，则需要通过反射机制来完成实例化对象的创建。

通过反射机制完成对象实例化的过程：首先根据类名获取反射类（ReflectionClass）实例，然后获取该类在实例化时的依赖，即构造函数需要的参数。然后解析依赖，解析依赖最终还是调用的 make()，如果依赖还有依赖，则仍然按照这种方式一层一层往下解析。最后将解析完的依赖通过 newInstanceArgs() 添加到构造函数参数中完成服务对象的实例化。


PS：虽然在很多细节上仍然不清楚以及有的地方为什么要这样设计，但是能够把大体的过程概括出来，对于我来说也是一种提升，首先你得知道里面有什么，有一个概念，然后再去探究为什么要这样做。