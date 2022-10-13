---
title: 设置 SSH Key 登录服务器和 Git 服务器
date: 2018-05-03
order: -1
---

## 设置 SSH Key 登录服务器

通过 ssh 登录服务器，一直都是用的账号和密码，今天看到一篇文章说这样不安全，使用 ssh key 的方式登录则是更好的选择，因此，研究实践了一下，并记录在这里。

Ssh key 的基本原理是这样的：在你的本机上创建两个Key文件，一个是私钥，一个是公钥，私钥放在本地，公钥放在远程服务器。当你通过ssh key登录到远程服务器时，远程服务器使用公钥创建了一个加密的随机消息，然后发送到本地机器，本地机器使用私钥解密消息，发送解密的消息到远程服务器。远程服务器验证这个解密后的消息，然后授权访问。实际过程比这个复杂，但我们这里理解大概就可以了。

使用下面的命令创建Key文件：
``` shell
$ ssh-keygen
```
按照界面上的提示操作，最终生成了两个文件：`~/.ssh/id_rsa.pub`(公钥) 和 `~/.ssh/id_rsa`(私钥)。私钥文件放在本地机器，并且要保密，不能让别人知道。公钥要复制一份放到远程服务器上面。

我们使用scp命令来复制公钥文件到服务器：

``` shell
scp ~/.ssh/id_rsa.pub <your username>@<your servername/ip>:
```

**注意:末尾有一个：冒号！**，这个命令把公钥文件上传到了服务器 `<your username>/home` 目录下面。

下一步，使用该用户名登录服务器，检查 `~/.ssh` 目录是否存在，不存在则创建之：

``` bash
$ mkdir ~/.ssh
```
 
下一步，创建 `~/.ssh/authorized_keys` 文件：

``` bash
$ touch ~/.ssh/autorized_keys
```

这个文件将包含一系列允许登录本机的公钥。

然后将公钥的内容加到 `~/.ssh/authorized_keys` 文件中：

``` bash
$ cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
```

最后，我们修改相关目录的权限，只允许 `<your username>`(假设此处用户名为 feiffy) 用户访问。

``` bash
$ chown -R feiffy:feiffy ~/.ssh
$ chmod 700 ~/.ssh
$ chmod 600 ~/.ssh/authorized_keys
```

大功告成，现在可以直接 ssh 登录远程服务器，而不需要输入密码了。

另外，使用 scp 命令传输文件到远程服务器也不需要密码了。

## 设置 SSH Key 登录 Git 服务器

有了上面的操作基础之后，就会发现，设置 SSH Key 登录 Git 服务器其实原理是一样。

这里先讲我个人的 Git 远程库的设置，这与 Github 有所不同。

我自己的远程服务器上面的 Git 仓库是用 `git init --bare` 命令建立的，是这样建立的：

``` bash
# 登录远程服务器
$ cd /home/git
$ mkdir repo.git
$ cd repo.git
$ git init --bare
```

可以看到我使用的是 Git 用户创建的远程仓库，在本机上克隆该仓库只需运行下列命令即可

``` bash
$ git clone git@example.com/repo.git
```

然后需要输入Git用户的密码。现在的目的是设置使用 ssh key 登录，而不需要输入密码。

既然原理与上一篇中的一样，那就不赘述了，为了方便这里直接使用上面生成的两个Key文件：`id_rsa`，`id_rsa.pub`，把公钥 `id_rsa.pub` 复制到远程服务器的 `/home/git/` 目录下面，注意与上文的区别只是不同用户名的区别，其他操作都是一样的。

然后本地连接使用下面的命令，就不需要密码了。

``` bash
$ git clone ssh://git@example.com/home/git/repo.git
```

参考：

- 《Modern PHP》 7.Procisioning - Server Setup - SSH Key-Pair Autherntication
- [Git on the Server - The Protocols](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols) 
- [ 2 Simple Steps to Set up Passwordless SSH Login on Ubuntu](https://www.linuxbabe.com/linux-server/setup-passwordless-ssh-login)