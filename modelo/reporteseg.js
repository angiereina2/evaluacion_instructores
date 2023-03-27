const {ipcMain} =require('electron');
const connection=require('./conexion/conectar');
require ('../controlador/creporte')
//const path =require('path');

ipcMain.handle('consultar', (event, obj) => {
    seguimientodesempeño(obj)
  });

function seguimientodesempeño(obj)
  {
    const sql = "INSERT INTO seguimientodesempeño SET ? ";  
    connection.query(sql, obj, (error, results, fields) => {
      if(error) {
         console.log(error);
      }
   });
}