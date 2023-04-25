const {ipcRenderer}=require('electron');

let ProE_Documento;
let ProE_Nombre;
let ProE_Apellido;
let ProE_Tipoid;
let ProE_Rol;
let ProE_Correo;
let ProE_Codigo;
let ProE_Grado;
let ProE_Dependencia;
let btnregistrar_evaluador;

document.addEventListener("DOMContentLoaded", function() {

    ProE_Documento= document.getElementById("txtdocproe")
    ProE_Nombre= document.getElementById("txtnombreproe")
    ProE_Apellido= document.getElementById("txtapellidoproe")
    ProE_Tipoid= document.getElementById("texttipodproe")
    ProE_Rol	= document.getElementById("txtrolproe")
    ProE_Correo= document.getElementById("txtcorreoproe")
    ProE_Codigo= document.getElementById("txtcodigoproe")
    ProE_Grado= document.getElementById("txtgradoproe")
    ProE_Dependencia= document.getElementById("txtdpendenciaproe")
    
    btnregistrar_evaluador= document.getElementById("btnregistrar-proevaluador")
    btnregistrar_evaluador.onclick= renderCrearevaluador;
    
});

async function renderCrearevaluador() {
   const obj = {
    ProE_Documento: parseInt(ProE_Documento.value),
    ProE_Nombre:ProE_Nombre.value,
    ProE_Apellido:ProE_Apellido.value,
    ProE_Tipoid:ProE_Tipoid.value,
    ProE_Rol:ProE_Rol.value,
    ProE_Correo:ProE_Correo.value,
    ProE_Codigo: parseInt(ProE_Codigo.value),
    ProE_Grado: parseInt(ProE_Grado.value),
    ProE_Dependencia:ProE_Dependencia.value
   }
   ProE_Documento.value = ""
   ProE_Nombre.value = ""
   ProE_Apellido.value = ""
   ProE_Tipoid.value = ""
   ProE_Rol.value = ""
   ProE_Correo.value = ""
   ProE_Codigo.value = ""
   ProE_Grado.value = ""
   ProE_Dependencia.value = "" 
   await ipcRenderer.invoke('crearEvaluador', obj)  
  
   new Notification('Evaluador', {
      body: 'El profesional evaluador se ha registrado exitosamente'
    })
}
