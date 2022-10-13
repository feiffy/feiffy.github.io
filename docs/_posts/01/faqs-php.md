---
title: PHP 常见问题
date: 2020-01-01 
subtitle: 凡是需要临时写代码确定的东西，都可以记录在这里。
code: true
---

## php 序列化和反序列化(2020-09-29)

序列化前
``` php
Array
(
    [tool] => php unserialize
    [author] => feiffy
)
```

序列化后

```
 a:2:{s:4:"tool";s:15:"php unserialize";s:6:"author";s:13:"feiffy";}
```

- [在线序列化工具](https://1024tools.com/unserialize)

## Message Illegal string offset(2020-05-27)

``` php
<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$a = '';

echo $a['k'];

// Warning: Illegal string offset 'k'

$a = [];

echo $a['k'];

// Notice: Undefined index: k

```

* 尝试把字符串当成数组取元素时，会报错：Warning: Illegal string offset
* 尝试读取数组不存在的元素时，会报错：Notice: Undefined index: k

## php bool 与 boolean 的区别(2020-04-28)

boolean is an alias for bool, and aliases don't work in type hints.
Use the "real" name: bool

参考: https://stackoverflow.com/questions/44009037/php-bool-vs-boolean-type-hinting

## 合并多余空格(2020-01-01)

```php
function mergeSpaces($str)
{
    return preg_replace("/\s(?=\s)/", "\\1", $str);
}
```

## array_column 指定kv

``` php
<?php

$arr = [
    [
        'a' => 1,
        'b' => 2,
    ],
    [
        'a' => 3,
        'b' => 4,
    ]
];

$arr2 = array_column($arr, 'b', 'a');
print_r($arr2);
/*
Array
(
    [1] => 2
    [3] => 4
)
*/
```

## ?:、?? 优先级问题

**下面的表达式结果是什么？**
``` PHP
$a = 0;
$a = (int)$a ?: -1; // -1
```
(int) 和 ?: 一起使用不影响实际的值，无论谁的优先级更高都不影响值。

**?? 下面的表达式结果是什么？**
``` PHP
$a = '';
$a = (int)$a ?? -1; // 0
```

这里 ?? 的优先级比 (int) 高，所以先计算 `'' ?? -1` 表达式的值为 `''`，然后计算 `(int)''` 结果为 0。

**注意**：`??` 的优先级比 `(int)` 更高

## 判断一个字符串是否是合法的时间

``` PHP
date('Y-m-d', strtotime($data) == $data);
date('Y-m-d H:i:s', strtotime($data) == $data);
```

## php json_encode 不编码中文

json_encode 默认会把中文转换为 \u1234 形式的 Unicode 字符，如果不想转换，可以用下面这个标志：

JSON_UNESCAPED_UNICODE

## 下面这种写法是否允许？

``` php
echo '\n' // \n

echo "\n" // 输出换行
```

## 直接访问对象不存在的属性，会怎样？

``` php
$o = new stdClass();
echo $o->a; // PHP Notice:  Undefined property: stdClass::$a
```

## 赋值操作符(=) VS if()
``` php
$i = 1;
if ($i = 0) {
    echo 'true';
} else {
    echo 'false';
}
// output: 'false'
```
这个例子说明，是先进行赋值操作，$i = 0，然后 if(0) 比较值为 false。说明赋值操作优先级要高于if判断。

## 是否可以连续的赋值语句
如下代码所示，是可以的。
``` php
$a = 10;
$b = $d = 10;
echo $b . $d;
// 输出：1010
```

## if 中是否可以直接赋值变量
如下代码所示，是可以的，而且if中定义的变量可以在if之外使用，但不推荐这样。
``` php
$a = 9;
if ($b = ($a + 1)) {
    echo $b;
}
echo $b;
// 输出：1010
```


## 循环里面用try...catch和循环外面用有什么差异？
如题，今天看到一段如下代码，突然产生如此疑惑，其中save()方法可能会发生异常，所以要用try..catch：
``` php
foreach ($list as $item) {
    $buyer = new BuyerModel();
    $buyer->setData([
        'customer_id' => $item['customer_id'],
        'name' => $item['name'],
    ]);
    try {
        $this->_buyerMapper->save($buyer);
    } catch (Exception $e) {
        // Do Something Log
    }
}
```
如下改造之后，这两者有差异吗？
``` php
try {
    foreach ($list as $item) {
        $buyer = new BuyerModel();
        $buyer->setData([
            'customer_id' => $item['customer_id'],
            'name' => $item['name'],
        ]);
        $this->_buyerMapper->save($buyer);
    }
} catch (Exception $e) {
    // Do Something Log
}
```
关于这个问题，我搜索了Google，发现其实是一个try...catch的性能和使用的问题，在 stackoverflow 上面已经有了一个很好的答案，现在摘录在下面，这个答案是回答try..catch的性能问题的，不过也能解释我的这个疑惑。

要注意的是：没有触发异常的 try 块消耗和实际触发异常并产生捕获抛出操作的 try 块的消耗是两件事情。

如果异常只在失败的情况下被抛出，那么几乎不用担心性能问题，因为发生失败通常是很少的情况。如果在一个很简短的循环里面失败了，那么通常是程序有问题而不是性能。所以不必担心抛出异常的消耗，除非你强行在正常逻辑里面使用它。

有些回答会讨论抛出异常情况下的性能分析代码，但我从不会这样做，因为我知道，无论如何，抛出异常的情况比只运行try语句无异常的情况肯定会消耗更多性能。

另外一个需要注意的是：在嵌套很多层循环的情况下，在最外层单个 try...catch 要比每层单独的 try...catch 快一些，因为后者在每一层都要检查返回值并传递错误。反之，如果在每个调用处都包裹一层try..catch，你的代码不仅慢，而且更丑陋。

---------------------------------------- 原文分割线 ----------------------------------------

One thing to consider is that the cost of a try block where no exception is thrown is a different question from the cost of actually throwing and catching an exception.

If exceptions are only thrown in failure cases, you almost certainly don't care about performance, since you won't fail very many times per execution of your program. If you're failing in a tight loop (a.k.a: banging your head against a brick wall), your application likely has worse problems than being slow. So don't worry about the cost of throwing an exception unless you're somehow forced to use them for regular control flow.
Someone posted an answer talking about profiling code which throws an exception. I've never tested it myself, but I confidently predict that this will show a much bigger performance hit than just going in and out of a try block without throwing anything.

Another thing to consider is that where you nest calls a lot of levels deep, it can even be faster to have a single try...catch right at the top than it is to check return values and propagate errors on every call.

In the opposite of that situation, where you find that you're wrapping every call in its own try...catch block, your code will be slower. And uglier.

参考2： https://stackoverflow.com/questions/4673483/php-try-catch-block-inside-loop ，这个问题其实更加针对我的这个问题，最后总结的观点如下：

总结：其实在 PHP 中 try..catch 在循环里面还是外面差别，主要看你如何处理失败情况。

如果遇到异常就退出循环，那么可以用在循环外面

如果遇到异常还想继续执行循环，那么可以用在循环里面

所以最终，我偏向于 try...catch 写在外层，这样只需要一个 try...catch 就可以捕获所有问题，而如果写在里面的话，可能在每个遇到异常的地方都需要加上 try...catch，很不优雅。

## PHP Notice: Undefined index:，如何消除这个notice错误？
【解决】使用变量或数组元素之前先用 isset($var) 或者 !empty($var) 判断一下

对于 $var = !empty($var) ? $var : null 这样的表达式需要注意不能写成 $result = !empty($var) ?: null，这样的话，在 $var 不为空时，$result 值为 true，而不是期望的 $var 的值！

## PHP Fatal error: Allowed memory size of 134217728 bytes exhausted

PHP Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 128 bytes) 什么原因？如何解决？

【解决】php运行时单个脚本消耗内存超过128M.现在设置php.ini中memory_limit=256扩展一倍.

出错代码:!is_null(json_decode($str));

【已解决】原因是$str为非法json字符串，导致解析出问题，与Apache的设置有关

【已解决2】还有一次是因为查询出来的数据太多了，SQL语句写得有问题，在IN条件下的参数值为空，这就导致会查询整个表！

## Error: Class 'Application_Service_Feedbackemail' not found

调试时，出现Error: Class 'Application_Service_Feedbackemail' not found错误，但是该类是存在的，也能够直接通过Phpstorm跳转到定义，什么原因？

【已解决】虽然在类定义的时候名为Application_Service_Feedbackemail，但是其文件名是FeedbackEmail，其中的Email单词是大写的，所以找不到该文件，也就找不到类了。这是因为Zend1框架是根据类名去找相应文件名。

## 其他

2017-12-25: 今天找bug学到了两个东西，第一个循环里面一定要小心使用外部作用域中的变量，第二个是trycatch是能执行到外面

2017-12-28: 今天优化代码学到一个，就是缓存数组，而不是仅仅只是缓存这次的变量到下次使用

2018-01-03: 为防止队列无限循环执行，所以每次执行一定要更新updatetime字段，然后每次取要按照updatetime排序取。这样就能保证每次获取的都是最早的，不会因为队列前面的没处理就永远处理不了后面的。这其实就是把处理不了的队列放在队列尾部的意思

2018-01-05: php 从某个字符串开始截取字符串strstr()

2018-02-09: 今天在类里面定义一个属性，是数组，里面有元素是要通过静态类调用获得初始值，发现这样定义始终是语法错误的。换了个方式解决了，直接定义一个方法，返回该数组而不是直接定义该属性数组，这样在方法内是能够调用静态类方法的。