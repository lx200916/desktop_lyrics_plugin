class DesktopLyricsPlugin {
  constructor() {
    console.log("Frontend Registered");
    this.menuEntry = new CiderFrontAPI.Objects.MenuEntry();
    this.menuEntryId = uuidv4();
    this.menuEntry.id = this.menuEntryId;
    this.menuEntry.name = "Close Desktop Lyrics";
    // menuEntry.icon =
    this.getSettings();
    this.flag = true;
    this.follow = false;
    this.menuEntry.onClick = async () => {
      await this.setSwitch(!this.flag);
    };

    const FollowMenuEntry = new CiderFrontAPI.Objects.MenuEntry();
    FollowMenuEntry.id = uuidv4();
    FollowMenuEntry.name = "Enable Follow Lyrics Panel";
    FollowMenuEntry.onClick = async () => {
      await this.setFollow(!this.follow);
    };

    this.followMenuEntry = FollowMenuEntry;
    CiderFrontAPI.AddMenuEntry(FollowMenuEntry);
    const LockMenuEntry = new CiderFrontAPI.Objects.MenuEntry();
    LockMenuEntry.id = uuidv4();
    LockMenuEntry.name = "Lock / Unlock Lyrics Window";
    LockMenuEntry.onClick = () => {
      ipcRenderer.send("MDesktopLyricsLineUpdate", "$$##NMSL");
    };
    CiderFrontAPI.AddMenuEntry(LockMenuEntry);

    app.$watch(
      "lyrics",
      function (newVal, oldVal) {
        //    console.log(newVal);
        DesktopLyricsPluginInstance.updateLyrics(newVal);
      },
      {
        deep: true,
      }
    );
    app.$watch(
      "currentLyricsLine",
      function (newVal, oldVal) {
        if (!DesktopLyricsPluginInstance.follow) return;
        // console.log(newVal);
        DesktopLyricsPluginInstance.updateLyricsLine(newVal);
      },
      {
        deep: true,
      }
    );
    app.$watch("lyriccurrenttime", function (newVal, oldVal) {
      if (app.lyricon && app.drawer.open) {
        return;
      }
      const delayfix = 0.1;
      const prevLine = app.currentLyricsLine;
      for (var i = 0; i < app.lyrics.length; i++) {
        if (
          newVal + delayfix >= app.lyrics[i].startTime &&
          newVal + delayfix <= app.lyrics[i].endTime
        ) {
          if (app.currentLyricsLine != i) {
            app.currentLyricsLine = i;
          }
        }
      }
    });
    app.$watch(
      "drawer.panel",
      function (newVal, oldVal) {
    console.log("Drawer :",newVal);
    if (DesktopLyricsPluginInstance.follow){
      if(oldVal=="lyrics"&&newVal!="lyrics") {
        ipcRenderer.send("MDesktopLyricsLineUpdate", "");
      }
    if(newVal=="lyrics") {
      DesktopLyricsPluginInstance.updateLyricsLine(app.currentLyricsLine);
    }
    }
      },
      {
        deep: true,
      }
    );
    MusicKit.getInstance().addEventListener(MusicKit.Events.playbackStateDidChange, (a) => {
      // console.log("playbackStateDidChange", a);
      if (DesktopLyricsPluginInstance.follow) {
        return;
      }
      if (a.state == 3) {
        ipcRenderer.send("MDesktopLyricsLineUpdate", "");
      }
      if (a.state == 2&&a.oldState==3) {
        
          DesktopLyricsPluginInstance.updateLyricsLine(DesktopLyricsPluginInstance.currentLyricsLine);
        
      }
    });


    MusicKit.getInstance().addEventListener(
      MusicKit.Events.playbackTimeDidChange,
      (a) => {
        if (DesktopLyricsPluginInstance.follow) {
          return;
        }
        let lyriccurrenttime = parseInt(
          app.mk.currentPlaybackTime - app.lyricOffset
        );
        const delayfix = 0.1;
        if (DesktopLyricsPluginInstance.lyricCurrentTime != lyriccurrenttime) {
          DesktopLyricsPluginInstance.lyricCurrentTime = lyriccurrenttime;
          // console.log("playbackTimeDidChange", a);

          if (lyriccurrenttime > 0) {
            for (let i = 0; i < app.lyrics.length; i++) {
              if (
                lyriccurrenttime + delayfix >= app.lyrics[i].startTime &&
                lyriccurrenttime + delayfix <= app.lyrics[i].endTime
              ) {
                if (DesktopLyricsPluginInstance.currentLyricsLine != i) {
                  DesktopLyricsPluginInstance.currentLyricsLine = i;
                  DesktopLyricsPluginInstance.updateLyricsLine(i);
                }
              }
            }
          }
        }
      }
    );
  }
  async  setFollow(val) {
    this.follow = val;
    await CiderCache.putCache("desktop-lyrics-follow", {val});
    this.followMenuEntry.name = this.follow?"Disable Follow Lyrics Panel":"Enable Follow Lyrics Panel";
    if(val==true&&app.drawer.open==false) {
      ipcRenderer.send("MDesktopLyricsLineUpdate", "");
    }


  }
  async setSwitch(val) {
    this.flag = val;
    if (this.flag) {
      this.menuEntry.name = "Close Desktop Lyrics";
    } else {
      this.menuEntry.name = "Open Desktop Lyrics";
      ipcRenderer.send("MDesktopLyricsLineUpdate", "");
    }
    await CiderCache.putCache("desktop-lyrics-switch", {val:this.flag});
  }
  async getSettings() {
    let switchval = await CiderCache.getCache("desktop-lyrics-switch");
    if (switchval) {
      await this.setSwitch(switchval.val==true);
    } else {
      await CiderCache.putCache("desktop-lyrics-switch", {val:true});
    }
    CiderFrontAPI.AddMenuEntry(this.menuEntry);
    let follow = await CiderCache.getCache("desktop-lyrics-follow");
    if (follow) {
      await this.setFollow(follow.val==true);
    }else{
      await CiderCache.putCache("desktop-lyrics-follow", {val:false});
    }
  }
  updateLyrics(val) {
    ipcRenderer.send("MDesktopLyricsUpdate", val);

    this.lyrics = val;
  }
  updateLyricsLine(val) {
    if (this.lyrics && this.flag) {
      this.LyricsLine = this.lyrics[val].line;
      // console.log("updateLyricsLine", val)
      // console.log( this.lyrics[val].line)
      ipcRenderer.send("MDesktopLyricsLineUpdate", this.lyrics[val].line);
    }
  }
}
const DesktopLyricsPluginInstance = new DesktopLyricsPlugin();
