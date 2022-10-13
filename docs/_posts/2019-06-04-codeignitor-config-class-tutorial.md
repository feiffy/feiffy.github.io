---
title: CodeIgnitor 配置类的使用
date: 2019-06-04
order: -1
---

CI 的配置文件统一放在 `application/config/` 目录下面，框架有一个默认的主配置文件 `application/config/config.php`。其部分内容如下：
``` php
<?php
$config['uri_protocol']	= 'REQUEST_URI';

// ...

$config['charset'] = 'UTF-8';

// ...

$config['subclass_prefix'] = 'My_';
```

可以看到所有的配置信息都放在 `$config` 数组里。框架默认会加载这个配置文件，所以使用时直接用 `item()` 调用：
``` php
<?php
$this->config->item('uri_protocol'); // 'REQUEST_URI'
```

## 自定义配置
如果你不想使用默认的配置文件，而是自己创建一个新的配置文件，那也是可以的。在 `application/config/` 目录下面创建一个 `custom.php`：
``` php
<?php
$config['index_page'] = 'welcome';
```

使用时，需要先加载 `custom.php` 文件，然后获取配置内容：
``` php
<?php
$this->config->load('custom');
$index_page = $this->config->item('index_page'); // 'welcome'
```

从前面两个例子中可以看到配置信息都是 `$config` 数组的键指定的，那么是否可以自定义一个变量来指定配置信息呢？答案是'''不可以'''，无论是系统的 `config.php` 还是自定义的配置文件，都必须在 `$config` 数组中定义配置项，因为 CI Config 在加载配置文件时会检查是否含有 `$config` 数组，如果没有，就报错：`'Your '.$file_path.' file does not appear to contain a valid configuration array.'`。

## 避免重复键冲突
当加载多个配置文件时，这些配置文件中的 `$config` 会合并，所以如果在不同的配置文件中如果有相同的键的话，就会产生冲突（先加载的配置会被后加载的配置覆盖）。这可以通过指定 `load()` 的第二个参数来解决。

假设现在有两个配置文件：`custom1.php` 和 `custom2.php`，它们的内容如下：
``` php
// custom1.php
$config['index_page'] = 'welcome1';

// custom2.php
$config['index_page'] = 'welcome2';
```
在加载时指定 `load()` 第二个参数为 TRUE，来分别保存配置项的值到不同的数组中（而不是原来的的 `$config`）：
``` php
$this->config->load('custom1.php', TRUE);
$this->config->load('custom2.php', TRUE);
```
然后在获取配置项时，在 `item()` 第二个参数指定配置文件名就可以正确获取到配置项了：
``` php
$this->config->item('index_page', 'custom1'); // 'welcome1'
$this->config->item('index_page', 'custom2'); // 'welcome2'
```