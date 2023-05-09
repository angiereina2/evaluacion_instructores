const {ipcRenderer} = require('electron')

let btnlogin;
let email;
let password;
let rol;

window.onload=function(){
    email = document.getElementById("txtemail")
    password = document.getElementById("txtpassword")
    rol = document.getElementById("txtrologin")
    btnlogin = document.getElementById("btnlogin")

    btnlogin.onclick=function(){
        const obj={email:email.value, password:password.value, rol:rol.value}
        ipcRenderer.invoke("btnlogin", obj)
    }
}

let page;

document.addEventListener('DOMContentLoaded', function () {
  page = new Page(mainWindow);
});

class Page {
  constructor() {
    this.attachEvents();
  }

  attachEvents() {
    let btnLogout = this.get("#btnlogout");
    btnLogout.addEventListener('click', this.logout);
  }
  logout() {
    ipcRenderer.invoke('logout', 'confirm-logout');
  }
}