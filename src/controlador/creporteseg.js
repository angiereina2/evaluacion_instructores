const { ipcRenderer } = require('electron')
//const main=ipcRenderer.require('../modelo/seguimiento')


let fecha;
let Periodo_Seguimiento;
let Version;
let Nombre_Evaluado;
let Doc_Evalaudo;
let Nombre_Evaluador;
let Doc_Evalaudor;
let Nombre_EvaluadorC;
let Doc_EvalaudorC;
let Compromisos_Funcionales;
let Compromisos_Comportamentales;
let btneliminarrep;
let btnactualizarrep;


document.addEventListener("DOMContentLoaded", function() {


//window.onload = function () {

fecha = document.getElementById("txtfechaEva")
Periodo_Seguimiento = document.getElementById("txtperiodoseg")
Version = document.getElementById("ltxtversion")
Nombre_Evaluado = document.getElementById("txtnombreEvaluado")
Doc_Evalaudo = document.getElementById("txtDoc_Evaluado")
Nombre_Evaluador = document.getElementById("txtNombreevaluador")
Doc_Evalaudor = document.getElementById("txtDoc_Evaluador")
Nombre_EvaluadorC = document.getElementById("txtNombreevaluadorC")
Doc_EvalaudorC = document.getElementById("txtDoc_EvaluadorC")
Compromisos_Funcionales = document.getElementById("txtcompromisosf")
Compromisos_Comportamentales = document.getElementById("txtcompromisosc")
btneliminarrep.onclick = rendercreporteseg
btnactualizarrep.onclick = rendercreporteseg

});


async function rendercreporteseg() {
   const obj = {
      
      fecha: fecha.value,
      Periodo_Seguimiento: Periodo_Seguimiento.value,
      Version: Version.value,
      Nombre_Evaluado: Nombre_Evaluado.value,
      Doc_Evalaudo: Doc_Evalaudo.value,
      Nombre_Evaluador: Nombre_Evaluador.value,
      Doc_Evalaudor: Doc_Evalaudor.value,
      Nombre_EvaluadorC: Nombre_EvaluadorC.value,
      Doc_EvalaudorC: Doc_EvalaudorC.value,
      Compromisos_Funcionales: Compromisos_Funcionales.value,
      Compromisos_Comportamentales: Compromisos_Comportamentales.value

   }
   fecha.value = ""
   Periodo_Seguimiento.value = ""
   Version.value = ""
   Nombre_Evaluado.value = ""
   Doc_Evalaudo.value = ""
   Nombre_Evaluador.value = ""
   Doc_Evalaudor.value = ""
   Nombre_EvaluadorC.value = ""  
   Doc_EvalaudorC.value = ""
   Comprmisos_Funcionales.value = ""
   Compromisos_Comportamentales.value = ""

   
   await ipcRenderer.invoke('creporteseg', obj)

  }