---
title: 使用 phpunit 进行 单元测试
date: 2021-11-16
code: true
---

## 安装PHPUnit

使用 `Composer` 安装 `PHPUnit`

``` bash
#查看composer的全局bin目录 将其加入系统 path 路径 方便后续直接运行安装的命令
composer global config bin-dir --absolute

#全局安装 phpunit
# php7.1 默认安装的是 phpunit7.5 版本
composer global require --dev phpunit/phpunit

#查看版本
phpunit --version
```

## 编写测试用例

在 demo 项目里面，有一个文件 `app/service/Clue/PayRecordService.php`

``` php
namespace Service\Clue;

class PayRecordService extends BaseService  
{
    /**  
     * 格式化是否显示删除按钮 * @param $payRecord  
     * @return bool  
     */
    public function formatShowDeleteBtn($payRecord): bool  
    {  
        $hide = ($payRecord['billed_money'] > 0) // 已入账的  
            || ($this->isBankPayRecord($payRecord['pay_type']) && $this->isArrivedPayRecord($payRecord['money_arrived_status'])); // 已认领的银行  
     return !$hide;  
    }   
}

```

我们来创建这个 service 类的对应的测试文件：`tests/Clue/PayRecordServiceTest.php` 

``` php
<?php  
namespace AppTest\Clue;  
  
use AppTest\BaseTest;  
use Service\Clue\PayRecordService;  
  
class PayRecordServiceTest extends BaseTest  
{  
    protected $service;  
  
    protected function setUp()  
    {  
        parent::setUp();  
        $this->service = new PayRecordService();  
    }  
  
    /**  
     * 测试 是否显示删除按钮 
     */ 
    public function testFormatShowDeleteBtn()  
    {  
        $payRecord = [  
            'billed_money' => 0,  
            'pay_type' => 1,  
            'money_arrived_status' => 1,  
        ];  
  
        $show = $this->service->formatShowDeleteBtn($payRecord);  
        $this->assertTrue($show);  
    }  
}
```

## 执行单元测试

``` bash
# 切换到项目根目录
$ cd ~/webapp/xxx.demo.com

$ phpunit tests/Clue/PayRecordServiceTest --bootstrap=vendor/autoload.php

# 执行结果如下
PHPUnit 7.5.20 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 60 ms, Memory: 6.00 MB

OK (1 test, 1 assertion)
```

这是一个非常简单的测试用例类，可以看到，执行了共1个测试用例，共1个断言，结果成功。

## 代码覆盖率

代码覆盖率反应的是`测试用例`对`测试对象`的`行，函数/方法，类/特质`的访问率是多少(`PHP_CodeCoverage` 尚不支持 `Opcode覆盖率、分支覆盖率 及 路径覆盖率`)，虽然有很多人认为过分看重覆盖率是不对的，但我们初入测试还是俗气的追求一下吧。

测试覆盖率的检测对象是我们的业务代码，PHPUnit通过检测我们编写的测试用例调用了哪些函数，哪些类，哪些方法，每一个控制流程是否都执行了一遍来计算覆盖率。

`PHPUnit` 的覆盖率依赖 `Xdebug`，可以生成多种格式

```
\--coverage-clover <file\>    Generate code coverage report in Clover XML format.
--coverage-crap4j <file\>    Generate code coverage report in Crap4J XML format.
--coverage-html <dir\>       Generate code coverage report in HTML format.
--coverage-php <file\>       Export PHP\_CodeCoverage object to file.
--coverage-text=<file\>      Generate code coverage report in text format.
--coverage-xml <dir\>        Generate code coverage report in PHPUnit XML format.
```

同时需要使用 `--whitelist dir`参数来设定我们需要检测覆盖率的业务代码路径，下面演示一下具体操作，在项目目录下执行下面的命令：

``` bash
$ phpunit \
--bootstrap vendor/autoload.php \
--coverage-html=reports/ \
--whitelist app/service/Clue/PayRecordService.php \
tests/Clue/PayRecordServiceTest
```

这里 `--coverage-html=reports` 指定了报告生成的路径是项目目录下的 `reports`，所以我们可以直接访问：`http://xxx.demo.com/reports/index.html` 来查看报告：

![](/blog/imgs/73eccf9c676a943c001c4eb1134622dd.jpg)

这样我们就对业务代码`service/PayRecordService.php`做单元测试，并且获得我们单元测试的代码覆盖率，现在覆盖率只有 3.38%，因为我的测试用例只访问了`app/service/Clue/PayRecordService.php`的一个方法，还有很多其他方法并没有测试到，开发中则能体现出你的测试时用力对业务代码测试度的完善性。

## 使用phpunit.xml编排测试套件

PHPUnit 提供了 `phpunit.xml` [^1]用来配置管理测试。

[^1]: [XML 配置文件 - PHPUnit latest 手册](https://phpunit.readthedocs.io/zh_CN/latest/configuration.html#appendixes-configuration)

这是一个示例：
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="./vendor/autoload.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false">
    <testsuites>
        <testsuite name="PayRecordService">
            <directory>./tests/Clue</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <!--可以定义多个 对./app/service/Clue/PayRecordService.php 下的业务代码做覆盖率统计-->
            <directory>./app/service/Clue/PayRecordService.php</directory>
        </whitelist>
    </filter>
    <logging>
        <!--覆盖率报告生成类型和输出目录 lowUpperBound低覆盖率阈值 highLowerBound高覆盖率阈值-->
        <log type="coverage-html" target="./reports" lowUpperBound="35" highLowerBound="70"/>
    </logging>
</phpunit>
```

然后直接运行 `phpunit` 行即可：

``` bash
$ phpunit 

PHPUnit 6.5.14 by Sebastian Bergmann and contributors.

Time: 81 ms, Memory: 4.00MB

No tests executed!

Generating code coverage report in HTML format ... done
```

### 接口测试

**1. curl 请求接口，测试返回值**

``` php
<?php  
  
namespace AppTest\Api;  
use PHPUnit\Framework\TestCase;  
  
/**  
 * Class ClueSeller */class ClueSeller extends TestCase  
{  
    protected $baseUrl;  
    protected $httpClient;  
    protected $options;  
  
    public function setUp()  
    {  
        parent::setUp();  
        $this->baseUrl = 'http://xxx.demo.com/api/clue_sellcar/';  
        $this->httpClient = new \GuzzleHttp\Client();  
        $this->options = [  
            'cookies' => \GuzzleHttp\Cookie\CookieJar::fromArray([  
                'cid' => '8eaf5efef1e2b774f2d2e8d4789ef8f5616d68ee',  
            ], 'cp.ceshi.che300.com')  
        ];  
    }  
  
    protected function getResponse($uri)  
    {  
        $response = $this->httpClient->get($this->baseUrl . $uri, $this->options);  
        $this->assertSame(200, $response->getStatusCode());  
        return json_decode($response->getBody(), true);  
    }  
  
    /**  
 * 测试账单列表 - 是否有数据 */ public function testBillList()  
    {  
        $response = $this->getResponse('bill_list');  
        $this->assertIsArray($response);  
        $this->assertSame(1, $response['code'], $response['msg']);  
        $this->assertNotEmpty($response['data']['list']);  
    }  
  
    /**  
 * 测试账单列表 - 筛选条件 - 时间 */ public function testBillListDate()  
    {  
        $response = $this->getResponse('bill_list?date_start=2021-09-01&date_end=2021-11-16');  
        $this->assertIsArray($response);  
        $this->assertSame(1, $response['code'], $response['msg']);  
        $this->assertNotEmpty($response['data']['list']);  
    }
```

**2. 准备好环境变量，全局变量，用户状态等数据，然后 `require index.php` 执行代码**

``` php
<?php

namespace AppTest\Api;
use PHPUnit\Framework\TestCase;

/**
 * Class ClueSeller
 */
class ClueSeller2 extends TestCase
{
    public function setUp()
    {
        parent::setUp();
        $possible_files = [
            '/etc/nginx/cron.conf',
            '/opt/nginx/etc/cron.conf',
            '/opt/lampp/etc/extra/cronconfig/cron.conf',
            '/usr/local/etc/nginx/cron.conf'
        ];

        foreach ($possible_files as $env_conf) {
            if (file_exists($env_conf)) {
                $conf = parse_ini_file($env_conf);
                foreach ($conf as $k => $v) {
                    $_SERVER[$k] = $v;
                }
            }
        }
        $_SESSION['mastername'] = 'ffsong';
        $_SESSION['masterid'] = 58;
        $_SESSION['res'] = [
            'clue_dealer' => [1,2]
        ];
        $_SERVER['argv'][1] = 'api/Clue_sellcar';
    }

    /**
     * 测试 clue_sellcar/bill_list 接口
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testBillList()
    {
        $_SERVER['argv'][2] = 'bill_list';
        $_GET = [
            'date_start' => '2021-01-01',
            'date_end' => '2021-11-16',
        ];

        require __DIR__ . '/../../index.php';
        $res = json_decode($this->getActualOutput(), true);
        // 获取输出结果
        $this->assertNotEmpty($res['data']['list']);
    }

    /**
     * 测试 clue_sellcar/bill_list 接口
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testBillListDealer()
    {
        $_SERVER['argv'][2] = 'bill_list';
        $_GET = [
            'date_start' => '2021-01-01',
            'date_end' => '2021-11-16',
            'dealer_id' => 'A',
        ];

        require __DIR__ . '/../../index.php';
        $res = json_decode($this->getActualOutput(), true);
        // 获取输出结果
        $this->assertNotEmpty($res['data']['list']);
    }
}
```


## 后续

- [基于Gitlab实现自动化单元测试](https://www.jianshu.com/p/e952dd3ff969)

## 参考

- https://segmentfault.com/a/1190000018426487
- https://phpunit.readthedocs.io/zh_CN/latest/writing-tests-for-phpunit.html
- https://blog.csdn.net/u011832039/article/details/50343109
- https://segmentfault.com/q/1010000018201343
- http://fe.che300.com/easymock/wikiCatalog/wysiwyg/6177f4b4f16124356f48694c