 const connection = require('../conexion/conectar');

exports.InicioL = (req, res)=>{

    const txtemail = (req.body.txtemail);
    const txtpassword = (req.body.txtpassword);
    console.log(txtemail +" - "+txtpassword);
    connection.query('INSERT INTO InicioL SET ?',{InicioL:txtemail,txtpassword}, (eror, results)=>{
        if(error){
            console.log(error);
         } else{
            res.redirect('/');
         }

    })

};

exports.update = (req, res)=> {
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