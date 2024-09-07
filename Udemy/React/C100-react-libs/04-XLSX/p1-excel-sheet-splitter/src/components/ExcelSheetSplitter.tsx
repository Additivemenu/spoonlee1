import React, { useState } from "react";
import * as XLSX from "xlsx";

interface SheetFile {
  sheetName: string;
  file: Blob;
  newFile: File;
}

const ExcelSheetSplitter: React.FC = () => {
  const [sheetFiles, setSheetFiles] = useState<SheetFile[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, {
          type: "array",
          cellDates: true, // ensure dates are parsed as dates, instead of reading it as serial number
        });

        const sheetFilesArray: SheetFile[] = workbook.SheetNames.map(
          (sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const newWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWorkbook, worksheet, sheetName);

            // Convert the new workbook to a binary string
            const wbout = XLSX.write(newWorkbook, {
              bookType: "xlsx",
              type: "array",
            });

            // Create a Blob from the binary string
            const blob = new Blob([wbout], {
              type: "application/octet-stream",
            });

            const newFile = new File([blob], `${file.name}-${sheetName}.xlsx`, {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              lastModified: new Date().getTime(),
            });

            return { sheetName, file: blob, newFile: newFile };
          }
        );

        setSheetFiles(sheetFilesArray);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Excel Sheet Splitter</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      <div>
        {sheetFiles.map((sheetFile, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{sheetFile.sheetName}</h3>
            <a
              href={URL.createObjectURL(sheetFile.file)}
              download={`${sheetFile.sheetName}.xlsx`}
            >
              Download {sheetFile.sheetName}.xlsx
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcelSheetSplitter;
