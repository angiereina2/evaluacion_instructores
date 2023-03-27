const droparea= document.querySelector(".drop-area");
const dragtext= droparea.querySelector("h2");
const boton=droparea.querySelector("button");
const input=droparea.querySelector("#input -file");
let files;

boton.addEventListener("click", (e)=>{
    input.click();
});

input.addEventListener('change', e =>{
    files=this.files;
    droparea.classList.add("active");
    showFiles(files);
    droparea.classList.remove("active");
});

droparea.addEventListener("dragover",(e)=>{
    e.preventDefault();
    droparea.classList.add("active");
    dragtext.textContent="suelte para subir su archivo";
});
droparea.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    droparea.classList.remove("active");
    dragtext.textContent="Arrastre y suelte su archivo";
});
droparea.addEventListener("drop",(e)=>{
    e.preventDefault();
    files=e.dataTransfer.files;
    showFiles(files);
    droparea.classList.remove("active");
    dragtext.textContent="Arrastre y suelte su archivo";
});


function showFiles(files){
    if(files.length===undefined){
        processFile(files);
    }else{
        for(const file of files){

        }
    }
}

function processFile(file){
    const doctype=file.type;
    const validExtendions=["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if(validExtendions.includes(doctype)){
        //valido
        const filereader=new FileReader();
        const id = 'file-${Math.random().toString(32).substring(7)}';
        filereader.addEventListener('load', e =>{
            const fileUrl=filereader.result;
            const image=
            <div id="${id}" class="file-container">
                <img src="${fileUrl}" alt="${file.name}">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Cargando...
                        </span>
                    </div>
            </div>
            ;
        })
    }else{
        //no valido
        alert("su archivo no es valido");
    }

}