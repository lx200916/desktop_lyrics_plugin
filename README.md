<div align="center">
  
# Desktop Lyrics Plugin
  
</div>
A very alpha plugin to display Desktop Lyrics, Windows Only.

### What's THE HELL in the Binary?

The binary executable `untitled13.exe` (Just ignore the casual name) was built to call Windows Direct2D/GDI API and then render lyrics as a transparent window on desktop. You can get the source from https://github.com/lx200916/desktop_plugin_server and build it yourself. 

Calling Windows API from Rust is so painful due to the bad docs 🤯 ...but thanks to https://github.com/lujjjh/iLyrics for a brief example.
