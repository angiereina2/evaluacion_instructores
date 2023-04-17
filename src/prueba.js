const { ipcRenderer } = require('electron');

let guardar;
window.onload = function(){
    document.getElementById("btnguardar").addEventListener('click', (e) => {
        e.preventDefault();
        descargarArchivoExcel();
    });
    //guardar.onclick=descargarArchivoExcel;
    
}

async function descargarArchivoExcel() {
  const datos = [
    ['Juan', 30],
    ['María', 25],
    ['Pedro', 40]
  ];
  const options = {
    title: 'Selecciona la carpeta de descarga',
    properties: ['openDirectory']
  };
  
    const {remote}=require('electron');
  remote.dialog.showOpenDialog(options).then((result) => {
    if (!result.canceled && result.filePaths.length > 0) {
      const ruta = `${result.filePaths[0]}/miArchivo.xlsx`;
      ipcRenderer.invoke('crear-archivo-excel', ruta, datos).then(() => {
        console.log(`El archivo se ha guardado correctamente en: ${ruta}`);
      }).catch((error) => {
        console.error(error);
      });
    }
  }).catch((error) => {
    console.error(error);
  });

}

    


