/**
 * MUHAMMED & NIBA FATHIMA — WEDDING INVITATION
 * Interactive Motion & Experience Engine
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & STATE
  // ==========================================================================
  const config = window.weddingConfig || {
    groomName: "Ajmal Ali",
    brideName: "Jifna Moideen",
    displayName: "Ajmal Ali & Jifna Moideen",
    wedding: {
      date: "2026-11-09",
      time: "10:30",
      timeDisplay: "10:30 AM",
      day: "Monday",
      venue: "City Plaza Auditorium",
      location: "At Bride's Place",
      mapsUrl: "https://maps.google.com/maps?q=City+Plaza+Auditorium"
    },
    reception: {
      date: "2026-11-09",
      time: "11:00",
      timeDisplay: "11:00 AM",
      day: "Monday",
      venue: "Unity Auditorium",
      location: "Mangad, Niramaruthur, Tirur, Kerala 676107",
      mapsUrl: "https://www.google.com/maps/place/Unity+Auditorium,+Mangad,+Niramaruthur,+Tirur,+Keralam+676107/@10.9253169,75.904997,16z/data=!4m6!3m5!1s0x3ba7b2017ab2afb1:0x195da5193bb78ee!8m2!3d10.9253169!4d75.904997!16s%2Fg%2F1tks4rzg?force=pwa&source=mlapk&g_ep=Eg1tbF8yMDI2MTAxOF8wIOC7DCoASAJQAQ%3D%3D"
    },
    family: { groomFather: "Mr.Ali", groomMother: "Mrs.Ramla", brideFather: "Mr.Moideenkutty", brideMother: "Mrs.Jumanath" },
    contact: { whatsappNumber: "919876543210", rsvpDeadline: "1 November 2026" },
    audio: { backgroundMusic: "assets/audio/wedding-music2.mp3", volume: 0.55 },
    invitationMessage: "With hearts full of gratitude to Allah, we invite you to join us as we celebrate the beautiful beginning of a new chapter in the lives of Ajmal Ali and Jifna Moideen...",
    closingMessage: "May Allah bless this union with love, mercy, happiness, and barakah."
  };

  const state = {
    isOpened: false,
    isPlaying: false,
    adultsCount: 1,
    childrenCount: 0,
    guestName: "",
    guestPhone: "",
    attendanceChoice: "yes" // 'yes' | 'no'
  };

  // DOM Elements
  const DOM = {
    body: document.body,
    gate: document.getElementById('gate'),
    envelope: document.getElementById('envelope'),
    envFace: document.getElementById('envFace'),
    seal: document.getElementById('seal'),
    curtain: document.getElementById('curtain'),
    bism: document.getElementById('bism'),
    fall: document.getElementById('fall'),
    motesCanvas: document.getElementById('motes'),
    progressBar: document.getElementById('progress'),
    toLine: document.getElementById('toLine'),
    heroMonogram: document.getElementById('monogram'),
    groomParents: document.getElementById('groomParents'),
    brideParents: document.getElementById('brideParents'),
    invMsg: document.getElementById('invMsg'),
    closingMsg: document.getElementById('closingMsg'),
    cdD: document.getElementById('cdD'),
    cdH: document.getElementById('cdH'),
    cdM: document.getElementById('cdM'),
    cdS: document.getElementById('cdS'),
    countBox: document.getElementById('count'),
    weddingWhere: document.getElementById('weddingWhere'),
    receptionWhere: document.getElementById('receptionWhere'),
    nikkahMap: document.getElementById('nikkahMap'),
    receptionMap: document.getElementById('receptionMap'),
    nikkahDir: document.getElementById('nikkahDir'),
    receptionDir: document.getElementById('receptionDir'),
    rsvpDeadline: document.getElementById('rsvpDeadline'),
    contactLine: document.getElementById('contactLine'),
    // RSVP Elements
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    step4: document.getElementById('step4'),
    rName: document.getElementById('rName'),
    rPhone: document.getElementById('rPhone'),
    fName: document.getElementById('fName'),
    fPhone: document.getElementById('fPhone'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    adultsVal: document.getElementById('adultsVal'),
    childrenVal: document.getElementById('childrenVal'),
    rMsgYes: document.getElementById('rMsgYes'),
    rMsgNo: document.getElementById('rMsg'),
    sendYes: document.getElementById('sendYes'),
    sendNo: document.getElementById('sendNo'),
    doneMsg: document.getElementById('doneMsg'),
    errYes: document.getElementById('errYes'),
    errNo: document.getElementById('errNo'),
    // Audio Elements
    soundBtn: document.getElementById('soundBtn'),
    bgm: document.getElementById('bgm')
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    populateConfigDetails();
    parseUrlParameters();
    initSplitText();
    initMotesCanvas();
    initGateParticles();
    initCountdown();
    initScrollAnimations();
    initSvgPathLengths();
    initAudio();
    initRSVP();
    initScratchCard();
    setupEventListeners();

    // Automatically move curtain within 2 seconds (1.8s)
    setTimeout(() => {
      moveCurtain();
    }, 1800);
  }

  // ==========================================================================
  // CONFIG HYDRATION
  // ==========================================================================
  function populateConfigDetails() {
    function formatParentName(name, prefix) {
      if (!name) return "";
      let trimmed = name.trim();
      if (!new RegExp(`^${prefix}\\.?\\s*`, 'i').test(trimmed)) {
        return `${prefix}. ${trimmed}`;
      }
      return trimmed.replace(new RegExp(`^${prefix}\\.?\\s*`, 'i'), `${prefix}. `);
    }

    // Parents
    if (DOM.groomParents) {
      const gF = formatParentName(config.family && config.family.groomFather, "Mr");
      const gM = formatParentName(config.family && config.family.groomMother, "Mrs");
      if (gF && gM) {
        DOM.groomParents.textContent = `Son of ${gF} & ${gM}`;
      } else if (gF || gM) {
        DOM.groomParents.textContent = `Son of ${gF || gM}`;
      } else {
        DOM.groomParents.style.display = "none";
      }
    }

    if (DOM.brideParents) {
      const bF = formatParentName(config.family && config.family.brideFather, "Mr");
      const bM = formatParentName(config.family && config.family.brideMother, "Mrs");
      if (bF && bM) {
        DOM.brideParents.textContent = `Daughter of ${bF} & ${bM}`;
      } else if (bF || bM) {
        DOM.brideParents.textContent = `Daughter of ${bF || bM}`;
      } else {
        DOM.brideParents.style.display = "none";
      }
    }

    // Invitation message & closing
    if (DOM.invMsg && config.invitationMessage) {
      DOM.invMsg.textContent = config.invitationMessage;
    }
    if (DOM.closingMsg && config.closingMessage) {
      DOM.closingMsg.textContent = config.closingMessage;
    }

    // Locations & maps
    if (DOM.weddingWhere && config.wedding) {
      DOM.weddingWhere.textContent = `${config.wedding.venue} — ${config.wedding.location}`;
    }
    if (DOM.receptionWhere && config.reception) {
      DOM.receptionWhere.textContent = `${config.reception.venue} — ${config.reception.location}`;
    }

    const setLink = (el, url) => {
      if (el && url) {
        el.href = url;
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    };

    if (config.wedding && config.wedding.mapsUrl) {
      setLink(DOM.nikkahMap, config.wedding.mapsUrl);
      setLink(DOM.nikkahDir, config.wedding.mapsUrl);
    }
    if (config.reception && config.reception.mapsUrl) {
      setLink(DOM.receptionMap, config.reception.mapsUrl);
      setLink(DOM.receptionDir, config.reception.mapsUrl);
    }

    // RSVP Deadline
    if (DOM.rsvpDeadline && config.contact && config.contact.rsvpDeadline) {
      DOM.rsvpDeadline.textContent = `Please respond by ${config.contact.rsvpDeadline}`;
    }

    // Contact WhatsApp
    if (DOM.contactLine && config.contact && config.contact.whatsappNumber) {
      DOM.contactLine.innerHTML = `Questions or inquiries? <a href="https://wa.me/${config.contact.whatsappNumber}" target="_blank" rel="noopener">Chat via WhatsApp</a>`;
      DOM.contactLine.removeAttribute('hidden');
    }
  }

  // ==========================================================================
  // URL GUEST PERSONALIZATION
  // ==========================================================================
  function parseUrlParameters() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const guest = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name') || urlParams.get('u');
      if (guest && guest.trim()) {
        const cleanName = guest.trim();
        if (DOM.toLine) {
          DOM.toLine.textContent = `${cleanName.toUpperCase()} · YOU ARE INVITED`;
        }
        if (DOM.rName) {
          DOM.rName.value = cleanName;
        }
      }
    } catch (e) {
      console.warn("Could not parse query parameters:", e);
    }
  }

  // ==========================================================================
  // SPLIT TEXT ANIMATION
  // ==========================================================================
  function initSplitText() {
    const splitEls = document.querySelectorAll('[data-split]');
    splitEls.forEach(el => {
      const text = el.textContent.trim();
      const words = text.split(/\s+/);
      el.innerHTML = '';

      let charCounter = 0;
      words.forEach((word, wIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'w';

        for (let i = 0; i < word.length; i++) {
          const chSpan = document.createElement('span');
          chSpan.className = 'ch';
          chSpan.textContent = word[i];
          chSpan.style.transitionDelay = `${(charCounter * 0.045) + 0.15}s`;
          wordSpan.appendChild(chSpan);
          charCounter++;
        }

        el.appendChild(wordSpan);
        if (wIdx < words.length - 1) {
          const space = document.createTextNode(' ');
          el.appendChild(space);
        }
      });
    });
  }

  function triggerNameReveal() {
    const chars = document.querySelectorAll('.name .ch');
    chars.forEach(ch => {
      ch.classList.add('up');
    });
  }

  // ==========================================================================
  // GATE PARTICLES (ENVELOPE FALLING PARTICLES)
  // ==========================================================================
  function initGateParticles() {
    if (!DOM.fall) return;
    const fragment = document.createDocumentFragment();
    const count = 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('i');
      const x = Math.random() * 100;
      const size = Math.random() * 5 + 3;
      const speed = (Math.random() * 4 + 4.5).toFixed(2);
      const delay = (Math.random() * 5).toFixed(2);
      p.style.setProperty('--x', `${x}%`);
      p.style.setProperty('--w', `${size}px`);
      p.style.setProperty('--s', `${speed}s`);
      p.style.setProperty('--d', `${delay}s`);
      fragment.appendChild(p);
    }
    DOM.fall.appendChild(fragment);
  }

  // ==========================================================================
  // AMBIENT MOTES CANVAS ANIMATION
  // ==========================================================================
  function initMotesCanvas() {
    const canvas = DOM.motesCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = 42;
    let animationFrameId = null;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Mote {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.radius = Math.random() * 1.8 + 0.6;
        this.speedY = -(Math.random() * 0.45 + 0.18);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.45 + 0.15;
        this.fadeSpeed = Math.random() * 0.008 + 0.004;
        this.fadingIn = true;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.015) * 0.2;

        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.fadingIn = false;
          }
        } else {
          if (this.y < height * 0.25) {
            this.alpha -= this.fadeSpeed * 1.2;
          }
        }

        if (this.y < -10 || this.alpha <= 0) {
          this.reset(false);
        }
      }
      draw() {
        if (this.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 211, 162, ${this.alpha.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 106, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Mote());
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        loop();
      }
    });
  }

  // ==========================================================================
  // CURTAIN & ENVELOPE OPENING CEREMONY
  // ==========================================================================
  let curtainMoved = false;

  function moveCurtain() {
    if (curtainMoved) return;
    curtainMoved = true;
    if (DOM.curtain) {
      DOM.curtain.classList.add('open');
    }
  }

  function openInvitation() {
    if (state.isOpened) return;
    state.isOpened = true;

    // Ensure curtain is drawn aside
    moveCurtain();

    // Start background music seamlessly on user click
    startAudio();

    // 1. Break the wax seal & fade envelope text
    if (DOM.seal) DOM.seal.classList.add('broken');
    if (DOM.envFace) DOM.envFace.classList.add('away');

    // 2. Unfold envelope flaps
    setTimeout(() => {
      if (DOM.envelope) DOM.envelope.classList.add('open');
      if (DOM.gate) DOM.gate.classList.add('revealed');
    }, 280);

    // 3. Reveal Bismillah calligraphy
    setTimeout(() => {
      if (DOM.bism) DOM.bism.classList.add('in');
    }, 950);

    // 4. Fade out Bismillah and open gate completely
    setTimeout(() => {
      if (DOM.bism) DOM.bism.classList.add('out');
    }, 2950);

    setTimeout(() => {
      if (DOM.gate) DOM.gate.classList.add('gone');
      DOM.body.classList.remove('locked');

      // Trigger hero entrance
      if (DOM.heroMonogram) DOM.heroMonogram.classList.add('in');
      triggerNameReveal();

      // Trigger initial reveals on hero
      const heroReveals = document.querySelectorAll('#hero .reveal');
      heroReveals.forEach(r => r.classList.add('in'));
    }, 3500);
  }

  // ==========================================================================
  // SCROLL PROGRESS & REVEALS
  // ==========================================================================
  function initScrollAnimations() {
    // Scroll progress bar
    window.addEventListener('scroll', () => {
      if (!state.isOpened) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && DOM.progressBar) {
        const scrolled = (window.scrollY / docHeight) * 100;
        DOM.progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      }
    }, { passive: true });

    // IntersectionObserver for smooth reveals
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.reveal, .seam, .ev, .card, .draw, .monogram');
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // Setup exact SVG path lengths for clean stroke-drawing animation
  function initSvgPathLengths() {
    const drawSvgs = document.querySelectorAll('.draw, .corner-orn');
    drawSvgs.forEach(svg => {
      const paths = svg.querySelectorAll('path, circle, line');
      paths.forEach(p => {
        if (typeof p.getTotalLength === 'function') {
          const len = Math.ceil(p.getTotalLength());
          p.style.setProperty('--len', len);
        }
      });
    });
  }

  // ==========================================================================
  // COUNTDOWN TIMER
  // ==========================================================================
  function initCountdown() {
    if (!DOM.cdD || !DOM.cdH || !DOM.cdM || !DOM.cdS) return;

    let targetDateStr = `${config.wedding.date}T${config.wedding.time || '10:00'}:00`;
    let targetTime = new Date(targetDateStr).getTime();

    // Fallback if parsing produces NaN
    if (isNaN(targetTime)) {
      targetTime = new Date("2026-11-09T10:30:00").getTime();
    }

    let lastS = -1;

    function updateCountdown() {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        if (DOM.countBox) {
          DOM.countBox.classList.add('done');
          DOM.countBox.innerHTML = `
            <div class="cd">
              <span class="n">Today is the Blessed Day!</span>
              <span class="l">Alhamdulillah</span>
            </div>`;
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const dStr = days < 10 ? `0${days}` : `${days}`;
      const hStr = hours < 10 ? `0${hours}` : `${hours}`;
      const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const sStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

      if (DOM.cdD.textContent !== dStr) DOM.cdD.textContent = dStr;
      if (DOM.cdH.textContent !== hStr) DOM.cdH.textContent = hStr;
      if (DOM.cdM.textContent !== mStr) DOM.cdM.textContent = mStr;

      if (seconds !== lastS) {
        DOM.cdS.textContent = sStr;
        DOM.cdS.classList.remove('tick');
        // Trigger reflow for CSS animation
        void DOM.cdS.offsetWidth;
        DOM.cdS.classList.add('tick');
        lastS = seconds;
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ==========================================================================
  // AUDIO CONTROLLER
  // ==========================================================================
  function initAudio() {
    const audioUrl = config.audio && config.audio.backgroundMusic;
    if (!audioUrl || !DOM.bgm) {
      if (DOM.soundBtn) DOM.soundBtn.style.display = 'none';
      return;
    }

    DOM.bgm.src = audioUrl;
    DOM.bgm.loop = true;
    DOM.bgm.volume = 0; // Will fade in

    if (DOM.soundBtn) {
      DOM.soundBtn.addEventListener('click', toggleAudio);
    }
  }

  function startAudio() {
    if (!DOM.bgm || !config.audio || !config.audio.backgroundMusic) return;
    const targetVol = typeof config.audio.volume === 'number' ? config.audio.volume : 0.55;

    const playPromise = DOM.bgm.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          state.isPlaying = true;
          if (DOM.soundBtn) {
            DOM.soundBtn.classList.add('on');
            DOM.soundBtn.classList.remove('muted');
          }
          fadeAudio(0, targetVol, 1500);
        })
        .catch(err => {
          console.warn("Autoplay audio blocked or pending user interaction:", err);
          if (DOM.soundBtn) {
            DOM.soundBtn.classList.add('on');
            DOM.soundBtn.classList.add('muted');
          }
        });
    }
  }

  function toggleAudio() {
    if (!DOM.bgm) return;
    const targetVol = typeof config.audio.volume === 'number' ? config.audio.volume : 0.55;

    if (state.isPlaying) {
      fadeAudio(DOM.bgm.volume, 0, 400, () => {
        DOM.bgm.pause();
        state.isPlaying = false;
        if (DOM.soundBtn) DOM.soundBtn.classList.add('muted');
      });
    } else {
      DOM.bgm.play().then(() => {
        state.isPlaying = true;
        if (DOM.soundBtn) DOM.soundBtn.classList.remove('muted');
        fadeAudio(0, targetVol, 700);
      }).catch(e => console.warn(e));
    }
  }

  function fadeAudio(from, to, duration, onComplete) {
    if (!DOM.bgm) return;
    const steps = 20;
    const stepTime = duration / steps;
    const delta = (to - from) / steps;
    let current = from;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      current += delta;
      if (DOM.bgm) {
        DOM.bgm.volume = Math.min(1, Math.max(0, current));
      }
      if (stepCount >= steps) {
        clearInterval(timer);
        if (DOM.bgm) DOM.bgm.volume = Math.min(1, Math.max(0, to));
        if (typeof onComplete === 'function') onComplete();
      }
    }, stepTime);
  }

  // ==========================================================================
  // RSVP ENGINE
  // ==========================================================================
  function initRSVP() {
    // Choice buttons: Joyfully Accept or Regretfully Decline
    if (DOM.yesBtn) {
      DOM.yesBtn.addEventListener('click', () => {
        if (validateStep1()) {
          state.attendanceChoice = 'yes';
          goToStep(DOM.step2);
        }
      });
    }

    if (DOM.noBtn) {
      DOM.noBtn.addEventListener('click', () => {
        if (validateStep1()) {
          state.attendanceChoice = 'no';
          goToStep(DOM.step3);
        }
      });
    }

    // Back buttons
    const backButtons = document.querySelectorAll('[data-back]');
    backButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        goToStep(DOM.step1);
      });
    });

    // Steppers for Adults & Children
    const stepButtons = document.querySelectorAll('[data-step]');
    stepButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-step');
        const dir = parseInt(btn.getAttribute('data-dir'), 10) || 0;

        if (type === 'adults') {
          state.adultsCount = Math.max(1, Math.min(15, state.adultsCount + dir));
          if (DOM.adultsVal) DOM.adultsVal.textContent = state.adultsCount;
        } else if (type === 'children') {
          state.childrenCount = Math.max(0, Math.min(15, state.childrenCount + dir));
          if (DOM.childrenVal) DOM.childrenVal.textContent = state.childrenCount;
        }
      });
    });

    // Submit Yes
    if (DOM.sendYes) {
      DOM.sendYes.addEventListener('click', () => {
        handleRSVPSubmit('yes');
      });
    }

    // Submit No
    if (DOM.sendNo) {
      DOM.sendNo.addEventListener('click', () => {
        handleRSVPSubmit('no');
      });
    }

    // Clear validation error on input
    if (DOM.rName) {
      DOM.rName.addEventListener('input', () => {
        if (DOM.fName) DOM.fName.classList.remove('bad');
      });
    }
    if (DOM.rPhone) {
      DOM.rPhone.addEventListener('input', () => {
        if (DOM.fPhone) DOM.fPhone.classList.remove('bad');
      });
    }
  }

  function validateStep1() {
    let isValid = true;
    const name = DOM.rName ? DOM.rName.value.trim() : '';
    const phone = DOM.rPhone ? DOM.rPhone.value.trim() : '';

    if (!name || name.length < 2) {
      if (DOM.fName) DOM.fName.classList.add('bad');
      isValid = false;
    } else {
      if (DOM.fName) DOM.fName.classList.remove('bad');
    }

    // Simple phone check: at least 6 digits
    const digits = phone.replace(/\D/g, '');
    if (!phone || digits.length < 6) {
      if (DOM.fPhone) DOM.fPhone.classList.add('bad');
      isValid = false;
    } else {
      if (DOM.fPhone) DOM.fPhone.classList.remove('bad');
    }

    if (isValid) {
      state.guestName = name;
      state.guestPhone = phone;
    }

    return isValid;
  }

  function goToStep(targetStep) {
    const steps = [DOM.step1, DOM.step2, DOM.step3, DOM.step4];
    steps.forEach(s => {
      if (s) s.classList.remove('on');
    });
    if (targetStep) {
      targetStep.classList.add('on');
    }
  }

  function handleRSVPSubmit(decision) {
    const groomAndBride = config.displayName || "Ajmal Ali & Jifna Moideen";
    const waNumber = (config.contact && config.contact.whatsappNumber) ? config.contact.whatsappNumber.replace(/\D/g, '') : '';
    let messageText = "";

    if (decision === 'yes') {
      const note = DOM.rMsgYes ? DOM.rMsgYes.value.trim() : "";
      messageText = `Assalamu Alaikum! ✨\n\nI am *${state.guestName}* (${state.guestPhone}).\n` +
        `I joyfully accept the invitation to the wedding celebration of *${groomAndBride}*.\n\n` +
        `• Adults: ${state.adultsCount}\n` +
        `• Children: ${state.childrenCount}` +
        (note ? `\n\nNote for the couple: "${note}"` : `\n\nLooking forward to celebrating with you!`);

      if (DOM.doneMsg) {
        DOM.doneMsg.innerHTML = `Alhamdulillah! We are thrilled to celebrate with you, <strong>${state.guestName}</strong>!`;
      }
    } else {
      const note = DOM.rMsgNo ? DOM.rMsgNo.value.trim() : "";
      messageText = `Assalamu Alaikum,\n\nI am *${state.guestName}* (${state.guestPhone}).\n` +
        `Regretfully, I will not be able to attend the wedding celebration of *${groomAndBride}*.\n` +
        (note ? `\nNote for the couple: "${note}"` : "") +
        `\n\nWishing you both a blessed marriage filled with barakah, love, and happiness!`;

      if (DOM.doneMsg) {
        DOM.doneMsg.innerHTML = `Thank you for letting us know, <strong>${state.guestName}</strong>. Please keep Ajmal Ali & Jifna in your heartfelt duas!`;
      }
    }

    // Open WhatsApp with pre-filled message
    if (waNumber) {
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    // Advance to confirmation step
    goToStep(DOM.step4);
  }

  // ==========================================================================
  // INTERACTIVE DATE & TIME SCRATCH CARD
  // ==========================================================================
  function initScratchCard() {
    const card = document.getElementById('scratchCard');
    const canvas = document.getElementById('scratchCanvas');
    const overlay = document.getElementById('scratchOverlay');
    const prompt = document.getElementById('scratchPrompt');
    const instantBtn = document.getElementById('instantRevealBtn');
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    let isRevealed = false;
    let lastX = 0;
    let lastY = 0;
    let checkThrottleTimer = null;

    function paintFoil() {
      const rect = overlay.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(rect.width || 300, 240);
      const h = Math.max(rect.height || 280, 240);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Gold metallic gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0.00, '#C59D5F');
      grad.addColorStop(0.20, '#E5C384');
      grad.addColorStop(0.40, '#9B7638');
      grad.addColorStop(0.60, '#F5E2B3');
      grad.addColorStop(0.80, '#D4AF6A');
      grad.addColorStop(1.00, '#8A662C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle gold sparkle specks
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
      for (let i = 0; i < 65; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 77) * 0.5 + 0.5) * h;
        const r = (i % 3 === 0) ? 2 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ornate inner gold foil border
      ctx.strokeStyle = 'rgba(255, 245, 215, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(10, 10, w - 20, h - 20);
      ctx.strokeStyle = 'rgba(100, 40, 15, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(14, 14, w - 28, h - 28);

      // Center decorative motif
      ctx.fillStyle = 'rgba(74, 16, 26, 0.38)';
      ctx.font = 'bold 11px "Jost", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', w / 2, h / 2 - 24);

      ctx.font = 'italic 13px "Cormorant Garamond", serif';
      ctx.fillStyle = 'rgba(50, 12, 18, 0.55)';
      ctx.fillText('Date & Time of Union', w / 2, h / 2 + 18);
      ctx.restore();
    }

    // Measure and paint
    requestAnimationFrame(() => {
      paintFoil();
    });

    // Re-paint if resized before scratched
    window.addEventListener('resize', () => {
      if (!isRevealed && !isDrawing) {
        paintFoil();
      }
    });

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        clientX,
        clientY
      };
    }

    function createSparkle(clientX, clientY) {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const spark = document.createElement('span');
      spark.className = 'scratch-sparkle';
      spark.style.left = `${clientX - cardRect.left}px`;
      spark.style.top = `${clientY - cardRect.top}px`;
      const tx = (Math.random() - 0.5) * 50;
      const ty = (Math.random() - 0.5) * 50;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);
      card.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }

    function scratchAt(x, y, fromX, fromY) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 42;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      if (fromX !== undefined && fromY !== undefined) {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.arc(x, y, 21, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function checkScratchPercentage() {
      if (isRevealed) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const totalSamplePoints = 400; // 20x20 grid
        const stepX = Math.floor(w / 20);
        const stepY = Math.floor(h / 20);
        let clearCount = 0;

        for (let y = stepY / 2; y < h; y += stepY) {
          for (let x = stepX / 2; x < w; x += stepX) {
            const idx = (Math.floor(y) * w + Math.floor(x)) * 4 + 3;
            if (data[idx] < 64) {
              clearCount++;
            }
          }
        }

        const percentage = clearCount / totalSamplePoints;
        if (percentage >= 0.28) {
          revealCard();
        }
      } catch (err) {
        // Fallback for security/tainted canvas edge cases
      }
    }

    function revealCard() {
      if (isRevealed) return;
      isRevealed = true;
      overlay.classList.add('revealed');

      // Sparkle burst celebration
      if (card) {
        const rect = card.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const rx = rect.left + Math.random() * rect.width;
            const ry = rect.top + Math.random() * rect.height;
            createSparkle(rx, ry);
          }, i * 25);
        }
      }
    }

    // Pointer start
    function onStart(e) {
      if (isRevealed) return;
      isDrawing = true;
      const pos = getCoords(e);
      lastX = pos.x;
      lastY = pos.y;
      scratchAt(pos.x, pos.y);
      createSparkle(pos.clientX, pos.clientY);
      if (prompt) prompt.classList.add('scratching');
    }

    // Pointer move
    function onMove(e) {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const pos = getCoords(e);
      scratchAt(pos.x, pos.y, lastX, lastY);
      lastX = pos.x;
      lastY = pos.y;

      if (Math.random() < 0.45) {
        createSparkle(pos.clientX, pos.clientY);
      }

      if (!checkThrottleTimer) {
        checkThrottleTimer = setTimeout(() => {
          checkThrottleTimer = null;
          checkScratchPercentage();
        }, 110);
      }
    }

    // Pointer end
    function onEnd() {
      if (!isDrawing) return;
      isDrawing = false;
      checkScratchPercentage();
    }

    // Attach listeners
    canvas.addEventListener('pointerdown', onStart);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onEnd);
    canvas.addEventListener('pointercancel', onEnd);
    canvas.addEventListener('dblclick', () => {
      revealCard();
    });
  }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {
    // Immediate curtain draw on click/tap
    if (DOM.curtain) {
      DOM.curtain.addEventListener('click', () => {
        moveCurtain();
      });
    }

    // Wax seal and envelope click triggers
    if (DOM.seal) {
      DOM.seal.addEventListener('click', (e) => {
        e.stopPropagation();
        openInvitation();
      });
    }

    if (DOM.envelope) {
      DOM.envelope.addEventListener('click', () => {
        if (!state.isOpened) {
          openInvitation();
        }
      });
    }

    // Keyboard support: Enter / Space on seal to open
    if (DOM.seal) {
      DOM.seal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openInvitation();
        }
      });
    }

    // Subtle parallax tilt for hero geometric background
    const geoLayer = document.querySelector('.geo');
    if (geoLayer && window.matchMedia('(min-width: 768px)').matches) {
      window.addEventListener('mousemove', (e) => {
        if (!state.isOpened) return;
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 16;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 16;
        geoLayer.style.transform = `translate3d(${xOffset.toFixed(1)}px, ${yOffset.toFixed(1)}px, 0)`;
      }, { passive: true });
    }
  }

  // Execute on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
