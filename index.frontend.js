class DesktopLyricsPlugin {
  constructor() {
    console.log("Frontend Registered");
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
    MusicKit.getInstance().addEventListener(
      MusicKit.Events.playbackTimeDidChange,
      (a) => {
        let lyriccurrenttime = parseInt(
          app.mk.currentPlaybackTime - app.lyricOffset
        );
        const delayfix = 0.1;
        if (DesktopLyricsPluginInstance.lyricCurrentTime != lyriccurrenttime) {
          DesktopLyricsPluginInstance.lyricCurrentTime = lyriccurrenttime;
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
  updateLyrics(val) {
    ipcRenderer.send("MDesktopLyricsUpdate", val);
    this.lyrics = val;
  }
  updateLyricsLine(val) {
    if (this.lyrics) {
      this.LyricsLine = this.lyrics[val].line;
      // console.log("updateLyricsLine", val)
      // console.log( this.lyrics[val].line)
      ipcRenderer.send("MDesktopLyricsLineUpdate", this.lyrics[val].line);
    }
  }
}
const DesktopLyricsPluginInstance = new DesktopLyricsPlugin();
