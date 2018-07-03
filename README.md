Interactive Medical Images
================

何使用各种基础组件来构建一个完整的应用程序

当前显示一个研究列表，并在选定的系列缩略图和各种工具中显示它们。
基础模块的使用:

- [Cornerstone (core)](https://github.com/chafey/cornerstone)
- [Cornerstone Tools](https://github.com/chafey/cornerstoneTools)
- [Cornerstone Math](https://github.com/chafey/cornerstoneMath)
- [Cornerstone WADO image loader](https://github.com/chafey/cornerstoneWADOImageLoader)
- [Cornerstone Web image loader](https://github.com/chafey/cornerstoneWebImageLoader)


安装
================

- 克隆 这个应用程序 并切换到它的目录

- 安装依赖 [Bower](http://bower.io/):

> 运行

使用方法:
================
* 这个程序需要 http 开头的路径才能正常运行,所以需要搭建一个运行环境
  1. 安装 XAMPP 克隆这个项目放到 XAMPP 安装目录下的 htdcos 目录下 启动 Apache Web服务器

* 了解这个程序的运行原理 
  1. 在浏览器中输入 http://127.0.0.1/InteractiveMedicalImages/architecture.html 查看程序运行相关依赖 和 原理

* 下面开始运行这个程序
  1. 在浏览器中输入 http://127.0.0.1/InteractiveMedicalImages/  [此时会看到一个黑色的界面]
  2. 打控制台看是否有报错 ( 有的话 运行环境的问题 调整运行环境)

* 将这个程序融入到 自己的项目中
  1. index.html : 这是项目的整体UI界面 其他 UI 都是通过动态插入html模板进行加载的, 在文最底部 是 入口 js 看懂了这段 js 代码 项目基本已经 融入50%了
  2. disableAllTools.js 和 displayThumbnail.js 是显示隐藏工具的 其他的文件自己看文件名就能懂了
  3. 重点在 loadStudy.js 这个是负责加载数据的 搜索 dicomweb://10.0.0.5/testDICOM/ 将他修改成 你自己的文地址 比如: dicomweb://127.0.0.1/testDICOM/ 就ok了 注意这里有坑 dicomweb 不可以修改这个前缀可以自动识别 协议名 http ,https ...千万不能改
  4. 注意看 studies 文件夹 json 数据是与 loadstudy.js 中的 ImageId 像对应的 所以需要配置对应路径的文件夹以及文件 都准备好了 [点击下载](https://github.com/bianliuzhu/testDicom) 将这个文件加压后 修改文件名为 testDICOM 并把这个文件夹 copy 到 htdocs 目录下
  5. 现在项目可以跑起来了
  6. 遇到问题联系我 帮你一起爬坑 [Email:bianluzhu@gmail.com] 看到后第一时间回复!
