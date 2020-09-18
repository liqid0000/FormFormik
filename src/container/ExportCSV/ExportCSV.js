import React from 'react'
import * as FileSaver from 'file-saver';
import { iterateObject } from '../../utils/utils'

const ExportCSV = (props) =>{

    const {csvData, fileName, isDisabled, type} = props
    const fileType = "text/csv;charset=utf-8";
    const fileExtension = '.csv';

    const exportToCSV = (fileName) => {      
        const CSVd = [iterateObject(csvData).header, iterateObject(csvData).value].join('\n')
        const data = new Blob([CSVd], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

console.log(isDisabled)
    return (
        <button        
            id='formButton'
            className='btn'
            type={type}
            disabled= {isDisabled}
            onClick= {(e) => exportToCSV(fileName)}
            >            
            Export
        </button>
    )
}

export default ExportCSV