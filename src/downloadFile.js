const {dialog}=require('electron');
const downloadManager = require('electron-download-manager');
const path = require('path');

const downloadBtn=document.getElementById('btnguardar');

downloadBtn.addEventListener('click', async function(){

const filePath = path.join(__dirname, 'src/GTH-F-304V3Formatoseguimiento.xlsx');

// Abrir un diálogo de guardar archivo para que el usuario elija la ruta donde se guardará el archivo

const savePath = await dialog.showSaveDialog({
  defaultPath: 'src/GTH-F-304V3Formatoseguimiento.xlsx',
  filters: [
    { name: 'Archivos de Excel', extensions: ['xlsx'] }
  ]
});

// Descargar el archivo de Excel a la ruta elegida por el usuario
downloadManager.download({
  url: `file://${filePath}`,
  path: savePath.filePath
}, (error, info) => {
  if (error) {
    console.log('Error al descargar el archivo:', error);
  } else {
    console.log('Archivo descargado con éxito:', info.filePath);
  }
});
});
