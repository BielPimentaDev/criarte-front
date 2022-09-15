import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import {
    Calendar,
    CaretLeft,
    CaretRight,
    DownloadSimple,
    LinkedinLogo,
  } from "phosphor-react";

export const ExportToExcel = ({ apiData, fileName }) => {
    

	const handleOnExport = ()=> {
        apiData.map(data=> {
            console.log(Object.values(data)[1].products)
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet((Object.values(data)[1].products))
    
            XLSX.utils.book_append_sheet(wb, ws, 'MySheet1')
    
            XLSX.writeFile(wb, "MyExcel.xlsx")
        })
    }

	return (
		// <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
		<button
        className="flex items-center gap-2 uppercase bg-brandOrange-500 px-3 py-2 text-white rounded-2xl"
			onClick={() => handleOnExport(apiData, fileName)}>
			<DownloadSimple size={32} weight="fill" />
		</button>
	);
};