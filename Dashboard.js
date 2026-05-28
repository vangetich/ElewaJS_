import React, { useEffect, useState } from 'react';
import API from '../api';
import ProverbCard from './Shared/ProverbCard';

function isMinor(ageGroup) {
  return ageGroup && (ageGroup === '5-12' || ageGroup === '13-17');
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [proverb, setProverb] = useState({});
  const [books, setBooks] = useState([]);
  const [faq, setFaq] = useState([]);
  const [activities, setActivities] = useState([]);
  const [lang, setLang] = useState('english');
  const [consentPending, setConsentPending] = useState(false);

  useEffect(() => {
    const uid = sessionStorage.getItem('elewa_user');
    if (uid) {
      API.getUser(uid).then(r => {
        if (r.user) {
          setUser(r.user);
          setLang(r.user.language === 'motherTongue' ? 'motherTongue' : r.user.language || 'english');
          setConsentPending(!!r.user.consentPending);
        }
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const language = lang || (user ? (user.language === 'motherTongue' ? 'motherTongue' : user.language) : 'english');
    API.getProverb(language).then(j => setProverb(j.proverb || {}));
    const age = user ? user.ageGroup : '5-12';
    API.getBooks(age, language).then(j => setBooks(j.books || []));
    API.getFAQ(language).then(j => setFaq(j.faq || []));
    API.getActivities().then(j => setActivities(j.activities || []));
  }, [user, lang]);

  const name = user ? user.name.split(' ')[0] : 'Friend';

  return (
    <div>
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">ELEWA</span>
          <div style={{ width: 220 }}>
            <select className="form-select form-select-sm" value={lang} onChange={e => setLang(e.target.value)}>
              <option value="motherTongue">Mother Tongue</option>
              <option value="kiswahili">Kiswahili</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <ProverbCard name={name} proverb={proverb} />

        {consentPending && isMinor(user?.ageGroup) && (
          <div className="alert alert-warning">Parental consent is pending. Activities are disabled until consent is verified.</div>
        )}

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card p-3">
              <h5>How-to Guide</h5>
              <div>
                {user?.ageGroup === '13-17' ? (
                  <p><strong>13–17 years</strong> — Focus on critical reading and writing. Daily: 10 min vocab, 20–30 min reading, 10 min writing prompt.</p>
                ) : (
                  <p><strong>5–12 years</strong> — Focus on phonics, short stories, picture books. Daily: 5 min phonics, 10–15 min guided reading, 5 min vocab game.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3">
              <h5>Books (age-appropriate)</h5>
              <ul className="list-unstyled mb-0">
                {books.map(b => <li key={b.id}><strong>{b.title}</strong> — {b.author}</li>)}
              </ul>
            </div>
          </div>

          <div className="col-12">
            <div className="card p-3">
              <h5>Activities Hub</h5>
              {activities.map(a => (
                <div key={a.id} className="mb-2">
                  <strong>{a.title}</strong> <span className="text-muted">({a.type}, {a.level})</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary mt-1" onClick={() => {
                      if (isMinor(user?.ageGroup) && user?.consentPending) {
                        alert('Parental consent required to participate in activities.');
                        return;
                      }
                      alert('Enter: ' + a.id);
                    }}>Enter</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12">
            <div className="card p-3">
              <h5>FAQ</h5>
              {faq.map((f, i) => (
                <div key={i} className="mb-2">
                  <strong>{f.q}</strong>
                  <div className="text-muted">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
