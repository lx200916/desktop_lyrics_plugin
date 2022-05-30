class DesktopLyricsPlugin{
    constructor(){
        app.$watch('lyrics', function (newVal, oldVal) {
           console.log(newVal);
           DesktopLyricsPluginInstance.updateLyrics(newVal);
        }, {
            deep: true
          })
    }
    updateLyrics(val) {
        ipcRenderer.send("MDesktopLyricsUpdate", val)
    }
}
const DesktopLyricsPluginInstance = new DesktopLyricsPlugin();
