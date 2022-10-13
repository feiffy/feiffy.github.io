---
title: PHP数组最佳实践
date: 2018-12-31
---

在这篇教程里，我将使用实际的例子来介绍一些常用的PHP数组及其最佳实践。每个PHP开发者都必须知道如何使用他们，并且组合使用这些数组函数写出可读性好、简洁的代码。

## 基本
让我们从最基本的处理数组键值的函数开始吧。首先是 array_combine()，它使用一个数组做键，一个数组做值，创建一个新的数组：
``` php
$keys = ['sky', 'grass', 'orange'];
$values = ['blue', 'green', 'orange'];
 
$array = array_combine($keys, $values);
print_r($array);
 
// Array
// (
//     [sky] => blue
//     [grass] => green
//     [orange] => orange
// )
```

你应该知道，array_values() 函数返回原数组的值组成的数组，array_keys() 返回原数组的键组成的数组，array_filp() 交换原数组的键和值：
``` php
print_r(array_keys($array)); // ['sky', 'grass', 'orange']
print_r(array_values($array)); // ['blue', 'green', 'orange']
print_r(array_flip($array));
 
// Array
// (
//     [blue] => sky
//     [green] => grass
//     [orange] => orange
// )
```
##  写更简洁的代码
函数 list()，实际上是一个语言结构，其目的就是更简洁地赋值变量。下面是一个基本的例子：
``` php
// define array
$array = ['a', 'b', 'c'];
 
// without list()
$a = $array[0];
$b = $array[1];
$c = $array[2];
 
// with list()
list($a, $b, $c) = $array;
```
这个语言结构与 preg_list() 和 explode() 配合使用更好，同时，你可以省略某些参数（如果你不想多定义一个参数的话）：
``` php
$string = 'hello|wild|world';
list($hello, , $world) = explode('|', $string);
echo("$hello, $world"); // hello, world
```
list() 配合 foreach 使用也会取得更好的效果：
``` php
$arrays = [[1, 2], [3, 4], [5, 6]];
 
foreach ($arrays as list($a, $b)) {
    $c = $a + $b;
    echo($c . ', '); // 3, 7, 11, 
}
```
extract() 函数可以把一个关联数组赋值给变量。对于一个数组的每个元素，创建一个变量，元素的键做变量名，元素的值做变量值：
``` php
$array = [
    'clothes' => 't-shirt',
    'size'    => 'medium',
    'color'   => 'blue',
];
 
extract($array);
 
echo("$clothes $size $color"); // t-shirt medium blue
```
与 extract() 作用相反的函数是 compact() 函数，它使用变量来创建一个关联数组：
``` php
$clothes = 't-shirt';
$size = 'medium';
$color = 'blue';
 
$array = compact('clothes', 'size', 'color');
print_r($array);
 
// Array
// (
//     [clothes] => t-shirt
//     [size] => medium
//     [color] => blue
// )
```

## 过滤函数
有一个极好的数组过滤函数，叫做 array_filter()。第一个参数是待过滤的数组，第二个参数是一个匿名函数，如果你想要让元素留在数组中，就让该回调函数返回true，否则返回dalse:
``` php
$numbers = [20, -3, 50, -99, 55];
 
$positive = array_filter($numbers, function($number) {
    return $number > 0;
});
 
print_r($positive); // [0 => 20, 2 => 50, 4 => 55]
```
array_filter 不仅可以通过数组值来过滤，也可以使用 ARRAY_FILTER_USE_KEY 和 ARRAY_FILTER_USE_BOTH 作为第三个参数来决定传递键或键值到回调函数中。

你也可以调用 array_filter() 不传回调函数，这样会过滤所有的空值：
```php
$numbers = [-1, 0, 1];
 
$not_empty = array_filter($numbers);
 
print_r($not_empty); // [0 => -1, 2 => 1]
```

你可以使用 array_unique() 函数从数组中获取唯一值，要注意这个函数会保留一个唯一元素的键：
``` php
$array = [1, 1, 1, 1, 2, 2, 2, 3, 4, 5, 5];
$uniques = array_unique($array);
 
print_r($uniques);
 
// Array
// (
//     [0] => 1
//     [4] => 2
//     [7] => 3
//     [8] => 4
//     [9] => 5
// )
```
使用 array_column()，可以从多维数组数组中获得一列值组成的数组，类似于从SQL数据库中获取值一样：
``` php
$array = [
    ['id' => 1, 'title' => 'tree'],
    ['id' => 2, 'title' => 'sun'],
    ['id' => 3, 'title' => 'cloud'],
];
 
$ids = array_column($array, 'id');
 
print_r($ids); // [1, 2, 3]
```
从PHP7开始，array_column() 变得更加强大了，因为它现在支持对象组成的数组了，所以用它来处理模型的数组变得更容易：
``` php
$cinemas = Cinema::find()->all();
$cinema_ids = array_column($cinemas, 'id'); // php7 forever!
```
## 遍历数组
使用 array_map() 可以将一个回调函数应用到数组的每个元素上面。你可以传递一个函数名或一个匿名函数，基于给定的数组获取新的数组：
``` php
$cities = ['Berlin', 'KYIV', 'Amsterdam', 'Riga'];
$aliases = array_map('strtolower', $cities);
 
print_r($aliases); // ['berlin', 'kyiv, 'amsterdam', 'riga']
 
$numbers = [1, -2, 3, -4, 5];
$squares = array_map(function($number) {
    return $number ** 2;
}, $numbers);
 
print_r($squares);  // [1, 4, 9, 16, 25]
```
有一个传言说没有办法同时传递键和值给回调函数，但是可以这样做到：
``` php
$model = ['id' => 7, 'name'=>'James'];
 
$callback = function($key, $value) {
    return "$key is $value";
};
 
$res = array_map($callback, array_keys($model), $model);
print_r($res);
 
// Array
// (
//     [0] => id is 7
//     [1] => name is James
// )
```
但是这样看起太丑陋了，更好的方式是使用 array_walk() 替代。这个函数类似 array_map()，但工作原理不同。首先，数组是通过引用传递的，所以 array_walk() 不会创建新数组，而是修改原数组。
``` php
$fruits = [
    'banana' => 'yellow',
    'apple' => 'green',
    'orange' => 'orange',
];
 
array_walk($fruits, function(&$value, $key) {
    $value = "$key is $value";
});
 
print_r($fruits);
 
// Array
// (
//     [banana] => banana is yellow
//     [apple] => apple is green
//     [orange] => orange is orange
// )
```
## 合并数组
合并多个数组的最好方式是使用 array_merge() 函数。数组元素会被合并到一起，对于具有相同键的值，前面的元素会被后面值重写：
``` php
$array1 = ['a' => 'a', 'b' => 'b', 'c' => 'c'];
$array2 = ['a' => 'A', 'b' => 'B', 'D' => 'D'];
 
$merge = array_merge($array1, $array2);
print_r($merge);
// Array
// (
//     [a] => A
//     [b] => B
//     [c] => c
//     [D] => D
// )
``` 
如果想从数组中移除另一个数组的值，可使用 array_diff() 函数。如果想从多个数组中获取它们都有的值，可使用 array_intersect()。下面的例子：
``` php
$array1 = [1, 2, 3, 4];
$array2 =       [3, 4, 5, 6];
 
$diff = array_diff($array1, $array2);
print_r($diff); // [0 => 1, 1 => 2]
 
$intersect = array_intersect($array1, $array2);
print_r($intersect);  // [2 => 3, 3 => 4]
```

## 使用数组做数学计算
使用 array_sum() 获取数组值的和，array_product() 获取数组值的乘积，或使用 array_reduce() 创建你自己的公式：
``` php
$numbers = [1, 2, 3, 4, 5];
 
echo(array_sum($numbers)); // 15
echo(array_product($numbers)); // 120
 
echo(array_reduce($numbers, function($carry, $item) {
    return $carry ? $carry / $item : 1;
})); // 0.0083 = 1/2/3/4/5
```
使用 array_count_values() 计算数组中值出现的次数，每个唯一的键作为数组的键，键值出现的次数作为值：
``` php
$things = ['apple', 'apple', 'banana', 'tree', 'tree', 'tree'];
$values = array_count_values($things);
 
print_r($values);
 
// Array
// (
//     [apple] => 2
//     [banana] => 1
//     [tree] => 3
// )
```
## 生成数组
可以使用 array_fill() 从给定的大小和值来生成数组：
``` php
$bind = array_fill(0, 5, '?');
print_r($bind); // ['?', '?', '?', '?', '?']
```
可以使用 range() 生成顺序的值：
``` php
$letters = range('a', 'z');
print_r($letters); // ['a', 'b', ..., 'z']
 
$hours = range(0, 23);
print_r($hours); // [0, 1, 2, ..., 23]
```
可以使用 array_slice() 获取数组的一部分：
``` php
$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$top = array_slice($numbers, 0, 3);
print_r($top); // [1, 2, 3]
```

## 排序数组
最好要记住的是，所有的数组排序函数使用的都是数组的引用，成功返回true，失败返回false。首先是一个基本的排序函数 sort()，它按照值的升序顺序排序数组元素，不会保留键值。其他的排序函数都是在 sort() 函数名前加上不同的字母前缀来表示：
* a，排序并保留键
* k，按照键来排序
* r，按照相反/降序的顺序排序
* u，按照用户定义的函数来排序
下表是这些字母的组合：

|   |a|  k |r   |u   |
| ------------ | ------------ | ------------ | ------------ |
|  a|   asort|   | arsort  |  uasort  |
|  k|   | ksort  | krsort  |    |
|   r|  arsort | krsort  | rsort  |    |
|  u|  uasort |   |   |  usort  |

当你开始组合使用数组函数时，真正的魔法才开始展现。下面是一个例子：组合 array_slice() 和 array_map() 函数，仅仅使用两行代码就完成了trim和空值的移除：
``` php
$values = ['say  ', '  bye', ' ', ' to', ' spaces ', '   '];
 
$words = array_filter(array_map('trim', $values));
print_r($words); // ['say', 'bye', 'to', 'spaces']
```

组合使用 array_combine() 和 array_column() 函数，可以从模型数组中获取id到title的映射：
``` php
$models = [$model1, $model2, $model3];
 
$id_to_title = array_combine(
    array_column($models, 'id'),
    array_column($models, 'title')
);
```

组合使用 array_count_value()，arsort() 和 array_slice() 函数，获取前三个出现次数最多的值：
``` php
$letters = ['a', 'a', 'a', 'a', 'b', 'b', 'c', 'd', 'd', 'd', 'd', 'd'];
 
$values = array_count_values($letters); // get key to count array
arsort($values); // sort descending preserving key
$top = array_slice($values, 0, 3); // get top 3
 
print_r($top);
// Array
// (
//     [d] => 5
//     [a] => 4
//     [b] => 2
// )
```
使用 array_sum() 和 array_map() 很容易计算某行的和：
``` php
$order = [
    ['product_id' => 1, 'price' => 99, 'count' => 1],
    ['product_id' => 2, 'price' => 50, 'count' => 2],
    ['product_id' => 2, 'price' => 17, 'count' => 3],
];
 
$sum = array_sum(array_map(function($product_row) {
    return $product_row['price'] * $product_row['count'];
}, $order));
 
print_r($sum); // 250
```

## 总结
如上所述，主要的数组函数可使代码更具可读性，更简洁。当然，PHP还有很多其他的数组函数，就算是上述的数组函数给定不同的参数的话也会有不同的用法，但是我认为这篇教程中的内容已经覆盖了每个PHP开发者应该要知道的东西。

注：这篇教程是我翻译自一篇英文文章，原文链接贴在下面了：
https://code.tutsplus.com/tutorials/working-with-php-arrays-in-the-right-way--cms-28606