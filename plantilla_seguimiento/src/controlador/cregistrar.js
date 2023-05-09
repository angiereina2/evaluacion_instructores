const {ipcRenderer}=require('electron');
//require('../modelo/registrari')
//require('../vista/registrar.html')



let Pro_Documento;
let Pro_NombreApellido;
let Pro_TipoId;
let Pro_Rol;
let Pro_Correo;
let Pro_Codigo;
let Pro_Grado;
let Pro_Dependencia;
let btnregistrar;
let ProfesionalEvaluadorProE_Documento;
let ProfesionalComision;

window.onload = function(){

    Pro_Documento= document.getElementById("txtdocumentoi")
    Pro_NombreApellido= document.getElementById("txtninstructor")
    Pro_TipoId= document.getElementById("txttipoid")
    Pro_Rol	= document.getElementById("txtroli")
    Pro_Correo= document.getElementById("txtcorreoi")
    Pro_Codigo= document.getElementById("txtcodigoi")
    Pro_Grado= document.getElementById("txtgradoi")
    Pro_Dependencia= document.getElementById("txtdependenciai")
    ProfesionalEvaluadorProE_Documento= document.getElementById("txtprofev")
    ProfesionalComision=document.getElementById("txtprofevcom");
    btnregistrar= document.getElementById("btnregistrar")
    btnregistrar.onclick= renderCrearinstructor;
    renderSelect1()
    renderSelect2()
};

async function renderSelect1() 
{
   await ipcRenderer.invoke('consulta1')   
}

ipcRenderer.on('select1', (event, results) => {


let template=""
const list=results
list.forEach((row)=>{
  template+=`
  <input>
  <datalist>
  <select>
    <option value="${row.ProE_Documento}">${row.ProE_Nombre}</option>
  </select>
  </datalist>
`
});
ProfesionalEvaluadorProE_Documento.innerHTML = template;
});

async function renderSelect2() 
{
   await ipcRenderer.invoke('consultaProCom')   
}

ipcRenderer.on('selectProCom', (event, results) => {


let template=""
const list=results
list.forEach((row)=>{
  template+=`
  <input>
  <datalist>
  <select>
    <option value="${row.C_Documento}">${row.C_Nombre}</option>
  </select>
  </datalist>
`
});
ProfesionalComision.innerHTML = template;
});

async function renderCrearinstructor() {
   const obj = {
    Pro_Documento: parseInt(Pro_Documento.value),
    Pro_NombreApellido: Pro_NombreApellido.value,
    Pro_TipoId:Pro_TipoId.value,
    Pro_Rol:Pro_Rol.value,
    Pro_Correo:Pro_Correo.value,
    Pro_Codigo: parseInt(Pro_Codigo.value),
    Pro_Grado: parseInt(Pro_Grado.value),
    Pro_Dependencia:Pro_Dependencia.value,
    ProfesionalEvaluadorProE_Documento: parseInt(ProfesionalEvaluadorProE_Documento.value),
    ProfesionalComision: parseInt(ProfesionalComision.value)
   }
   Pro_Documento.value = ""
   Pro_NombreApellido.value = ""
   Pro_TipoId.value = ""
   Pro_Rol.value = ""
   Pro_Correo.value = ""
   Pro_Codigo.value = ""
   Pro_Grado.value = ""
   Pro_Dependencia.value = "" 
   ProfesionalEvaluadorProE_Documento.value= ""
   ProfesionalComision.value = ""
   await ipcRenderer.invoke('crear', obj)  
  
   new Notification('Instructor', {
      body: 'Instructor Registrado Exitosamente'
    })
}

