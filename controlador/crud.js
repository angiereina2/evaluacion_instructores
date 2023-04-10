const connection = require('../conexion/conectar');

exports.loginf.js = (req, res)=>{

    const txtemail = (req.body.txtemail);
    const txtpassword = (req.body.txtpassword);
    console.log(txtemail +" - "+txtpassword);
    connection.query('INSERT INTO loginf.js SET ?',{loginf:txtemail,txtpassword}, (eror, results)=>{
        if(error){
            console.log(error);
         } else{
            res.redirect('/');
         }

    })

};


exports.cregistar = (req, res)=> {
    const id = req.body.id;
    const txtemail = req.body.txtemail;
    const txtpassword = req.body.txtpassword;
    connection.query('UPDATE Usuarios SET ? where id= ?'[{txtarea:txtarea, txtpassword:txtpassword}, id], (eror,results)=>{
        if(error){
            console.log(error);
         } else{
            res.redirect('/');
         }
    })
}