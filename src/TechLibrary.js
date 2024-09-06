import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TechLibrary.css"; // Add custom styles

function TechLibrary({ role }) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]); // Holds files from the database

  const folders = [
    { name: "Projects" },
    { name: "Papers" },
    { name: "Placement Resources" },
  ];

  // Fetch files from the server when a folder is selected
  const handleFolderClick = async (folderName) => {
    setSelectedFolder(folderName);
    
    try {
      const response = await fetch(`http://localhost:5000/techLibrary/files/${folderName}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      const files = await response.json();
      setFolderFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', selectedFolder);

      try {
        const response = await fetch('http://localhost:5000/techLibrary/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to upload file');
        const result = await response.json();
        setUploadedFileName(file.name);
        alert(result.message);
        
        // Refresh the file list after uploading
        handleFolderClick(selectedFolder);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    }
  };

  // Handle removing uploaded file
  const handleRemoveFile = () => {
    setUploadedFileName(null);
  };

  return (
    <div className="container tech-library-container mt-4">
      {!selectedFolder ? (
        <div className="row">
          {folders.map((folder, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="folder" onClick={() => handleFolderClick(folder.name)}>
                <h3>{folder.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="folder-content">
          <h2>{selectedFolder}</h2>
          <button className="btn btn-secondary mb-3" onClick={() => setSelectedFolder(null)}>
            Back to Folders
          </button>

          {/* List of uploaded files */}
          <div className="uploaded-files">
            {folderFiles.length > 0 ? (
              <ul>
                {folderFiles.map((file, index) => (
                  <li key={index}>
<a href={`http://localhost:5000/upload/${file.fileName}`} download>{file.fileName}</a>
</li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>

          {/* Upload Section (Only for Alumni) */}
          {role === "alumni" && (
            <div className="file-upload-section mt-3">
              <label htmlFor="file-upload" className="btn btn-primary">+ Upload New File</label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {uploadedFileName && (
                <div className="uploaded-file mt-2">
                  <span>{uploadedFileName}</span>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TechLibrary;