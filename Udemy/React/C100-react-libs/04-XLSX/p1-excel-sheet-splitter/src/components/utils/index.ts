import * as XLSX from "xlsx";

/**
 * this won't return header list, as you didn't handle async nature of FileReader
 * @param file
 * @param headerRow
 */
export const readHeaderValues = (file: File, headerRow: number) => {
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet["!ref"]!);

    // get the headers of the sheet on the headerRow
    const headers: string[] = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = { c: col, r: headerRow - 1 }; // Row index is 0-based
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const cellValue = worksheet[cellRef] ? worksheet[cellRef].v : undefined;
      headers.push(cellValue as string);
    }
    console.log(headers);
    return headers;
  };

  reader.readAsArrayBuffer(file);
};

/**
 * ! use promise to return header list async
 * @param file
 * @param headerRow
 * @returns Promise<string[]> a promise that resolves with the headers array
 */
export const readHeaderValuesAsync = (
  file: File,
  headerRow: number
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(worksheet["!ref"]!);

        // Get the headers of the sheet on the headerRow
        const headers: string[] = [];
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = { c: col, r: headerRow - 1 }; // Row index is 0-based
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          const cellValue = worksheet[cellRef]
            ? worksheet[cellRef].v
            : undefined;
          headers.push(cellValue as string);
        }

        resolve(headers); // Resolve the promise with the headers array
      } catch (error) {
        reject(error); // Reject the promise if an error occurs
      }
    };

    reader.onerror = (error) => {
      reject(error); // Reject the promise if a file reading error occurs
    };

    reader.readAsArrayBuffer(file);
  });
};

// not as handy as pandas, so just read header values and send it to backend and use pandas to extract columns
export const readWithUseCols = (
  file: File,
  usecols: string[],
  headerRow: number
) => {
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const dataPrecursor = new Uint8Array(e.target?.result as ArrayBuffer);
    const workbook = XLSX.read(dataPrecursor, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet["!ref"]!);

    const headers = readHeaderValues(file, headerRow); // should reuse header values from the previous function
    const data: Record<string, unknown>[] = [];
    const columnsToUse = usecols.map((colLetter) =>
      XLSX.utils.decode_col(colLetter)
    );
    for (
      let row = headerRow;
      // row <= range.e.r;
      row <= 10;
      row++
    ) {
      const rowData: Record<string, any> = {};
      columnsToUse.forEach((colIndex) => {
        const cellAddress = { c: colIndex, r: row };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cellValue = worksheet[cellRef] ? worksheet[cellRef].v : undefined;

        const columnName = columnsToUse[colIndex];
        debugger;
        rowData[columnName] = cellValue;
      });
      data.push(rowData);
    }

    console.log(data);
  };

  reader.readAsArrayBuffer(file);
};
