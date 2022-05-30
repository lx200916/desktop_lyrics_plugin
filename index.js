const { ipcMain, BrowserWindow } = require("electron")
const path = require("path")
const { spawn } = require('child_process');
const net = require('net');
const PIPE_NAME = '\\\\.\\Pipe\\lyrics_pipe';

module.exports =class DesktopLyricsPluginService{
    win;
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }
    onReady(win) {
        // console.log("=== Backend Plugin Loaded ===")
        this.child = spawn(`${path.join(this.env.dir,"untitled13.exe")}`);
        // // Setting up an ipcMain channel for front end to communicate with
        // ipcMain.handle("plugin.frontendComm", (event, message) => {
        //     // Print out what the front end says
        //     console.debug(`Frontend says: ${message}`)
        //     // Get the main window and send a messsage to it
        //     this.env.utils.getWindow().webContents.send("plugin.backendComm", "Hello from the backend!")
        // })
    }
    onRendererReady(win) {
        console.debug("Renderer Ready Called")
        // Load the frontend plugin
        this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"));
        if(!this.child || this.child.killed) {
            this.child = spawn(`${path.join(this.env.dir,"untitled13.exe")}`);
        }
        this.pipeClient= net.createConnection( PIPE_NAME, () => {
            console.log('connected to server!');
          });
          
          pipeClient.on('end', () => {
            console.log('disconnected from server');
          });
          ipcMain.on("MDesktopLyricsUpdate", (event, args) => {
            console.log("MDesktopLyricsUpdate", args);
            this.pipeClient.write(args);
        
          })

        

    }
    onBeforeQuit(){
        this.child.kill();
    }

}