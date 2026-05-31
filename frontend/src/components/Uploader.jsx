import React, { useCallback, useState } from 'react';
import { UploadCloud, File as FileIcon, X, CheckCircle } from 'lucide-react';

const Uploader = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOCX, or TXT file.");
      return;
    }
    setFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8001/api/upload_resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data.resume_id, file.name);
    } catch (err) {
      setError("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2>1. Upload Resume</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Upload your resume in PDF or DOCX format.</p>
      
      {!file ? (
        <div 
          style={{
            border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--surface-border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            backgroundColor: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'rgba(15, 23, 42, 0.4)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <UploadCloud size={48} color={isDragging ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: isDragging ? 'var(--primary)' : 'var(--text-main)' }}>
            Drag & drop your file here
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>or click to browse files</p>
          <input 
            type="file" 
            id="file-upload" 
            style={{ display: 'none' }} 
            onChange={handleChange}
            accept=".pdf,.docx,.txt"
          />
        </div>
      ) : (
        <div className="animate-in" style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <FileIcon size={24} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={clearFile}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              title="Remove file"
            >
              <X size={20} />
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Use this Resume'}
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div style={{ color: 'var(--danger)', marginTop: '1rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Uploader;
