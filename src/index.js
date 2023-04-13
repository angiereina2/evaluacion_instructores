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
let user;

function ventanaindex(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Inicio',
        webPreferences:{
            // contextIsolation : false,
            nodeIntegration : true, 
            preload: path.join(__dirname, 'select.js'),
    }
    
    }) 
    //descargar archivo
    mainWindow.loadURL(`file://${__dirname}/funcional.js`);
    ipcMain.on("download", (event, info) => {
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
            .then(dl => mainWindow.webContents.send("download complete", dl.getSavePath()));
    });

    mainWindow.webContents.openDevTools()
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
                label: 'Crear compromisos',
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