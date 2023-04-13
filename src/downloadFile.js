const {ipcRenderer} = require("electron");

ipcRenderer.send("download", {
    url: "documento.xlsx",
    properties: {directory: "C:/Users/APRENDIZ/Downloads"}
});

ipcRenderer.on("download complete", (event, file) => {
    console.log(file); // Full file path
});