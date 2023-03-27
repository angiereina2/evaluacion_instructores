const connection=require('../conexion/conectar')
const {ipcMain}=require('electron')

ipcMain.handle('crearU', (event, obj) => {
    crearUsuarios(obj)
  });

function crearUsuarios(obj)
  {
    const sql = "INSERT INTO usuarios SET ?";  
    connection.query(sql, obj, (error, results, fields) => {
      if(error) {
         console.log(error);
      }
   });
  }

  module.exports=crearUsuarios;