const {app, BrowserWindow, Menu, ipcMain, Notification} =require('electron');
const connection=require('./conexion/conectar');
const url=require('url');
const path =require('path');

/*if(process.env.NODE_ENV !== 'production'){
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules','.bin','electron')
})
}*/

let mainWindow;
let ventlogin;
let ventanaActualizar;

function ventanaindex(){
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        title: 'Inicio',
        webPreferences:{
        preload: path.join(__dirname, 'src/controlador/controlador.js'),
    }
    }) 
    mainWindow.loadFile('src/vista/index.html')
    const prinmenu=Menu.buildFromTemplate(nuevoMenu);
    Menu.setApplicationMenu(prinmenu);

    
};

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

//funcion para crear la ventana de actualizar
function Vactualizar(){
    ventanaActualizar = new BrowserWindow({
        width: 500,
        height: 500,
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
        label: 'Update',
        submenu: [
            {
                label: 'Nueva ventana',
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