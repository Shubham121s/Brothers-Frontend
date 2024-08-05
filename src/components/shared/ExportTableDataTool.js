import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const excelExtension = '.xlsx';
const pdfExtension = '.pdf';
const csvExtension = '.csv';

export const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    FileSaver.saveAs(new Blob([excelBuffer], { type: fileType }), fileName + excelExtension);
}

export const exportToCSV = (data, fileName) => {
    const headers = Object.keys(data[0]);
    const csvData = [headers.join(','), ...data.map(row => headers.map(header => row[header]).join(','))];
    FileSaver.saveAs(new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8' }), fileName + csvExtension);
}

export const exportToPDF = (data, fileName) => {
    const doc = new jsPDF();
    doc.autoTable({
        head: [Object.keys(data[0])],
        body: data.map(row => Object.values(row))
    });
    if (fileName === "pdf") {
        doc.save(fileName + pdfExtension);
    } else if (fileName === "print") {
        doc.autoPrint();
        doc.output('dataurlnewwindow');
    }
}

