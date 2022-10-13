---
title: 使用 Capistrano 进行自动化部署
date: 2018-07-03
order: -1 
---

最近在折腾这个，弄了好多次都不成功，看了[官方文档](https://capistranorb.com/)和很多博客，都没有说清楚，因此，我觉得有必要把它记录下来，以帮助更多像我这样被弄得烦躁的人。

首先是安装，其实 Ubuntu 上面安装 Capistrano 非常简单：
``` shell
$ gem install capistrano
```

然后，进入项目目录，运行下面命令生成 Capistrano 的配置文件：
``` shell
$ cap install
```
这个命令会创建下面这些文件：
``` shell
Capfile
config/
    deploy/
        production.rb
        staging.rb
    deploy.rb
lib/
    capistrano/
        tasks/
```
在 `config` 中存放的的各个环境的配置文件，而我，就是在配置这个的时候产生的问题。

`deploy` 文件配置如下：
``` ruby
# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "KFB"
set :repo_url, "git@<my-server-1>:<my-account>/<my-project>.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, "dev"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/KFB-API"
```
而 `staging.rb` 文件如下：
``` ruby
# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

# server "example.com", user: "deploy", roles: %w{app db web}, my_property: :my_value
# server "example.com", user: "deploy", roles: %w{app web}, other_property: :other_value
# server "db.example.com", user: "deploy", roles: %w{db}

# role-based syntax
# ==================

# Defines a role with one or multiple servers. The primary server in each
# group is considered to be the first unless any hosts have the primary
# property set. Specify the username and a domain or IP for the server.
# Don't use `:all`, it's a meta role.

# role :app, %w{deploy@example.com}, my_property: :my_value
# role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value
# role :db,  %w{deploy@example.com}
role :web, %w{<my-user>@<my-server>}
```
就配置这一行就可以了。按照注释所说，它有两种方式配置，但其实都只干了一件事，就是配置部署服务器。

我之前错误就是在这里配了两个设置，然后执行
``` shell
$ cap staging deploy
```
时始终会报这几个错：

``` shell
#错误一：fatal: unable to access 'http://<my-server>/<my-account>/<my-project>.git/': The requested URL returned error: 500
#错误二：fatal: repository 'http://<my-server>/<my-account>/<my-project>.git/' not found
#错误三：Net::SSH::AuthenticationFailed: Authentication failed for user <my-user>@<my-project>
#错误四：Permission denied (publickey,password)
```

发生错误根本原因有两个，一个是本地连接远程服务器不通，第二个是远程服务器连接 Git 服务器不通，因为 Capistrano 的运行原理就是从本地连接远程服务器，然后在远程服务器上执行 Git 命令，克隆最新代码到远程服务器的发布目录上面。这里都是使用的 ssh key 的方式进行连接。

本地连接远程服务器不通，可以参考 [设置 SSH Key 登录服务器和 Git 服务器](http://feiffy.cc/ssh-key-login-server-and-git) 在本地生成两个 Key，把公钥放服务器上，私钥放本地。这里还有一个坑，如果你在生成密钥文件时指定了文件名的话，那是不能直接使用的，具体如何使用我暂时没弄清楚，所以直接使用默认的文件名 id_rsa 就行啦。

对于连接 Git 服务器的问题，此时的 Git 服务器是用 Gitlab 搭建的一个项目，可以通过 Web 访问；用上面同样的方法生成两个 Key，公钥在 Gitlab 中的个人设置中（下图）设置，私钥放在远程服务器访问 Git 服务器的用户目录的 `.ssh/` 目录下面。

![](http://cdn.feiffy.cc/blog/2018/07/03/auto-deploy-with-capistrano.png)
配置完之后，可以先用

``` shell
$ git clone git@<my-server>:<my-account>/<my-project>.git 
```

测试一下，正常的话应该能直接克隆项目而不需要再输入密码了。

最后全部配置好了之后，再运行

``` shell
$ cap staging deploy
```

输出一大堆命令，最后显示成功。根据先前的设置，自动部署之后的远程服务器上的代码目录结构是这样的：

``` shell
KFB-API/
    revisions.log
    releases/
        0180703070947/
            # 这里是项目的具体内容，相当于原来的 KFB-API/ 下面的内容
    current/ -> ./releases/20180703070947
    repo
    shared
```