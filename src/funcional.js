const xlsx = require('xlsx');

function leerexcel(ruta){
    const workbook= xlsx.readFile(ruta);
    const workbooksheets= workbook.SheetNames;

    const sheet = workbooksheets[1];
    const datos= xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    console.log(datos);
}

leerexcel('src/Formatos seguimiento EDL (1).xlsx')