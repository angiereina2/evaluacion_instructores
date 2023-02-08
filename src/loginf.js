const {ipcRenderer}=require('electron')

let btnlogin;
let email;
let password;

window.onload=function(){
    email=document.getElementById("txtemail")
    password=document.getElementById("txtpassword")
    btnlogin=document.getElementById("btnlogin")

    btnlogin.onclick=function(){
        const obj={email:email.value, password:password.value}
        ipcRenderer.invoke("btnlogin", obj)
    }
}

