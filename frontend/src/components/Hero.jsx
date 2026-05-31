import React from 'react';
import { FileSearch } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero animate-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{ 
          background: 'rgba(139, 92, 246, 0.2)', 
          padding: '1rem', 
          borderRadius: '50%',
          display: 'inline-flex'
        }}>
          <FileSearch size={48} color="var(--primary)" />
        </div>
      </div>
      <h1>AI Resume Analyzer</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        Instantly evaluate your resume against any job description. 
        Our AI extracts skills, calculates your ATS score, and reveals missing keywords to help you land the interview.
      </p>
    </div>
  );
};

export default Hero;
