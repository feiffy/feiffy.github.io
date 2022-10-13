---
title: CI框架入门笔记
date: 2019-03-22
order: -1
---

当前（2019-03-22）CodeIgniter 框架的最新版本是 3.1.5，于2017年6月发布，距今快两年了也没有更新，这与 Laravel 的更新速度相比差距太大了。因为确实，它是一个很古老的框架了（第一个版本在2006年发布），当初的设计原则，开发环境与现在都已经大为不同。它有自己的设计原则，有相配套的一大堆工具、库，使用这些现有的工具就已经能很好地满足日常开发所需。

虽然已经是2019年了，但是公司用的框架是CI框架，所以我也应当快速适应CI框架的开发模式。本文就针对CI框架开发中的一些重点问题进行梳理和记录。CI框架的[官网文档](http://codeigniter.org.cn/user_guide/index.html) 很完善，但是我觉得仍然有必要整理出自己的一套实用规则。

就一个常规PHP框架来说，我认为应当包含这几个部分：

- （1）index.php 或全局 App 对象，一个提供统一入口，一个提供容器资源管理
- （2）路由控制
- （3）请求和响应对象的封装，输入数据过滤和验证，输出数据的验证和转义，各种输入输出方法
- （4）MVC 分层，控制器，模型和视图层，以及 Service 层
- （5）数据库操作：数据库驱动、查询构造器、通用的查询方法
- （6）文件存储、缓存管理
- （7）Session, Cookie管理
- （8）安全性、配置、国际化、自动加载、第三方扩展机制
- （9）常见的工具类（其实应当通过扩展提供）
- （10）模板语言（这个不是必要的，因为PHP本身就能输出）

## 入门
### 了解框架
我们下载好CI框架解压之后的初始目录是下面这样的：
``` txt
application/
    controller/
        cache/
        config/
        controllers/
        core/
        helpers/
        hooks/
        language/
        libraries/
        logs/
        models/
        third_party/
        views/
        .htaccess
        index.html
system/
    core/
    database/
    fonts/
    helpers/
    language/
    libraries/
    index.html
.gitignore
composer.json
index.php
```
其中，我注意到，每个目录下面都有一个index.html文件，其内容也都是一样的：403 Forbidden。这是为了防止意外访问吗？

`application/` 就是是项目目录，就是我们实际的项目代码存放处，下面分了很多子目录，看名字就知道会放哪种功能的代码，这些子目录目前除了包含一个 403 index.html 文件，没有别的内容。`system/` 就是框架目录，下面就是框架代码。

根目录的 `index.php` 是整个项目的唯一入口点。index.php 主要的功能是定义了一些系统目录，包括项目目录、视图目录、框架目录，在最后调用了框架目录下的 `core/CodeIgniter.php`，这个文件是CI框架的入口点和结束点，即包含了CI框架的所有生命周期。它的执行过程如下：
``` txt
    * 定义全局常量，加载全局函数，环境检测，PHP版本判断
    * 注册错误处理函数，自动加载函数（Composer判断）
    * 加载一系列类：
        * Hooks，钩子函数类
        * Config，配置类
        * UTF-8，
        * URI，（CI_URI）
        * Router，路由类
        * Output，输出类
        * Security，安全类
        * Input，输入类
        * Lang，多语言类
    * 加载控制器类
        * 判断控制器类、方法是否存在，不存在则404
        * 调用控制器前置钩子函数
        * 实例化控制器
        * 调用控制器后置钩子函数
        * 调用控制器方法（业务逻辑）
        * 输出响应
    * 调用系统后置钩子函数
```

在实例化控制器这一部分中，注意到它定义了一个静态实例，代码如下
``` php
# core/CodeIgniter.php
# 此处定义了一个全局函数 get_instance()，返回一个静态对象。
function &get_instance()
{
    return CI_Controller::get_instance();
}
// ...

$CI = new $class();


# core/Controller.php
class CI_Controller {
    public function __construct()
    {
        self::$instance =& $this;
        // ...
    }

    public static function &get_instance()
    {
        return self::$instance;
    }
}
```
在之后的任意位置的代码中，只要通过 `get_instance()` 方法就能获取唯一的 `Controller` 对象，它其实就是CI框架中的“容器”。

调用控制器方法（即业务逻辑）通过这段代码调用执行：
``` php
call_user_func_array(array(&$CI, $method), $params);
```

### 业务逻辑
在调用上述代码之后，就进入到 `application/` 目录下我们的实际的业务功能代码。上面的 `&$CI` 就是 `$class` 名对象，即根据URL参数解析对应到 `application/controllers/` 目录下的实际控制器类文件名。具体的映射方法可以看[文档](https://codeigniter.org.cn/user_guide/general/controllers.html)

比如，有一个 URI 是这样的：/welcome，会解析为 `application/controller/Welcome.php` 文件，它应该是一个继承自 `CI_Controller` 的类。`/welcome` 相当于 `/welcome/index`，URI 的第一个部分是控制器，第二个部分是控制器的方法，所以这个 URI 会调用 Welcome 类的 index 方法。URI 中只有第一个部分时，那第二个部分默认是 index。在控制器方法中我们编写实际的业务功能代码。示例如下：
``` php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
		$this->load->view('welcome_message');
	}
}
```

### 加载功能模块（类库）
CI框架默认提供了模型、视图、辅助函数、日志、配置、缓存等功能。这些功能模块默认是不加载的，需要在控制器中进行手动按需加载。另外，`libraries` 目录中的类库，也是同上的加载机制，只不过这里面的类库是开发人员自己写的功能模块。下面详细描述每种模块的加载方式。

#### model

首先，我们看到上节中的 `$this->load`，这就是CI框架中的加载类（`CI_Loader`），我们所有需要的类库、模块都可以通过它来加载。这个加载类实际上是“容器”的一个对象属性，从下面 model 的源码可以看到，实际上所有容器的“对象属性”都可以直接通过模型获取：
``` php
class CI_Model {
    public function __get($key)
    {
        return get_instance()->$key;
    }
}
```

在业务功能开发中，使用最频繁的就是模型了。CI框架提供的模型类是 `core/Model.php` 即 `CI_Model` 类，它其实就是一个很简单的类，没有提供任何内容，如果你需要使用模型，那就应该在 `application/models` 下面新建一个继承自 `CI_Model` 的类，然后在使用模型的地方先使用 `$this->load->model()` 来加载它，加载了之后，就能直接通过 `$this->{模型名}` 访问该模型对象：

``` php
 $this->load->model('User_model');
 $result = $this->User_model->get_one($id);
```

`model()` 默认到 `application/model/` 目录下寻找 `user_model.php` 这个文件名，然后加载 `User_model` 类，实例化之，并赋值作为“容器”的对象属性，属性名就是模型名。`model()` 方法部分源码：
``` php

public function model($model, $name = '', $db_conn = FALSE)
{
    // ...
    $model = new $model();
    $CI->$name = $model;
}
```

`model()` 方法的第二个参数可以指定属性名，示例代码如下：

``` php
$this->load->model('User_model', 'USER');
$result = $this->USER->get_one($id);
```

CI框架并没有规定模型类中应当放什么，这取决于你。通常我们会写一个 Base_Model 类，用来提供各种查询方法，然后在具体的模型类中实现具体模型对应的业务方法。在控制器中直接调用模型类的业务方法获取数据。在CI框架中我们使用模型类的理由就是封装逻辑，不然所有的逻辑都写在控制器中（我看到项目中现在有一部分老代码就是这样做的！）。CI也没有提供进一步Service层，这由你自己决定。

#### database

一般在 Base_Model 类中，我们会加载一下默认的数据库，封装若干查询方法：
``` php
class Base_Model 
{
    function __construct()
    {
        // ...
        $this->load->database();
    }

    function save() {}
    function get_one() {}
    function get_all() {}
    function update() {}
    function delete() {}
    function query() {}
    ...
}
```
调用了 `database()` 之后，会调用一个 `DB` “对象”，并赋值为控制器的 `$db` 属性，`database()` 部分源码如下：
``` php
public function database($params = '', $return = FALSE, $query_builder = NULL)
{
    // ...
    if ($return === TRUE)
    {
        return DB($params, $query_builder);
    }
    // ...
    $CI->db =& DB($params, $query_builder);
}
```
可以看到，当第二个参数为 TRUE 时，直接返回 DB 对象，并不会设置为控制器的属性。这一点在具体的模型类中会有用，比如我们会在具体的模型类中加载不同的数据库类：
``` php
class Article_model extends Base_Model
{	
    public function __construct()
    {
        $this->db = $this->load->database('myDb2', TRUE);
	}
}
```
这里获取 myDb2 数据库对象，避免了污染全局的 `$CI->db` 对象。

关于这个 `DB` 对象，我想再多讲一点，打开这个 `DB` 类文件，发现其实它只是一个函数，这个函数根据某些条件，动态定义了 `CI_DB` 类，条件满足时，`CI_DB` 类继承自 `CI_DB_query_builder` 类，条件不满足时则继承自 `CI_DB_driver`。
``` php
function &DB($params = '', $query_builder_override = NULL)
{
    // ...
    if (条件) {
        class CI_DB extends CI_DB_query_builder { }
    } else {
        class CI_DB extends CI_DB_driver { }
    }
    // ...
    $driver = 'CI_DB_'.$params['dbdriver'].'_driver';
    $DB = new $driver($params);
    // ...
    $DB->initialize();
	return $DB;
}
```
然后通过配置实例化具体的数据库驱动类，因为具体的数据库驱动类（比如：`CI_DB_mysqli_driver`）继承自 `CI_DB`，这样根据配置条件就可以控制数据库驱动类是否继承 query_builder，最终返回的是具体的数据库驱动类实例。

实际上 `CI_DB_query_builder` 也是继承自 `CI_DB_driver` 的。那什么时候不需要 query builder 呢？我猜测为了追求性能，少加载一个文件，可能会选择不加载 query builder。
``` php
// database/drivers/mysqli/mysqli_driver.php
class CI_DB_mysqli_driver extends CI_DB {
	// ...
}
```

最复杂的部分其实已经介绍完了，下面是一些常用的类库介绍

#### helper
在使用自定义的辅助函数之前，需要加载一下，语法同上。只不过它会去 `application/helpers` 目录下去寻找相应文件。
``` php
$this->load->helper('dt');
```

#### libraries
`application/libraries` 目录下的类，加载语法同上，使用其实没什么问题，值得注意的是如何写一个自己的类库。
``` php
$this->load->library('t');
```

#### config
配置文件也需要加载，然后 `item` 方法直接访问配置文件中的值，自定义的配置需要设置为 `$config` 数组的属性的形式。
``` php
# application/config/d.php
$config['ddd'] = '';

# Controller
$this->load->config('d');
$data = $this->config->item('ddd')
```

#### view
由于现在CI项目只是作为API，所以并无视图，但为了介绍，下面提供了一个示例：
``` php
# application/views/welcome.php

# Controller
$this->load->view('welcome', $data);
```
这个视图文件就是一个普通的PHP文件，可以直接输出。

#### driver
驱动其实也是类库的一种。

## 总结
就我入手这个CI项目的一个月经验来看，日常业务开发就是这些东西，后面也不过是在这个框架基础上不断深入和完善。所以这篇文章作为入门总结应该算是足够了。