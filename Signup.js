import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup() {
  const nav = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [form, setForm] = useState({
    name: '', ageGroup: '5-12', language: 'english', motherTongue: '', learning: [], password: '', parentEmail: ''
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.getLanguages().then(j => setLanguages(j.languages || []));
  }, []);

  function toggleLearning(value) {
    setForm(prev => {
      const arr = prev.learning.includes(value) ? prev.learning.filter(x => x !== value) : [...prev.learning, value];
      return { ...prev, learning: arr };
    });
  }

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    const payload = { ...form };
    const res = await API.signup(payload);
    if (res.token) {
      localStorage.setItem('elewa_token', res.token);
      sessionStorage.setItem('elewa_user', res.user.id);
      nav('/dashboard');
    } else if (res.consent) {
      setMsg(`Consent required. For prototype: token=${res.consent.consentToken}. Parent email: ${res.consent.parentEmail}`);
    } else {
      setMsg(res.message || 'Signup failed');
    }
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <h2 className="card-title">Create profile</h2>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Age group</label>
              <select className="form-select" value={form.ageGroup} onChange={e => setForm({...form, ageGroup: e.target.value})}>
                <option value="5-12">5–12 years</option>
                <option value="13-17">13–17 years</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Language</label>
              <select className="form-select" value={form.language} onChange={e => setForm({...form, language: e.target.value})}>
                <option value="kiswahili">Kiswahili</option>
                <option value="english">English</option>
                <option value="motherTongue">Mother Tongue</option>
              </select>
            </div>

            {form.language === 'motherTongue' && (
              <div className="mb-3">
                <label className="form-label">Select Mother Tongue</label>
                <select className="form-select" value={form.motherTongue} onChange={e => setForm({...form, motherTongue: e.target.value})}>
                  <option value="">-- choose --</option>
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Learning options</label><br />
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={form.learning.includes('reading')} onChange={() => toggleLearning('reading')} />
                <label className="form-check-label">Reading</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" checked={form.learning.includes('writing')} onChange={() => toggleLearning('writing')} />
                <label className="form-check-label">Writing</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>

            {(form.ageGroup === '5-12' || form.ageGroup === '13-17') && (
              <div className="mb-3">
                <label className="form-label">Parent / Guardian Email</label>
                <input className="form-control" value={form.parentEmail} onChange={e => setForm({...form, parentEmail: e.target.value})} required />
              </div>
            )}

            <button className="btn btn-success w-100" type="submit">Continue to Dashboard</button>
          </form>
          {msg && <div className="mt-3 text-info">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
