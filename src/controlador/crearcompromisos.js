const {ipcRenderer}=require('electron');

let Tfuncionales;
let Tcomportamentales;
let ComF_Id;
let ComF_Numero;
let ComF_Descripcion;
let ComF_PorPactado;
let ProfesionalEvaluadoPro_Documento;
let ComC_Id;
let ComC_Numero;
let ComC_Descripcion;
let ProfesionalEvaluadoPro_Documento1;
let btncrearF;
let btncrearC;
let btneliminar;
let btneditar;
let btneliminar1;
let btneditar1;
let btnActualizar;
let btnActualizar1;

document.addEventListener("DOMContentLoaded", function() {
    Tfuncionales= document.getElementById("tabla-funcionales");
    Tcomportamentales= document.getElementById("tabla-comportamentales");
    ComF_Id=document.getElementById("idCompFuncional");
    ComF_Numero=document.getElementById("txtnumcf");
    ComF_Descripcion=document.getElementById("txtprimerf");
    ComF_PorPactado=document.getElementById("txtporcf");
    ProfesionalEvaluadoPro_Documento=document.getElementById("txtdoccompf");
    ComC_Id=document.getElementById("idCompComportamental");
    ComC_Numero=document.getElementById("txtnumcc");
    ComC_Descripcion=document.getElementById("txtdesccc");
    ProfesionalEvaluadoPro_Documento=document.getElementById("txtdoccompc");
    btncrearF=document.getElementById("btn-registrarF");
    btncrearF.onclick=renderCrearCompromisosF;
    btncrearC=document.getElementById("btn-registrarC");
    btncrearC.onclick=renderCrearCompromisosC;
    btnActualizar=document.getElementById("btn-actualizarF");
    btnActualizar.onclick = ActualizarFuncional;
    btnActualizar1=document.getElementById("btn-actualizarC");
    btnActualizar1.onclick = ActualizarComportamental;
    //btneditar=document.getElementById("abrirmodalF");
    renderSelectproev1();
    renderSelectproev2();
    renderCompromisosC();
    renderCompromisosF();
});

async function renderSelectproev1() 
{
   await ipcRenderer.invoke('consultaF')   
}

ipcRenderer.on('selectF', (event, results) => {


let template=""
const list=results
list.forEach((row)=>{
  template+=`
  <input>
  <datalist>
  <select>
    <option value="${row.Pro_Documento}">${row.Pro_Nombre}</option>
  </select>
  </datalist>
`
});
ProfesionalEvaluadoPro_Documento.innerHTML = template;
});

async function renderCrearCompromisosF() {
   const obj = {
    ComF_Numero: parseInt(ComF_Numero.value),
    ComF_Descripcion:ComF_Descripcion.value,
    ComF_PorPactado: parseInt(ComF_PorPactado.value),
    ProfesionalEvaluadoPro_Documento: parseInt(ProfesionalEvaluadoPro_Documento.value)
   }
   ComF_Numero.value = ""
   ComF_Descripcion.value = ""
   ComF_PorPactado.value = ""
   ProfesionalEvaluadoPro_Documento.value = ""
   await ipcRenderer.invoke('crearFuncionales', obj)  
  
   new Notification('Compromiso Funcional', {
      body: 'El compromiso funcional se ha registrado exitosamente'
    })
}

async function renderSelectproev2() 
{
   await ipcRenderer.invoke('consultaF')   
}

ipcRenderer.on('selectF', (event, results) => {


let template=""
const list=results
list.forEach((row)=>{
  template+=`
  <input>
  <datalist>
  <select>
    <option value="${row.Pro_Documento}">${row.Pro_Nombre}</option>
  </select>
  </datalist>
`
});
ProfesionalEvaluadoPro_Documento.innerHTML = template;
});

async function renderCrearCompromisosC() {
   const obj = {
    ComC_Numero: parseInt(ComC_Numero.value),
    ComC_Descripcion:ComC_Descripcion.value,
    ProfesionalEvaluadoPro_Documento: parseInt(ProfesionalEvaluadoPro_Documento.value),
   }
   ComC_Numero.value = ""
   ComC_Descripcion.value = ""
   ProfesionalEvaluadoPro_Documento.value = ""
   await ipcRenderer.invoke('crearComportamentales', obj)  
  
   new Notification('Compromiso Comportamental', {
      body: 'El compromiso comportamental se ha registrado exitosamente'
    })
}

async function renderCompromisosF() 
{
   await ipcRenderer.invoke('getCompF')   
}

async function renderCompromisosC() 
{
   await ipcRenderer.invoke('getCompC')   
}

ipcRenderer.on('funcionales', (event, results) => {
  
   
    let template = ""
    const list = results
    list.forEach(element => {
       template+=`
          <tr>
             <td>${element.Pro_Nombre}</td>
             <td>${element.ComF_Numero}</td>
             <td>${element.ComF_Descripcion}</td>
             <td>${element.ComF_PorPactado}%</td>
             <td>
               <button class="btn btn-danger"
                 value="${element.ComF_Id}"
                 > <i class="fas fa-trash-alt"></i>
                 Eliminar
               </button>
              </td>
              
              <td>
                <button class="btn btn-info"   
                  id="btnedit"
                  value="${element.ComF_Id}"> <i class="fas fa-pencil-alt"></i>
                 Editar
               </button>
            
             </td>
          </tr>
       ` 
    });
      
    Tfuncionales.innerHTML = template 
    btneliminar = document.querySelectorAll(".btn-danger")
    btneliminar.forEach(boton =>{
      boton.addEventListener("click" , renderEliminarFuncional)
   })
 
  btneditar = document.querySelectorAll(".btn-info")
  btneditar.forEach(boton =>{
     boton.addEventListener("click" , renderF)
  })
 
 });

 async function renderEliminarFuncional(e)
{
    if(window.confirm("¿Está seguro de eliminar el compromiso?")){
  
   const obj = { ComF_Id:parseInt(e.target.value)}
   await ipcRenderer.invoke('eliminar_funcional', obj)   
    } 
}
async function renderF(e)
{
   const obj = { ComF_Id: parseInt(e.target.value)}
   await ipcRenderer.invoke("mostrarF" , obj)

}

ipcRenderer.on('Cfuncional', (event, result) => {
   ComF_Id.value = result.ComF_Id
   ComF_Numero.value = result.ComF_Numero
   ComF_Descripcion.value = result.ComF_Descripcion
   ComF_PorPactado.value = result.ComF_PorPactado
   ProfesionalEvaluadoPro_Documento.value = result.ProfesionalEvaluadoPro_Documento
});

async function ActualizarFuncional()
{
  const obj = {
     ComF_Id: ComF_Id.value,
     ComF_Numero: ComF_Numero.value,
     ComF_Descripcion: ComF_Descripcion.value,
     ComF_PorPactado: ComF_PorPactado.value, 
     ProfesionalEvaluadoPro_Documento: ProfesionalEvaluadoPro_Documento.value
  }

  clearinput()
  await ipcRenderer.invoke("Actualizarf" , obj)
}

function clearinput()
{
      ComF_Id.value = ""
      ComF_Numero.value = ""
      ComF_Descripcion.value = ""
      ComF_PorPactado.value = ""
      ProfesionalEvaluadoPro_Documento.value = ""
}

 ipcRenderer.on('comportamentales', (event, results) => {
  
   
    let template = ""
    const list = results
    list.forEach(element => {
       template+=`
          <tr>
             <td>${element.Pro_Nombre}</td>
             <td>${element.ComC_Numero}</td>
             <td>${element.ComC_Descripcion}</td>
             <td>
               <button class="btn btn-danger"
                 value="${element.ComC_Id}"
                 > <i class="fas fa-trash-alt"></i>
                 Eliminar
               </button>
              </td>
              
              <td>
                <button class="btn btn-info"   
                  id="btnedit"
                  value="${element.ComC_Id}"> <i class="fas fa-pencil-alt"></i>
                 Editar
               </button>
            
             </td>
          </tr>
       ` 
    });
      
    Tcomportamentales.innerHTML = template 
    btneliminar1 = document.querySelectorAll(".btn-danger")
    btneliminar1.forEach(boton =>{
      boton.addEventListener("click" , renderEliminarComportamental)
   })
 
  btneditar1 = document.querySelectorAll(".btn-info")
  btneditar1.forEach(boton =>{
     boton.addEventListener("click" , renderC)
  })
 
 });

 async function renderEliminarComportamental(e)
 {
    if(window.confirm("¿Está seguro de eliminar el compromiso?")){
        const obj = { ComC_Id:parseInt(e.target.value)}
        await ipcRenderer.invoke('eliminar_comportamental', obj) 
    }   
 }
 async function renderC(e)
{
   const obj = { ComC_Id: parseInt(e.target.value)}
   await ipcRenderer.invoke("mostrarC" , obj)

}

ipcRenderer.on('CComportamental', (event, result) => {
   ComC_Id.value = result.ComC_Id
   ComC_Numero.value = result.ComC_Numero
   ComC_Descripcion.value = result.ComC_Descripcion
   ProfesionalEvaluadoPro_Documento.value = result.ProfesionalEvaluadoPro_Documento
});

async function ActualizarComportamental()
{
  const obj = {
      ComC_Id: ComC_Id.value,
      ComC_Numero: ComC_Numero.value,
      ComC_Descripcion: ComC_Descripcion.value,
      ProfesionalEvaluadoPro_Documento: ProfesionalEvaluadoPro_Documento.value
  }

  clearinput1()
  await ipcRenderer.invoke("Actualizarc" , obj)
}

function clearinput1()
{
      ComC_Id.value = ""
      ComC_Numero.value = ""
      ComC_Descripcion.value = ""
      ProfesionalEvaluadoPro_Documento.value = ""
}