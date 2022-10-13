---
title: CodeIgnitor 缓存驱动类的使用
date: 2020-11-03
---

> 最近在给 redis 驱动类添加新的方法时又陷入了疑惑中，理不清这里面的类关系，所以这次彻底梳理一下。
 
**CodeIgnitor** 中使用缓存是通过 Libaray 下的 `CI_Cache` 代理调用 drivers 下的缓存驱动实现类（`Cache_redis`）方式进行的。

* 下面是一个调用 `Apc cache` 类的一个示例：

``` php
$this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));

if ( ! $foo = $this->cache->get('foo'))
{
        echo 'Saving to the cache!<br />';
        $foo = 'foobarbaz!';

        // Save into the cache for 5 minutes
        $this->cache->save('foo', $foo, 300);
}

echo $foo;
```

* `CI_Cache` 类的基本定义如下：

``` php
class CI_Cache extends CI_Driver_Library {
    protected $valid_drivers;
    protected $_cache_path;
    protected $_adapter;
    protected $_backup_driver;
    public $key_prefix;

    public function __construct();
    public function get();
    public function save();
    public function delete();
    public function increment();
    public function decrement();
    public function clean();
    public function cache_info();
    public function get_metadata();
    public function is_supported();
}
```

* 上面这些方法也可以不用通过加载`adapter`的方式，而是直接通过属性的方式进行调用：

``` php
$this->load->driver('cache');
$this->cache->apc->save('foo', 'bar', 10);

// 文件缓存
$this->load->driver('cache');
$this->cache->file->save('foo', 'bar', 10);

// memcache 缓存
$this->load->driver('cache');
$this->cache->memcached->save('foo', 'bar', 10);

// redis 缓存
$this->load->driver('cache');
$this->cache->redis->save('foo', 'bar', 10);
```

* 每种缓存驱动都有它的特定配置或者注意点，这些注意点都是具体缓存驱动实现类中的内容。

* CI 框架内置了 `Cache_apc`、`Cache_file`、`Cache_memecached`、`Cache_redis`、`Cache_wincache` 这5种缓存方式。这些缓存驱动是通过驱动实现类的方式支持的。相关类文件目录结构如下：

```
|- app
|- system
 |- libraries
  |- Driver.php
  |- Cache
   |- Cache.php
   |- drivers
    |- Cache_apc.php
    |- Cache_file.php
    |- Cache_memcache.php
    |- Cache_redis.php
    |- Cache_wincache.php
```

* 如上目录结构所示，其实所有的驱动类基类都是 `Driver.php` 中的 `CI_Driver_Library` 类，这个类只提供了一个`__get()`方法用于获取实际的驱动实现类，在里面主要进行了`load_driver()`的操作。

* 在这里，`Cache.php`即`CI_Cache`类就继承了 `CI_Driver_Library`，从而获取了通过属性名加载缓存驱动实现类的能力。所以说，`CI_Cache` 实际上是一个驱动代理类，通过它加载具体的驱动类。在 `load_driver()` 末尾有这么一行代码：

``` php
// ... some code
// Instantiate, decorate and add child
$obj = new $class_name();
$obj->decorate($this);
$this->$child = $obj;
return $this->$child;
```
* 在这段代码之前的一系列操作是通过属性名获取实际实现类名，然后这里实例化该类，并调用实现类的 `decorate($parent)` 方法把当前类中的方法和属性添加到实现类中，然后设置为 CI_Cache 类的属性，并返回。下次再调用时就能直接找到该类，不用再次加载。

* 而每个具体的缓存驱动实现类则继承了 `Driver.php` 中的 `CI_Driver` 类，在这个类中提供了上面提到的 `decorate($parent)` 方法，它的主要用途就是把父类中的方法名和属性名存储到子类中，然后通过子类调用这些子类不存在的方法时，退化为通过 `__call()` 调用父类的方法。这样的话如果在父类 CI_Cache 中定义了一些与adapter 无关的方法时，也能通过 `$this->cache->redis` 去调用。

至此，CI_Cache 的所有内置类的关系已经全部说明完毕。

## 项目扩展

* 上面基本说明了如何使用 CI 中的 library 中的类以及 driver 类（以 Cache driver 为例，对其他类型也适用），并且还说明内部相关类之间的关系。

* 但框架内置的缓存驱动类可能有的方法缺失，那么就需要我们在项目中进行扩展。CI 提供了对 `Library` 内的类的自定义扩展以及创建自己的 driver 类的机制。

* 这里以我们项目中的实际案例为例，下面是项目中的实际目录：

```
|- app
 |- libraries
  |- Cache
   |- Che300_Cache.php
   |- drivers
    |- Cache_predis.php
    |- Che300_Cache_redis.php
```

* 在上面这个目录结构里，其实做了两件不同的事情，第一件事就是创建了自己的 Library 类 `Che300_Cache`，另一件事就是创建了自己的 driver 类 `Cache_predis`。如何创建新的 Library 类的文档在 [creating_libraries](https://codeigniter.com/userguide3/general/creating_libraries.html)，如何创建新的 driver 类的文档在 [creating_drivers](https://codeigniter.com/userguide3/general/creating_drivers.html)。这里的默认类前缀是 `Che300`，所以下面的加载方法：
 $this->load->driver('Cache');
实际加载的是 `Che300_Cache` 类，而这个类的内容呢很简单：

``` php
class Che300_Cache extends CI_Cache
{
	public function __construct()
	{
		parent::__construct();
		$this->valid_drivers[] = 'predis';
	}
}
```
* 继承 `CI_Cache` 并且把 predis 也加入到驱动类数组中，这相当于一种新的驱动方式，所以在 drivers 目录下又按照命名约定新建了一个 `Cache_predis` 驱动实现类。所以下面的调用可以实现：

``` php
$this->load->driver('cache');
$this->cache->predis->set('key', 'value');
```

* 而 `Che300_Cache_redis` 也是创建了新的 redis 缓存驱动实现类，它继承了 `CI_Cache_redis` 类，实际上是对系统的默认 redis 类的覆盖。所以下面的调用实际返回的是 `Che300_Cache_redis` 驱动实现类：

``` php
$this->load->driver('cache');
$this->cache->redis->set('key', 'value');
```
