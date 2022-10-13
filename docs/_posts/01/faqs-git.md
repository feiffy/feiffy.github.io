---
title: Git 常见问题
date: 2020-01-01 
code: true
---

### error: unable to delete BRANCH: remote ref does not exist

解决方法：先执行下面的命令，删除本地git缓存，然后再执行删除操作

``` bash
$ git fetch -p origin
```

### 回退到过去的版本之后再如何回到未来的版本？

问题描述：使用`git reset --hard COMMIT_ID`回退到过去的版本之后，再想回到未来最新的版本时，但是 COMMIT_ID 忘记了，那么如何回到未来最新的版本？

解决：当使用 `git reset --hard COMMIT_ID` 回退版本时，不要在原来的开发分支上操作，而是新建一个分支，在新分支上进行操作(而且以后这种类似的对过去的版本的操作应该养成开一个新的临时分支进行操作的习惯)。在新分支上操作时，当想要回到未来最新的版本时，可以切换到原分支，复制其 COMMIT_ID2，然后切换回新分支，运行 `git reset --hard COMMIT_ID2` 即可回到未来的最新分支。但是如果已经直接在原来的开发分支上进行回退操作了，可以使用 `git reflog` 获得过去操作的记录，从中可以找到最新的 COMMIT_ID，然后同上命令回到未来分支。

### 如何删除并忽略已经添加到git版本库的目录和文件
问题描述：vendor文件夹，之前把这个目录的内容都提交到git上面了，后来发现不应该提交，那么如何才能在之后的提交中忽略该目录呢？

解决:

``` shell
$ git rm --cached logs/xx.log，
```

然后更新 .gitignore 忽略掉目标文件，

最后提交这次修改：

``` shell
$ git commit -m "We really don't want Git to track this anymore!"
```

参考：https://segmentfault.com/q/1010000000430426

### error: You have not concluded your merge (MERGE_HEAD exists)

``` shell
error: You have not concluded your merge (MERGE_HEAD exists).  
hint: Please, commit your changes before merging.  
fatal: Exiting because of unfinished merge.
```

这个错误可能是因为在你pull下来的代码没有自动合并导致的。

解决方法如下，首先强制取消合并,然后手动进行冲突合并操作，最后提交此次修改。

``` shell
$ git merge --abort
$ git pull
# do some merge
$ git commit -m "merge"
```

### Your configuration specifies to merge with the ref 'refs/heads/dev-price'

使用 git pull 时发生这个问题，如何解决？

``` shell
$ git pull
Your configuration specifies to merge with the ref 'refs/heads/dev-price'
from the remote, but no such ref was fetched.
```

这是因为远程该分支不存在而导致的错误，可能是别人已经删除了该远程分支，执行下面的命令刷新一下缓存就清楚了：

``` shell
$ git fetch -p origin
```