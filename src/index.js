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
let ventlogin;
let ventanaActualizar;
let ventanaCrear;

function ventanaindex(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Inicio',
        webPreferences:{
        preload: path.join(__dirname, 'preload.js'),
    }
    }) 
    mainWindow.webContents.openDevTools()
    mainWindow.loadFile('src/vista/index.html')
    const prinmenu=Menu.buildFromTemplate(nuevoMenu);
    Menu.setApplicationMenu(prinmenu);

    
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
    const{email, password}=obj
    const sql= "SELECT * FROM usuarios WHERE Usu_Correo=? AND Usu_Password=?"
    connection.query(sql, [email, password], (error, results, fields)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            ventanaindex()
            mainWindow.show()
            ventlogin.close()
        }else{
            new Notification({
                title: "login",
                body: 'correo o contraseña incorrectos'
            }).show()
        }
    });
}
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

ipcMain.handle('get', () => {
    getProducts()
 });

ipcMain.handle('crear', (event, obj) => {
    crearInstructor(obj)
  });

function getProducts()
  {
    
    connection.query('SELECT ProE_Documento, ProE_Nombre FROM profesionalevaluador', (error, results, fields) => {
      if (error){
        console.log(error);
      }
      
      win.webContents.send('products', results)
    });  
  }

function crearInstructor(obj)
  {
    const sql = "INSERT INTO profesionalevaluado ('Pro_Documento', 'Pro_Nombre', 'Pro_Apellido', 'Pro_TipoId', 'Pro_Rol', 'Pro_Correo', 'Pro_Codigo', 'Pro_Grado', 'Pro_Dependencia', 'ProfesionalEvaluadorProE_Documento') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";  
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