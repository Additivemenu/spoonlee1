const scanFile = document.querySelector(".scan-file");
const scanDir = document.querySelector(".scan-dir");
const upload = document.querySelector(".upload");
const dropContent = document.querySelector(".drop-content");
const list = document.querySelector("tbody");
const fileInput = document.querySelector("input.file"); // file upload input
const fileInputDir = document.querySelector("input.dir"); // directory upload input


/**
 * 其实这里是选择文件渲染在页面上, 然后点击上传按钮, 将文件上传到服务器(但目前没有写上传功能)
 */
const tempFileList = []; // allowing user to select files progressively

// 01. 单、多文件 -----------------------------------------------------------------
scanFile.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (e) {
  // ! file input change event, event always has payload (depending on event type)

  // console.log(e.target.files);
  tempFileList.push(...e.target.files);
  renderFilelist(); // ! this just render the file list in ui, not upload
});

// 02. 文件夹上传 -----------------------------------------------------------------
scanDir.addEventListener("click", function () {
  fileInputDir.click();
});
fileInputDir.addEventListener("change", function (e) {
  // file input change event

  // console.log(e.target.files);
  tempFileList.push(...e.target.files);   // just note e.target.files is flatted array of all nested files in selected directory
  renderFilelist();
});

// 03. 拖拽上传 (可以是拖拽文件夹, 也可以是拖拽文件) ------------------------------------------------------------------
dropContent.addEventListener("dragover", (e) => e.preventDefault());
dropContent.addEventListener("drop", (e) => {
  e.preventDefault();
  // drop event


  // console.log(e.dataTransfer.items);
  for (const item of e.dataTransfer.items) {  // ! FIXME: what is dataTransfer ? 
    // console.log(item.webkitGetAsEntry());
    getFileByEntry(item.webkitGetAsEntry());
  }
});

// utils function ----------------------------------------------------------------
function getFileByEntry(entry, path = "") {
  // ! FIXME: what is entry? 

  if (entry.isFile) {
    // 文件
    entry.file((file) => {
      // console.log(file);
      file.path = `${path}${file.name}`;
      tempFileList.push(file);
      renderFilelist();
    });
  } else {
    // 文件夹
    const reader = entry.createReader();
    reader.readEntries((entries) => {
      // console.log(entries);
      for (const item of entries) {
        getFileByEntry(item, `${path}${entry.name}/`);
      }
    });
  }
}

// util function: render file list data into UI table -> file api application: https://developer.mozilla.org/en-US/docs/Web/API/File
function renderFilelist() {
  list.innerHTML = "";

  // ! worth learning: vanilla js to generate a component-alike structure
  tempFileList.forEach((file, index) => {
    const tr = document.createElement("tr");
    list.appendChild(tr);
    tr.innerHTML = `
            <td>${file.name}</td>
            <td>${file.webkitRelativePath || file.path}</td>
            <td>${file.type}</td>
            <td>${transformByte(file.size)}</td>
            <td onclick=delFile(${index})>删除</td>
    `;
  });
}

function transformByte(size) {
  // 1024 => 1KB
  // 1024KB => 1MB
  // 1024MB => 1GB
  if (size < 1024 ** 2) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size < 1024 ** 3) {
    return (size / 1024 ** 2).toFixed(1) + "MB";
  } else {
    return (size / 1024 ** 3).toFixed(1) + "GB";
  }
}

function delFile(index) {
  tempFileList.splice(index, 1);   // js array api to delete an element
  renderFilelist();
}
