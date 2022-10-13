---
title: CodeIgnitor 3.0.x 之 Load 加载机制
date: 2019-08-20
order: -1
---

CI 框架中的 library 和很多内置的类都是通过 `CI_Loader` 这个类加载的，也就是 Controller 中常常出现的 `$this->load` 属性。那么它本身是如何被加载的。

## CI_Loader 初始化

这一切又要从最初的入口点 `index.php` 说起了。首先，外界的请求定位到了 `index.php`，所有的请求的处理都是从这里开始的。大略看一下 `index.php` 的内容，其实也很简单，就是利用当前文件的位置，定义了一些环境和路径常量，比如 `ENVIRONMENT`, `BASEPATH`, `APPPATH`, `VIEWPATH`，基于这些常量，又定义了一些全局变量：`$system_path`, `$application_folder`, `$view_folder`，最后加载了CI框架的核心类：`core/CodeIgnitor.php`，完成了它的使命。

在 `CodeIgnitor.php` 中执行了框架的初始化操作，最终调用 `call_user_func_array(array(&$CI, $method), $params);`，将处理控制权转到继承自 `CI_Controller` 的具体的控制器类之中；而 `CI_Loader` 就是在框架初始化的过程中加载并作为 `CI_Controller` 的属性而存在的。

在 `CodeIgnitor.php` 的开头，就加载了 `Core/Common.php`，这个文件中定义了几个重要的全局辅助函数，它们是加载类的前提。其中最重要的是 `load_class()`：

``` php
function &load_class($class, $directory = 'libraries', $param = NULL)
	{
		static $_classes = array();

		// Does the class exist? If so, we're done...
		if (isset($_classes[$class]))
		{
			return $_classes[$class];
        }
        
        // ...

        foreach (array(APPPATH, BASEPATH) as $path)
		{
			if (file_exists($path.$directory.'/'.$class.'.php'))
			{
				$name = 'CI_'.$class;

				if (class_exists($name, FALSE) === FALSE)
				{
					require_once($path.$directory.'/'.$class.'.php');
				}

				break;
			}
		}
        // ...

        $_classes[$class] = isset($param)
			? new $name($param)
			: new $name();
		return $_classes[$class];
	}
}
```
这个方法维护了一个全局的静态数组 `$_classes`，如果待加载的类不存在，则实例化之并添加到静态数组中；如果之前已经存在，则直接返回该实例。

随后，直接使用 `load_class` 加载了这些CI核心类 `Benchmark, Hooks, Config, Utf8, URI, Router, Output, Security, Input, Lang`。

最后，调用 `call_user_func_array(array(&$CI, $method), $params);`时，代码执行转到 `CI_Controller::__construct()` 之中：

``` php
class CI_Controller {

	private static $instance;

	public function __construct()
	{
		self::$instance =& $this;

		foreach (is_loaded() as $var => $class)
		{
			$this->$var =& load_class($class);
		}

		$this->load =& load_class('Loader', 'core');
		$this->load->initialize();
		log_message('info', 'Controller Class Initialized');
    }
    
    public static function &get_instance()
	{
		return self::$instance;
	}
}
```
从中可以看到，对于所有已加载的核心类，会再执行一次 `load_class()` 并将其返回的类实例作为 Controller 的属性。所以在控制器的action方法中，下面直接调用都是可以的：

``` php
$this->input; // CI_Input
$this->output; // CI_Output
$this->uri; // CI_URI
$this->router; // CI_Router
$this->lang; // CI_Lang
```

第二步，便是用 `load_class()` 加载了 `core/Loader.php` 并将其赋值为 `Controller` 的 `load` 变量。所以，在控制器的Action方法中，`$this->load` 就是一个 `CI_Loader` 的对象。

然后，`$this->load->initialize();` 主要是读取 `config/autoload.php` 中定义的类，然后加载之。所以说，如果想要在框架启动时加载某些类，就可以将这些类名加到 `autoload.php` 中的相应的配置中去。

## 使用 CI_Loader 加载类
先看一下 `CI_Loader` 的结构：

``` sh
library()
driver() -> library()
model()
database()
helpers()
language()
config()
view() -> _ci_load()
```
CI_Loader 提供了几种不同的加载方法，用来加载 CI 目录中对应目录下的类。

`library()` 用于加载 `system/libraries/` 或 `application/libraries/` 目录下的系统类库或用户创建的类库

`driver()` 用于加载 `system/libraries/` 或 `application/libraries/` 目录下的基于驱动的类库；

`model()` 用于加载 `application/models/` 目录下的模型类；

`database` 用于加载由 `application/config/database.php` 配置文件指定的数据库连接；

`helpers` 用于加载 `application/helpers` 或 `system/helpers/` 下的辅助函数；

`language()` 用于加载 `system/language/` 或 `application/language/` 下的语言配置文件；

`config()` 用于加载 `application/config/` 目录下的配置文件。

`view()` 用于加载 `application/views/ ` 目录下的视图模板文件。

### 加载类库 —— library()
示例1：CI 提供了一个日历类 `CI_Calendar`，可以像这样加载并使用它：

``` php
$this->load->library('calendar');
echo $this->calendar->generate(); // 显示一个日历

/* 输出
November 2019
Su	Mo	Tu	We	Th	Fr	Sa
 	 	 	 	 	1	2
3	4	5	6	7	8	9
10	11	12	13	14	15	16
17	18	19	20	21	22	23
24	25	26	27	28	29	30
*/
```

示例2：CI 提供了一个表单字段验证类 `CI_Form_validation`，加载并使用它：

``` php
$this->load->library('form_validation');
$this->form_validation->set_rules('username', 'Username', 'required');
$this->form_validation->set_rules('password', 'Password', 'required');
if ($this->form_validation->run() == FALSE)
{
	// 输出错误信息
}
```
从这两个例子可以看出来，加载系统类库，只需要指定一个小写的{类名}，使用时也是直接 $this->{类名} 即可。

### 加载驱动器类库 —— driver()

驱动器类加载与普通类库加载过程其实一样，区别就在于驱动器类存在多个具体驱动的实现类，同样一个功能，以不同的驱动实现不同场景的使用。

驱动器类的类文件结构如下：
``` sh
system/libraries
    Cache/
        drivers/
            Cache_apc.php - CI_Cache_apc
            Cache_file.php - CI_Cache_file
            Cache_memcached.php - CI_Cache_memcached
            Cache_redis.php - CI_Cache_redis
    Cache.php - CI_Cache extends CI_Driver_Library
```
必须要以这样的类/文件命名结构，才能被 driver() 方法所支持。使用时如下：

``` php
$this->load->driver('cache');
$this->cache->redis->get($key);
```

第一行加载 `CI_Cache` 类，第二行动态加载了 `CI_Cache_redis` 类。能够实现这样的动态加载的原因就是 `CI_Driver_Library` 在魔术方法中动态加载具体的驱动器：

``` php
public function __get($child)
	{
		// Try to load the driver
		return $this->load_driver($child);
	}
```

### 加载模型类 —— model()

这个比较简单，直接去 `application/models/` 目录下寻找对应的文件加载之。

``` php
$this->load->model('model_name');
```

如果模型类在子目录中，则带上目录名即可：

``` php
$this->load->model('blog/queries');
```

使用模型

``` php
$this->load->model('model_name');

$this->model_name->method();
```

### 加载数据库连接 database()

`database()` 读取 `application/config/database.php` 文件中的数据库配置，加载数据库连接。

配置文件内容：
``` php
$db['default'] = array(
    'dsn'   => '',
    'hostname' => 'localhost',
    'username' => 'root',
    'password' => '',
    'database' => 'database_name',
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => TRUE,
    'db_debug' => TRUE,
    'cache_on' => FALSE,
    'cachedir' => '',
    'char_set' => 'utf8',
    'dbcollat' => 'utf8_general_ci',
    'swap_pre' => '',
    'encrypt' => FALSE,
    'compress' => FALSE,
    'stricton' => FALSE,
    'failover' => array()
);
```
使用：
``` php
$this->load->database();
$query = $this->db->query('SELECT name, title, email FROM my_table');

foreach ($query->result_array() as $row)
{
    echo $row['title'];
    echo $row['name'];
    echo $row['email'];
}
```

`database()` 不指定参数时，则使用 `default` 配置项，其实现如下：

``` php
public function database($params = '', $return = FALSE, $query_builder = NULL)
{
	$CI =& get_instance();

	require_once(BASEPATH.'database/DB.php');

	if ($return === TRUE)
	{
		return DB($params, $query_builder);
	}
	
	// Load the DB class
	$CI->db =& DB($params, $query_builder);
	return $this;
}


function &DB($params = '', $query_builder_override = NULL)
{
	require_once(BASEPATH.'database/DB_driver.php');
	// ...
	// Load the DB driver
	$driver_file = BASEPATH.'database/drivers/'.$params['dbdriver'].'/'.$params['dbdriver'].'_driver.php';
	
	require_once($driver_file);
	
	// Instantiate the DB adapter
	$driver = 'CI_DB_'.$params['dbdriver'].'_driver';
	$DB = new $driver($params);
	
	// ...
	return $DB;
}
```

`database() ` 第二个参数如果为TRUE则返回 `db`，否则设置为CI控制器的属性。这里的 `db` 是 `DB()` 返回的对象，实际上是 `DB()` 根据配置，加载对应的数据库驱动类，所返回的数据库驱动对象。