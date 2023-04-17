const mysql=require ('mysql');

const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'plantilla_seguimiento'
});

/*function getConnection (){
    return connection;
}*/

connection.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion realizada")
    }

});


//connection.end();

module.exports=connection;
