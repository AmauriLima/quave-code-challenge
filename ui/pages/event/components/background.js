import React from 'react';

export function Background() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/10 to-pink-800/10 animate-pulse" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 40px 40px, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        animation: 'float 20s ease-in-out infinite',
      }} />
    </div>
  );
}