<div align="center">
  
# Desktop Lyrics Plugin
  
</div>


A very alpha plugin to display Desktop Lyrics, Windows Only. 
**Store Version of Cider is unsupported due to restrictions from MS.**


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
### What's THE HELL in the Binary?

The binary executable `untitled13.exe` (Just ignore the casual name) was built to call Windows Direct2D/GDI API and then render lyrics as a transparent window on desktop. You can get the source from https://github.com/lx200916/desktop_plugin_server and build it yourself. 

Calling Windows API from Rust is so painful due to the poor docs 🤯 ...but thanks to https://github.com/lujjjh/iLyrics for a brief example.

