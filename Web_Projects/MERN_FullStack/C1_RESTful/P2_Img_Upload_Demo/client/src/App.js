import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("http://localhost:8080/upload", formData);
            console.log('File uploaded successfully', response.data);
        } catch (error) {
            console.error("There was an error uploading the file", error);
        }
    };

    return (
        <div className="App">
            <h2>Upload Image</h2>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>
        </div>
    );
}

export default App;

