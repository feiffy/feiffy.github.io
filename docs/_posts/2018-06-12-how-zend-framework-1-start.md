---
title: Zend Framework 1 框架是如何被启动的？
date: 2018-06-12
order: -1
---

**Zend Framework 1** 是一个十年前的老框架了，我接触它也有两年了，现在来写这篇文章，主要原因是最近要写入职培训教程。公司项目基本上都是基于Zend1框架，即使现在要转 Laravel 也肯定要有好长一段时间的过渡过程，而且基本上是新项目用 Laravel，老项目基本不会再重构了。因此，新人入职的话，还是需要培训一下 Zend Framework 1 的，之前把Zend官方文档的提供的一个入门教程翻译整理了一遍，作为[入门教程](zend-framework-1-quick-start.md)，但这次又看了一遍之后发现，那篇教程只是教你如何做，是什么，却没有讲关于整个框架的整体的逻辑，所以，这篇文章就是为了解决这个问题的。阅读完本文之后，你将加深理解Zend1框架的启动、运行的完整流程。只有理解了这个完整的流程，才能在使用时或遇到问题时迅速解决问题，找到解决方案。



PS：我在梳理的时候，才发现其实我本身对于它也是不够了解的，业务上基本上熟悉了常用的东西之后，就不怎么关注框架本身的东西了，所以说这次整理也算是温故而知新，帮助别人的同时，也帮助了自己。

## First of all
首先，我们从官网上下载Zend1的最新版本的 [ZendFramework-1.12.20 源码包](https://packages.zendframework.com/releases/ZendFramework-1.12.20/ZendFramework-1.12.20.tar.gz)，然后解压，其目录结构简化如下：
``` sh
ZendFramework-1.12.20
|-- bin
|   |-- zf.sh
|   `-- ...
|-- library
|   |-- Zend
`-- ...
```
现在我们只需关注两个：zf.sh 文件和 Zend 目录。zf.sh 是 Zend1 提供的一个命令行工具，用于创建 Project、Controller、Model 等类。接下来我将使用它来创建一个示例项目，为了更方便地全局使用该命令，把它链接到系统的环境变量PATH里面，执行命令如下：
``` sh
$ ln -s /home/<user>/Downloads/ZendFramework-1.12.20/bin/zh.sh /usr/bin/zf
```

然后，可以用 zf 命令创建项目了：
``` sh
$ zf create-project training
```

默认创建的项目目录结构如下：
``` sh
training
|-- application
|   |-- Bootstrap.php
|   |-- configs
|   |   `-- application.ini
|   |-- controllers
|   |   |-- ErrorController.php
|   |   `-- IndexController.php
|   |-- models
|   `-- views
|       |-- helpers
|       `-- scripts
|           |-- error
|           |   `-- error.phtml
|           `-- index
|               `-- index.phtml
|-- library
|-- public
|   |-- .htaccess
|   `-- index.php
`-- tests
    |-- application
    |   `-- bootstrap.php
    |-- library
    |   `-- bootstrap.php
    `-- phpunit.xml
```
先浏览一下这个项目的目录结构，后面将会逐一分析每个文件和目录的作用。

## index.php
因为所有的 Web 请求都将被重定位到 index.php上，所以先来看 index.php 的内容，：
``` php
<?php

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    get_include_path(),
)));

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap()
            ->run();
```
第4行和第8行定义了两个常量，APPLICATION_PATH - 应用的根路径，APPLICATION_ENV - 应用的运行环境，这两个常量是默认生成的，用于在配置文件（configs/application.ini）中指定相应路径。

第12行增加了PHP的include_path，默认PHP的include_path是在php.ini中指定的，这里把我们自己的library目录包括了进去，这样PHP在解析类的时候会到这个目录中去找，后面将会详述这个寻找类的过程。

第18行 `require_once 'Zend/Application.php';` 包括了一个Application.php文件。PHP执行到这一步的时候，会去include_path列表里面寻找有没有Zend目录，然后再去Zend目录寻找有没有Application.php。我们继续执行，然后报了一个错误：
``` sh
PHP Fatal error:  require_once(): Failed opening required 'Zend/Application.php' (include_path='/home/feiffy/Repo/feiffy/Training/library:.:/usr/share/php')
```
显然，PHP没有找到这个文件，所以报错了，它去了这三个目录（/home/feiffy/Repo/feiffy/Training/library，.，/usr/share/php）中去找了，都没有找到。这个文件是框架提供的，用于初始化Zend Application，之前我们只是用zf命令创建了基于Zend1的项目，但是没有把Zend1框架本身引入进去，所以报了这个错误。现在可以看到，PHP确实去我们设置的 /home/feiffy/Repo/feiffy/Training/library 去找了，所以可以把 Zend 框架放到这里，这里的 Zend 框架就是之前下载的 ZendFramework1.12.20/library/Zend 目录，将其整体的复制到 /home/feiffy/Repo/feiffy/Training/library 目录中即可。还有一种方式是直接建立软链接（相当于 Windows 中的快捷方式），我偏向于这种，这样减少了文件的复制：
``` php
$ ln -s /home/<user>/Downloads/ZendFramework-1.12.20/library/Zend /home/feiffy/Repo/feiffy/Training/library/Zend
```
这次PHP就能找到文件了，再说一遍其过程：PHP搜索include_path中的所有路径，发现在 /home/feiffy/Repo/feiffy/Training/library 中是存在 Zend/Application.php 文件的，所以就加载了它。

再看 Application.php 的内容：
``` php
<?php

class Zend_Application {
 ....
}
```
它定义了一个 Zend_Application 类，这个类就是整个 Zend 应用。

然后看第21行，实例化了一个 Zend_Application 应用，现在主要看传入的第二个参数：application.ini 的内容，现在全部是默认生成的：
``` ini
[production]
...
includePaths.library = APPLICATION_PATH "/../library"
bootstrap.path = APPLICATION_PATH "/Bootstrap.php"
bootstrap.class = "Bootstrap"
resources.frontController.controllerDirectory = APPLICATION_PATH "/controllers"
...
```
这里只列出了一些重要的配置，这里的配置将会在后面的 Zend_Application 的初始化中会用到。

## Application.php
现在我们来看 Zend_Application 的实例化过程。
``` php
<?php
class Zend_Application
{
    ...
    
    public function __construct($environment, $options = null, $suppressNotFoundWarnings = null)
    {
        require_once 'Zend/Loader/Autoloader.php';
        $this->_autoloader = Zend_Loader_Autoloader::getInstance();
        ...
        $options = $this->_loadConfig($options);
        $this->setOptions($options);
    }
}
```
其实就做了两件事：初始化 _autoloader 属性和 options 属性。

_autoloader 是 Zend1 框架自己实现的一个类加载器，其类名为 Zend_Loader_Autoloader，稍后，用到它的时候再讲它的加载类的过程，此处就把它当做应用的一个属性就好了。

然后，从配置文件 application.ini 转换为配置为一个 $options 数组，其内容如下：
``` php
<?php
$options = array(
    "includePaths" => "/home/feiffy/Repo/feiffy/Training/../library",
    "bootstrap" => array(
        "path" => "/home/feiffy/Repo/feiffy/Training/Bootstrap.php",
        "class" => "Bootstrap",
    ),
    "resources" => array(
        "frontController" => array(
            "controllerDirectory" => "/home/feiffy/Repo/feiffy/Training/controllers",
        ),
        ...
    ),
);
```

**setOptions()**

最后是 setOptions() 方法。

setOptions() 方法不仅设置了 _options 属性，还做了其他的初始化操作，主要的就是实例化了 _bootstrap 属性：
``` php
<?php
...
public function setOptions()
{
    $this->_options = $options; # 设置 _options 属性

    $this->setIncludePaths($options['includepaths']); # 设置include_paths，把ini里面的路径加到了原先的include_paths列表里面去

    # 初始化 _bootstrap 属性，后面会详述这个 _bootstrap 属性
    $bootstrap = $options['bootstrap'];
    $path  = $bootstrap['path'];
    $class = $bootstrap['class'];
    $this->setBootstrap($path, $class);
}
```

## Bootstrap.php
**setBootstrap()**

setBootstrap() 设置应用的 _bootstrap 属性。
``` php
<?php
public function setBootstrap($path, $class)
{
    ...
    if (null == $class) {
        $class = 'Bootstrap';
    }
    require_once $path;
    $this->_bootstrap = new $class($this);
    ...
}
```
这段代码初始化了应用的 _bootstrap 属性，此时 $path 的值为："/home/feiffy/Repo/feiffy/Training/application/Bootstrap.php"，文件内容如下：
``` php
<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{


}
```
然后 `$bootstrap = new $class();` 就是让PHP去找 Bootstrap 类，而在上一步中 require 了 Bootstrap.php 文件，所以最终在 /home/feiffy/Repo/feiffy/Training/application/Bootstrap.php 文件中找到了，于是实例化该类。

默认这个文件的内容是空的，但是它非常重要，应用所有的资源的初始化都要写在这个类里面。实例化 Bootstrap 时此处没有定义 __construct() 方法，所以PHP会去执行父类 Zend_Application_Bootstrap_Bootstrap 的 __construct() 方法。父类定义如下，可见它又继承了一个抽象父类。
``` php
class Zend_Application_Bootstrap_Bootstrap
    extends Zend_Application_Bootstrap_BootstrapAbstract
{
    parent::__construct($application);
}
```
bootstrap的主要功能都是由这个抽象父类提供的：
``` php
abstract class Zend_Application_Bootstrap_BootstrapAbstract
    implements Zend_Application_Bootstrap_Bootstrapper,
               Zend_Application_Bootstrap_ResourceBootstrapper
{
    public function __construct($application)
    {
        $this->setApplication($application);
        $options = $application->getOptions();
        $this->setOptions($options);
    }
}
```

## Loader.php
但是这里有一个**问题**：Bootstrap 类所继承的 Zend_Application_Bootstrap_Bootstrap 类是如何找到它所在的类定义的文件的呢？这里并不像实例化Bootstrap类之前require了一个Bootstrap.php文件，到目前为止，所有require的文件中都没有包含Zend_Application_Bootstrap_Bootstrap 类的定义。上文在介绍 Bootstrap 的实例化时直接就跳转到了 Zend_Application_Bootstrap_Bootstrap->__construct() 方法，这中间必定经过了一个很重要的过程。这个过程就是PHP自动加载的过程，还记得之前提到的 Zend_Loader 类吗？在实例化 Zend_Application 类的时候添加了一个 _autoloader 属性。我们再回到上面详细看一下，它是如何被初始化的：
``` php
#1 Zend_Application
    require_once 'Zend/Loader/Autoloader.php';
    $this->_autoloader = Zend_Loader_Autoloader::getInstance();

#2 Zend_Loader_Autoloader
    public static function getInstance()
    {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    protected function __construct()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
        $this->_internalAutoloader = array($this, '_autoload');
    }
```
第2行，Autoloader.php 中定义了 Zend_Loader_Autoloader 类，被 require 了，所以第3行能够加载该类并调用一个静态方法 getInstance()，其实就是实例化本身，实例化会自动调用__construct()，所以再去看它的 __construct() 方法。看到一个：**spl_autoload_register()**，这是什么？这是PHP用来注册自动加载函数的一个方法。这里就把 Zend_Loader_Autoloader->autoload() 方法注册为一个类自动加载器。当遇到需要解析类名的时候，就会自动找到这个类加载器，把类名交给它，然后它通过自己定义的规则，解析出类所在的文件名，加载该文件，然后就能实例化所需要的类了。

有了类加载器之后，上面在 require Bootstrap.php 文件时，发现 Bootstrap 类继承自 Zend_Application_Bootstrap_Bootstrap 类，然后 PHP 会去解析该类，结果发现现在所有的 require 的文件里面都没有该类的定义，默认的解析规则找不到类文件，所以就交给 Zend_Loader_Autoloader->autoload()，在 Zend_Loader_Autoloader 里面经过一番规则转换：
``` php
    public static function autoload($class)
    {
        call_user_func($autoloader, $class) // $autoloader->autoload()
    }

    protected function _autoload($class)
    {
        $callback = $this->getDefaultAutoloader();
        call_user_func($callback, $class); // $this->loadClass()
    }

    public static function loadClass($class, $dirs = null)
    {
        $file = self::standardiseFile($class);
        ...
        self::loadFile($file, $dirs, true);
    }

    public static function standardiseFile($file)
    {
        $fileName = ltrim($file, '\\');
        $file      = '';
        $namespace = '';
        if ($lastNsPos = strripos($fileName, '\\')) {
            $namespace = substr($fileName, 0, $lastNsPos);
            $fileName = substr($fileName, $lastNsPos + 1);
            $file      = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
        }
        $file .= str_replace('_', DIRECTORY_SEPARATOR, $fileName) . '.php';
        return $file;    
    }

    public static function loadFile($filename, $dirs = null, $once = false)
    {
        if ($once) {
            include_once $filename;
        } else {
            include $filename;
        }
    }
```
经过层层调用，最终在 standardiseFile() 方法中，把 Zend_Application_Bootstrap_Bootstrap 转换为 "Zend/Application/Bootstrap/Bootstrap.php" 路径，然后在 loadFile() 方法中加载了该文件。加载文件是按照路径层级一级一级往下找时，PHP首先去 include_paths 目录列表中去寻找有没有 Zend 目录，结果发现在 /home/feiffy/Repo/feiffy/training/library 中找到了，并且后面的子目录也正确找到了，于是加载了 Bootstrap.php 文件，这个文件中定义了 Zend_Application_Bootstrap_Bootstrap 类。所以 PHP 现在知道了这个类在这个文件里，直接实例化它，并调用了 __construct()。

Zend1框架这种风格的加载文件的方式是老版PHP代码流行的风格，通过下划线来匹配目录层级，现在已经过时，这里只要了解一下就好了，新版的PHP自动加载风格请参考官方文档：PSR-4。

## index.php
_bootstrap 属性实例化完成之后，就回到 index.php 中的 `$application->bootstrap()->run();`。应用的启动是通过 Bootstrap 类的 bootstrap() 方法启动的，调用顺序如下：
``` php
# index.php
$application->bootstrap()

# Zend_Application->bootstrap()
    public function bootstrap($resource = null)
    {
        $this->getBootstrap()->bootstrap($resource);
        return $this;
    }

# Zend_Application_Bootstrap_BootstrapAbstract->bootstrap()
    final public function bootstrap($resource = null)
    {
        $this->_bootstrap($resource);
        return $this;
    }

    protected function _bootstrap($resource = null)
    {
        if (null === $resource) {
            foreach ($this->getClassResourceNames() as $resource) {
                $this->_executeResource($resource);
            }

            foreach ($this->getPluginResourceNames() as $resource) {
                $this->_executeResource($resource);
            }
        } elseif (is_string($resource)) {
            $this->_executeResource($resource);
        } elseif (is_array($resource)) {
            foreach ($resource as $r) {
                $this->_executeResource($r);
            }
        } else {
            throw new Zend_Application_Bootstrap_Exception('Invalid argument passed to ' . __METHOD__);
        }
    }
```
最终在 _bootstrap() 中加载了所有的资源，至此应用的初始化、启动结束。接下来执行 run() 方法获取前端控制器资源，通过前端控制器处理路由、分发请求和输出响应。
``` php
# Zend_Application->run()
    public function run()
    {
        $this->getBootstrap()->run();
    }

# Zend_Application_Bootstrap_Bootstrap->run()
    public function run()
    {
        $front   = $this->getResource('FrontController');
        $default = $front->getDefaultModule();
        if (null === $front->getControllerDirectory($default)) {
            throw new Zend_Application_Bootstrap_Exception(
                'No default controller directory registered with front controller'
            );
        }

        $front->setParam('bootstrap', $this);
        $response = $front->dispatch();
        if ($front->returnResponse()) {
            return $response;
        }
    }
```
在这一步里面，初始化front前端控制器，由前端控制器负责把请求分发给相应的具体的Controller，返回Controller所产生的响应数据。到这一步之后就是后面，核心的类就是 Controller 类了。

## Front.php
Front.php 中定义了 Zend_Controller_Front 即前端控制器，用于把请求分发给相应的具体的控制器，并且接收响应，路由功能就由它控制的。它有一个核心方法 dispatch()：
``` php
class Zend_Controller_Front
{
    public function dispatch(Zend_Controller_Request_Abstract $request = null, Zend_Controller_Response_Abstract $response = null)
    {
        require_once 'Zend/Controller/Request/Http.php';
        $request = new Zend_Controller_Request_Http();
        $this->setRequest($request);
        ...
        require_once 'Zend/Controller/Response/Http.php';
        $response = new Zend_Controller_Response_Http();
        $this->setResponse($response);
        ...
        $router = $this->getRouter();

        $dispatcher = $this->getDispatcher();

        ...
        $dispatcher->dispatch($this->_request, $this->_response);
      
        ...
        $this->_response->sendResponse();
    }

    public function getRouter()
    {
        if (null == $this->_router) {
            require_once 'Zend/Controller/Router/Rewrite.php';
            $this->setRouter(new Zend_Controller_Router_Rewrite());
        }

        return $this->_router;
    }
}
```
在初始化空的 Request 和 Response 对象，以及设置了 router 对象之后，然后获取 FrontController 的 dispatcher 对象，调用该对象的 dispatch() 方法。FrontController 相当于分发流程的容器，真正实现路由分发的是 dispatcher 对象，即 Zend_Controller_Dispatcher_Standard 类：
``` php
class Zend_Controller_Dispatcher_Standard extends Zend_Controller_Dispatcher_Abstract
{
    public function dispatch(Zend_Controller_Request_Abstract $request, Zend_Controller_Response_Abstract $response)
    {
        ...
        $className = $this->getControllerClass($request);
        if (!$className) {
            $className = $this->getDefaultControllerClass($request);
        }
        $moduleClassName = $className;
        ...
        $className = $this->loadClass($className);


        ...
        $controller = new $moduleClassName($request, $this->getResponse(), $this->getParams());

        ...
        $action = $this->getActionMethod($request);


        ...
        $controller->dispatch($action);


        ...
        $content = ob_get_clean();
        $response->appendBody($content);
    }
}
```
从 request 中获取 indexController 类名，加载类文件。这个方法里面解析到的 indexController 文件名为："/home/feiffy/Repo/feiffy/Training/application/controllers/IndexController.php" 然后加载之。

第16行，最终实例化了具体的 IndexController 类，这就从框架层到了我们的业务层。

第23行，执行到业务action。

第27行，获取输出缓存中的数据，并清理输出缓存，将其内容添加到 response 对象中。执行完这一切之后，返回上层调用，继续执行到 FrontController，调用 reponse 对象的 sendResponse() 方法，输出内容到浏览器。

下面简要讲一讲 Reponse 对象：
``` php
abstract class Zend_Controller_Response_Abstract
{
    public function sendResponse()
    {
        $this->sendHeaders();

        ...

        $this->outputBody();
    }

    public function outputBody()
    {
        $body = implode('', $this->_body);
        echo $body;
    }
}

```
sendHeaders() 输出HTTP报文的头部，这是HTTP协议规定的内容就不必多说，outputBody() 方法输出内容部分，其实很简单，就是把 Response 对象中的 _body 数组里面存储的字符串值全部连接起来输出就OK了。

`echo` 函数默认是输出到标准输出（对于纯PHP脚本的话，就是屏幕或者控制台），但这里是 Web 项目，浏览器发出请求首先到 Apache 服务器，然后根据 Apache 的配置调用了 PHP 来接收请求，处理请求，所以这里的PHP输出会返回给 Apache，然后 Apache 再原样返回给浏览器。

## Action.php

所有的 Controller 都继承自 Zend_Controller_Action 类：
``` php
abstract class Zend_Controller_Action implements Zend_Controller_Action_Interface
{
    public function __construct(Zend_Controller_Request_Abstract $request, Zend_Controller_Response_Abstract $response, array $invokeArgs = array())
    {
        $this->setRequest($request)
             ->setResponse($response)
             ->_setInvokeArgs($invokeArgs);
        $this->_helper = new Zend_Controller_Action_HelperBroker($this);
        $this->init();
    }
    
    public function init()
    {
    }


    public function dispatch($action)
    {
        $this->preDispatch();
        ...
        $this->$action();
        ...
        $this->postDispatch();


        ...
        $this->_helper->notifyPostDispatch();
    }
}
```
该类实例化时会执行 init() 方法，默认是空的，所以我们可以在自己写的 Controller 里面重写 init() 方法来做些初始化的工作。

最终使用 dispatch() 来调用 action()，preDispatch() 是在调用 action() 前的准备工作，postDispatch() 是在调用 action() 的收尾工作，我们可以在子类（自己写的 Controller ）中的这两个方法里面可以加上对请求参数、返回响应做一些处理，或者单纯记录日志等工作。 而 action() 则是执行具体业务操作的方法。

现在我们再仔细看一下最后一个 notifyPostDispatch() 方法，运行到这里时，Controller 其实已经执行完了，这个方法主要通知相关的 helper 类更新它们的状态，其中有一个重要的 helper：Zend_Controller_Action_Helper_ViewRenderer，用来渲染视图层的类：
``` php
#1 Zend_Controller_Action_HelperBroker
    public function notifyPostDispatch()
    {
        foreach (self::getStack() as $helper) {
            $helper->postDispatch();
        }
    }

#2 Zend_Controller_Action_Helper_ViewRenderer
    public function postDispatch()
    {
        if ($this->_shouldRender()) {
            $this->render();
        }
    }

    public function render($action = null, $name = null, $noController = null)
    {
        $this->setRender($action, $name, $noController);
        $path = $this->getViewScript();
        $this->renderScript($path, $name);
    }

    public function renderScript($script, $name = null)
    {
        ...
        $this->getResponse()->appendBody(
            $this->view->render($script),
            $name
        );
        ...
    }
```
第19行初始化需要的东西，第20行获取需要渲染的phtml脚本文件，第21行渲染该文件。

`getViewScript()` 默认把 application/views/scripts/ 当做视图脚本文件的根目录，然后按照 controller/action 的命名规则去寻找相应的.phtml视图脚本文件（.phtml文件其实就是php和html代码混合的文件，php可以直接读取。），比如 index/index 的请求将会去找 index/index.phtml 文件。当然，这个是默认的配置，你也可以在 action() 方法中使用方法指定某个视图文件，这就不提了。

<code>rederScript()</code> 方法调用视图对象view的render()方法渲染脚本文件，那么渲染是什么意思呢？看View对象的定义就知道了.

## View.php
``` php
abstract class Zend_View_Abstract implements Zend_View_Interface
{
    public function render($name)
    {
        // find the script file name using the parent private method
        $this->_file = $this->_script($name);
        unset($name); // remove $name from local scope

        ob_start();
        $this->_run($this->_file);

        return $this->_filter(ob_get_clean()); // filter output
    }

    protected function _run()
    {
        ...
        include func_get_arg(0);
    }

    private function _filter($buffer)
    {
        ...
        return $buffer;
    }
}
```
其实View对象渲染的原理很简单，就是先开启输出缓冲区`ob_start()`，然后include了一个视图文件(.phtml)，这个文件里面非PHP的代码会直接输出，PHP的部分用echo或printf这种输出函数输出内容，输出缓冲开启之后，所有输出的内容会全部存在缓冲区里面，然后调用`ob_get_clean()` 获取缓冲区内容字符串并清理缓冲区，然后返回所有的字符串给上层调用。最后所有字符串内容通过 Response 对象的 appendBody() 方法添加到其 _body 属性里面，最后通过 Response 对象的输出方法，返回给 Apache，然后PHP结束运行。