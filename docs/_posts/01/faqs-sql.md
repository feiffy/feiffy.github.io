---
title: SQL 常见问题
date: 2020-01-01 
code: true
---

### group by order by 同时使用

执行过程：先 group by 之后，每组取出第一个，然后再 order by

（1）如果想要在每组内进行排序然后取每组的第一个，可以先通过子查询排好序，再对子查询的结果进行 group by order by 就能得到正确的结果。

（2）如果表A和表B连表并且A和B是一对多的关系，这是如果需求是按照A表排序取一个，那么 group by A.id order by A.id 就可以直接写，因为此时不是组内排序，而是组外排序，组内多个记录 A 相关的字段值都是一样，此时取任何一个都可以，取完再排序。取完A的值之后，再用 A.id 取B表相关的记录即可。

### mysql replace 语法

实例：把'病假' 替换为 '--'：

``` sql
UPDATE users SET username=REPLACE(username,'病假','--')  WHERE username LIKE '%病假%';
```

### max() 对 date 类型是否可以？

可以

### LIMIT 写法

* LIMIT 5，取5条数据
* LIMIT 1,5，从位置1开始取5条数据

### 连表去重计算总数

```SQL
SELECT COUNT(DISTINCT t1.id)
FROM table1 t1 JOIN table2 t2 ON t1.id = t2.id
WHERE ...
```

### 重置自增列初始id

```SQL
ALTER TABLE table_name auto_increment= 1;
```