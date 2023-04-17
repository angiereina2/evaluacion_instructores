/*const xlsx = require('xlsx');
const fs = require('fs')

function leerexcel(ruta){
    const workbook= xlsx.readFile(ruta);
    const workbooksheets= workbook.SheetNames;

    const sheet = workbooksheets[1];
    const datos= xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    workbooksheets.sheet.push({
        "Nombre del evaluado": "Marina Estela Rodriguez",
        "Tipo de identificacion": "Cedula de Ciudadania"
    });

    xlsx.utils.sheet_add_json(workbook.Sheets[sheet], workbooksheets.sheet)
    xlsx.writeFile(workbook, "src/GTH-F-304V3Formatoseguimientoaldesempenolaboral (2).xlsx")


    //console.log(datos);
}
*/
function crearExcel(){
const mysql = require('mysql');
const Excel = require('exceljs');
const {dialog}=require('electron');




// document.addEventListener("DOMContentLoaded", function() {
//     cedulaev=document.getElementById('txt-cedula-evaluado')
// });

// Create a connection to the database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'plantilla_seguimiento'
   });
// Open the MySQL connection

 con.connect((err) => {
	if (err) throw err;
    //let cedulaev = document.getElementById("txt-cedula-evaluado");
    let cedulaev;
    //document.addEventListener("DOMContentLoaded", function() {
    cedulaev =652314987;
    
    
	// -> Query data from MySQL
	 con.query("SELECT * FROM profesionalevaluado inner join profesionalevaluador on profesionalevaluador.ProE_Documento=profesionalevaluado.ProfesionalEvaluadorProE_Documento inner join compromisosfucionales on profesionalevaluado.Pro_Documento=compromisosfucionales.ProfesionalEvaluadoPro_Documento inner join compromisoscomportamentales on profesionalevaluado.Pro_Documento=compromisoscomportamentales.ProfesionalEvaluadoPro_Documento WHERE Pro_Documento=?",cedulaev, function (err, profesionalevaluado, fields) {
		
		const jsonCustomers = JSON.parse(JSON.stringify(profesionalevaluado));
		//console.log(jsonCustomers);


        const fileName = 'src/GTH-F-304V3Formatoseguimientoaldesempenolaboral (2).xlsx';

        async function escribirExcel(){
            let workbook = new Excel.Workbook();
            workbook = await workbook.xlsx.readFile(fileName);
            let worksheet = workbook.getWorksheet("Formato GTH-F-304");

            //Datos evaluados
            worksheet.getRow(11).getCell(3).value=jsonCustomers[0].Pro_Nombre,jsonCustomers[0].Pro_Apellido;
            //worksheet.getRow(11).getCell(4).value=jsonCustomers[0].Pro_Apellido;
            worksheet.getRow(11).getCell(10).value=jsonCustomers[0].Pro_Documento;
            worksheet.getRow(12).getCell(3).value=jsonCustomers[0].Pro_Rol;
            worksheet.getRow(12).getCell(5).value=jsonCustomers[0].Pro_Codigo;
            worksheet.getRow(12).getCell(7).value=jsonCustomers[0].Pro_Grado;
            worksheet.getRow(12).getCell(9).value=jsonCustomers[0].Pro_Dependencia;
            //Datos evaluador
            worksheet.getRow(14).getCell(3).value=jsonCustomers[0].ProE_Nombre;
            worksheet.getRow(14).getCell(3).value=jsonCustomers[0].ProE_Apellido;
            worksheet.getRow(14).getCell(10).value=jsonCustomers[0].ProE_Documento;
            worksheet.getRow(14).getCell(7).value=jsonCustomers[0].ProE_Tipoid;
            worksheet.getRow(15).getCell(3).value=jsonCustomers[0].ProE_Rol;
            worksheet.getRow(15).getCell(5).value=jsonCustomers[0].ProE_Codigo;
            worksheet.getRow(15).getCell(7).value=jsonCustomers[0].ProE_Grado;
            worksheet.getRow(15).getCell(9).value=jsonCustomers[0].ProE_Dependencia;
            //Datos compromisos funcionales
            worksheet.getRow(21).getCell(3).value=jsonCustomers[0].ComF_Descripcion;
            worksheet.getRow(21).getCell(4).value=jsonCustomers[0].ComF_PorPactado+"%";
            worksheet.getRow(22).getCell(3).value=jsonCustomers[1].ComF_Descripcion;
            worksheet.getRow(22).getCell(4).value=jsonCustomers[1].ComF_PorPactado+"%";
            //Compromisos comportamentales
            worksheet.getRow(28).getCell(3).value=jsonCustomers[0].ComC_Descripcion;

        //workbook.xlsx.writeFile(fileName);

        const buffer =  await workbook.xlsx.writeBuffer(fileName);

        const options={
            title: 'Seleccione la carpeta de descarga',
            properties: ['openDirectory']
        };

        const folderPaths= await dialog.showOpenDialog(options);

        if(folderPaths && folderPaths.length > 0){
            const filePath=`${folderPaths[0]}/documento.xlsx`;
            require('fs').writeFileSync(filePath, buffer);

            console.log(`El archivo se ha guardado correctamente en: ${filePath}`);
        }

        }

        return escribirExcel;

        
});
});

}
let guardar;
window.onload = function(){
    document.getElementById("btnguardar").addEventListener('click', (e) => {
        e.preventDefault();
        crearExcel();
    });
    //guardar.onclick=descargarArchivoExcel;
    
}

//module.exports=crearExcel;

function holaaa(){
    let pol=document.getElementById("myselect1");

    console.log(pol);
}

/*const fileName = 'src/GTH-F-304V3Formatoseguimientoaldesempenolaboral (2).xlsx';

        async function escribirExcel(){
            let workbook = new Excel.Workbook();
            workbook = await workbook.xlsx.readFile(fileName);
            let worksheet = workbook.getWorksheet("Formato GTH-F-304");
            worksheet.getRow(11).getCell(3).value="MARIO ARMANDO FORERO";
            worksheet.getRow(11).getCell(10).value=79598428;
            worksheet.getRow(12).getCell(3).value="PROFESIONAL";
            worksheet.getRow(12).getCell(5).value=2020;
            worksheet.getRow(12).getCell(7).value=02;
            worksheet.getRow(12).getCell(9).value="CENIGRAF";
            

        workbook.xlsx.writeFile(fileName);
        }
        
escribirExcel();*/
