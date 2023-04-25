// const form = document.getElementById('form-registrarU');

// form.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     console.log('hola');
//  })


const { ipcRenderer } = require('electron')
//const main=ipcRenderer.require('../modelo/crearusuarios')


let Usu_Nombre;
let Usu_Apellido;
let Usu_Correo;
let Rol;
let Usu_Password;
let Usu_Username;
let btnresgistraru;

document.addEventListener("DOMContentLoaded", function() {


//window.onload = function () {

   Usu_Nombre = document.getElementById("txtnombreu")
   Usu_Apellido = document.getElementById("txtapellidou")
   Rol = document.getElementById("txtrolu")
   Usu_Correo = document.getElementById("txtcorreou")
   Usu_Password = document.getElementById("txtpasswordu")
   Usu_Username = document.getElementById("txtusernameu")
   btnresgistraru = document.getElementById("btnregistrar-usuarios")
   btnresgistraru.onclick = rendercrearUsuarios

});


async function rendercrearUsuarios() {
   const obj = {
      Usu_Nombre: Usu_Nombre.value,
      Usu_Apellido: Usu_Apellido.value,
      Rol: Rol.value,
      Usu_Correo: Usu_Correo.value,
      Usu_Password: Usu_Password.value,
      Usu_Username: Usu_Username.value
   }
   Usu_Nombre.value = ""
   Usu_Apellido.value = ""
   Rol.value= ""
   Usu_Correo.value = ""
   Usu_Password.value = ""
   Usu_Username.value = ""

   //main.crearUsuarios(await ipcRenderer.invoke('crearU', obj));

   await ipcRenderer.invoke('crearU', obj)

   new Notification('Usuarios', {
      body: 'Se ha creado el usuario'
   })
}