const electron = require ('electron');
const router = electron.router();


const connection = require('./conexion/conectar');

router.get('/',(req, res)=>{
    connection.query('select * from Usuarios', (error, results)=>{
        if(error){
            throw error;
        } else 
        {
            res.render('index', {results:results});
        }  
    })       
});

//Ruta registros
router.get('/create', (req,res)=>{
    res.render('create');
})

//editar

router.get('/actualizar/:id', (req, res)=>{
    connection.query('select * from Usuarios where id=?')
    const id= req.params.id;
    connection.query ('select * from Usuario where id=?',[id], (error, results)=> {
        if(error){
            throw error;
        } else 
        {
            res.render('actualizar', {Usuario:results[0]});   
        }
})


const crud = require ('./controlador/crud');
router.post('/InicioL', crud.InicioL);
router.post('/actualizar', crud.Update);

module.exports = router;