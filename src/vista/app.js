const electron = require('electron');
const app = electron();

app.set('view engine','ejs');

app.use('/',req())

app.listen(5000, ()=>{
    console.log('SERVER corriendo en http://localhost:5000');
    
});