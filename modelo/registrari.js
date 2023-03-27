const {ipcMain} =require('electron');
const connection=require('./conexion/conectar');
require ('../controlador/cregistrar')
//const path =require('path');

ipcMain.handle('crear', (event, obj) => {
    crearInstructor(obj)
  });

function crearInstructor(obj)
  {
    const sql = "INSERT INTO profesionalevaluado SET ? ";  
    connection.query(sql, obj, (error, results, fields) => {
      if(error) {
         console.log(error);
      }
   });
  }