const { ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const net = require("net");
const PIPE_NAME = "\\\\.\\Pipe\\lyrics_pipe";

module.exports = class DesktopLyricsPluginService {
  win;
  constructor(env) {
    // Define plugin enviornment within the class
    this.env = env;
  }
  onReady(win) {
    console.log("=== Backend Plugin Loaded ===");
    this.child = spawn(
      `${path.join(this.env.dir, "untitled13.exe")} > ${path.join(
        this.env.dir,
        "plugin.log"
      )} 2>&1`,
      [],
      { shell: true }
    );
  }
  onRendererReady(win) {
    console.debug("Renderer Ready Called");

    // Load the frontend plugin
    this.env.utils.loadJSFrontend(path.join(this.env.dir, "index.frontend.js"));
    if (!this.child || this.child.killed) {
      this.child = spawn(
        `${path.join(this.env.dir, "untitled13.exe")} > ${path.join(
          this.env.dir,
          "plugin.log"
        )} 2>&1`,
        [],
        { shell: true }
      );
    }
    console.log("PID:", this.child.pid);
    this.pipeClient = net.createConnection(PIPE_NAME, () => {
      console.log("connected to server!!");
    });

    this.pipeClient.on("data", (data) => {
      console.log("disconnected from server");
      settings=JSON.parse(data.toString());
    });
    this.pipeClient.on("error", (err) => {})
    ipcMain.on("MDesktopLyricsUpdate", (event, args) => {
      // console.log("MDesktopLyricsUpdate", args);
      // this.pipeClient.write(args);
    });
    ipcMain.on("MDesktopLyricsLineUpdate", (event, args) => {
      //   console.log("MDesktopLyricsLineUpdate", args);
      this.pipeClient.write(args);
    });
  }
  onBeforeQuit() {
    // this.child.kill();
    console.log("kill", this.child.pid);
    spawn("taskkill", ["/pid", this.child.pid, "/F", "/T"], { shell: true });
  }
};
