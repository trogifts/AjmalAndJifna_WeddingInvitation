/**
 * AJMAL ALI & JIFNA MOIDEEN -- WEDDING INVITATION
 * CENTRAL CONFIGURATION FILE
 */

const weddingConfig = {

  /* ---- COUPLE ------------------------------------------------- */
  groomName: "Ajmal Ali",
  brideName: "Jifna Moideen",
  displayName: "Ajmal Ali & Jifna Moideen",

  /* ---- NIKKAH CEREMONY ---------------------------------------- */
  wedding: {
    date: "2026-11-09",       // ISO YYYY-MM-DD
    time: "10:30",            // 24-hour HH:MM
    timeDisplay: "10:30 AM",
    dateDisplay: "9 November 2026",
    hijriDate: "٢٩ جمادى الأولى ١٤٤٨ هـ",
    hijriDisplay: "29 Jumada al-Awwal 1448 AH",
    venue: "City Plaza Auditorium",
    location: "At Bride's Place",
    mapsUrl: "https://maps.google.com/maps?q=City+Plaza+Auditorium",
    timeZone: "Asia/Kolkata"
  },

  /* ---- WEDDING CEREMONY --------------------------------------- */
  reception: {
    date: "2026-11-09",
    time: "11:00",
    timeDisplay: "11:00 AM",
    dateDisplay: "9 November 2026",
    hijriDate: "٢٩ جمادى الأولى ١٤٤٨ هـ",
    hijriDisplay: "29 Jumada al-Awwal 1448 AH",
    venue: "Unity Auditorium",
    location: "Mangad, Niramaruthur, Tirur, Kerala 676107",
    mapsUrl: "https://www.google.com/maps/place/Unity+Auditorium,+Mangad,+Niramaruthur,+Tirur,+Keralam+676107/@10.9253169,75.904997,16z/data=!4m6!3m5!1s0x3ba7b2017ab2afb1:0x195da5193bb78ee!8m2!3d10.9253169!4d75.904997!16s%2Fg%2F1tks4rzg?force=pwa&source=mlapk&g_ep=Eg1tbF8yMDI2MTAxOF8wIOC7DCoASAJQAQ%3D%3D",
    timeZone: "Asia/Kolkata"
  },

  /* ---- DATES -------------------------------------------------- */
  dates: {
    gregorian: "9 November 2026",
    gregorianShort: "09 . 11 . 2026",
    hijriArabic: "٢٩ جمادى الأولى ١٤٤٨ هـ",
    hijriEnglish: "29 Jumada al-Awwal 1448 AH",
    combined: "9 November 2026 · 29 Jumada al-Awwal 1448 AH"
  },

  /* ---- FAMILY ------------------------------------------------- */
  family: {
    groomFather: "Mr. Ali",
    groomMother: "Mrs. Ramla",
    brideFather: "Mr. Moideenkutty",
    brideMother: "Mrs. Jumanath",
  },

  /* ---- CONTACT & RSVP ---------------------------------------- */
  contact: {
    whatsappNumber: "919876543210",   // international format, no + or spaces
    rsvpDeadline: "1 November 2026",
  },

  /* ---- AUDIO -------------------------------------------------- */
  audio: {
    backgroundMusic: "assets/audio/wedding-music.mp3",
    volume: 0.55,
  },

  /* ---- META / SEO --------------------------------------------- */
  meta: {
    title: "Ajmal Ali & Jifna Moideen — Wedding Invitation",
    description: "We joyfully invite you to celebrate the wedding of Ajmal Ali & Jifna Moideen on 9 November 2026 in Tirur, Kerala.",
    themeColor: "#2C0712",
    ogImage: "assets/images/og-image.jpg",
  },

  /* ---- INVITATION MESSAGE ------------------------------------ */
  invitationMessage:
    "With hearts full of gratitude to Allah, we invite you to join us as " +
    "we celebrate the beautiful beginning of a new chapter in the lives of " +
    "Ajmal Ali and Jifna Moideen. Your presence, love, and heartfelt duas will " +
    "make this occasion even more special.",

  /* ---- CLOSING DUA ------------------------------------------ */
  closingMessage: "",

};

if (typeof module !== "undefined") module.exports = weddingConfig;
