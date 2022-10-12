---
title: golang 学习（1）
date: 2022-07-03
order: -1
---

终于，不能再拖延了，请立刻开始学习、写代码并记录总结！

---

### 安装开发环境

我是 mac 环境，命令行里执行安装 golang：

``` bash
$ brew install go
```

安装好之后，查看golang版本：

``` bash
$ go version
go version go1.18.2 darwin/amd64
```

查看环境变量：

``` bash
$ go env
GO111MODULE=""
GOARCH="amd64"
GOBIN="/Users/feiffy/Code/go/bin"
GOCACHE="/Users/feiffy/Library/Caches/go-build"
GOENV="/Users/feiffy/Library/Application Support/go/env"
GOEXE=""
GOEXPERIMENT=""
GOFLAGS=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GOINSECURE=""
GOMODCACHE="/Users/feiffy/Code/go/pkg/mod"
GONOPROXY=""
GONOSUMDB=""
GOOS="darwin"
GOPATH="/Users/feiffy/go"
GOPRIVATE=""
GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"
GOROOT="/usr/local/Cellar/go/1.18.2/libexec"
GOSUMDB="sum.golang.org"
GOTMPDIR=""
GOTOOLDIR="/usr/local/Cellar/go/1.18.2/libexec/pkg/tool/darwin_amd64"
GOVCS=""
GOVERSION="go1.18.2"
GCCGO="gccgo"
GOAMD64="v1"
AR="ar"
CC="clang"
CXX="clang++"
CGO_ENABLED="1"
GOMOD="/dev/null"
GOWORK=""
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -arch x86_64 -m64 -pthread -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=/var/folders/jj/y391w94114bfxtn4t98q0lpw0000gn/T/go-build94119515=/tmp/go-build -gno-record-gcc-switches -fno-common"
```

注意到这里的 `$GOPATH` 默认是在 home 目录下的，我想把它改到我的 `Code` 目录下面，为此，在 `~/.zshrc` 中添加以下配置：

``` bash
export GOPATH=~/Code/go
export GOBIN=$GOPATH/bin
PATH=$PATH:$GOPATH:$GOBIN
export PATH
```

在 $GOPATH 中创建 bin src pkg 三个文件夹：

``` bash
$ mkdir -p $GOPATH/{bin,src,pkg}
```

使用 vscode 作为开发工具，打开 `$GOPATH` 目录

``` bash
$ cd $GOPATH
$ code .
```

新建 `hello.go` 文件，提示要装一些插件，先不点安装，直接 `shift + command + P` 打开命令输入框搜索 `Go: Install/Update Tools`，全选，点击安装。

如果安装失败了，则需要配置一下镜像源：

``` bash
# 1. 七牛 CDN 
$ go env -w GOPROXY=https://goproxy.cn,direct 

# 2. 阿里云 

$ go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```

`hello.go` 文件内容：

``` go
package main

import "fmt"

func main() {
   fmt.Println("Hello, World!")
}
```

最后使用内置终端运行 hello 项目：

``` bash
$ go run main.go
Hello, World!
```

### 创建第一个项目 goblog

创建第一个项目 goblog，并用 vscode 打开：

``` bash
$ cd $GOPATH/src
$ mkdir goblog
$ code goblog
```

创建 `main.go`，内容如下：

``` go
package main

import (
    "fmt"
    "net/http"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "<h1>Hello, 这里是 goblog</h1>")
}
func main() {
    http.HandleFunc("/", handlerFunc)
    http.ListenAndServe(":3000", nil)
}
```

然后在命令行运行

``` bash
$ go run main.go

```

然后在浏览器打开 `http://localhost:3000`，看到输出的内容。

以上就是一个简单的 go web 程序。下面来解释一下上面的代码：

`package main` 表示一个程序的入口点。

导入了两个包，`fmt` 包用来输出，下面 `Fprint` 函数将内容输出到变量 w 中，我们通常用这个函数来往文件中写入内容。

``` go
fmt.Fprint(w, "<h1>Hello, 这里是 goblog</h1>")
```

第二个包是 `net/http`，提供了HTTP协议相关的实现。

- `http.ListenAndServe` 用来监听本地3000端口以提供服务，
- `http.HandleFunc` 用来指定处理HTTP请求的处理代码。
- `http.Request` 是用户的请求，一般用`r`简写
- `http.ResponseWriter` 是用户的响应，一般用`w`简写

### 路径解析

将上面的代码改为根据不同路由不同的页面处理：
``` go
package main

import (
    "fmt"
    "net/http"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/" {
        fmt.Fprint(w, "<h1>Hello, 这里是 goblog</h1>")
    } else if r.URL.Path == "/about" {
        fmt.Fprint(w, "此博客是用以记录编程笔记，如您有反馈或建议，请联系 "+
            "<a href=\"mailto:summer@example.com\">summer@example.com</a>")
    } else {
        fmt.Fprint(w, "<h1>请求页面未找到 :(</h1>"+
            "<p>如有疑惑，请联系我们。</p>")
    }
}

func main() {
    http.HandleFunc("/", handlerFunc)
    http.ListenAndServe(":3000", nil)
}
```

这里的`/`并不是根目录，而是表示任意目录。

### 自动载入工具

go代码每次需要编译运行才能看到效果，可以安装`air`工具，监控项目文件变化，一旦有变更则自动触发编译运行，这样就不用每次我们手动编译运行了。

`air`是用go写的一个命令行工具，用下面的命令安装air：

``` bash
$ GO111MODULE=on  go install github.com/cosmtrek/air@latest
```

最前面的 `GO111MODULE=on` 是只为当前命令启用 Go Module。

安装好之后，在项目根目录下执行 `air` 即可。下面是执行效果，每当改动文件时，都会自动载入，有错误也报出来了。

``` bash
failed to build, error: exit status 2
main.go has changed
building...
# github.com/feiffy/goblog
./main.go:16:22: syntax error: unexpected ), expecting name or (
failed to build, error: exit status 2
main.go has changed
building...
# github.com/feiffy/goblog
./main.go:16:22: undefined: http.StatusNot
failed to build, error: exit status 2
main.go has changed
building...
running...
```

### 修改响应 header

我们发现上面代码中 `/about` 中的页面显示不正常，这是因为它的 `Content-Type: text/plain; charset=utf-8` 显然是错误的。那么我们来修改一下。

``` go
package main

import (
    "fmt"
    "net/http"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    if r.URL.Path == "/" {
        fmt.Fprint(w, "<h1>Hello, 欢迎来到 goblog！</h1>")
    } else if r.URL.Path == "/about" {
        fmt.Fprint(w, "此博客是用以记录编程笔记，如您有反馈或建议，请联系 "+
            "<a href=\"mailto:summer@example.com\">summer@example.com</a>")
    } else {
        fmt.Fprint(w, "<h1>请求页面未找到 :(</h1>"+
            "<p>如有疑惑，请联系我们。</p>")
    }
}

func main() {
    http.HandleFunc("/", handlerFunc)
    http.ListenAndServe(":3000", nil)
}
```

这行代码设置了header头

``` go
w.Header().Set("Content-Type", "text/html; charset=utf-8")
```

那么我们如何知道 w 有 Header() 方法的呢？答案是看文档。

### 使用 godoc 文档

go自带了文档工具，1.18之后需要手动安装：

``` bash
$ GO111MODULE=on  go install golang.org/x/tools/cmd/godoc@latest
```

安装到了 `$GOPATH/bin/godoc` 下面，由于之前我们已经设置了路径环境变量，所以可以在命令行直接执行 `godoc`启动文档服务：

``` bash
$ godoc -http=:6060
```

然后在浏览器打开 `http://localhost:6060` 查看文档。

找到 `net/http` 打开页面，搜索 `ResponseWriter`，定位到这个类型，滚动下来，点击 `Example` 取消折叠，即可看到示例代码，这里面看到一行输出状态码的。

``` go
w.WriteHeader(http.StatusOK)
```

那么，这时如果想要输出404状态码，该如何呢。

只要在页面搜索 `StatusOk` 就能找到所有的状态码的定义。所以根据这一个示例，我们可以文档中获得很多帮助。

加上了404之后的代码示例如下：

``` go
package main

import (
    "fmt"
    "net/http"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    if r.URL.Path == "/" {
        fmt.Fprint(w, "<h1>Hello, 欢迎来到 goblog！</h1>")
    } else if r.URL.Path == "/about" {
        fmt.Fprint(w, "此博客是用以记录编程笔记，如您有反馈或建议，请联系 "+
            "<a href=\"mailto:summer@example.com\">summer@example.com</a>")
    } else {
        w.WriteHeader(http.StatusNotFound)
        fmt.Fprint(w, "<h1>请求页面未找到 :(</h1>"+
            "<p>如有疑惑，请联系我们。</p>")
    }
}

func main() {
    http.HandleFunc("/", handlerFunc)
    http.ListenAndServe(":3000", nil)
}
```

然后浏览器随便访问一个不存在的页面，请求中显示404错误了。