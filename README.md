<div align="center">
  <img src="https://user-images.githubusercontent.com/44310445/229792392-16d3c7af-3e4d-4c5f-9538-979cb00ff68d.svg" />

  
# Desktop Lyrics Plugin
  
</div>


A very alpha plugin to display Desktop Lyrics, Windows Only. 

**Store Version of Cider is unsupported due to restrictions from MS.**  
**Cider2 is not supported either at this time.**


### MenuEntry

Menu->Plugin-> Find Menu about "Desktop Lyrics" or "Follow Lyrics Panel".

> **Note**
>
> Follow Lyrics Penel means Desktop Lyrics only shows when you keep Lyrics Penel Open.

### Reposition Lyrics Window
Menu->Plugin-> "Lock / Unlock Lyrics Window",then drag the window to anywhere you like.Then click the menuentry again to lock the position.

> **Note**
>
> The Position Will RESET after re-launch.
### Customize Color & Font Size 
We introduce a toml-based config file to add some customized options. See the `README.md` of https://github.com/lx200916/desktop_plugin_server.
### What's THE HELL in the Binary?

The binary executable `untitled13.exe` (Just ignore the casual name) was built to call Windows Direct2D/GDI API and then render lyrics as a transparent window on desktop. You can get the source from https://github.com/lx200916/desktop_plugin_server and build it yourself. 

Calling Windows API from Rust is so painful due to the poor docs 🤯 ...but thanks to https://github.com/lujjjh/iLyrics for a brief example.

### FaQ
#### About Cider2?
**TL;DR:** No Plan For Now(And Maybe Neither in Future).

Technically, Cider2 changes its architecture completely from `Electron(JS+IPC)` to something totally irrelevant(maybe Go or Rust ¯\\_(ツ)_/¯).Thus I may have to refactor most of the codes to catch up with those BREAKING CHNAGES they made. 
Most importantly: `Desktop Lyrics Plugin` relies on a standalone process(which writen in Rust then compiled to `untitled13.exe`) to make Win32 SysCall and display the floating Window. **The process(as well as the plugin) can not be loaded when Cider was installed from Windows Store.(Due to Some restrictions from MS I Guess). Unfortunately,Cider2 seems to be only distributes in Windows Store.**

Personally, I have changed my laptop to a MacBook, which has made the code development and testing work for this plugin somewhat complicated and awkward. So...We'll see.

#### Can you support Apple Music(Preview)/Spotify...?
**Hmmm, Sorry no.** In fact, the sole purpose of me developing this plugin was just so that I could glance at the lyrics while coding.Thus this Plugin(as well as the server) is barely a side-project of mine made up with chaos and dirty codes (and only for Cider's API).
For other platforms, you should look for more `professional and comprehensive` options(Like Lyricify to Spotify/YesPlay or HotLyric).

#### Plugin Updates?
**Yes!** Thanks to the many dedicated open-source contributors in the Issue section who have proposed many awesome features for this project and assisted in testing, the plugin works perfectly for Cider1, and I will keep tracking new API changes of Cider1 and follow up.