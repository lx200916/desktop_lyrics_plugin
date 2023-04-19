<div align="center">
  <img src="https://user-images.githubusercontent.com/44310445/229792392-16d3c7af-3e4d-4c5f-9538-979cb00ff68d.svg" />

  
# Cider 桌面歌词插件
仅适用于平台的Windows的Cider桌面歌词插件.

**仅支持Cider1开源版本,商店版与Cider2版本均不支持.**
</div>

## 配置

### 跟随歌词栏开启关闭桌面歌词
Menu->Plugin-> Find Menu about "Desktop Lyrics" or "Follow Lyrics Panel".
> **Note**
>
> 当Cider的歌词栏开启时显示桌面歌词,否则隐藏.

### 调整歌词位置
Menu->Plugin-> "Lock / Unlock Lyrics Window".选择Unlock的选项后即可拖动窗口,Lock可重新锁定位置(此时窗口不再响应鼠标事件).
> **Note**
>
> 重启Cider后歌词位置复原.
### 自定义桌面歌词的字体与颜色
参见  https://github.com/lx200916/desktop_plugin_server 项目的README文件查看相关TOML配置信息.

## FAQ
### 能否支持 Apple Music(Preview)/Spotify等?
抱歉,不能. 这个插件的目标仅仅是利用Cider提供的API获取歌词并在桌面浮动窗口上渲染展示,没有考虑过支持其他音乐播放器.如果有在其他播放器上使用桌面歌词的需求,可以考虑 `Lyricify`或者`热词`等更专业&可定制化的应用.
P.S. 现阶段AM没有遵循Windows的媒体控制策略,导致面前第三方插件没办法获取播放进度等信息,只能等Apple更新.

### Cider2 支持?
**没有.**

技术上的原因来讲,Cider2对后端技术栈进行了很大的变更,从Electron到某些我不太清楚的技术选型,这导致了本插件有些代码可能需要完全重写,我不太想Follow他们的Breaking Changes.此外,上面已经提到了,这个插件需要依赖一个后台服务来开启浮动窗口并渲染歌词,动态启动后台服务在Windows商店版本似乎无法实现(猜测可能是由于微软的安全策略),而Cider2不会在除商店以外的渠道发行.

从其他方面来讲,我个人的原因在于常用的开发环境不再是Windows了,只在一台备用机上安装了Windows10 LSTC,因此很多Windows比较新的Feature或者API没有办法测试(比如系统强调色之类),而Cider2可能会更多用到原生的API和特性,这对我来讲会很麻烦.另一方面,Cider2开始已经不再是个开源软件了😱.Cider1通过开放源代码在开源社区获得了很高的声望和名誉,这也是我愿意为Cider贡献插件的原因之一(实际上本插件的一部分代码也来自于开源社区).但是随着Cider2转向闭源订阅制,这个原因就不存在了.况且给一个文档不全的闭源软件开发插件向来是一个吃力且有风险的工作,所以本插件的支持仅会止步于Cider1.

### 插件更新?
目前而言,多亏了诸多开源社区贡献者的测试与反馈,本插件与Cider1依旧配合地十分完美.我也会跟随Cider1的API变更进行更新(如果有的话).