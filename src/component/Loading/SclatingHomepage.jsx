import React from "react";
import "./SclatingHomepage.css";

const SclatingHomepage = () => {
  return (
    <div className="contsjh">
      <header>
        <div className="skeleton skeleton-logo"></div>

        <div className="skeleton-nav">
          <div className="skeleton skeleton-nav-item"></div>
          <div className="skeleton skeleton-nav-item"></div>
          <div className="skeleton skeleton-nav-item"></div>
          <div className="skeleton skeleton-nav-item"></div>
        </div>
      </header>

      <div className="skeleton skeleton-hero"></div>

      <div className="conntm-wrapper">
        <main>
          <section>
            <div className="skeleton skeleton-section-header"></div>

            <div className="skeleton-card-grid">
              {[1, 2, 3].map((item) => (
                <div key={item} className="skeleton-card">
                  <div className="skeleton skeleton-card-img"></div>
                  <div className="skeleton skeleton-card-title"></div>
                  <div className="skeleton skeleton-card-text"></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="skeleton skeleton-section-header"></div>

            <div className="skeleton-card-grid">
              {[1, 2].map((item) => (
                <div key={item} className="skeleton-card">
                  <div className="skeleton skeleton-card-img"></div>
                  <div className="skeleton skeleton-card-title"></div>
                  <div className="skeleton skeleton-card-text"></div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside>
          <div className="skeleton skeleton-sidebar"></div>
        </aside>
      </div>
    </div>
  );
};

export default SclatingHomepage;