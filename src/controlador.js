var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs');
                
document.getElementById('select-file').addEventListener('click',function(){
    dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined){
            console.log("No file selected");
        }else{
            document.getElementById("actual-file").value = fileNames[0];
            readFile(fileNames[0]);
        }
    }); 
},false);