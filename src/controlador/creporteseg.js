const { ipcRenderer } = require('electron')
//const main=ipcRenderer.require('../modelo/seguimiento')


let Pro_Nombre;
let Pro_TipoId;
let Pro_Documento;
let Pro_Rol;
let Pro_Codigo;
let Pro_Grado;
let Pro_Dependencia;
let ProfesionalComision;
let ProfesionalEvaluadorProE_Documento;
let ProE_Nombre;
let ProE_Tipoid;
let ProE_Documento;
let ProE_Rol;
let ProE_Codigo;
let ProE_Grado;
let ProE_Dependencia;
let C_Nombre;
let C_Tipoid;
let C_Documento;
let C_Rol;
let C_Codigo;
let C_Grado;
let C_Dependencia;
let tabla;
let btnactualizarrep;


document.addEventListener("DOMContentLoaded", function() {


//window.onload = function () {

Pro_Nombre = document.getElementById("txtnombreEvaluado");
Pro_TipoId = document.getElementById("txttipoidev");
Pro_Documento = document.getElementById("txtDoc_Evaluado");
Pro_Rol = document.getElementById("txtdemev");
Pro_Codigo = document.getElementById("txtcodev");
Pro_Grado = document.getElementById("txtgradev");
Pro_Dependencia = document.getElementById("txtdependenciaev");
ProfesionalEvaluadorProE_Documento= document.getElementById("txtDoc_Evaluador");
ProfesionalComision= document.getElementById("txtDoc_EvaluadorC");
ProE_Nombre = document.getElementById("txtNombreevaluador");
ProE_Tipoid = document.getElementById("txttipoidevr");
ProE_Documento = document.getElementById("txtDoc_Evaluador");
ProE_Rol = document.getElementById("txtdemevr");
ProE_Codigo = document.getElementById("txtcodevr");
ProE_Grado = document.getElementById("txtgradevr");
ProE_Dependencia = document.getElementById("txtdepenevr");
C_Nombre = document.getElementById("txtNombreevaluadorC");
C_Tipoid = document.getElementById("txttipoievc");
C_Documento = document.getElementById("txtDoc_EvaluadorC");
C_Rol = document.getElementById("txtdemevc");
C_Codigo= document.getElementById("txtcodevc");
C_Grado= document.getElementById("txtgradevc");
C_Dependencia= document.getElementById("txtdepenevc");
btnactualizarrep=document.getElementById("btnactualizarrep");
btnactualizarrep.onclick=ActualizarInfEvaluado;
tabla=document.getElementById("tabla-evaluados");

renderProEvaluado();

});

async function renderProEvaluado() 
{
   await ipcRenderer.invoke('getEvaluado')   
} 

ipcRenderer.on('evaluados', (event, results) => {
  
   
   let template = ""
   const list = results
   list.forEach(element => {
      template+=`
         <tr>
            <td>${element.Pro_Documento}</td>
            <td>${element.Pro_Nombre}</td>
            <td>${element.Pro_Apellido}</td>
            <td>${element.Pro_Rol}</td>
            <td>${element.Pro_Dependencia}</td>
            <td>${element.ProE_Nombre}</td>
            <td>${element.C_Nombre}</td>
             <td>
               <button class="btn btn-info"   
                 id="btnedit"
                 value="${element.Pro_Documento}"> <i class="fas fa-pencil-alt"></i>
                Editar
              </button>
           
            </td>
         </tr>
      ` 
   });
   tabla.innerHTML = template
 btneditar = document.querySelectorAll(".btn-info")
 btneditar.forEach(boton =>{
    boton.addEventListener("click" , renderProe)
 })

});

async function renderProe(e)
{
   const obj = { Pro_Documento: parseInt(e.target.value)}
   await ipcRenderer.invoke("mostrarEvaluado" , obj)

}

ipcRenderer.on('proEvaluados', (event, result) => {
      Pro_Nombre.value = result.Pro_Nombre
      Pro_TipoId.value =result.Pro_TipoId
      Pro_Documento.value = result.Pro_Documento
      Pro_Rol.value = result.Pro_Rol
      Pro_Codigo.value = result.Pro_Codigo
      Pro_Grado.value = result.Pro_Grado
      Pro_Dependencia.value = result.Pro_Dependencia
      ProfesionalEvaluadorProE_Documento.value = result.ProfesionalEvaluadorProE_Documento
      ProfesionalComision.value = result.ProfesionalComision
      ProE_Nombre.value = result.ProE_Nombre
      ProE_Tipoid.value = result.ProE_Tipoid
      ProE_Documento.value = result.ProE_Documento
      ProE_Rol.value = result.ProE_Rol
      ProE_Codigo.value = result.ProE_Codigo
      ProE_Grado.value = result.ProE_Grado
      ProE_Dependencia.value = result.ProE_Dependencia
      C_Nombre.value = result.C_Nombre
      C_Tipoid.value = result.C_Tipoid
      C_Documento.value = result.C_Documento
      C_Rol.value = result.C_Rol
      C_Codigo.value = result.C_Codigo
      C_Grado.value = result.C_Grado
      C_Dependencia.value = result.C_Dependencia
});

async function ActualizarInfEvaluado()
{
  const obj = {
      Pro_Nombre: Pro_Nombre.value,
      Pro_TipoId: Pro_TipoId.value,
      Pro_Documento: Pro_Documento.value,
      Pro_Rol: Pro_Rol.value,
      Pro_Codigo: Pro_Codigo.value,
      Pro_Grado: Pro_Grado.value,
      Pro_Dependencia: Pro_Dependencia.value,
      ProfesionalEvaluadorProE_Documento: ProfesionalEvaluadorProE_Documento.value,
      ProfesionalComision: ProfesionalComision.value,
      ProE_Nombre: ProE_Nombre.value,
      ProE_Tipoid: ProE_Tipoid.value,
      ProE_Documento: ProE_Documento.value,
      ProE_Rol: ProE_Rol.value,
      ProE_Codigo: ProE_Codigo.value,
      ProE_Grado: ProE_Grado.value,
      ProE_Dependencia: ProE_Dependencia.value,
      C_Nombre: C_Nombre.value,
      C_Tipoid: C_Tipoid.value,
      C_Documento: C_Documento.value,
      C_Rol: C_Rol.value,
      C_Codigo: C_Codigo.value,
      C_Grado: C_Grado.value,
      C_Dependencia: C_Dependencia.value

  }

  clearinput()
  await ipcRenderer.invoke("ActualizarEvaluados" , obj)
}

function clearinput()
{
   Pro_Nombre.value = ""
   Pro_TipoId.value = ""
   Pro_Documento.value = ""
   Pro_Rol.value = ""
   Pro_Codigo.value = ""
   Pro_Grado.value = ""
   Pro_Dependencia.value = ""
   ProfesionalEvaluadorProE_Documento.value = ""
   ProfesionalComision.value = ""
   ProE_Nombre.value = ""
   ProE_Tipoid.value = ""
   ProE_Documento.value = ""
   ProE_Rol.value = ""
   ProE_Codigo.value = ""
   ProE_Grado.value = ""
   ProE_Dependencia.value = ""
   C_Nombre.value = ""
   C_Tipoid.value = ""
   C_Documento.value = ""
   C_Rol.value = ""
   C_Codigo.value = ""
   C_Grado.value = ""
   C_Dependencia.value = ""
}

  /*async function renderbusqueda() 
  {
     await ipcRenderer.invoke('buscarev')   
  }
  
  ipcRenderer.on('busqueda', (event, results) => {
  
  
  let template=""
  const list=results
  list.forEach((row)=>{
    template+=`
    <form>
    <input id="txtnombreEvaluado" value="${row.Pro_Documento}">
    <input id="txtDoc_Evaluado" value="${row.Pro_Nombre}">
    </form>
  `
  });
  formulario.innerHTML = template;
  });*/