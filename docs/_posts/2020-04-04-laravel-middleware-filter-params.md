---
title: Laravel 使用中间件过滤参数
date: 2020-04-04
order: -1
---

## 问题

使用 Laravel Validator 验证参数以后，对于某些参数需要手动转换为对应的类型（比如 int，float），那么能不能在验证之前先自动过滤一下参数类型呢？

## 解决

使用中间件可以实现在 Controller 处理逻辑之前先过滤一下参数。

### 创建一个中间件类

``` bash
$ php artisan make:middleware FilterParams
```



### 注册中间件

在 `App/Http/Kernel.php` 注册一下全局中间件，这里我是当全局用的，你当然可以在路由中自由使用。

``` php
class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        FilterParameters::class, // 增加这一行，注册为全局中间件
    ];
}
```

### 中间件代码

代码如下，这里主要用到了一个 `replace()` 方法，该方法会使用输入的参数替代原有的参数。中间件的使用请参考「[文档](https://learnku.com/docs/laravel/7.x/middleware/7459)」。

``` php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class FilterParameters
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $filteredParams = [];
        foreach ($request->all() as $key => $value) {
            $filteredParams[$key] = $this->filter($key, $value);
        }
        $request->replace($filteredParams);
        return $next($request);
    }

    /**
     * filter params
     * @param int $key
     * @param $value
     * @return mixed $filteredValue
     */
    private function filter($key, $value)
    {
        // 没传参数其值为null，则不处理仍然返回null
        if (is_null($value)) {
            return $value;
        }

        if (Str::contains($key, [
            'id',
            'quantity'
        ])) {
            return (int)$value;
        }

        if (Str::contains($key, 'price')) {
            return (float)$value;
        }

        return $value;
    }
}
```

## 参考

* https://segmentfault.com/q/1010000014198634
* http://blog.dreamlikes.cn/archives/342