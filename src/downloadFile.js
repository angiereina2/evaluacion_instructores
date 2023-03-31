const {ipcRenderer} = require("electron");

ipcRenderer.send("download", {
    url: "URL is here",
    properties: {directory: "Directory is here"}
});

ipcRenderer.on("download complete", (event, file) => {
    console.log(file); // Full file path
});