import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Fake Store. All rights reserved.</p>
        <small>
          Designed & Developed by <strong>Suhib Shaltaf</strong> — Powered by React & FakeStoreAPI
        </small>
      </div>
    </footer>
  );
}

export default Footer;
