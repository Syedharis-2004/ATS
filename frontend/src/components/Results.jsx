import React from 'react';
import { CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const Results = ({ results, onReset }) => {
  const { ats_score, matched_skills, missing_skills } = results;

  // Determine color based on score
  let scoreColor = 'var(--danger)';
  if (ats_score >= 75) scoreColor = 'var(--success)';
  else if (ats_score >= 40) scoreColor = 'var(--warning)';

  return (
    <div className="glass-panel animate-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <BarChart3 color="var(--primary)" />
          Analysis Results
        </h2>
        <button 
          onClick={onReset}
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: 'none', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          Start Over
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Score Section */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: 'var(--radius-md)', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--surface-border)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>ATS Match Score</h3>
          
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `conic-gradient(${scoreColor} ${ats_score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: `0 0 20px ${scoreColor}40`
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: 'var(--bg-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <span style={{ fontSize: '3rem', fontWeight: '700', color: scoreColor, lineHeight: 1 }}>{ats_score}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
            </div>
          </div>
          
          <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            {ats_score >= 75 ? 'Great match! Your resume is highly tailored to this role.' : 
             ats_score >= 40 ? 'Fair match. Consider adding some of the missing keywords.' : 
             'Low match. Significant tailoring is recommended for this position.'}
          </p>
        </div>

        {/* Skills Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--surface-border)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
              <CheckCircle size={20} />
              Matched Skills ({matched_skills.length})
            </h3>
            {matched_skills.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {matched_skills.map((skill, i) => (
                  <span key={i} style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    color: 'var(--success)', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No skills matched with the job description.</p>
            )}
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--surface-border)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', marginBottom: '1rem' }}>
              <XCircle size={20} />
              Missing Keywords ({missing_skills.length})
            </h3>
            {missing_skills.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {missing_skills.map((skill, i) => (
                  <span key={i} style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: '#fca5a5', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Great job! You have all the required skills.</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Results;
