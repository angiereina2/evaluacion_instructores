const {app, BrowserWindow, Menu} = require('electron');

const url = require('url');
const path = require('path');


if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
     electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}


let mainWindow
let VentanaSeguimientoreporte;


app.on('ready', () => {    
    mainWindow = new BrowserWindow({width: 720, height: 600});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vista/index.html'),
        protocol:'file',
        slashes: true
    }))

const mainMenu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(mainMenu);

mainWindow.on('closed', () => {
    app.quit();
})

});
function ReporteSeguimiento(){
    VentanaSeguimientoreporte = new BrowserWindow({ 
                        width: 400, 
                        height: 330, 
                        title: 'Consultar Reportes Seguimiento'
    });
    VentanaSeguimientoreporte.setMenu(null);
    VentanaSeguimientoreporte.loadURL(url.format({
    pathname: path.join(__dirname, 'vista/seguimiento.html'),
    protocol:'file',
    slashes: true
    })) 

    VentanaSeguimientoreporte.on('closed', () => {
        VentanaSeguimientoreporte = null;
    });
}

const templateMenu = [
    {
    label:'File',
    submenu: [
        {
        label:'Reporte Seguimiento',
        accelerator: 'Ctrl+R',
        click(){
            ReporteSeguimiento()
        }
        },
        {
            label:'Eliminar Reporte',
            click() {
            }
        },
        {
            label:'Exit',
            accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]
},

];
if (process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 
                'Show/Hide Dev Tools',
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
   
