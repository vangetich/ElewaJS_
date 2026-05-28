function authFetch(url, opts = {}) {
  const token = localStorage.getItem('elewa_token');
  const headers = opts.headers || {};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return fetch(url, { ...opts, headers }).then(r => r.json());
}

const API = {
  getLanguages: () => fetch('/api/languages').then(r => r.json()),
  signup: (payload) => fetch('/api/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  }).then(r => r.json()),
  login: (payload) => fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  }).then(r => r.json()),
  getProverb: (lang) => authFetch(`/api/proverb?lang=${encodeURIComponent(lang)}`),
  getBooks: (ageGroup, lang) => authFetch(`/api/books?ageGroup=${encodeURIComponent(ageGroup)}&lang=${encodeURIComponent(lang)}`),
  getFAQ: (lang) => authFetch(`/api/faq?lang=${encodeURIComponent(lang)}`),
  getActivities: () => authFetch('/api/activities'),
  getUser: (id) => authFetch(`/api/user/${id}`),
  verifyConsent: (token) => fetch(`/api/consent/verify?token=${encodeURIComponent(token)}`).then(r => r.json()),
  submitActivity: (payload) => authFetch('/api/activities/submit', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
};

export default API;
