---
title: 帖子列表时如何查询包含我的帖子
date: 2020-07-02
order: -1
---

## 场景

用户发帖之后，需要审核通过之后才能被别人看到，同时审核中的帖子自己也能够看到，通过一个列表接口如何实现？

## 分析

这个列表接口数据应包含：所有审核通过的帖子 + 自己的审核中的帖子

现有一个帖子表 `post` 定义如下：



|字段|值说明|
|---|---|
|id |主键id|
|status	|状态：1-审核通过，2-审核中，3-审核失败|
|user_id|发帖人id|

那么上面的需求查询想当然应该是：

```sql
select {fields} from post where status = 1
union
select {fields} from post where status = 2 and user_id = {user_id}
limit 5, 0
```

实际上一开始，我就是这么做的，但是请求量多了以后，这个查询会变慢，那么如何优化？

## 优化

post 表增加一个 show_users 可见用户字段，0-所有用户可见，{user_id}-只有这个用户能看见，这样的话，下面一个SQL就可以解决：

```sql
select {fields} from where status in (1, 2) and show_users in (0, {user_id});
```

这里需要注意一个隐含的关联关系：

1. show_users = 0 的记录必定是 status = 1 的记录。
2. show_users 的值必定是当前记录的 user_id

所以优化之前需要先处理一下老数据，示例SQL如下：

```sql
alter post add column show_users int default 0;
update post set show_users = user_id where status = 2;
```