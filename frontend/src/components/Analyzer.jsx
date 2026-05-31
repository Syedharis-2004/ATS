import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Analyzer = ({ resumeId, fileName, onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8001/api/analyze_resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_id: resumeId,
          job_description: jobDescription
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      onAnalysisComplete(data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="glass-panel animate-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>2. Analyze against Job Description</h2>
        <div style={{ fontSize: '0.9rem', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }}></span>
          Resume active: {fileName}
        </div>
      </div>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Paste the job description you want to apply for below.</p>
      
      <textarea 
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="e.g. We are looking for a Senior Software Engineer with experience in Python, React, and AWS..."
      />
      
      {error && (
        <div style={{ color: 'var(--danger)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {isAnalyzing ? (
            'Analyzing...'
          ) : (
            <>
              <Search size={18} />
              Analyze Match
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Analyzer;
