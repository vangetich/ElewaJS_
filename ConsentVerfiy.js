import React, { useState } from 'react';
import API from '../api';

export default function ConsentVerify() {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');

  async function verify() {
    setMsg('');
    const res = await API.verifyConsent(token);
    if (res.userId) setMsg('Consent verified for user ' + res.userId);
    else setMsg(res.message || 'Verification failed');
  }

  return (
    <div className="container py-4">
      <div className="card mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body">
          <h5>Parent / Guardian Consent</h5>
          <p>Enter the consent token provided to you to verify parental consent (prototype).</p>
          <input className="form-control mb-2" value={token} onChange={e => setToken(e.target.value)} />
          <button className="btn btn-success" onClick={verify}>Verify Consent</button>
          {msg && <div className="mt-3">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
