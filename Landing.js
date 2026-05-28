import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const nav = useNavigate();

  useEffect(() => {
    document.title = 'ELEWA — Understand. Connect. Read. Write.';
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/" aria-label="ELEWA home">ELEWA</a>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-success"
              onClick={() => nav('/signup')}
              aria-label="Get started with ELEWA"
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => nav('/login')}
              aria-label="Login to ELEWA"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <header className="header-hero py-5" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-white">
              <h1 className="display-5 fw-bold">Understand. Connect. Read. Write.</h1>
              <p className="lead">
                ELEWA brings clarity to reading and writing, building stronger connections across Kenya — simple, respectful, human.
              </p>
              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-lg btn-light text-success" onClick={() => nav('/signup')} aria-label="Join ELEWA now">
                  Join Now
                </button>
                <button className="btn btn-lg btn-outline-light text-white" onClick={() => nav('/login')} aria-label="Learn more and login">
                  Learn More
                </button>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  height: 220,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg,#fff7ef,#eefaf3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2b6a3a',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="18" rx="2" stroke="#2b6a3a" strokeWidth="1.2" fill="none"/>
                    <path d="M7 8h10M7 12h6" stroke="#2b6a3a" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div className="mt-2 fw-semibold">Reading & Writing for Every Child</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main role="main">
        <section id="features" className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold mb-4">Why ELEWA?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success">🌍 Local Context</h5>
                    <p className="card-text">Content tailored to give young Kenyans voice in their languages and culture.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success">⚡ Fast & Light</h5>
                    <p className="card-text">Optimized for mobile-first and low bandwidth environments.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-success">🔒 Privacy First</h5>
                    <p className="card-text">Minimal data collection with clear user control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="py-5 bg-light">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">Our Vision</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
              The ELEWA App empowers young learners to read and write in communities across Kenya with clarity, discipline, and respect.
            </p>
          </div>
        </section>

        <section id="signup" className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">Get Early Access</h2>
            <form
              className="d-flex flex-wrap justify-content-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks — we will send an invite when available.');
              }}
            >
              <input
                type="tel"
                className="form-control w-auto"
                placeholder="Enter your mobile number"
                required
                aria-label="Mobile number"
                style={{ minWidth: 220 }}
              />
              <button type="submit" className="btn btn-success">Request Invite</button>
            </form>
            <p className="text-muted small mt-2">We only use your mobile number to invite you. No texting spam.</p>
          </div>
        </section>

        <section id="partners" className="py-5 bg-light">
          <div className="container text-center">
            <h2 className="fw-bold mb-4">Our Community & Partners</h2>
            <p className="text-muted mb-5">We collaborate with organizations and communities across Africa to build meaningful digital experiences.</p>

            <div className="row g-4 justify-content-center">
              <div className="col-6 col-md-3">
                <img src="/assets/partner-1.svg" className="img-fluid partner-logo" alt="Partner 1" />
              </div>
              <div className="col-6 col-md-3">
                <img src="/assets/partner-2.svg" className="img-fluid partner-logo" alt="Partner 2" />
              </div>
              <div className="col-6 col-md-3">
                <img src="/assets/partner-3.svg" className="img-fluid partner-logo" alt="Partner 3" />
              </div>
            </div>

            <p className="mt-4">
              <a href="#contact" className="btn btn-outline-success">Work With Us</a>
            </p>
          </div>
        </section>

        <section id="stories" className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold mb-4">Community Stories</h2>
            <p className="text-muted mb-5">Real voices from across Kenya, sharing how ELEWA makes a difference.</p>

            <div id="testimonialCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-pause="hover">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="testimonial-card shadow-sm p-4 mx-auto" style={{ maxWidth: 600 }}>
                    <p className="quote">“ELEWA helped me improve my writing to connect with local farmers and share insights in my own language.”</p>
                    <p className="author fw-bold mb-0">— Kebeneti, Kericho</p>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="testimonial-card shadow-sm p-4 mx-auto" style={{ maxWidth: 600 }}>
                    <p className="quote">“It’s simple, fast, and respects our culture. I feel heard.”</p>
                    <p className="author fw-bold mb-0">— Kwale, Mombasa</p>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="testimonial-card shadow-sm p-4 mx-auto" style={{ maxWidth: 600 }}>
                    <p className="quote">“ELEWA gave our community clarity and confidence to act together to help establish good literacy levels.”</p>
                    <p className="author fw-bold mb-0">— Siaya, Kisumu</p>
                  </div>
                </div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev" aria-label="Previous testimonial">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next" aria-label="Next testimonial">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-3 bg-dark text-white text-center">
        <p className="mb-0">© 2026 ELEWA — Built with respect for Africa</p>
      </footer>
    </div>
  );
}
