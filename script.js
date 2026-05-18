/*
 * Interactive behaviours for House Crossland site
 *
 * This script powers the member modal overlay.  When a user clicks on
 * a member card the corresponding data is looked up from the
 * `membersData` map defined below and the modal is populated with a
 * larger portrait, title and descriptive text.  The modal can be
 * closed by clicking the close icon or anywhere outside the content.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('member-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');
  // Legacy description element no longer used; replaced by structured fields.
  // const modalDesc = document.getElementById('modal-desc');
  // Elements for the structured modal content
  const modalLocation = document.getElementById('modal-location');
  const modalAboutTitle = document.getElementById('modal-about-title');
  const modalAbout = document.getElementById('modal-about');
  const modalSkills = document.getElementById('modal-skills');
  const closeBtn = document.getElementById('modal-close');

  // Data describing each member.  You can extend this object with
  // additional members or adjust the descriptions without touching the
  // HTML markup.  If you provide higher‑resolution hero images for
  // members other than Marcus, specify the path in the `hero` field.
 const membersData = {
  marcus: {
    name: 'Marcus Crossland',
    role: 'House Steward – Purveyor of Pleasures',
    hero: 'members/marcus-hero.png',
    thumbnail: 'members/marcus.png',
    location: 'Crossland Estate, Mitwold',
    about: 'As Steward of House Crossland, Marcus is the mind and muscle behind the House.\n\nA respected narcotics wholesaler and negotiator, Marcus controls trade routes that run throughout the continent, distributing potions and powders alike across the Empire and beyond.\n\nHis ink seals contracts, his words forge alliances, and his dice decide fates.',
    skills: 'Deal-making · Leadership · Cunning',
    category: 'active'
  },

  bron: {
    name: 'Bron Ashwood',
    role: 'Second in Command – “Iron Ass”',
    hero: 'members/bron-hero.png',
    thumbnail: 'members/bron.png',
    location: 'Bel End, Upwold',
    about: 'Bron “Iron Ass” Ashwood is Marcus’s right hand - loyal, tough, and stubborn as they come. He keeps the trade running smooth, from scratch-cards to street deals, and isn’t afraid to get his hands dirty doing it.\nHe’s not the sharpest knife in the drawer, but he’s got charm, muscle, and a knack for keeping people in line.',
    skills: 'Loyalty · Charisma · Muscle · Intimidation',
    category: 'active'
  },

  elias: {
    name: 'Elias Reede',
    role: 'House Enforcer – “The Reliable Drunk”',
    hero: 'members/elias-hero.png',
    thumbnail: 'members/elias.png',
    location: 'The Yeoman’s End, Mitwold',
    about: 'Elias Reede can drink a tavern dry and still be the first to swing when trouble starts. He’s loud, lazy, and built like a brick barn - but when the House needs muscle, he’s already standing behind you, sword in hand.\nHe’s saved Marcus’s hide more than once, and no one’s daft enough to forget it.',
    skills: 'Strength · Swordsmanship · Loyalty · Intimidation',
    category: 'active'
  },

  maxwell: {
    name: '“Daddy” Maxwell',
    role: 'Chief Chef of the House – Captain of the Fleet',
    hero: 'members/maxwell-hero.png',
    thumbnail: 'members/maxwell.png',
    location: 'Roaming the Seas of the Empire',
    about: '“Daddy” Maxwell runs the Crossland fleet and keeps the crew fed along the way. A gentle giant with a pot in one hand and a ship’s wheel in the other, he’s known as the most honest Crossland - though that’s a low bar to clear.\nHis stew’s legendary, his word’s good, and no one leaves his galley hungry or unhappy.',
    skills: 'Seamanship · Cooking · Leadership · Integrity',
    category: 'active'
  },

  bill: {
    name: 'Boggy Bill',
    role: 'Swamp Rat – Scallywag of Bregasland',
    hero: 'members/bill-hero.png',
    thumbnail: 'members/bill.png',
    location: 'The Marshes of Bregasland',
    about: 'Boggy Bill runs a pack of misfits out in the Bregasland swamps, doing whatever jobs pay best and asking few questions. He’s an odd one - half rumour, half man - and hasn’t been seen in some time.\nLast anyone heard, he was knee-deep in the bogs and grinning about it.',
    skills: 'Survival · Leadership · Disappearing Acts · Improvisation',
    category: 'missing'
  },

  dick: {
    name: 'Richard “Dick” Roper',
    role: 'Sweetie Merchant – Keeper of Kegs',
    hero: 'members/dick-hero.png',
    thumbnail: 'members/dick.png',
    location: 'Wandering between Meade & The Crossland Estate, Mitwold',
    about: 'Dick Roper keeps spirits high and shelves stocked. Whether he’s pouring a pint or selling hard candies by the sack, he’s the man who brings a bit of sweetness to Crossland life.\nAlways smiling, always ready for a chat, he’s the first to lend a hand when the House needs one.',
    skills: 'Brewing · Trade · Hospitality · Morale-boosting',
    category: 'active'
  },

  joshua: {
    name: 'Joshua Stone',
    role: 'Captain of Arms – Protector of the House',
    hero: 'members/joshua-hero.png',
    thumbnail: 'members/joshua.png',
    location: 'Graven Rock, Bregasland',
    about: 'Joshua Stone is a soldier through and through. He trains the House’s footsoldiers, keeps our weapons sharp, and makes sure our battles are fought smart as well as hard.\nA steady hand and a straight arrow, Joshua keeps the Crosslands safe - and mostly on the right side of the law.',
    skills: 'Military Command · Training · Strategy · Discipline',
    category: 'active'
  },

  sadie: {
    name: 'Sadie Raine',
    role: 'House Magician – Provider of Shortbread',
    hero: 'members/sadie-hero.png',
    thumbnail: 'members/sadie.png',
    location: 'Bel End, Upwold',
    about: 'Sadie Raine handles the House’s magical business - from charms and potions to the occasional cursebreaker. When she’s not weaving spells, she’s baking shortbread that could probably stop a war.\nQuiet, clever, and always in demand, Sadie keeps Crossland luck on the right side of fortune.',
    skills: 'Enchantment · Potions · Charmcraft · Baking',
    category: 'active'
  },

  kas: {
    name: 'Kaspian',
    role: 'Militia Liaison – Cocktail Curator & Herby Guy',
    hero: 'members/kaspian-hero.png',
    thumbnail: 'members/kaspian.png',
    location: 'Bel End, Upwold',
    about: 'An immigrant from the Brass Coast, Kaspian’s as handy with herbs as he is with a hammer. A skilled healer and cocktail curator, he keeps Crossland fighters on their feet - whether on the battlefield or at the bar.\nThrough his position in the militia, he protects the House in legal matters, and when a scheme or adventure is brewing, Kaspian’s never far behind.',
    skills: 'Healing · Mixology · Combat Support · Legal Savvy',
    category: 'active'
  },

  agnesmaybel: {
    name: 'Agnes & Maybel',
    role: 'Twin Tricksters – Faces of the House',
    hero: 'members/agnesmaybel-hero.png',
    thumbnail: 'members/agnesmaybel.png',
    location: 'Bel End, Upwold',
    about: 'Agnes and Maybel came to the Crosslands together and haven’t stopped causing mischief since. Agnes works at the academy, shaping the next generation of Crossland troublemakers, while Maybel plays the saint - running community projects and convincing the Marches we’re model citizens.\nTwo halves of the same grin, they make chaos look charming.',
    skills: 'Manipulation · Teaching · Deception · Performance',
    category: 'active'
  },

  harold: {
    name: 'Harold',
    role: 'House Runner – Performer & Negotiator',
    hero: 'members/harold-hero.png',
    thumbnail: 'members/harold.png',
    location: 'The Crossland Estate, Mitwold',
    about: 'Harold started in Upwold but caught Marcus’s eye early on. Now he runs deals, carries word, and keeps spirits high around the hall with a tune or a tale.\nHe’s got the trust of the Steward and the charm to win over anyone else.',
    skills: 'Negotiation · Performance · Discretion · Street Sense',
    category: 'active'
  },

  maud: {
    name: 'Maud',
    role: 'Battle Medic – Keeper of Order',
    hero: 'members/maud-hero.png',
    thumbnail: 'members/maud.png',
    location: 'Tending to her mana site in Upwold',
    about: 'Maud’s the one who keeps us alive - and in line. She’s fierce in a fight, sharper with her tongue, and the first to drag you back to your feet when you’ve overstepped.\nBattle-tested and unshakable, she keeps the Crosslands from tearing themselves apart.',
    skills: 'Healing · Combat · Leadership · Discipline',
    category: 'active'
  },

  aelfred: {
    name: 'Aelfred',
    role: 'House Courier – Merchant of Shadows',
    hero: 'members/aelfred-hero.png',
    thumbnail: 'members/aelfred.png',
    location: 'Between Upwold and Mitwold',
    about: 'Aelfred runs Marcus’s shipments and his own side ventures besides. Quick, clever, and hard to pin down, he’s turned running drugs into running deals - and earned a quiet place in the Steward’s trust.\nWherever profit moves, Aelfred’s already a step ahead.',
    skills: 'Trade · Smuggling · Adaptability · Networking',
    category: 'active'
  },

  lucy: {
    name: 'Lucy Friar',
    role: 'Tea Lady – Lady of Shallot',
    hero: 'members/lucy-hero.png',
    thumbnail: 'members/lucy.png',
    location: 'Bel End, Upwold',
    about: 'Lucy keeps the kettle warm, the cups full, and the gossip flowing. She might seem wholesome but behind that innocent exterior is the innards of a gremlin who will eat a whole raw onion faster than anybody else in Anvil.',
    skills: 'Tea · Hospitality · Gossip',
    category: 'active'
  },

  wendy: {
    name: 'Wendy Barfoot',
    role: 'Potion Master – Conclave Lover',
    hero: 'members/wendy-hero.png',
    thumbnail: 'members/wendy.png',
    location: 'Bel End, Upwold',
    about: 'A rare creature among the Crosslands, Wendy Barfoot can listen to Conclave business and remain both awake and interested. She brews the potions, studies her crafts, and insists that most she is absolutely not dodgy, honest.',
    skills: 'Potions · Crafting · Conclave Business',
    category: 'active'
  },

  mason: {
    name: 'Mason Manchester',
    role: 'False Steward – The Decoy of the House',
    hero: 'members/mason-hero.png',
    thumbnail: 'members/mason.png',
    location: 'Last seen around the Crossland Estate, Mitwold',
    about: 'Mason played the part of a legitimate steward to keep imperial eyes off Marcus and the real operation. Always above board, always polite - perhaps too much so.\nHe went missing not long after rumours started circling about his “official” position. No one’s sure if he ran, or if someone finally put the pieces together.',
    skills: 'Deception · Diplomacy · Nerve · Discretion',
    category: 'retired'
  },

  broadwick: {
    name: 'Robert Broadwick',
    role: 'House Co-Founder – Fallen in Battle',
    hero: 'members/broadwick-hero.png',
    thumbnail: 'members/broadwick.png',
    location: 'Broceliande',
    about: 'Robert Broadwick was one of the first to dream of House Crossland - brave, bold, and clever enough to make others believe it too.\nHe fell in battle in Broceliande, but every deal and oath the House makes still carries his mark.',
    skills: 'Leadership · Vision · Inspiration · Courage',
    category: 'dead'
  },

  anthony: {
    name: 'Anthony Bikker',
    role: 'Archer & Beekeeper – Maker of Poisons',
    hero: 'members/anthony-hero.png',
    thumbnail: 'members/anthony.png',
    location: 'Last seen somewhere between Navarr and Mitwold',
    about: 'Anthony Bikker could shoot the nipples off a Jotun from a mile away, and he probably did. Part archer, part alchemist, part beekeeper, he was a man of dangerous hobbies.\nHe went missing on his way to a Crossland meet - either lost, or found something worth staying lost for.',
    skills: 'Archery · Alchemy · Stealth · Patience',
    category: 'missing'
  },

  harvest: {
    name: 'Brother Harvest',
    role: 'Spiritual Advisor – Prophet of the Pot',
    hero: 'members/harvest-hero.png',
    thumbnail: 'members/harvest.png',
    location: 'Back in his ditch behind the Crossland Estate',
    about: 'Brother Harvest was a strange one - half preacher, half philosopher, wholly devoted to soup. He offered faith, counsel, and comfort until the day he was found dead, stabbed in the back by an imperial citizen while fighting for the Empire.\nWe still leave a bowl for him when the pot’s on.',
    skills: 'Preaching · Guidance · Cooking · Comfort',
    category: 'dead'
  },

  daz: {
    name: 'Daz Rock',
    role: 'Miner’s Champion – Fist of the People',
    hero: 'members/daz-hero.png',
    thumbnail: 'members/daz.png',
    location: 'Last seen leaving Anvil',
    about: 'Daz Rock fought for the rights of miners and the working folk. Tough, loud, and never shy of a scrap, he left Anvil in anger one night and never came back.\nSome say he vanished. Others say he’s still fighting somewhere - just under a different banner.',
    skills: 'Brawling · Rallying · Leadership · Endurance',
    category: 'missing'
  },

  hector: {
    name: 'Hector Greenfield',
    role: 'Enforcer – Dog’s Body',
    hero: 'members/hector-hero.png',
    thumbnail: 'members/hector.png',
    location: 'Last known whereabouts: on a job for the House',
    about: 'Hector never asked questions - just took orders and got them done. Sometimes he forgot to collect payment in his rush to prove useful.\nHe went out on a job and hasn’t been seen since, which could mean anything from “mission accomplished” to “buried with the target.”',
    skills: 'Obedience · Combat · Reliability · Discretion',
    category: 'missing'
  }
};

  // Prepare member cards and enable thumbnail images as well as modal navigation
  const memberCards = Array.from(document.querySelectorAll('.member-card'));
  let currentMemberIndex = 0;

  // helper function to populate and show the member modal
  function showMemberModal(key) {
    const data = membersData[key];
    if (!data) return;
    modalImg.src = data.hero;
    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalLocation.textContent = data.location || '';
    modalAboutTitle.textContent = `About\u00A0${data.name}`;
    modalAbout.innerHTML = (data.about || data.desc || '').replace(/\n/g, '<br>');
    modalSkills.textContent = data.skills || '';
    modal.classList.remove('hidden');
  }

  memberCards.forEach((card, index) => {
    const key = card.dataset.member;
    // set thumbnail if available
    if (membersData[key]) {
      // Prefer a dedicated thumbnail if provided; otherwise fall back to the hero image.
      const data = membersData[key];
      // Use the provided thumbnail unless it is the generic placeholder; otherwise fall back to the hero image.
      let thumb = data.thumbnail;
      if (!thumb || /placeholder/.test(thumb)) {
        thumb = data.hero;
      }
      const imgEl = card.querySelector('img');
      if (thumb && imgEl) {
        imgEl.src = thumb;
        imgEl.alt = data.name;
      }
    }
    // attach click handler to open modal
    if (membersData[key]) {
      card.addEventListener('click', () => {
        currentMemberIndex = index;
        showMemberModal(key);
      });
    }
  });

  // Navigation arrows in member modal
  const prevMemberBtn = document.getElementById('member-prev');
  const nextMemberBtn = document.getElementById('member-next');
  if (prevMemberBtn) {
    prevMemberBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      currentMemberIndex = (currentMemberIndex - 1 + memberCards.length) % memberCards.length;
      const key = memberCards[currentMemberIndex].dataset.member;
      showMemberModal(key);
    });
  }
  if (nextMemberBtn) {
    nextMemberBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      currentMemberIndex = (currentMemberIndex + 1) % memberCards.length;
      const key = memberCards[currentMemberIndex].dataset.member;
      showMemberModal(key);
    });
  }

  // Close modal when clicking the close icon or outside the content
  // The modal and its close button do not exist on pages without the members section (e.g. gala.html).
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  }
  if (modal) {
    modal.addEventListener('click', (evt) => {
      if (evt.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  /*
   * Gallery lightbox functionality
   *
   * Collect all gallery images and allow them to be viewed in a modal
   * with next/prev navigation.  Captions come from the image alt text.
   */
  const galleryModal = document.getElementById('gallery-modal');
  const galleryImg = document.getElementById('gallery-modal-img');
  const galleryCaption = document.getElementById('gallery-modal-caption');
  const galleryClose = document.getElementById('gallery-modal-close');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  // Gather sources from the carousel instead of the gallery grid
  const gallerySources = Array.from(document.querySelectorAll('.carousel-slide img')).map(img => ({ src: img.getAttribute('src'), caption: img.getAttribute('alt') || '' }));
  let galleryIndex = 0;

  function openGallery(i) {
    galleryIndex = i;
    const item = gallerySources[galleryIndex];
    galleryImg.src = item.src;
    galleryCaption.textContent = item.caption;
    galleryModal.classList.remove('hidden');
  }

  // Bind click to each slide image to open the lightbox
  document.querySelectorAll('.carousel-slide img').forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openGallery(i);
    });
  });

  if (galleryClose) {
    galleryClose.addEventListener('click', () => {
      galleryModal.classList.add('hidden');
    });
  }
  if (galleryModal) {
    galleryModal.addEventListener('click', evt => {
      if (evt.target === galleryModal) {
        galleryModal.classList.add('hidden');
      }
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      galleryIndex = (galleryIndex - 1 + gallerySources.length) % gallerySources.length;
      openGallery(galleryIndex);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      galleryIndex = (galleryIndex + 1) % gallerySources.length;
      openGallery(galleryIndex);
    });
  }

  /* Carousel functionality for the gallery */
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = Array.from(carouselTrack.children);
  const prevCarousel = document.querySelector('.carousel-prev');
  const nextCarousel = document.querySelector('.carousel-next');
  let carouselIndex = 0;

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
  }

  if (nextCarousel) {
    nextCarousel.addEventListener('click', evt => {
      evt.stopPropagation();
      carouselIndex = (carouselIndex + 1) % carouselSlides.length;
      updateCarousel();
    });
  }
  if (prevCarousel) {
    prevCarousel.addEventListener('click', evt => {
      evt.stopPropagation();
      carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
      updateCarousel();
    });
  }

  // Automatically cycle through the gallery carousel every 6 seconds.
  let carouselInterval = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselSlides.length;
    updateCarousel();
  }, 6000);
  // Pause auto‑scroll when hovering over the carousel and resume on leave.
  if (carouselTrack) {
    carouselTrack.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    carouselTrack.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        carouselIndex = (carouselIndex + 1) % carouselSlides.length;
        updateCarousel();
      }, 6000);
    });
  }
  // Make the history subsections collapsible with a smooth transition.
  // Each <h3> element will be followed by a container (.history-content)
  // that wraps all paragraphs until the next heading.  The first
  // section remains expanded; others start collapsed.  Clicking on a
  // heading toggles the expansion and rotates the arrow indicator.
  const historyHeadings = document.querySelectorAll('.history-section h3');
  historyHeadings.forEach((h, idx) => {
    // Collect paragraphs following this heading up to the next heading
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('history-content');
    let sibling = h.nextElementSibling;
    while (sibling && sibling.tagName.toLowerCase() !== 'h3') {
      const next = sibling.nextElementSibling;
      contentWrapper.appendChild(sibling);
      sibling = next;
    }
    h.after(contentWrapper);
    // Expand the first section by default
    if (idx === 0) {
      contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
      h.classList.add('open');
    } else {
      contentWrapper.style.maxHeight = '0';
    }
    // Toggle open/close on click
    h.addEventListener('click', () => {
      const isOpen = h.classList.contains('open');
      if (isOpen) {
        // Collapse
        contentWrapper.style.maxHeight = '0';
        h.classList.remove('open');
      } else {
        // Expand
        contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
        h.classList.add('open');
      }
    });
  });

  // Soup Easter egg toggle: show or hide the soup modal when clicking the hidden button.
  const soupToggle = document.getElementById('soup-toggle');
  const soupSection = document.getElementById('soup');
  const soupClose = document.getElementById('soup-close');
  if (soupToggle && soupSection) {
    soupToggle.addEventListener('click', evt => {
      evt.preventDefault();
      // Show the soup overlay
      soupSection.classList.add('active');
      // Reset scroll position for the overlay so its header is visible
      soupSection.scrollTop = 0;
      // Prevent the underlying page from scrolling while the overlay is open
      document.body.style.overflow = 'hidden';
    });
  }
  if (soupClose && soupSection) {
    soupClose.addEventListener('click', evt => {
      evt.stopPropagation();
      soupSection.classList.remove('active');
      // Re‑enable page scrolling when closing the overlay
      document.body.style.overflow = '';
    });
  }
  if (soupSection) {
    soupSection.addEventListener('click', evt => {
      if (evt.target === soupSection) {
        soupSection.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /*
   * Menu tab toggling for the gala page.
   * On the gala page the menu section contains two menus (standard and vegetarian)
   * that should not be shown simultaneously.  Clicking a tab button will
   * activate the corresponding menu and deactivate the others.
   */
  /*
   * Menu tab toggling for the gala page
   *
   * The menu section of the gala page uses a tab interface so that only one
   * menu (standard or vegetarian) is visible at a time.  Clicking a tab
   * will activate the corresponding menu and deactivate the others.  Use
   * dataset attributes and query selections on each click to ensure
   * compatibility across browsers.
   */
  const menuTabs = document.querySelectorAll('.menu-tab');
  if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetId = this.dataset.target;
        // Remove active state from all tabs and contents
        document.querySelectorAll('.menu-tab').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.menu-content').forEach(content => content.classList.remove('active'));
        // Activate the clicked tab
        this.classList.add('active');
        // Show the corresponding menu by ID
        const target = document.getElementById(targetId);
        if (target) {
          target.classList.add('active');
        }
      });
    });
  }
});

/* == Nav Toggle == */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      // prevent body shift on open
      document.body.style.overflowX = 'hidden';
    });
    // Close menu when a link is clicked (useful on mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // Safety: ensure no rogue wide elements cause horizontal scroll
  document.querySelectorAll('table, pre, code, .wide').forEach(el => {
    el.style.maxWidth = '100%';
    el.style.overflowX = 'auto';
  });
});


/* == Nav Toggle v2 == */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('nav .nav-links, .navbar .nav-links');
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    // Close when a link is chosen
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
  // Safety: ensure no rogue wide elements cause horizontal scroll
  document.querySelectorAll('table, pre, code, .wide, .overflowing').forEach(el => {
    el.style.maxWidth = '100%';
    el.style.overflowX = 'auto';
  });
});


/* == Nav Toggle v3 (defensive binding) == */
(function attachNavToggle(){
  function bind(){
    var toggle = document.getElementById('nav-toggle');
    if(!toggle) return;
    // Ensure it's not treated as a submit button
    if(!toggle.getAttribute('type')) toggle.setAttribute('type','button');
    // Prefer the next sibling .nav-links (our UL)
    var links = toggle.nextElementSibling && toggle.nextElementSibling.classList && toggle.nextElementSibling.classList.contains('nav-links')
      ? toggle.nextElementSibling
      : (document.querySelector('nav .nav-links') || document.querySelector('.navbar .nav-links'));
    if(!links) return;
    function openClose(force){
      var willOpen = typeof force === 'boolean' ? force : !links.classList.contains('open');
      links.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      document.body.classList.toggle('menu-open', willOpen);
    }
    ['click','touchstart'].forEach(function(evt){
      toggle.addEventListener(evt, function(e){ e.preventDefault(); e.stopPropagation(); openClose(); }, {passive:false});
    });
    // Close on outside click
    document.addEventListener('click', function(e){
      if(!links.classList.contains('open')) return;
      if(!links.contains(e.target) && e.target!==toggle) openClose(false);
    });
    // Close on ESC
    document.addEventListener('keydown', function(e){
      if(e.key==='Escape') openClose(false);
    });
    // Close when a link is clicked
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ openClose(false); });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();


/* == Normalize non-breaking spaces in titles (v11) == */
(function normalizeNbsp(){
  function run(){
    var sels = '.event-card h1, .event-card h2, .event-card h3, .card h1, .card h2, .card h3';
    document.querySelectorAll(sels).forEach(function(el){
      // Replace &nbsp; (HTML) and \u00A0 (unicode) with normal spaces so words can wrap
      el.innerHTML = el.innerHTML.replace(/&nbsp;|\u00A0/g, ' ');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();


/* == Normalize NBSP globally for headings (v12) == */
(function normalizeHeadingNbsp(){
  function run(){
    var sels = 'h1, h2, h3, .hero h1, .hero h2, .hero h3, .banner-text h1, .banner-text h2, .banner-text h3';
    document.querySelectorAll(sels).forEach(function(el){
      el.innerHTML = el.innerHTML.replace(/&nbsp;| /g, ' ');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
