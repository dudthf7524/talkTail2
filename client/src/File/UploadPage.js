import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);

        const newUrls = selectedFiles.map(file => URL.createObjectURL(file));
        const updatedUrls = [...previewUrls, ...newUrls];
        setPreviewUrls(updatedUrls);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select files first!');
            return;
        }

        if (mainImageIndex === null) {
            alert('Please select a main image!');
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            if (index === mainImageIndex) {
                formData.append('main', file);
            } else {
                formData.append('details', file);
            }
        });

        try {
            const response = await axios.post(`${apiUrl}/api/img/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Files uploaded successfully:', response.data);
            alert('Files uploaded successfully!');
            setFiles([]);
            setPreviewUrls([]);
            setMainImageIndex(null);
            setFileInputKey(Date.now()); // Reset file input key
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files');
        }
    };

    const handleDelete = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedUrls = previewUrls.filter((_, i) => i !== index);

        URL.revokeObjectURL(previewUrls[index]);

        setFiles(updatedFiles);
        setPreviewUrls(updatedUrls);

        if (index === mainImageIndex) {
            setMainImageIndex(null);
        } else if (index < mainImageIndex) {
            setMainImageIndex(mainImageIndex - 1);
        }

        setFileInputKey(Date.now()); // Reset file input key
    };

    return (
        <div>
            <input key={fileInputKey} type="file" multiple onChange={handleFileChange} />
            <div style={{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }}>
                {previewUrls.map((url, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img
                            src={url}
                            alt={`preview-${index}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                border: mainImageIndex === index ? '2px solid #f0663f' : '2px solid #c4c4c4',
                                cursor: 'pointer',
                                padding: '5px',
                                marginLeft: '22px'
                            }}
                            onClick={() => setMainImageIndex(index)}
                        />
                        <button
                            onClick={() => handleDelete(index)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                backgroundColor: '#f0663f',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleUpload} style={{ marginTop: '10px' }}>Upload Files</button>
        </div>
    );
};

export default FileUpload;
