// const form = document.getElementById('form-registrarU');

// form.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     console.log('hola');
//  })


const { ipcRenderer } = require('electron')
//const main=ipcRenderer.require('../modelo/crearusuarios')

let Usu_Documento;
let Usu_NombreApell;
let Usu_Correo;
let Rol;
let Usu_Password;
let btnresgistraru;

document.addEventListener("DOMContentLoaded", function() {


//window.onload = function () {

   Usu_Documento = document.getElementById("txtdocuu")
   Usu_NombreApell = document.getElementById("txtnombreu")
   Rol = document.getElementById("txtrolu")
   Usu_Correo = document.getElementById("txtcorreou")
   Usu_Password = document.getElementById("txtpasswordu")
   btnresgistraru = document.getElementById("btnregistrar-usuarios")
   btnresgistraru.onclick = rendercrearUsuarios

});


async function rendercrearUsuarios() {
   const obj = {

      Usu_Documento: Usu_Documento.value,
      Usu_NombreApell: Usu_NombreApell.value,
      Rol: Rol.value,
      Usu_Correo: Usu_Correo.value,
      Usu_Password: Usu_Password.value,
     
   }
   Usu_Documento.value = ""
   Usu_NombreApell.value = ""
   Rol.value= ""
   Usu_Correo.value = ""
   Usu_Password.value = ""
 
   //main.crearUsuarios(await ipcRenderer.invoke('crearU', obj));

   await ipcRenderer.invoke('crearU', obj)

   new Notification('Usuarios', {
      body: 'Usuario Creado Correctamente'
   })
}