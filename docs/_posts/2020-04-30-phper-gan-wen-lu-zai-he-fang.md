---
title: 【转载】phper：敢问路在何方
date: 2020-04-30
order: -1
---

*原文链接：https://www.cnblogs.com/linvanda/p/12807047.html*

很多php程序员存在未来发展方面的困扰，介于各方面的因素，phper 比其他程序员更容易遇到上升天花板。

一方面，一般只有初创企业为了快速实现产品上市以及极容易招到 phper 才使用 php 来实现公司的全部业务，大厂的核心业务都不是 php 做的（阿里用 java，腾讯用 c++），php在大厂只能做边缘功能如管理后台。

另一方面，相比于 javascript 在前端领域的一枝独秀，各种玩出花，php 在后端虽然市场份额可观，但有 java、go、python 甚至是 node 的强力挑战。

最大的问题其实在于，由于把 php 作为核心编程语言的基本都是中小公司，而这些公司的业务体量根本和大厂不是一个量级，并不需要面对高并发、高可用什么的高级架构设计，结果就是大部分 phper 终其一生都是在做着毫无挑战的代码堆砌工作，技术上并无多大成长。

php 程序员很少涉及底层，甚至很少涉及宏观。phper 缺少平台。

（在面试过程中，我发现 phper 面临的一个尴尬局面：他们所在的公司，最终要么倒闭，要么转了 java，php 只是作为“快速原型”时期的工具而已）

现实中很多程序员意识到这点，想要转型，于是通过业余时间学习诸如 go、python 等第二语言。有转型成功的，但大部分都失败了。

也有人想转架构，于是去学 k8s、docker、分布式架构、“三高”架构等，但相对于前者，这种成功率更低——因为根本就没有实践的机会，终究是纸上谈兵，一知半解（很多人仅仅是会使用而已）。

于是，很多人 35 岁前在各种创业公司码代码（很多人是码一家倒一家），35 岁后成了水果贩子。

然而，在我看来，phper 并非完全没有出路，而且和其他主流语言一样，出路是一样的，虽然可能相对来说走得要更辛苦些。

每个 phper 要想摆脱平庸，首先要构建自己的技能树。

那么，phper 技能树中最重要的是哪些？分布式？容器编排？微服务？serverless？

都不是。在我的排位中，这些看着高大上的东西一个都排不上前十，在你还没有真的达到架构师的水平之前，我的建议是一个都不用研究。

## c 语言

网上广为流传的标语是类似“我用 3 行 python 就能实现的东西，为啥要用 300 行 c 去实现？”

这好比问阿里：市面上有那么多消息队列中间件可以直接用，你为啥要花费人力再去搞个 rocketMQ？

我们说不要重复造轮子，但实际情况是我们（特别是大厂）天天在造轮子（谷歌三天两头就搞个什么语言出来），目的是增加自己的技术储备。

c 语言是程序员界的通行证，是一个程序员（特别是 php 程序员）段位高低的重要标志，也是 phper 突破瓶颈的最直接有效的手段。

c 语言是 phper 最重要的第二语言。

为啥？正是因为 c 语言是底层语言，直接面对计算机（内存）。因为 php 太过方便，屏蔽了大量底层细节，这对公司、对工程是好事，对程序员的成长却不是。另一方面，php 底层是 c 实现的，学会 c 语言有机会去研究 php 语言本身的实现机制，进而编写 php 扩展，甚至成为 php 核心贡献者。

c 语言简单而优雅（是的，你没听错），是你真正能直接跟计算机对话的语言（当然你可能要抬杠说是汇编），是深入了解操作系统（主要指 Unix 家族）的钥匙。

c 语言让你具有微观视野，知其然而知其所以然。后面说到的数据结构与算法、socket 编程、计算机原理等知识对于熟悉 c 语言的人学起来事半功倍。

## 数据结构与算法

我想大部分程序员都有（或曾经有）一个学好算法的梦，但大部分中途（甚至是一开始）就放弃了，一方面感觉太难了，另一方面感觉跟实际工作不相关，用不到（这一点和放弃 c 的理由一样）。

还是那句话，不要认为实际业务开发中“用不到”的东西就没有学习的价值，实际情况正好相反，那些实际开发中所谓“用不到”的东西才是真正要掌握的东西，是平庸和高手之间的分水岭。

很多 phper 敲了多年代码，连个递归调用都不会写，一个组织架构功能就把他难倒了，各种奇淫技巧，各种让人看不懂。

不掌握数据结构与算法，你去阅读源码，顶多也就停留在 MVC 框架层面了，稍微底层的东西如数据库、消息队列、Web 服务器就根本无从下手。

算法决定一个人的深度。

我建议你去慕课网或者极客时间上买一门课系统地学一下常见的算法。并且手边还要有一本书（c 语言实现）。

要练习。很多人放弃的原因其实是只看不练习，前面看后面忘，于是就放弃了。没有人光通过看能掌握算法的（特别稍微复杂点的算法）。

要总结，写笔记。每种算法都是一种思想（比如快排的分治思想就是一种通用思想），只有参透了思想才算真正掌握，才能举一反三。比如我们掌握了分治思想，不仅仅能用于排序，还能用于大数据批处理中。

熟练掌握递归。很多算法都能用递归实现。递归的本质是整体和部分间存在一致性（重复性），作为程序员的你要善于发现这种一致性。当一个算法的操作具有重复性时，往往意味着可以用递归实现（比如二分查找、快速排序，它们的操作都具有很规律的一致性，因而都能用递归实现）。

将所有学到的数据结构和算法先用 c 实现一遍，再用 php 实现一遍（不要认为 php 跟算法无关，实际是算法跟语言无关）。

## 计算机与操作系统原理

去看看二进制的世界长什么样，CPU 的运作原理，程序的执行过程，操作系统原理等。把这些搞明白后，很多问题会恍然大悟，以前觉得特别复杂的东西比如线程并发、内核态用户态、缓冲区等现在会觉得特别简单。

从这些学习中你还会学到很多伟大的设计思想，比如 Unix 中将一切视为文件、虚拟化（硬件虚拟、虚拟内存等）、抽象（硬件抽象）、大道至简（CPU 如何通过简单的与或非异或电路实现复杂的存储与计算），对你宏观层面的架构、设计都会有很大帮助。

## socket 编程

phper 一辈子都在从事 Web 编程，却有一大部分 phper 不懂 socket，也搞不懂 php 里面的 pack、unpack 到底干嘛用的。

一般高级语言都在底层 socket 上再做了一层封装，并实现了常用协议如 http 功能，使得我们平时基本碰不到 socket。同样，这对工程是好事，对程序员的成长却不是。

比如我们都说 tcp 是流式协议，存在粘包问题，但面试中我问了很多尝试过 socket 编程的都没处理过粘包问题，把 tcp 分组当数据报用。

虽然 socket 对底层协议如 tcp、udp 进行了封装，但如果直接面向 socket 编程，仍然有很多细节需要处理，如粘包、缓冲区、异常等，而这些细节让我们能更真实地接触底层知识。

另外，这些底层细节倒逼你去学习 tcp/ip 协议细节，更有甚你会把 tcp/ip 协议簇中的每层都学习一遍，自此你也了解了一个请求包在每层到底是怎么封装的，一次网络请求在局域网、广域网到底是怎么传输的。

真正实践过，你才能真正搞明白 I/O 多路复用、reactor 事件模型这些看似高大上的东西——不但明白，还能在实际中使用。

熟悉了 socket 编程，你就可以设计自己的应用协议，这时候你就会用上 php 的 pack/unpack（假如你是用 php 写）。

同样，我建议买一本讲解网络编程的书，用 c 语言实现的。或者是一本讲解网络协议、tcp/ip 协议的书。同样是要买经典，不要买什么 30 天精通、7 天搞定的。

另外，我还是推荐你在慕课网、极客时间等 app 上买一节注重实践的课程，跟着老师、同行一起学。要买注重实践、有大量代码实现的，不要买那种阿猫阿狗比喻满天飞的。

和算法一样，我建议你先用 c 语言实现一个 http 服务器（当然如果只是为了学知识，没必要做成 nginx），然后再用 php 实现一次。

## 面向对象、设计原则和设计模式

在面试过程中我发现，大部分工作 5 年的 phper 对设计原则和设计模式都知之甚少，对面向对象也是只言片语，却自认为自己一直在用 OOP。

很多人都认为这些原则很虚，离自己很远，实际情况是，相比于 c 语言和算法，面向对象和设计模式离业务程序员更近，也更容易、更需要掌握。

人们常说，程序员都认为别人写的代码都是垃圾。但如果你去看看 laravel 等优秀开源项目的代码，你还觉得是垃圾吗？

我们如何在实际工作中写出开源项目水平的代码？

换句话说，我们如何写出可维护、可读、可扩展、可复用的代码？

你可能觉得上面一串概念很好听但很虚，那么你就想一件事：你在实际项目中看到某些人写的代码想骂人，就说明对方的代码没有满足上面的条件；如果再进一步细想，你也不知道如何写更优，那说明你也没搞明白面向对象设计原则，你写出来的代码注定也是那样，注定也会被后人骂。

另一个更可悲的事实是，市面上绝大多数 MVC 框架都是面向过程编程的，却很少有人意识到这点。绝大部分 MVC 框架的示例程序都是写个诸如博客文章的增删改查，控制器里面写业务逻辑，Model 层接收并存取数据。这里至少有两个问题：

所有的业务逻辑都写在控制器里面，根本没有对象建模；Model 实际上是个贫血类（只有属性没有行为，当然有人可能认为对数据库的增删改查是 Model 的行为，但那实际上只是 Model 委托数据库驱动去做的事情）；有些 MVC 框架主张在 Model 里面写业务逻辑，但这会导致 Model 违反单一职责原则：Model 同时负责了业务逻辑和数据库操作。

框架们可能认为对象建模不是他们管的事，通过一个足够简单的示例能够让使用者更快速的掌握框架，从而获得更多的粉丝用户。

但事实是，很少有实际项目是像示例程序那么简单的。框架真正的罪责在于：通过一个过于简化的示例程序引导了一批又一批追随者们用同样简单的方式去实现复杂的业务。

框架设计者们无疑在 OOP、设计模式上有着很深的造诣，但这种造诣仅仅体现在框架本身，却没有延展到框架的使用上（ Laravel 做得稍微好些）

不过话说回来，OOP 和设计模式是框架不能承载的设计之重，设计本身需要程序员自己去事先掌握，再好的框架也不能让一个不懂 OOP 设计原则和设计模式的人去使用 OOP 编程（Laravel 在这个方向上给予了指示，仅仅是指示，就让人们觉得 Laravel 相对于其他框架较难上手了）。

详细讨论 OOP 和设计模式超出了本文范围，我们着重讨论下怎样学习这些东西。

学习 OOP 和设计模式最重要的是学习 - 实践 - 复习 - 再实践，而且，相对于算法，OOP 和设计模式在实际中有更多的机会去实践，只要你愿意，几乎天天都可以实践。开发新项目时当然可以实践，维护就项目也可以实践，试着用 OOP 设计原则和设计模式去审查既有代码的问题并执行重构。很多人忽略了重构的价值（以及不知道怎么重构），于是抱怨说公司没有合适的新项目去实践这些原则、模式。下单逻辑中被各种支付方式搞得乱七八糟？不妨把支付抽象成接口吧，试试桥接模式？各种优惠绕得人云里雾里？试试策略模式吧；订单支付回调里面又是送积分又是发通知，各种后续业务塞不停？试试观察者模式吧。

你需要买本设计模式的书，相比国内各种禅啊道啊，我建议你直接买 GoF 的《设计模式》，直接面对经典。

读不懂经典？我再建议你去买一门课程，要买注重实战的课程。极客时间上的一些课程就相当不错。不要不舍得花钱。

不要认为只有单例、工厂、策略、代理常用就只学这几种，要把 23 种全部掌握。很多设计模式虽然不常用，但一旦遇到对应的场景用上它跟不用它完全是两个样子，比如组合模式（composite）。

学习设计模式时，不要将思维局限于 Web 开发，否则很多模式你会完全不能理解。比如命令模式、备忘录模式在 Web 开发中很少用到，但在桌面应用中却很常见，状态模式则在游戏开发中很常见。

相对于设计模式，设计原则更难把握，更依赖实践领悟。比如 SOLID 五原则，光一个单一职责原则，如果没有足够的项目开发经验与反思，都很难真正理解。

设计原则有很多，如 SOLID、GRASP、DRY、KISS，很多原则都是从不同的侧面说一个东西，如果你不想把所有的都搞通，建议你着重研究并实践 SOLID 五原则，我认为它是最经典、最重要的 OOP 原则。

最后，强烈建议你读读《领域驱动设计》这本经典（前提是你要有一定的项目经验以及 OOP 和设计模式基础）。

## 源码

上面的知识都掌握得差不多的时候，个人建议开始大量撸源码。

很多人在早期都撸过某些开源项目的源码，比如 Laravel，但大多半途而废，原因是看不懂，或者是每段代码都看懂了，但放一起就看不懂，只知树木不知森林。原因很简单：你撸得太早了，上面的知识一个都还没掌握就开始撸，人家优秀的开源项目各种设计模式各种抽象封装，撸得动才怪。你连依赖注入都不知道，如何搞得懂服务容器和服务提供者？

要撸经典项目，star 多的，如 Laravel、composer、phpunit 等。要记笔记，撸出感想。

还要撸 c 项目，如 php 源码、swoole 等——这也是你学习 c 语言的好机会。

如果这些都撸得不过瘾，可以放宽视角，撸其他语言的，可以去撸消息队列、数据库、服务器等经典项目，如mysql、kafka、nginx等，只要你有耐心有时间。如果真能撸到这种程度，你远远不只是个phper了。

## 博客

每个程序员都应该写博客。坚持不断地写博客，这点非常重要，我是很晚才意识到这点，以前一直相信一种观点认为牛人都很忙，哪有时间写博客，后面发现牛人都有自己的独立博客，粉丝量也羡人。

写博客有两个最重要的效果：促进自我总结与反思，建立个人品牌。

不过，写博客的时候不能功利性太强，为了建立品牌而写，天天盯着阅读量。因为这样一方面导致你不敢写，生怕质量不行，一心想憋大招，一文成名，结果是一个月才憋出一篇，结果却没人访问，于是不想写了。

写博客的直接目的一定是第一点，促进自我成长，第二点是顺带的、量变到质变的必然过程。

## 架构

至此，如果你也有一定的项目经验，你可以重点考虑架构了——因为此时你已经有微观（操作系统原理、数据结构与算法）、准宏观（OOP、设计原则、设计模式）的加持，面对那些高大上的架构设计时，不会知其然不知其所以然。

架构有两个特点：

架构是演化出来的，而不是一次性设计出来的。相应地，架构不是学出来的，而是实践出来的。架构里面的东西大部分是”标价 15 美元，实际只值 5 美分“，所以没必要被那些高大上的东西唬住。有个误区认为只有大规模公司才需要架构，小公司不需要。

在我认为，架构要解决两个层面的复杂性：系统（技术）复杂性和业务复杂性，一般小公司不存在系统复杂性，但极有可能存在业务复杂性（很多小公司为了快速占领市场，会开拓各种业务领域）。相应地，架构师可分为业务架构师和系统架构师。不过很多时候这两者有很大的交集（比如复杂的业务架构往往需要相应的系统架构如消息中间件的支持，频繁的对外合作业务则需要开放平台、应用网关的支持），因而无论你的架构侧重点是什么，你都要在技术和业务两个维度有较高的修为。

另一个误区是，phper 不可能成为架构师。

的确，从统计意义上说，java 程序员占绝对优势，但这不代表说只有 java 程序员才能成为架构师。架构师跟使用什么语言没有必然关系，只是实际中 java 程序员在生态上具有近水楼台的优势。架构师更重要的是架构思维，能够统筹资源解决系统和业务两个维度的复杂性。不过，就实际来说，因为很多公司在系统复杂性上来后，会转而使用 go、java 等静态语言代替 php、python 这种动态语言，因而，如果一个 phper 想成为架构师，最好会一门比 c 更高级的静态语言，个人推荐 go，因为相对于 java 来说，go 更年轻，竞争对手要少一些（十年的 java 程序员一大把，而两年的 go 程序员一大把），另外 go 很多地方和 c 类似，如果有很好的 c 基础，会比较容易深入。

架构师要务实，就如我们在 OOP 时强调不要过度设计一样，不要过度架构。当你公司的用户量才十几万的时候就搞上各种消息队列、集群、分布式、容器编排，往往会带来不必要的复杂性，而且由于团队成员专业能力以及服务治理能力跟不上，可能会导致使用上的混乱。

## 管理

我在架构后面写管理，意思很明确：技术管理者需要有一定的架构能力。

我们一般认为，架构和管理是程序员职业发展的两个方向，这话没错，但不代表两者没有重叠，相反，两者之间有很大重叠。

架构师可以不具备管理能力，但如果他具备的话会如虎添翼。架构师往往需要统筹各方资源，以及规划整合各业务团队的公共诉求，需要具备沟通、协调、服务能力。

反过来，优秀的技术管理者则一定要有架构能力。

一方面是服人。虽然说管理要讲究技巧，但如果作为团队 leader 的你技不如人太多，想必团队成员很难服你，很多时候你也无法就成员间的分歧给出合理的意见。

更重要的是团队的成长。一个不具备架构思维的 leader 很难给团队制定长期成长计划，也很难做出合理的长期技术选型与技术储备。

在中小公司，很多管理者是被从技术岗位逼上梁山的，刚开始的时候工作的区别仅是多了一项“分配任务”而已。

从技术到管理，个人认为需要进行如下思维转换：

问题到此为止。我们作为开发人员的时候，喜欢帅锅。“这是产品问题，得找产品”、“这是 z 团队负责的项目，要找他们”、“这是前人留下的 bug”。作为管理者，要明白这就是你的问题，如果源头在其他团队，那你就有责任去协调其他团队解决问题。

不要抱怨。"前面人脑子生锈了？写出这种代码"、“上面老是压工时、堆需求”。作为管理者，唯一要做的是解决问题。前人的代码有问题，组织人去重构；上面压需求，需要向上管理你的上级。

不要愤怒。你是不是因为某人写了一堆烂代码而朝他大吼？实际问题更可能是他们缺少培训，而这正是管理者的责任。

从执行者成为培育者、老师。不要什么都自己做，那是最差劲的管理者才做的事情。初为管理者往往会有一种担忧，认为如果我不敲代码，团队成员会不会认为我啥都不干全让他们干？另一种担忧是：其他人不如我，干不好。让他人做事，给他人成长的机会。管理者要做的是培训、帮助。

从用技术的视角看产品转成用产品的视角看技术。有意识的训练战略决策能力（短期主义目光转换成长期主义目光）。这也是为啥我强调技术管理者要有架构能力，要能从长期眼光规划团队技术发展道路。

## 未来之路

个人认为，phper 35 岁后大致有以下几种职业方向：

* 创业。有人去做社区电商，有人做外贸，也有人想到个点子和几个朋友开公司了。
做付费内容。很多博客写得好或者讲座做得好的，适合去做付费内容，现在有很多知识付费平台如慕课网、极客时间等，一些老牌博客网站如 CSDN 也在做这块，当然也可以自己建公众号做付费内容、出书等。这需要你长期积累个人品牌以及较深厚的功底、一定的项目经验。
* 技术管理。你可以朝着 CTO 的终极目标前进。这要求你具有较好的架构能力和一定的管理经验。
* 架构师。并非每个人都喜欢做管理，有人就喜欢一直钻研技术。无论是做管理还是做架构，对于 phper 来说，至少要会三门语言：c、php 以及一门更高级的主流静态语言。
* 得过且过。很多人到了 35 岁还没有较明确的职业规划，跳来跳去还是个普通程序员，就属于这种。把它作为一个选项是因为实际上该类型并不在少数。

## 总结

回应本文标题，一句话总结：phper 的未来出路就是不要把自己定位成一个 phper。