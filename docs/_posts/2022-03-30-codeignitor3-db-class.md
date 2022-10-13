---
title: CodeIgnitor 3.0.x 之 db 类实现机制
date: 2022-03-30
code: true
---

- Codeignitor 的 db 类的说明，锻炼一下文字表达能力


- 一般的使用场景：
``` php
class home extends Base_Controller
{    
    public function test()  
    {
        $this->load->model('my/User_model');
    }
}

class User_model extend CI_Model  
{
    public function __construct()  
    {
       $this->db = $this->load->database('my', TRUE);
    }
}

class CI_Model
{
    public function __get($key)  
    {  
        return get_instance()->$key;  
    }
}
```

- 在 controller 中加载 model 类
- 在 model 中加载 db，获得 db 对象，可以用来查询 sql
    - model 中的 load 对象是从 controller 中获取的
    - db 对象的类型是 `CI_DB_mysqli_driver`，这是 load 对象根据默认配置创建的 mysql 数据库查询对象
    - 默认配置文件在 `/config/database.php`，按照框架约定配置好数据库参数

- database.php 内容如下：
``` php
$active_group = 'default';  
$query_builder = TRUE;
$db['default'] = array(
    $db['myche'] = array(  
         'dsn' => '',  
         'hostname' => $_SERVER['DB_MY_HOST'],  
         'username' => $_SERVER['DB_MY_USER'],  
         'password' => $_SERVER['DB_MY_PASS'],  
         'database' => $_SERVER['DB_MY_NAME'],  
         'dbdriver' => 'mysqli',  
         'dbprefix' => '',  
         'pconnect' => FALSE,  
         'db_debug' => (ENVIRONMENT !== 'production'),  
         'cache_on' => FALSE,  
         'cachedir' => '',  
         'char_set' => 'utf8',  
         'dbcollat' => 'utf8_general_ci',  
         'swap_pre' => '',  
         'encrypt' => FALSE,  
         'compress' => FALSE,  
         'stricton' => FALSE,  
         'failover' => array(),  
         'save_queries' => (ENVIRONMENT !== 'production')  
    );
);
```

- `CI_DB_mysqli_driver` 继承自 `CI_DB`，`CI_DB` 类使用了一种奇怪的方式实现的，这个类是在一个叫做`DB`的函数内声明的，根据 `$query_builder=true` 的配置来决定声明`CI_DB`的父类是`CI_DB_driver`还是`CI_DB_query_builder`，两者的区别就是后者继承自前者并在前者的基础上实现了常用语句的链式调用方法。按照声明处注释所说，`CI_DB`类可以理解为 `CI_DB_driver` 和 `CI_DB_query_builder` 的别名。
- `CI_DB_mysqli_driver`的创建过程：
    - 在 load 对象的 database 方法中调用 DB 函数
    - 在 DB 函数中
        - 声明 `CI_DB`，根据 `$query_builder=true` 的配置来决定`CI_DB`的父类是`CI_DB_driver`还是`CI_DB_query_builder`。
        - 根据 `dbdriver` 配置加载数据库驱动类文件，并实例化 `CI_DB_mysqli_driver`，并返回此对象。

- DB 函数的实现
``` php
function &DB($params = '', $query_builder_override = NULL)  
{
    require_once(BASEPATH.'database/DB_driver.php');
    
    if ( ! isset($query_builder) OR $query_builder === TRUE)
	{
		require_once(BASEPATH.'database/DB_query_builder.php');
		if ( ! class_exists('CI_DB', FALSE))
		{
			/**
			 * CI_DB
			 *
			 * Acts as an alias for both CI_DB_driver and CI_DB_query_builder.
			 *
			 * @see	CI_DB_query_builder
			 * @see	CI_DB_driver
			 */
			class CI_DB extends CI_DB_query_builder { }
		}
	}
	elseif ( ! class_exists('CI_DB', FALSE))
	{
		class CI_DB extends CI_DB_driver { }
	}
    
    // Load the DB driver  
    $driver_file = BASEPATH.'database/drivers/'.$params['dbdriver'].'/'.$params['dbdriver'].'_driver.php';
    require_once($driver_file);
    
    // Instantiate the DB adapter
	$driver = 'CI_DB_'.$params['dbdriver'].'_driver';
	$DB = new $driver($params);
    
    return $DB;
}
```

- `CI_DB_mysqli_driver` 最终是继承自 `CI_DB_driver` 这个抽象类。`CI_DB_driver` 定义了数据库驱动类需要实现的一些通用方法，具体的驱动类比如 `CI_DB_mysqli_driver` 则实现了这些方法。

- `CI_DB_driver` 关键方法定义
``` php
abstract class CI_DB_driver {
    // db 连接
    function db_connect() {}
        
    // db 长连接
    function db_pconnect() {}
    
    // 设置连接字符集编码
    function _db_set_charset() {}
    
    // 选择数据库
    function db_select() {}
    
    // 开始事务
    function _trans_begin() {}
    
    // 回滚事务
    function _trans_rollback() {}
    
    // 提交事务
    function _trans_commit() {}
    
    // 执行查询
    function _execute($sql) {}
}
```

- `CI_DB_mysqli_driver` 的部分实现
``` php
class CI_DB_mysqli_driver extends CI_DB {
    // 连接数据库
    public function db_connect($persistent = FALSE)  
    {
        // Do we have a socket path?
		if ($this->hostname[0] === '/')
		{
			$hostname = NULL;
			$port = NULL;
			$socket = $this->hostname;
		}
		else
		{
			// Persistent connection support was added in PHP 5.3.0
			$hostname = ($persistent === TRUE && is_php('5.3'))
				? 'p:'.$this->hostname : $this->hostname;
			$port = empty($this->port) ? NULL : $this->port;
			$socket = NULL;
		}

		$client_flags = ($this->compress === TRUE) ? MYSQLI_CLIENT_COMPRESS : 0;
		$this->_mysqli = mysqli_init();

		$this->_mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10);
        
        // ... 此处省略一些设置的代码
        
        if ($this->_mysqli->real_connect($hostname, $this->username, $this->password, $this->database, $port, $socket, $client_flags))
		{
			// Prior to version 5.7.3, MySQL silently downgrades to an unencrypted connection if SSL setup fails
			if (
				($client_flags & MYSQLI_CLIENT_SSL)
				&& version_compare($this->_mysqli->client_info, '5.7.3', '<=')
				&& empty($this->_mysqli->query("SHOW STATUS LIKE 'ssl_cipher'")->fetch_object()->Value)
			)
			{
				$this->_mysqli->close();
				$message = 'MySQLi was configured for an SSL connection, but got an unencrypted connection instead!';
				log_message('error', $message);
				return ($this->db->db_debug) ? $this->db->display_error($message, '', TRUE) : FALSE;
			}

			return $this->_mysqli;
		}

		return FALSE;
    }
}
```
- 这里 `mysqli_init` 函数是 php 扩展自带的函数，返回的是 php 的 resource 类型的对象，即 mysqli 对象，这个对象可以用来查询数据库。


- 再看下  `CI_DB_query_builder` 的部分实现，主要的功能是基于 driver 的方法，实现很多人性化的、可以链式调用的方法。
``` php
abstract class CI_DB_query_builder extends CI_DB_driver
{
    public function limit($value, $offset = 0)
	{
		is_null($value) OR $this->qb_limit = (int) $value;
		empty($offset) OR $this->qb_offset = (int) $offset;

		return $this;
	}
    
    public function offset($offset)
	{
		empty($offset) OR $this->qb_offset = (int) $offset;
		return $this;
	}
    
    public function get($table = '', $limit = NULL, $offset = NULL)
	{
		if ($table !== '')
		{
			$this->_track_aliases($table);
			$this->from($table);
		}

		if ( ! empty($limit))
		{
			$this->limit($limit, $offset);
		}

		$result = $this->query($this->_compile_select());
		$this->_reset_select();
		return $result;
	}
    
    function select() {}
    function distinct() {}
    function join() {}
    function from() {}
    function where() {}
    function or_where() {}
    function like() {}
    function group_by() {}
    function having() {}
    function update() {}
    
    // ...
}
```