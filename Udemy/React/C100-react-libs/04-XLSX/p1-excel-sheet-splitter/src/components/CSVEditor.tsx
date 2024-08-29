import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  readHeaderValues,
  readHeaderValuesAsync,
  readWithUseCols,
} from "./utils";

interface SheetFile {
  sheetName: string;
  file: Blob;
  newFile: File;
}

const CSVEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [headerRowIndex, setHeaderRowIndex] = useState<number>(1);
  const [headers, setHeaders] = useState<string[]>([]); // derived state from headerRowIndex

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // just able to read the header is enough
      setSelectedFile(file);

      // not as handy as pandas
      //   readWithUseCols(file, ["latitude", "longitude"], headerRow);
    }
  };

  useEffect(() => {
    const readHeader = async () => {
      if (!selectedFile) return;

      const headersValue = await readHeaderValuesAsync(
        selectedFile,
        headerRowIndex
      );
      setHeaders(headersValue);
    };

    readHeader();
  }, [headerRowIndex, selectedFile]);

  return (
    <div>
      <h2>csv file editor</h2>
      <input
        type="file"
        accept=".csv, .xlsx, .xls, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        min="1"
        onChange={handleFileChange}
      />
      <br />

      <input
        type="number"
        placeholder="please select the row of your header"
        value={headerRowIndex}
        onChange={(e) => {
          if (e.target.value === "") return;
          if (e.target.value === "0") return;
          setHeaderRowIndex(parseInt(e.target.value));
        }}
      />
      <div>
        <h3>Headers</h3>
        <ul>
          {headers.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CSVEditor;
