const {ipcRenderer, contextBridge}=require('electron');

let select1;

//document.addEventListener("DOMContentLoaded", function() {
window.onload = function(){
    select1=document.getElementById("myselect");
    renderSelect();
}



async function renderSelect() 
{
   await ipcRenderer.invoke('consulta')   
}

ipcRenderer.on('select', (event, results) => {


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
select1.innerHTML = template;
});

// logout
contextBridge.exposeInMainWorld("electron", {
    /*getUser: async () => {
      const user = await ipcRenderer.invoke("user:get");
      return user;
    },*/
    logout: () => ipcRenderer.send("user:logout"),
  });