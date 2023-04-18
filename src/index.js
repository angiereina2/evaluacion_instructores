const {app, BrowserWindow, Menu, ipcMain, Notification} =require('electron');
const connection=require('./conexion/conectar');
const url=require('url');
const path =require('path');
const { lstatSync } = require('fs');

/*if(process.env.NODE_ENV !== 'production'){
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules','.bin','electron')
})
}*/

let mainWindow;
let invitadoWindow;
let ventlogin;
let ventanaActualizar;
let ventanaCrear;
let ventanaCrearProEV;
let ventanaCrearCompromisos;
let ventanaCrearU;
let VentanaSeguimientoreporte;
let user;

function ventanaindex(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Inicio',
        webPreferences:{
            /* contextIsolation : false,
            enableRemoteModule: true,*/
            nodeIntegration : true, 
            preload: path.join(__dirname, 'select.js'),
    }
    
    }) 
    //descargar archivo
    /*mainWindow.loadURL(`file://${__dirname}/funcional.js`);
    ipcMain.on("download", (event, info) => {
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
            .then(dl => mainWindow.webContents.send("download complete", dl.getSavePath()));
    });*/

    //mainWindow.webContents.openDevTools()
    mainWindow.loadFile('src/vista/index.html')
    const prinmenu=Menu.buildFromTemplate(nuevoMenu);
    Menu.setApplicationMenu(prinmenu);

    
};

function ventanainvitado(){
    invitadoWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Inicio',
        webPreferences:{
            // contextIsolation : false,
            nodeIntegration : true, 
            preload: path.join(__dirname, 'inicio-invitado.js'),
    }
    }) 
    invitadoWindow.loadFile('src/vista/vista-invitado.html')
    invitadoWindow.setMenu(null);

    
};

ipcMain.handle("is-file", async (_, path)=>{
    return lstatSync(path).isFile();
})

//ventana de inicio de sesion
function loginv(){
    ventlogin = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Iniciar Sesión',
        webPreferences:{
            preload: path.join(__dirname, 'loginf.js'),
    }
    })
    ventlogin.setMenu(null);
    ventlogin.loadFile('src/vista/login.html')
    
}

app.whenReady().then(loginv)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length===0){
        ventanaindex()
    }
})
ipcMain.handle('btnlogin', (event, obj)=>{
    validatelogin(obj)
});

function validatelogin(obj){
    const{email, password, rol}=obj
    const sql= "SELECT * FROM usuarios WHERE Usu_Correo=? AND Usu_Password=? AND Rol=?"
    connection.query(sql, [email, password, rol], (error, results, fields)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0 && rol=='admin'){
            ventanaindex()
            mainWindow.show()
            ventlogin.close()
        }
        else if(results.length>0 && rol=='subdirector'){
            ventanainvitado()
            invitadoWindow.show()
            ventlogin.close()
        }else{
            new Notification({
                title: "login",
                body: 'correo, contraseña o rol incorrectos'
            }).show()
        }
    });
}

//logout
/*ipcMain.handle('logout', (event, confirm) => {
  validateLogout(confirm);
});

function validateLogout(confirm) {
  if (confirm == 'confirm-logout') {
    loginv();
    ventlogin.show();
    mainWindow.close();
  }
}

ipcMain.handle("user:get", (event) => {
    return user;
  });*/

ipcMain.on("user:logout", (event) => {
    user = null;
    loginv();
    ventlogin.show();
    mainWindow.close();
    ventanaCrear.close();
    ventanaActualizar.close();
    ventanaCrearCompromisos.close();
    ventanaCrearProEV.close();
    ventanaCrearU.close();
  });

  //cerrar sesion en ventana de invitados
  ipcMain.on("user:logout1", (event) => {
    user = null;
    loginv();
    ventlogin.show();
    invitadoWindow.close();
  });

//funcion para la ventana de registros
function Vcrear(){
    ventanaCrear=new BrowserWindow({
        width: 600,
        height:600,
        title: 'Registrar',
        webPreferences: {
            preload: path.join(__dirname, 'controlador/cregistrar.js'),
        }
    })
    ventanaCrear.setMenu(null);
    ventanaCrear.loadFile('src/vista/registrar.html')
    // ventanaCrear.on('closed', ()=>{
    //     ventanaCrear=null;
    // });
}


ipcMain.handle('crear', (event, obj) => {
    crearInstructor(obj)
  });

  /*ipcMain.handle('getCarreras', () => {
    Selectevaluadores()
  });

function Selectevaluadores(){}

  
    connection.query('SELECT * FROM profesionalevaluador', (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      let ProE_Documento = '', ProE_Nombre = '';
  
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            ProE_Documento += results[i].ProE_Documento + '_';
          ProE_Nombre += results[i].ProE_Nombre + '_';
        }
  
      }
    });*/
  
  


function crearInstructor(obj)
  {
    const sql = "INSERT INTO profesionalevaluado SET ?";  
    connection.query(sql, obj, (error, results, fields) => {
      if(error) {
         console.log(error);
      }
   });
  }

// ventana crear profesiosanles evaluadores
function VcrearProevaluador(){
    ventanaCrearProEV=new BrowserWindow({
        width: 600,
        height:600,
        title: 'Registrar profesionales evaluadores',
        webPreferences: {
            preload: path.join(__dirname, 'controlador/crear_proevaluador.js'),
        }
    })
    ventanaCrearProEV.setMenu(null);
    ventanaCrearProEV.loadFile('src/vista/registrar-proevaluador.html')
}

ipcMain.handle('crearEvaluador', (event, obj) => {
    crearProEvaluador(obj)
  });

function crearProEvaluador(obj)
  {
    const sql = "INSERT INTO profesionalevaluador SET ?";  
    connection.query(sql, obj, (error, results, fields) => {
      if(error) {
         console.log(error);
      }
   });
  }

// ventana compromisos funcionales
function VcrearCompromisos(){
    ventanaCrearCompromisos=new BrowserWindow({
        width: 600,
        height:600,
        title: 'Registrar compromisos',
        webPreferences: {
            preload: path.join(__dirname, 'controlador/crearcompromisos.js'),
        }
    })
    ventanaCrearCompromisos.setMenu(null);
    ventanaCrearCompromisos.loadFile('src/vista/registrar-compromisos.html')
}

/*function modalFuncional(){
  ipcRenderer.on('showModal', ()=>{
      const ventanamodalF= new BrowserWindow({
          width: 400,
          height: 300,
          modal: true, 
          parent: RemotePlayback.getCurrentWindow(),
          webPreferences: {
              nodeIntegration: true
          }
      })
      ventanamodalF.loadFile('vista/modal_compromisos.html')
      ventanamodalF.setMenu(null);
      ventanamodalF.show()
  })
  }

ipcMain.on('abrirmodalF', (event) =>{
  modalFuncional();
  ventanaCrearCompromisos.webContents.send('showModal')
});*/

//consultar funcionales
ipcMain.handle('getCompF', () => {
  getFuncionales()
});

function getFuncionales()
{
  
  connection.query('SELECT * FROM compromisosfucionales inner join profesionalevaluado on profesionalevaluado.Pro_Documento=compromisosfucionales.ProfesionalEvaluadoPro_Documento', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    ventanaCrearCompromisos.webContents.send('funcionales', results)
  });  
}

//consultar comportamentales
ipcMain.handle('getCompC', () => {
  getComportamentales()
});

function getComportamentales()
{
  
  connection.query('SELECT * FROM compromisoscomportamentales inner join profesionalevaluado on profesionalevaluado.Pro_Documento=compromisoscomportamentales.ProfesionalEvaluadoPro_Documento', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    ventanaCrearCompromisos.webContents.send('comportamentales', results)
  });  
}

//Eliminar
ipcMain.handle('eliminar_funcional', (event, obj) => {
  EliminarCompF(obj)
});

function EliminarCompF(obj)
{
  const { ComF_Id }  = obj
  const sql = "DELETE FROM compromisosfucionales WHERE ComF_Id = ?"
  connection.query(sql, ComF_Id, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
  });
}

ipcMain.handle('eliminar_comportamental', (event, obj) => {
  EliminarCompC(obj)
});

function EliminarCompC(obj)
{
  const { ComC_Id }  = obj
  const sql = "DELETE FROM compromisoscomportamentales WHERE ComC_Id = ?"
  connection.query(sql, ComC_Id, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
  });
}

//Actualizar
ipcMain.handle('mostrarF', (event, obj) => {
  mostrarFuncional(obj)    
});


ipcMain.handle('Actualizarf', (event, obj) => {
  actualizarCF(obj)    
});

function mostrarFuncional(obj)
{
  let { ComF_Id } = obj 
  let sql = "SELECT * FROM compromisosfucionales WHERE ComF_Id = ?"
  connection.query(sql, ComF_Id, (error, results, fields) => {
    if (error){
      console.log(error);
    }
    console.log(results)
    ventanaCrearCompromisos.webContents.send('Cfuncional', results[0])
  });
}

function actualizarCF(obj) 
{
   let { ComF_Id, ComF_Numero, ComF_Descripcion, ComF_PorPactado } = obj
   const sql = "UPDATE compromisosfucionales SET ComF_Numero=?, ComF_Descripcion=?, ComF_PorPactado=? WHERE ComF_Id=?";  
   connection.query(sql, [ComF_Numero, ComF_Descripcion, ComF_PorPactado, ComF_Id], (error, results, fields) => {
     if(error) {
        console.log(error);
     }
      
   });
}

ipcMain.handle('mostrarC', (event, obj) => {
  mostrarComportamental(obj)    
});


ipcMain.handle('Actualizarc', (event, obj) => {
  actualizarCC(obj)    
});

function mostrarComportamental(obj)
{
  let { ComC_Id } = obj 
  let sql = "SELECT * FROM compromisoscomportamentales WHERE ComC_Id = ?"
  connection.query(sql, ComC_Id, (error, results, fields) => {
    if (error){
      console.log(error);
    }
    console.log(results)
    ventanaCrearCompromisos.webContents.send('CComportamental', results[0])
  });
}

function actualizarCC(obj) 
{
   let { ComC_Id, ComC_Numero, ComC_Descripcion } = obj
   const sql = "UPDATE compromisoscomportamentales SET ComC_Numero=?, ComC_Descripcion=? WHERE ComC_Id=?";  
   connection.query(sql, [ComC_Numero, ComC_Descripcion, ComC_Id], (error, results, fields) => {
     if(error) {
        console.log(error);
     }
      
   });
}

//Busqueda
/*ipcMain.on('buscarev', (event, cadenaBusqueda) => {
  connection.query("SELECT * FROM profesionalevaluado WHERE Pro_Documento LIKE ?", '%${cadenaBusqueda}%', (err, result) =>{
    if(err){
      console.error('error en la busqueda de base de datos: ', err);
      event.reply('resultado-busqueda', {error: true});
      return;
    }

    event.reply('resultado-busqueda', {error: false, result})
  })
});

function buscarEvaluado(){
 connection.query("SELECT * FROM profesionalevaluado WHERE Pro_Documento LIKE ?"), ['%${resultBusqueda}%'], (err, result) =>{
  if(err) throw err;
  console.log('Los resultados de busqueda son')

  VentanaSeguimientoreporte.webContents.send('busqueda', result)
 }
}*/

//ventana crear usuarios
function VcrearUsuarios(){
    ventanaCrearU=new BrowserWindow({
        width: 600,
        height:600,
        title: 'Registrar Usuarios',
        webPreferences: {
            preload: path.join(__dirname, 'controlador/crearusuarioc.js'),
        }
    })
    ventanaCrearU.setMenu(null);
    ventanaCrearU.loadFile('src/vista/registrar_usuarios.html')
}

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

//funcion para crear la ventana de actualizar
function Vactualizar(){
    ventanaActualizar = new BrowserWindow({
        width: 600,
        height: 600,
        title: 'Actualizar'
    })
    ventanaActualizar.setMenu(null);
    ventanaActualizar.loadURL(url.format({
        pathname: path.join(__dirname, 'vista/actualizar.html'),
        protocol: 'file',
        slashes: true
    }))
    ventanaActualizar.on('closed', ()=>{
        ventanaActualizar=null;
    });
}

//funcion para la ventana de seguimiento
function ReporteSeguimiento(){
    VentanaSeguimientoreporte = new BrowserWindow({ 
        width: 400, 
        height: 330, 
        title: 'Consultar Reportes Seguimiento',        
        webPreferences: {
        preload: path.join(__dirname, 'controlador/creporteseg.js'),
                }
            })
            VentanaSeguimientoreporte.setMenu(null);
            VentanaSeguimientoreporte.loadFile('src/vista/seguimiento.html');
}
    
/*ipcMain.handle('reporteSeg', (event, obj) => {
    ReporteSeguimiento(obj)
  });

function ReporteSeguimiento(obj)
{
  const sql = "INSERT INTO seguimientodesempeño ('fecha', 'Periodo_Seguimiento', 'Nombre_Evaluado', 'Doc_Evalaudo', 'Nombre_Evaluador', 'Doc_Evalaudor', 'NOmbre_EvaluadorC', 'Doc_EvalaudorC', 'Comprmisos_Funcionales', 'Compromisos_Comportamentales') VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?)";  
  connection.query(sql, obj, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
 });
}*/

//Consultar
ipcMain.handle('getEvaluado', () => {
  getProEvaluados()
});

function getProEvaluados()
{
  
  connection.query('SELECT * FROM profesionalevaluado inner join profesionalevaluador on profesionalevaluador.ProE_Documento=profesionalevaluado.ProfesionalEvaluadorProE_Documento inner join profesionalevaluadorcomision on profesionalevaluadorcomision.C_Documento=profesionalevaluado.ProfesionalComision', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    VentanaSeguimientoreporte.webContents.send('evaluados', results)
  });  
}
//Actualizar informacion de profesionales evaluados
ipcMain.handle('mostrarEvaluado', (event, obj) => {
  mostrarEvaluados(obj)    
});


ipcMain.handle('ActualizarEvaluados', (event, obj) => {
  actualizarProEvaluados(obj)    
});

function mostrarEvaluados(obj)
{
  let { Pro_Documento } = obj 
  let sql = "SELECT * FROM profesionalevaluado inner join profesionalevaluador on profesionalevaluador.ProE_Documento=profesionalevaluado.ProfesionalEvaluadorProE_Documento inner join profesionalevaluadorcomision on profesionalevaluadorcomision.C_Documento=profesionalevaluado.ProfesionalComision WHERE Pro_Documento = ?"
  connection.query(sql, Pro_Documento, (error, results, fields) => {
    if (error){
      console.log(error);
    }
    console.log(results)
    VentanaSeguimientoreporte.webContents.send('proEvaluados', results[0])
  });
}

function actualizarProEvaluados(obj) 
{
   let { Pro_Documento, Pro_Nombre, Pro_TipoId, Pro_Rol, Pro_Codigo, Pro_Grado, Pro_Dependencia, ProfesionalEvaluadorProE_Documento, ProfesionalComision, ProE_Nombre, ProE_TipoId, ProE_Rol, ProE_Codigo, ProE_Grado, ProE_Dependencia, C_Nombre, C_TipoId, C_Rol, C_Codigo, C_Grado, C_Dependencia } = obj
   const sql = "UPDATE profesionalevaluado inner join profesionalevaluador on profesionalevaluador.ProE_Documento=profesionalevaluado.ProfesionalEvaluadorProE_Documento inner join profesionalevaluadorcomision on profesionalevaluadorcomision.C_Documento=profesionalevaluado.ProfesionalComision SET profesionalevaluado.Pro_Nombre=?, profesionalevaluado.Pro_TipoId=?, profesionalevaluado.Pro_Rol=?, profesionalevaluado.Pro_Codigo=?, profesionalevaluado.Pro_Grado=?, profesionalevaluado.Pro_Dependencia=?, profesionalevaluado.ProfesionalEvaluadorProE_Documento=?, profesionalevaluado.ProfesionalComision=?, profesionalevaluador.ProE_Nombre=?, profesionalevaluador.ProE_Tipoid=?, profesionalevaluador.ProE_Rol=?, profesionalevaluador.ProE_Codigo=?, profesionalevaluador.ProE_Grado=?, profesionalevaluador.ProE_Dependencia=?, profesionalevaluadorcomision.C_Nombre=?, profesionalevaluadorcomision.C_Tipoid=?, profesionalevaluadorcomision.C_Rol=?, profesionalevaluadorcomision.C_Codigo=?, profesionalevaluadorcomision.C_Grado=?, profesionalevaluadorcomision.C_Dependencia=? WHERE Pro_Documento = ?";  
   connection.query(sql, [Pro_Nombre, Pro_TipoId, Pro_Rol, Pro_Codigo, Pro_Grado, Pro_Dependencia, ProfesionalEvaluadorProE_Documento, ProfesionalComision, ProE_Nombre, ProE_TipoId, ProE_Rol, ProE_Codigo, ProE_Grado, ProE_Dependencia, C_Nombre, C_TipoId, C_Rol, C_Codigo, C_Grado, C_Dependencia, Pro_Documento], (error, results, fields) => {
     if(error) {
        console.log(error);
     }
      
   });
}

/* ipcMain.handle('buscarev', () => {
    buscarEvaluado()
 });

 function buscarEvaluado(){
   connection.query("SELECT * FROM profesionalevaluado WHERE Pro_Documento LIKE ?"), ['%${resultBusqueda}%'], (err, result) =>{
    if(err) throw err;
    console.log('Los resultados de busqueda son')

    VentanaSeguimientoreporte.webContents.send('busqueda', result)
   }
 }*/

//select ventana principal
ipcMain.handle('consulta', () => {
    consultarProE()
 });

function consultarProE(){
                const sql = 'SELECT * FROM profesionalevaluado';
                connection.query(sql, (err, results, fields)=>{
                  if(err){
                    console.error("error al obtener los datos: ", err);
                  }else{
                    console.log("datos obtenidos: ", results);
                  }

                  mainWindow.webContents.send('select', results)
                });
}

ipcMain.handle('consulta2', () => {
    consultarInvitado()
 });

function consultarInvitado(){
                const sql = 'SELECT * FROM profesionalevaluado';
                connection.query(sql, (err, results, fields)=>{
                  if(err){
                    console.error("error al obtener los datos: ", err);
                  }else{
                    console.log("datos obtenidos: ", results);
                  }

                  invitadoWindow.webContents.send('select2', results)
                });
}


ipcMain.handle('consulta1', () => {
    consultarProEv()
 });


 //prueba seleccion de archivos
 const ExcelJS = require('exceljs');
const { error } = require('console');

function crearArchivoExcel(ruta, datos) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Mi hoja de cálculo');
  worksheet.addRow(['Nombre', 'Edad']);
  datos.forEach((fila) => {
    worksheet.addRow(fila);
  });
  const buffer = workbook.xlsx.writeBuffer();
  require('fs').writeFileSync(ruta, buffer);
}
  
ipcMain.handle('crear-archivo-excel', (event, ruta, datos) => {
    
  crearArchivoExcel(ruta, datos);
});


function consultarProEv(){
                const sql = 'SELECT * FROM profesionalevaluador';
                connection.query(sql, (err, results, fields)=>{
                  if(err){
                    console.error("error al obtener los datos: ", err);
                  }else{
                    console.log("datos obtenidos: ", results);
                  }

                  ventanaCrear.webContents.send('select1', results)
                });
}
const nuevoMenu=[
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform=='darwin' ? 'command+E':'Ctrl+E',
                click(){
                   app.quit();
                }
            }
        ]
    },

    {
        label: 'CRUD',
        submenu: [
            {
                label: 'Crear Instructores',
                accelerator: process.platform=='darwin' ? 'command+L': 'Ctrl+L', 
                click(){
                    Vcrear();
                }
            },
            {
                label: 'Crear profesionales evaluadores',
                accelerator: process.platform=='darwin' ? 'command+P': 'Ctrl+P',
                click(){
                    VcrearProevaluador();
                }
            },
            {
                label: 'Compromisos',
                accelerator: process.platform=='darwin' ? 'command+F': 'Ctrl+F',
                click(){
                    VcrearCompromisos();
                }
            },
            {
                label: 'Crear nuevos usuarios',
                accelerator: process.platform=='darwin' ? 'command+M': 'Ctrl+M',
                click(){
                    VcrearUsuarios();
                }
            },
            {
                label: 'Actualizar',
                accelerator: process.platform=='darwin' ? 'command+V': 'Ctrl+V',
                click(){
                    Vactualizar();
                }
            },
            {   
                label: 'Reporte Seguimiento',
                accelerator: process.platform=='darwin' ? 'command+R': 'Ctrl+R',
                click(){
                    ReporteSeguimiento();
            
            }
            }
        ]
    }
]

if(process.env.NODE_ENV !== 'production'){
    nuevoMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Mostrar/Ocultar Herramientas de desarrollo',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}