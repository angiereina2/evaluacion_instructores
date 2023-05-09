const mysql = require('mysql');
const Excel = require('exceljs');
const path = require('path');
const {dialog}=require('electron');

let btncrear;
let Cédulaev;

document.addEventListener("DOMContentLoaded", function() {

  Cédulaev=document.getElementById("ProEvaluador");
    btncrear= document.getElementById("btnguardarmasivo")
    btncrear.onclick= crearExcel(2);
});

function crearExcel(numArchivos){





/*const downloadBtn=document.getElementById('btnguardar');

downloadBtn.addEventListener('click', async function(){*/
// document.addEventListener("DOMContentLoaded", function() {
//     Cédulaev=document.getElementById('txt-Cédula-evaluado')
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

    /*let Cédulaev;
    Cédulaev =1025639854;
    let evaluador=6985632;*/
    
	// -> Query data from MySQL
	 con.query("SELECT * FROM profesionalevaluado inner join profesionalevaluador on profesionalevaluador.ProE_Documento=profesionalevaluado.ProfesionalEvaluadorProE_Documento inner join profesionalevaluadorcomision on profesionalevaluadorcomision.C_Documento=profesionalevaluado.ProfesionalComision inner join compromisosfucionales on profesionalevaluado.Pro_Documento=compromisosfucionales.ProfesionalEvaluadoPro_Documento inner join compromisoscomportamentales on profesionalevaluado.Pro_Documento=compromisoscomportamentales.ProfesionalEvaluadoPro_Documento WHERE Pro_Documento=?", Cédulaev, async function (err, profesionalevaluado, fields) {
		
		const jsonCustomers = JSON.parse(JSON.stringify(profesionalevaluado));
		//console.log(jsonCustomers);


        //const fileName = 'src/GTH-F-304V3Formatoseguimiento.xlsx';
        for (let i = 1; i <= numArchivos; i++) {
       // async function escribirExcel(){
            let workbook = new Excel.Workbook();
            workbook = await workbook.xlsx.readFile('src/GTH-F-304V3Formatoseguimiento.xlsx');
            let worksheet = workbook.getWorksheet("Formato GTH-F-304");

            //Datos evaluados
            worksheet.getRow(11).getCell(3).value=jsonCustomers[0].Pro_Nombre,jsonCustomers[0].Pro_Apellido;
            //worksheet.getRow(11).getCell(4).value=jsonCustomers[0].Pro_Apellido;
            worksheet.getRow(11).getCell(10).value=jsonCustomers[0].Pro_Documento;
            worksheet.getRow(12).getCell(3).value=jsonCustomers[0].Pro_Rol;
            worksheet.getRow(12).getCell(5).value=jsonCustomers[0].Pro_Código;
            worksheet.getRow(12).getCell(7).value=jsonCustomers[0].Pro_Grado;
            worksheet.getRow(12).getCell(9).value=jsonCustomers[0].Pro_Dependencia;
            //Datos evaluador
            worksheet.getRow(14).getCell(3).value=jsonCustomers[0].ProE_Nombre;
            worksheet.getRow(14).getCell(3).value=jsonCustomers[0].ProE_Apellido;
            worksheet.getRow(14).getCell(10).value=jsonCustomers[0].ProE_Documento;
            worksheet.getRow(14).getCell(7).value=jsonCustomers[0].ProE_Tipoid;
            worksheet.getRow(15).getCell(3).value=jsonCustomers[0].ProE_Rol;
            worksheet.getRow(15).getCell(5).value=jsonCustomers[0].ProE_Código;
            worksheet.getRow(15).getCell(7).value=jsonCustomers[0].ProE_Grado;
            worksheet.getRow(15).getCell(9).value=jsonCustomers[0].ProE_Dependencia;
            //Datos profesional comisionado
            worksheet.getRow(17).getCell(3).value=jsonCustomers[0].C_Nombre;
            worksheet.getRow(17).getCell(10).value=jsonCustomers[0].C_Documento;
            worksheet.getRow(17).getCell(7).value=jsonCustomers[0].C_Tipoid;
            worksheet.getRow(18).getCell(3).value=jsonCustomers[0].C_Rol;
            worksheet.getRow(18).getCell(5).value=jsonCustomers[0].C_Código;
            worksheet.getRow(18).getCell(7).value=jsonCustomers[0].C_Grado;
            worksheet.getRow(18).getCell(9).value=jsonCustomers[0].C_Dependencia;
            //Datos compromisos funcionales
            worksheet.getRow(21).getCell(3).value=jsonCustomers[0].ComF_Descripcion;
            worksheet.getRow(21).getCell(4).value=jsonCustomers[0].ComF_PorPactado+"%";
            worksheet.getRow(22).getCell(3).value=jsonCustomers[1].ComF_Descripcion;
            worksheet.getRow(22).getCell(4).value=jsonCustomers[1].ComF_PorPactado+"%";
            //Compromisos comportamentales
            worksheet.getRow(28).getCell(3).value=jsonCustomers[0].ComC_Descripcion;

        //workbook.xlsx.writeFile(fileName);
            
            const fileName = `Formato${i}.xlsx`;
            const filePath = path.join("C:/Users/APRENDIZ/Downloads", fileName);
            workbook.xlsx.writeFile(filePath)
              .then(() => {
                console.log(`Archivo ${fileName} creado`);
              })
              .catch((err) => {
                console.error(err);
              });
          }

        
});
});
//});

}