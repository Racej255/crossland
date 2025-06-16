---
layout: default
title: "House Crossland"
---

<!-- Mobile Events Section -->
<div class="mobile-events sidebar-box">
  <h3>Upcoming Events</h3>
  <div class="event-date">E2 - June 13–15, 2025</div>
  <p>Join us for the opening of the new gambling and drinking season!</p>
  <div class="event-date">E3 - July 25–27, 2025</div>
  <p>Summer games and festivities at The Yeoman's End</p>
  <div class="event-date">E4 - September 12–14, 2025</div>
  <p>Wassail Festival and year-end celebrations</p>
  <div class="special-event">
    <div class="event-date">Grand Crossland Gala - January 2026</div>
    <p>A special player-run event celebrating Marcus Crossland's birthday!</p>
    <a href="/gala/">Learn More</a>
  </div>
</div>

<main>
  <div class="content">
    <section id="about">
      <h2>Who We Are</h2>
      <div class="quote">
        "A handshake can be worth more than gold... if you know whose hand to shake." — Marcus Crossland
      </div>
      <h3>In‑Game</h3>
      <p>House Crossland is well‑connected, resourceful, and immersed in the undercurrents of power and influence…</p>
      <h3>Out‑of‑Game</h3>
      <p>We’re a group of players who value camaraderie, assistance, and plenty of roleplaying opportunities…</p>
    </section>

    <section id="members">
      <h2>Our Members</h2>
      <div class="member-list">
        <!-- Repeat for each portrait as in the original -->
        <div class="member-card" onclick="openLightbox(event, 'portraits/elias.png')">
          <img src="/assets/images/portraits/elias.png" alt="Elias Reede">
          <div class="member-info">
            <h4>Elias Reede</h4>
            <p>Master of Cudgels</p>
            <p>Curator of Brawn</p>
          </div>
        </div>
        <!-- …other member cards… -->
      </div>
    </section>

    <section id="gallery">
      <h2>Gallery</h2>
      <p>Moments captured from our adventures in the Empire.</p>
      <div class="gallery">
        <!-- Gallery thumbnails as in original -->
        <div class="gallery-item" onclick="openLightbox(event, 'gallery/camp.png')">
          <img src="/assets/images/gallery/camp.png" alt="Yeoman's End Tavern">
        </div>
        <!-- …other gallery items… -->
      </div>
    </section>

    <section id="history">
      <button onclick="toggleHistory()">Toggle History</button>
      <div class="history-content" id="historyContent" style="display:none;">
        <!-- Full historical content paragraphs… -->
        <h3>The Rise of House Crossland</h3>
        <p>The name Crossland was not always known in the Marches…</p>
        <!-- …rest… -->
      </div>
    </section>

    <section id="join">
      <h2>Join House Crossland</h2>
      <p>Interested in joining our house? We're always on the lookout for individuals who understand the value of connections and opportunity.</p>
      <p>Find us at The Yeoman’s End in the Marches area or contact us below.</p>
    </section>

    <section id="contact">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:housecrossland@gmail.com">housecrossland@gmail.com</a></p>
    </section>
  </div>
</main>

<a href="#" class="back-to-top">↑</a>

<!-- Lightbox Modal -->
<div id="lightbox" class="lightbox">
  <span class="close-btn" onclick="closeLightbox()">×</span>
  <img id="lightbox-img" class="lightbox-img" alt="Expanded view">
  <button class="prev-btn" onclick="prevGalleryImage(event)">←</button>
  <button class="next-btn" onclick="nextGalleryImage(event)">→</button>
</div>

<!-- Soup Modal -->
<div id="soupModal" class="lightbox">
  <span class="close-btn" onclick="closeSoupModal(event)">×</span>
  <div class="soup-content">
    <!-- Full soup recipe as in original… -->
  </div>
</div>
