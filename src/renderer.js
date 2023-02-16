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



