import React, { useState } from 'react';
import Hero from './components/Hero';
import Uploader from './components/Uploader';
import Analyzer from './components/Analyzer';
import Results from './components/Results';
import './index.css';

function App() {
  const [resumeId, setResumeId] = useState(null);
  const [fileName, setFileName] = useState('');
  const [results, setResults] = useState(null);

  const handleUploadSuccess = (id, name) => {
    setResumeId(id);
    setFileName(name);
    setResults(null);
  };

  const handleAnalysisComplete = (data) => {
    setResults(data);
  };

  const resetAll = () => {
    setResumeId(null);
    setFileName('');
    setResults(null);
  };

  return (
    <div className="container">
      <Hero />
      
      {!results ? (
        <>
          <Uploader onUploadSuccess={handleUploadSuccess} />
          
          {resumeId && (
            <Analyzer 
              resumeId={resumeId} 
              fileName={fileName} 
              onAnalysisComplete={handleAnalysisComplete} 
            />
          )}
        </>
      ) : (
        <Results results={results} onReset={resetAll} />
      )}
    </div>
  );
}

export default App;
