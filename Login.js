import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    const res = await API.login(form);
    if (res.token) {
      localStorage.setItem('elewa_token', res.token);
      if (res.user && res.user.id) sessionStorage.setItem('elewa_user', res.user.id);
      nav('/dashboard');
    } else if (res.consentPending) {
      setMsg('Parental consent required. Parent email: ' + (res.parentEmail || ''));
    } else {
      setMsg(res.message || 'Login failed');
    }
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: 480 }}>
        <div className="card-body">
          <h3>Login</h3>
          <form onSubmit={submit}>
            <div className="mb-2">
              <label className="form-label">Email (or leave blank to use name)</label>
              <input className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="mb-2">
              <label className="form-label">Name (optional)</label>
              <input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <button className="btn btn-success w-100" type="submit">Login</button>
          </form>
          {msg && <div className="mt-3 text-danger">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
