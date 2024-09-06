import React, { useState } from 'react';

const UploadPage = () => {
  const [folder, setFolder] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFolderChange = (event) => setFolder(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('email', email);
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/techLibrary/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setError('');
      } else {
        setError(result.error);
        setMessage('');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file');
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={folder}
          onChange={handleFolderChange}
          placeholder="Folder"
          required
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UploadPage;