class DesktopLyricsPlugin{

    constructor(){
        console.log("Frontend Registered")
        app.$watch('lyrics', function (newVal, oldVal) {
        //    console.log(newVal);
           DesktopLyricsPluginInstance.updateLyrics(newVal);
        }, {
            deep: true
          })
          app.$watch('currentLyricsLine', function (newVal, oldVal) {
            // console.log(newVal);
            DesktopLyricsPluginInstance.updateLyricsLine(newVal);
         }, {
             deep: true
           })
    }
    updateLyrics(val) {
        ipcRenderer.send("MDesktopLyricsUpdate", val)
        this.lyrics = val
    }
    updateLyricsLine(val){
        if(this.lyrics){
            this.LyricsLine=this.lyrics[val].line;
            // console.log("updateLyricsLine", val)
            // console.log( this.lyrics[val].line)
            ipcRenderer.send("MDesktopLyricsLineUpdate", this.lyrics[val].line)
        }
    }

}
const DesktopLyricsPluginInstance = new DesktopLyricsPlugin();
