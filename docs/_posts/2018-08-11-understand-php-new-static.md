---
title: 理解 php new static
date: 2018-08-11
code: true
---

今天在看 Laravel 的容器（Container）实现时，发现了这么一段突然不能理解的代码：

``` php
**
* Set the globally available instance of the container.
*
* @return static
*/
public static function getInstance()
{
    if (is_null(static::$instance)) {
        static::$instance = new static;
    }

    return static::$instance;
}
```

这个函数的功能很容易知道的，就是实例化一个全局唯一的容器，不理解之处在于：`new static`，这个表达式。之前我们自己写单例的时候都是用 `new self`，也并没有什么不对。

google了一下，发现这不就是之前所说的延迟静态绑定吗？这个概念我是懂的，可是在看实际应用时却一时没反应过来。

这说明了一件事：自以为懂的东西，可能其实并不懂。只有在实际环境中多看、多实践、多总结，才能避免这种半懂不懂的状态，才能深刻理解一件事情。

另外，```new self``` 和 ```new static``` 的区别：两者都是实例化自身，区别在于继承。如果没有继承，则两者返回的实例都是属于一个类；如果有继承，子类调用该方法，```new self``` 仍然返回原类的实例，而 ```new static``` 返回实际子类的实例。这就是延迟静态绑定，static 的值，使用的是最后实际调用那个方法的类。