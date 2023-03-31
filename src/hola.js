const mysql = require('mysql');
const Excel = require('exceljs');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'plantilla_seguimiento'
   });

const cedulaev=465565;
const rdi = await con.query("SELECT Pro_Nombre FROM profesionalevaluado WHERE Pro_Documento=?", [cedulaev]);
  // Creacion RDI
  const fileName = 'src/GTH-F-304V3Formatoseguimientoaldesempenolaboral (2).xlsx';
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(fileName);
  let worksheet = await workbook.getWorksheet("Formato GTH-F-304");
  // Guardar Informacion en la template
  worksheet.getRow(11).getCell(3).value = await rdi[0].Pro_Nombre; //Nombre del la empresa
  /*worksheet.getRow(8).getCell(3).value = await ""; //Nombre del la empresa
  worksheet.getRow(8).getCell(7).value = await rdi[0].type; //Tipo de RDI
  worksheet.getRow(8).getCell(11).value = await rdi[0].reporter; //Emisor
  worksheet.getRow(9).getCell(3).value = await rdi[0].speciality; //Especialidad
  worksheet.getRow(9).getCell(11).value = await rdi[0].created_at; //Fecha de Emision
  worksheet.getRow(10).getCell(3).value = await rdi[0].location; //Ubicacion
  worksheet.getRow(10).getCell(11).value = await rdi[0].deadline; //Fecha requerida
  worksheet.getRow(11).getCell(3).value = await rdi[0].reference; //Referencia
  worksheet.getRow(13).getCell(3).value = await rdi[0].title; //Titulo de RFI
  worksheet.getRow(15).getCell(2).value = await rdi[0].description; //Descripcion*/

  // Crear Excel
  await workbook.xlsx.writeFile(fileName);