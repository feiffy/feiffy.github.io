---
title: 几千万数据，更改 MySQL 表结构
date: 2020-05-11
---

> 数据量大、并发量高场景，如何在流量低峰期，平滑实施表结构变更？

* 如果是减column，升级程序不使用即可
* 如果是修改column，程序兼容性容易出问题

## 方案一：在线修改表结构

```mysql
alter table add column
数据量大的情况下，锁表时间会较长，造成拒绝服务，一般不可行。
```

## 方案二：通过增加表的方式扩展属性，通过外键join来查询

```mysql
e.g 
t_user(uid, c1, c2, c3)

想要扩展属性，可以通过增加一个表实现：
t_user_ex(uid, c4, c5, c6)

数据量大的情况下，join性能较差，一般不可行。
```

 
## 方案三：通过增加表的方式扩展，通过视图来屏蔽底层复杂性
同上，视图效率较低，一般不使用视图。

## 方案四：揍产品经理，阻止她修改需求
...
 
## 方案五：提前预留一些reserved字段，加列可复用这些字段
这个方案可行，但如果预留过多，会造成空间浪费。

## 方案六：pt-online-schema-change
对于MySQL而言，这是目前比较成熟的方案，被广大公司所使用。

下面仍以用户表扩展为例，说下这个工具内部的原理与步骤。

```
假设：
user(uid, name, passwd)
要扩展到：
user(uid, name, passwd, age, sex)
```

**1. 先创建一个扩充字段后的新表：**
```mysql
user_new(uid, name, passwd, age, sex)
```

**2. 在原表user上创建三个触发器，对原表user进行的所有insert/delete/update操作，都会对新表user_new进行相同的操作**

**3. 分批将原表user中的数据insert到新表user_new，直至数据迁移完成；**

**4. 删掉触发器，把原表移走（默认是drop掉）；**

**5. 把新表user_new重命名（rename）成原表user；**

扩充字段完成，整个过程不需要锁表，可以持续对外提供服务。
 

### 操作过程中需要注意

* 变更过程中，最重要的是冲突的处理，一条原则，以触发器的新数据为准，这就要求被迁移的表必须有主键（这个要求基本都满足）；

* 变更过程中，写操作需要建立触发器，所以如果原表已经有很多触发器，方案就不行（互联网大数据高并发的在线业务，一般都禁止使用触发器）；
* 触发器的建立，会影响原表的性能，所以这个操作必须在流量低峰期进行；


### 使用方法
前提先在任何一台可以连接到 MySQL 的实例的 linux 机器上安装，安装之后使用帮助：

```shell
pt-online-schema-change --help
```

```shell
pt-online-schema-change \
--host={host} \
-u{user} \
-p'{password}' \
--alter "add column ..." \
D={schema},t='{tableName}' \
--execute --print --statistics --no-check-alter --charset=utf8
```

pt-online-schema-change是DBA必备的利器，比较成熟，在互联网公司使用广泛，要了解更详细的细节，亦可以Google一下。
