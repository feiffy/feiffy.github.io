---
title: Apple Pay 服务接入调研
date: 2020-04-23
order: -1
---

目前国内 接入 Apple Pay 有两种模式：API模式和银联SDK模式。

## Apple Pay API 模式

下图为目前国内 Apple Pay 支付接入的一个通用的流程（银联API模式），仅供参考：


![](/blog/imgs/ca637d39bd4a247bafc75d909d75f8d7.png)

整个流程中如下：

1、客户端通过苹果API，在 APP 应用内展示 Apple Pay 支付控件。 

2、用户在 Apple Pay 的支付控件上进行生物验证（指纹或者人脸识别）或者手机密码验证。

3、苹果在用户验证通过之后，会生成一个用户选中的银行卡相关的 PaymentToken 加密数据，Apple Pay 必须在有网情况下才能进行，苹果需要从开发者网站上使用证书的公钥进行加密，完成后通过 API 回调返回给客户端前端。 

4、客户端获取到 PaymentToken 后，给服务端发送扣款请求，等待支付结果。 

5、服务端收到客户端上送的 PaymentToken，解密 PaymentToken 取出一些关键字段信息，附带其他订单信息，再与支付供应商（如国内银联）进行通信发起扣款。

6、服务端收到扣款结果后，再返支付结果给手机客户端，最终通知用户支付结果。

**优点**

这种方式，对于接入商户来说，证书和密钥都由接入商户自己管理，不再依赖支付供应商，客户端和服务端开发更加灵活。

**缺点**

这种方式，iOS 开发者需要自己控制和处理 Apple Pay 的 UI 展示和交互，并应对以下的一些异常： 

1、部分场景中，用户验证通过后，正在发送扣款请求时，用户又点击了取消按钮，取消 Apple Pay 操作，在这种场景下，支付需要采用一定的方案和策略避免多扣用户的钱。 

2、同其他支付方式一样，要考虑如何处理异常情况下的订单重复提交问题。

3、移动端需要对支持性进行验证，协商银联接口数据对Payment Sheet的展示关闭进行控制，对各种异常进行捕抓和处理。商家后台需要对 PaymentToken 做解密处理，同时需要自己实现对银联接口的交互，加密和解密接口数据。

**客户端可能的问题**

1、显示 ApplePay 弹窗到支付验证成功过程中何时调用后端发起扣款？

2、如何集成 ApplePay 到现有的支付选择界面中？

3、苹果设备生物验证成功后，发起扣款到显示结果，同步返回仅表示银联已受理此交易，并不代表交易成功，所以前端如何显示支付结果，是否需要发起主动查询。

**服务端可能的问题**

1、直接使用银联API，因为没有对应的SDK，需要自己封装扣款、查询、回调、退款等接口；这些接口需要对银行卡等业务有较深的理解，对于不同的接口返回情况需要作正确的处理。

2、需要多处解密加密，解密苹果返回的 PaymentToken，加解密与银联交互的所有接口数据，至少需要引入两种加解密的方式。

## 银联SDK模式

银联 SDK 模式是中国银联以对外提供 SDK 的方式给到 APP 使用 Apple Pay 支付。

银联支付控件 Apple Pay 支付的实现方式：

![](/blog/imgs/83ab84f161d8604be1a7310b5cd98a78.jpg)

1-2、商户生成订单，通过商户SERVER端将订单信息发送给银联支付网关；

3-4、银联支付网关记录订单信息，返回用来标识订单的TN号（参见产品接口规范），经由商户SERVER返回至商户APP；

5、商户APP调用银联SDK，将TN号传递给银联SDK；

6、银联SDK向Apple公司的PASSKIT FRAMEWORK发起支付请求；

7、接口返回加密的支付Token信息；

8-9、银联SDK将支付Token传递给银联支付网关，完成交易认证；

10-12、银联将支付结果返回给商户APP，商户SERVER，商户APP负责提示用户交易结果。

13、最终交易结果以银联回调/主动查询为准，SDK返回只作为页面结果显示。

**优点**

使用 SDK 的好处就是客户端接入简单，只管调用 SDK 的接口，处理支付结果回调即可，客户端不需要处理各种异常。

**缺点**

使用 SDK 模式的缺陷是：

1、增加了 APP 的体积。

2、SDK 模式下，证书和密钥都是由银联生成，APP 开发用银联提供的 CSR 文件生成 Apple Pay 证书并绑定，证书和密钥更新麻烦。 

3、Apple Pay 的页面展示完全由银联 SDK 控制，当需要增加展示项时，需要向外部寻求银联 SDK 的支持。

**客户端可能的问题**

1、银联SDK的 ApplePay 界面如何集成到原有的支付流程中。

**服务端可能的问题**

1、发起扣款成功后，会发起回调，一分钟内未收到交易结果（回调），可通过发起交易查询状态API获取结果

苹果官方强烈建议使用供应商SDK的方式进行支付：https://developer.apple.com/cn/apple-pay/planning/

<blockquote>
我们强烈建议您使用由支持 Apple Pay 的支付服务商提供的 SDK 或 JS API。您也可以提供自己的服务器端解决方案，以便从您的 app 或网站接收付款，解密付款令牌，以及对接支付服务商来处理授权。信用卡和借记卡付款的处理可能非常复杂；如果您尚不具备相应的专业知识和系统，但希望您的 app 或网站支持 Apple Pay，最为便捷可靠的方式就是使用支付服务商提供的 Apple Pay SDK 或 JS API。请联系您的平台或支付服务商以了解更多信息。查看电子商务平台和支付服务商。
</blockquote>