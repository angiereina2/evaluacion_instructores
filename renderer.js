const electron = requ ('electron');

const renderer = electron();

app.set('view engine', 'ejs');


renderer.use(electron.app({extends:false}));
renderer.use(electron(JSON));

renderer.use('/',require('./router'));

renderer.ipcMain.on('category:name', (event, arg) => {
        event.reply('category:name-result',arg);
    }
);

const droparea= document.getElementById("drop-area");

droparea.addEventListener("dragover",(e)=>{
    e.stopPropagation();
    e.preventDefault();
});

droparea.addEventListener("drop", async (e)=>{
    e.stopPropagation();
    e.preventDefault();

    const files=e.dataTransfer.files;

    for(const file of files){
        //console.log(file.path);
        const isFile = await window.api.isFile(file.path);
        console.log(file, isFile);
}

});


const app = require('electron').remote; 
const dialog = app.dialog;
const fs = require('fs');
                
document.getElementById('select-file').addEventListener('click',function(){
    dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined){
            console.log("No file selected");
         }//else{
        // //     document.getElementById("actual-file").value = fileNames[0];
        // //     readFile(fileNames[0]);
        // // }
    }); 
},false);



