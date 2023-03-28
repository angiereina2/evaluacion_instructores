const {ipcRenderer}=require('electron');
//require('../modelo/reporteseg')
//require('../vista/reporte.html')

let idreporte;
let fecha;
let periodo_seguimiento;
let version;
let nombre_completo;
let numero_identificacion;
let nombre_evaluador;
let numeroid_evaluador;
let nombre_completoEvaluadorC;
let numeroid_evaluadorC;
let compromisosf;
let compromisosc;

window.onload = function(){
    
    idreporte= document.getElementById("txtidreporte")
    fecha= document.getElementById("txtfechaEva")
    periodo_seguimiento= document.getElementById("txtperiodoseg")
    version= document.getElementById("txtversion")
    nombre_completo= document.getElementById("txtnombreEvaluado")
    numero_identificacion= document.getElementById("txtDoc_Evaluado")
    nombre_evaluador= document.getElementById("txtNombreevaluador")
    numeroid_evaluador= document.getElementById("txtDoc_Evaluador")
    nombre_completoEvaluadorC= document.getElementById("txtNombreevaluadorC")
    numeroid_evaluadorC= document.getElementById("txtDoc_EvaluadorC")
    compromisosf= document.getElementById("txtcompromisosf")
    compromisosc= document.getElementById("compromisosc")
    btnactualizarrep = document.getElementById("btnactalizarrep")
    btnresgistraru.onclick = rendercreporte
    btneliminarrep= document.getElementById("btneliminarrep")
    btneliminarrep.onclick = rendercreporte;
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

  
});


async function renderVseguimiento() {
   const obj = {
    idreporte: parseInt(id.value),
    fecha:fecha.value,
    periodo_seguimiento:periodo_seguimiento.value,
    version:parseInt(select.value),
    nombre_completo:nombre_completo.value,
    numero_identificacion:numero_identificacion.value,
    nombre_evaluador: nombre_evaluador.value,
    numeroid_evaluador:numeroid_evaluador.value,
    nombre_completoEvaluadorC:nombre_completoEvaluadorC.value,
    numeroid_evaluadorC:numeroid_evaluadorC.value,
    compromisosf:compromisosf.value,
    compromisosf: compromisosc.value
   }
   idreporte.value = ""
   fecha.value =""
   periodo_seguimiento.value=""
   version.value =""
   nombre_completo = ""
   numero_identificacion = ""
   nombre_evaluador = ""
   numeroid_evaluador = ""
   nombre_completoEvaluadorC = ""
   numeroid_evaluadorC = ""
   compromisosf = ""
   compromisosc = ""

   await ipcRenderer.invoke('consultar', obj)  
  
}

