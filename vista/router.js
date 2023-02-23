const electron = require ('electron');
const router = electron.router();


const connection = require('./conexion/conectar');

router.get('/',(req, res)=>{
    connection.query('select * from Usuarios', (error, results)=>{
        if(error){
            throw error;
        } else 
        {
            res.send(results);
        }  
    })       
});


module.exports = router;