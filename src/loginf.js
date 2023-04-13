const {contextBridge, ipcRenderer}=require('electron')

let btnlogin;
let email;
let password;
let rol;

window.onload=function(){
    email=document.getElementById("txtemail")
    password=document.getElementById("txtpassword")
    rol=document.getElementById("txtrologin")
    btnlogin=document.getElementById("btnlogin")

    btnlogin.onclick=function(){
        const obj={email:email.value, password:password.value, rol:rol.value}
        ipcRenderer.invoke("btnlogin", obj)
    }
}

function cerrarSesion(){

contextBridge.exposeInMainWorld("electron", {
  /*getUser: async () => {
    const user = await ipcRenderer.invoke("user:get");
    return user;
  },*/
  logout: () => ipcRenderer.send("user:logout"),
});
}

module.exports=cerrarSesion();
