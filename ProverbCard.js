import React from 'react';

export default function ProverbCard({ name, proverb }) {
  return (
    <div className="proverb mb-3">
      <strong>Hello {name}</strong>
      <p className="mb-0"><em>{proverb?.text}</em></p>
      <small className="text-muted">{proverb?.source || ''}</small>
    </div>
  );
}
