const electron = require ('electron');
const router = electron.router();


const connection = require('./conexion/conectar');

router.get('/',(req, res)=>{
    connection.query('select * from Usuarios', (error, results)=>{
        if(error){
            throw error;
        } else 
        {
            res.send('index', {results:results});
        }  
    })       
});

//Ruta registros
router.get('/create', (req,res)=>{
    res.render('create');
})

const crud = require ('./controlador/crud');
router.post('/InicioL', crud.InicioL)

module.exports = router;