const {ipcRenderer}=require('electron');
//require('../modelo/registrari')
//require('../vista/registrar.html')

let nombre;
let apellido;
let tipoid;
let id;
let rol;
let correo;
let codigo;
let grado;
let dependencia;
let btnregistrar;
let select;

window.onload = function(){
    id= document.getElementById("txtdocumentoi")
    nombre= document.getElementById("txtninstructor")
    apellido= document.getElementById("txtapellidoi")
    tipoid= document.getElementById("txttipoid")
    rol= document.getElementById("txtroli")
    correo= document.getElementById("txtcorreoi")
    codigo= document.getElementById("txtcodigoi")
    grado= document.getElementById("txtgradoi")
    dependencia= document.getElementById("txtdependenciai")
    select= document.getElementById("txtprofev")
    btnregistrar= document.getElementById("btnregistrar")
    btnregistrar.onclick= renderCrearinstructor;
    //renderGetProducts()
}

||//  {
//     await ipcRenderer.invoke('get')   
//  }

window.ipcRender.invoke('getCarreras').then((result) => {
   let { ProE_Documento, ProE_Nombre } = result;

   ProE_Documento = ProE_Documento.replace(/(^_)|(_$)/g, '');
   ProE_Documento = ProE_Documento.split('_');
   ProE_Nombre = ProE_Nombre.replace(/(^_)|(_$)/g, '');
   ProE_Nombre = ProE_Nombre.split('_');

   let carreras = [];

   for (let i = 0; i < ProE_Documento.length; i++) {
       carreras.push({
           'ProE_Documento': ProE_Documento[i],
           'ProE_Nombre': ProE_Nombre[i]
       });
   }

   let texto = '';

   for (let i = 0; i < carreras.length; i++) {
       texto +=
           `
           <option value="${carreras[i].ProE_Documento}">${carreras[i].ProE_Nombre}</option>
           `;
   }

   select.innerHTML += texto;
});


async function renderCrearinstructor() {
   const obj = {
      id: parseInt(id.value),
      nombre:nombre.value,
      apellido:apellido.value,
      tipoid:tipoid.value,
      rol:rol.value,
      correo:correo.value,
      codigo: parseInt(codigo.value),
      grado: parseInt(grado.value),
      dependencia:dependencia.value,
      select: parseInt(select.value)
   }
   id.value = ""
   nombre.value = ""
   apellido.value = ""
   tipoid.value = ""
   rol.value = ""
   correo.value = ""
   codigo.value = ""
   grado.value = ""
   dependencia.value = "" 
   select.value= ""
   await ipcRenderer.invoke('crear', obj)  
  
   new Notification('Instructor', {
      body: 'El instructor se ha registrado exitosamente'
    })
}

