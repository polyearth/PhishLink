import React from 'react';
import { createRoot } from 'react-dom/client';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

// Function to create SVG icons for the extension
const GenerateIcons = () => {
  // You can modify these colors to match your extension theme
  const primaryColor = '#1565c0';
  
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <h1>PhishGuard Icons</h1>
      
      <div>
        <h2>Standard Icon</h2>
        <Shield size={128} color={primaryColor} strokeWidth={2} />
      </div>
      
      <div>
        <h2>Safe Icon</h2>
        <ShieldCheck size={128} color="#2e7d32" strokeWidth={2} />
      </div>
      
      <div>
        <h2>Warning Icon</h2>
        <ShieldAlert size={128} color="#c62828" strokeWidth={2} />
      </div>
      
      <p>
        After rendering these icons, you can save them as PNG files to use in your extension.
        Right-click each icon and select "Save Image As..." to save them to your extension's icons folder.
      </p>
    </div>
  );
};

// Render the component
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <GenerateIcons />
    </React.StrictMode>
  );
}

export default GenerateIcons;