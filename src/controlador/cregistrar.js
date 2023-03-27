const {ipcRenderer}=require('electron');
//require('../modelo/registrari')
//require('../vista/registrar.html')

let Pro_Nombre;
let Pro_Apellido;
let Pro_TipoId;
let Pro_Documento;
let Pro_Rol	;
let Pro_Correo;
let Pro_Codigo;
let Pro_Grado;
let Pro_Dependencia;
let btnregistrar;
let ProfesionalEvaluadorProE_Documento;

document.addEventListener("DOMContentLoaded", function() {

    Pro_Documento= document.getElementById("txtdocumentoi")
    Pro_Nombre= document.getElementById("txtninstructor")
    Pro_Apellido= document.getElementById("txtapellidoi")
    Pro_TipoId= document.getElementById("txttipoid")
    Pro_Rol	= document.getElementById("txtroli")
    Pro_Correo= document.getElementById("txtcorreoi")
    Pro_Codigo= document.getElementById("txtcodigoi")
    Pro_Grado= document.getElementById("txtgradoi")
    Pro_Dependencia= document.getElementById("txtdependenciai")
    ProfesionalEvaluadorProE_Documento= document.getElementById("txtprofev")
    btnregistrar= document.getElementById("btnregistrar")
    btnregistrar.onclick= renderCrearinstructor;
    //renderGetProducts()
});

//  async function renderGetProducts() 
//  {
//     await ipcRenderer.invoke('get')   
//  }

/*ipcRenderer.invoke('getCarreras').then((result) => {
   let { ProE_Documento, ProE_Nombre } = result;

   /*ProE_Documento = ProE_Documento.replace(/(^_)|(_$)/g, '');
   ProE_Documento = ProE_Documento.split('_');
   ProE_Nombre = ProE_Nombre.replace(/(^_)|(_$)/g, '');
   ProE_Nombre = ProE_Nombre.split('_');//

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
}); */


async function renderCrearinstructor() {
   const obj = {
    Pro_Documento: parseInt(Pro_Documento.value),
    Pro_Nombre:Pro_Nombre.value,
    Pro_Apellido:Pro_Apellido.value,
    Pro_TipoId:Pro_TipoId.value,
    Pro_Rol:Pro_Rol.value,
    Pro_Correo:Pro_Correo.value,
    Pro_Codigo: parseInt(Pro_Codigo.value),
    Pro_Grado: parseInt(Pro_Grado.value),
    Pro_Dependencia:Pro_Dependencia.value,
    ProfesionalEvaluadorProE_Documento: parseInt(ProfesionalEvaluadorProE_Documento.value)
   }
   Pro_Documento.value = ""
   Pro_Nombre.value = ""
   Pro_Apellido.value = ""
   Pro_TipoId.value = ""
   Pro_Rol.value = ""
   Pro_Correo.value = ""
   Pro_Codigo.value = ""
   Pro_Grado.value = ""
   Pro_Dependencia.value = "" 
   ProfesionalEvaluadorProE_Documento.value= ""
   await ipcRenderer.invoke('crear', obj)  
  
   new Notification('Instructor', {
      body: 'El instructor se ha registrado exitosamente'
    })
}

