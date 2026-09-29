/* Site content for Ramakant Guruji's booking page.
   Everything a priest would edit lives here: contact, rituals, areas, gallery. */
window.SITE = (() => {
  const CONFIG = {
    name: 'Ramakant Kulkarni',
    shortName: 'Ramakant Guruji',
    // Placeholder number — replace before sharing publicly.
    phoneDisplay: '+91 90000 00000',
    phoneHref: 'tel:+919000000000',
    whatsapp: '919000000000',
    responseTime: 'within 2 hours',
    callHours: '7 am – 9 pm'
  };

  const RITUALS = [
    {
      id: 'satyanarayan',
      name: 'Satyanarayan Puja',
      mr: 'सत्यनारायण पूजा',
      motif: 'kalash',
      tone: 'sand',
      badge: 'Most booked',
      short: 'A thanksgiving puja for house functions, birthdays and new beginnings.',
      durationLabel: '2 hours',
      durationMins: 120,
      price: { min: 2500, max: 3500 },
      samagri: 'Included',
      occasions: ['celebration', 'newhome', 'baby', 'office'],
      goodFor: ['House functions', 'Birthdays & anniversaries', 'Thanksgiving', 'New job or business'],
      about:
        'A puja to Lord Vishnu in his Satyanarayan form, followed by the Satyanarayan Katha — five short stories about keeping one’s word and remembering to be grateful. It closes with aarti and sheera prasad shared with everyone present.',
      why:
        'It is the simplest way for a family to say “thank you” together — and the easiest puja to invite friends and neighbours to.',
      included: [
        'Complete puja samagri (haldi-kunku, flowers, supari, panchamrut items, etc.)',
        'Katha recitation, with the meaning explained as he goes',
        'Aarti and guidance on prasad distribution'
      ],
      arrange: [
        'A clean space of about 6 × 6 ft, and a low wooden paat or chowrang',
        'Sheera prasad (quantities shared on WhatsApp)',
        'Five kinds of fruit, a kalash and a plate from your kitchen'
      ],
      prep: [
        'Prepare the sheera prasad before Guruji arrives.',
        'If your family keeps a fast until the puja, continue as usual — it’s optional.',
        'Invite guests for the Katha and aarti, roughly the last hour.'
      ],
      slotHint: 'evening'
    },
    {
      id: 'griha-pravesh',
      name: 'Griha Pravesh',
      en: 'Housewarming',
      mr: 'गृहप्रवेश',
      motif: 'toranDoor',
      tone: 'clay',
      short: 'The traditional first entry into a new home, with Ganesh puja and a small havan.',
      durationLabel: '2½ hours',
      durationMins: 150,
      price: { min: 4000, max: 6000 },
      samagri: 'Included, including havan samagri',
      occasions: ['newhome'],
      goodFor: ['New flat or house', 'Renovated home', 'First entry after purchase'],
      about:
        'The ritual first entry into your new home. It begins with Ganesh puja and Punyahavachan (purification of the space), continues with Navagraha puja and a small homa, and ends with the family entering together with the kalash — and boiling milk in the new kitchen for the first time.',
      why:
        'It marks the moment a house becomes your home, and gives the whole family its first shared memory there.',
      included: [
        'All puja and havan samagri, including a small havan kund',
        'Help choosing the muhurat for your entry',
        'Step-by-step explanation of each ritual for the family'
      ],
      arrange: [
        'Milk and a new vessel for the first boil in the kitchen',
        'Mango-leaf toran for the main door (optional)',
        'Fruits and sweets for prasad',
        'A ventilated spot for the havan — do let your society know'
      ],
      prep: [
        'Share the flat address and your preferred date early — muhurat dates fill fast.',
        'Keep the main door and kitchen clear; furniture can come in after.',
        'Guruji will ask for the family’s gotra and names. Don’t worry if you don’t know the gotra.'
      ],
      slotHint: 'early'
    },
    {
      id: 'ganesh',
      name: 'Ganesh Sthapana & Visarjan',
      mr: 'गणेश स्थापना व विसर्जन',
      motif: 'modak',
      tone: 'haldi',
      badge: 'Festival',
      short: 'Installing Ganpati at home for Ganeshotsav, daily puja, and uttarpuja before visarjan.',
      durationLabel: '1 hour on day one, then ~30 min daily',
      durationMins: 60,
      price: { min: 1500, max: 1500 },
      perDay: true,
      samagri: 'Included for sthapana; daily flowers by family',
      occasions: ['festival'],
      goodFor: ['Ganesh Chaturthi at home', '1½, 5, 7 or 10-day Ganpati', 'Society pandals'],
      about:
        'Pranpratishtha — inviting Ganpati into the murti — on the first day, followed by daily puja and aarti for as many days as your family keeps Ganpati. On the last day, Guruji performs the uttarpuja that respectfully closes the festival before visarjan.',
      why:
        'Welcoming Ganpati home properly, and sending him off with the same care, is the heart of the festival for many Marathi families.',
      included: [
        'Pranpratishtha mantras and sthapana samagri',
        'Daily puja and aarti with the family',
        'Uttarpuja on visarjan day'
      ],
      arrange: [
        'The Ganpati murti and makhar / decoration',
        'Fresh flowers and 21 durva blades each day',
        'Modak or other naivedya, and an aarti plate'
      ],
      prep: [
        'Book early — Ganeshotsav dates are usually full 2–3 months ahead.',
        'Keep the murti’s face covered until the sthapana.',
        'Decide the number of days (1½, 5, 7 or 10) before booking.'
      ],
      slotHint: 'morning'
    },
    {
      id: 'vastu-shanti',
      name: 'Vastu Shanti',
      mr: 'वास्तुशांती',
      motif: 'rangoli',
      tone: 'sage',
      short: 'A puja to bring harmony to a home or office and correct vastu doshas — no demolition needed.',
      durationLabel: '2 hours',
      durationMins: 120,
      price: { min: 5000, max: 7000 },
      samagri: 'Included, including havan samagri',
      occasions: ['newhome', 'office'],
      goodFor: ['Homes with vastu concerns', 'New office or shop', 'After major renovation'],
      about:
        'A puja to Vastu Purush, the deity of the dwelling, together with Navagraha shanti and a homa. It seeks harmony between a space and the people who live or work in it — traditionally done without breaking walls or moving rooms.',
      why:
        'When a space doesn’t feel settled, or you are starting fresh, it is the traditional way to begin again on a steady footing.',
      included: [
        'All puja and havan samagri',
        'A look at your floor plan beforehand, to prepare the right sankalp',
        'Guidance on simple, practical follow-ups (no expensive “remedies”)'
      ],
      arrange: [
        'A photo of the floor plan on WhatsApp (optional, but helps)',
        'Fruits and sweets for prasad',
        'A ventilated spot for the havan kund',
        'The owner or main family members present'
      ],
      prep: [
        'For offices, book before working hours or on a holiday.',
        'Tell your building or society about the small havan.',
        'Keep all rooms unlocked so Guruji can sprinkle tirth everywhere.'
      ],
      slotHint: 'early'
    },
    {
      id: 'shraddha',
      name: 'Shraddha / Pind Daan',
      mr: 'श्राद्ध / पिंडदान',
      motif: 'pinda',
      tone: 'stone',
      short: 'Annual rites for departed parents and ancestors, on their tithi or in Pitru Paksha.',
      durationLabel: '1½ hours',
      durationMins: 90,
      price: { min: 2000, max: 3000 },
      samagri: 'Essentials included (darbha, til, etc.)',
      occasions: ['ancestors'],
      goodFor: ['Annual tithi of a parent', 'Pitru Paksha / Mahalaya', 'First-year rites'],
      about:
        'Pinda — rice balls mixed with til — are offered with water and prayers for the peace of the departed, followed by a meal offered in their memory. Guruji performs it according to your family’s own customs.',
      why:
        'It is a family’s way of remembering — and of showing the next generation where they come from.',
      included: [
        'Darbha, til and other essential samagri',
        'Help working out the correct tithi from the date of passing',
        'Quiet, unhurried guidance for whoever performs the rites'
      ],
      arrange: [
        'The traditional meal, cooked at home (list shared in advance)',
        'Name(s) of the departed and, if known, the gotra',
        'The family member performing the rites to be present'
      ],
      prep: [
        'Share the date of passing — Guruji will confirm the tithi for this year.',
        'Cook without onion and garlic on the day.',
        'Guruji will explain any customs specific to your family on the call.'
      ],
      slotHint: 'afternoon'
    },
    {
      id: 'rudrabhishek',
      name: 'Rudrabhishek',
      mr: 'रुद्राभिषेक',
      motif: 'bel',
      tone: 'green',
      short: 'Abhishek of the Shivling with the Rudra chanted — for health, peace and Shravan Mondays.',
      durationLabel: '2 hours',
      durationMins: 120,
      price: { min: 3500, max: 5000 },
      samagri: 'Included',
      occasions: ['celebration', 'festival'],
      goodFor: ['Shravan Mondays', 'Mahashivratri', 'Prayers for a family member’s health'],
      about:
        'Water, milk, curd, honey and other offerings are poured over the Shivling while the Rudradhyaya is chanted, followed by bel-patra archana and aarti.',
      why:
        'A calm, deeply traditional puja that families often choose when someone’s health or a new start is on their mind.',
      included: [
        'Shivling (if you don’t have one), and all abhishek samagri',
        'Full Rudradhyaya chanting',
        'Aarti and prasad guidance'
      ],
      arrange: [
        'About 2 litres of milk',
        'Fresh bel leaves, if you can find them',
        'Fruits for naivedya'
      ],
      prep: [
        'Keep a tray or basin ready — abhishek involves pouring liquids.',
        'Mondays in Shravan get booked early.',
        'Tell Guruji on the call if the puja is for someone specific.'
      ],
      slotHint: 'early'
    },
    {
      id: 'naamkaran',
      name: 'Naamkaran',
      en: 'Naming ceremony',
      mr: 'नामकरण (बारसे)',
      motif: 'palna',
      tone: 'blush',
      short: 'A baby’s naming ceremony, traditionally on the twelfth day — the Marathi barsa.',
      durationLabel: '1½ hours',
      durationMins: 90,
      price: { min: 2500, max: 3500 },
      samagri: 'Included',
      occasions: ['baby'],
      goodFor: ['Barsa on the 12th day', 'Naming later in the first year'],
      about:
        'A short puja for the child’s wellbeing, after which the chosen name is whispered into the baby’s ear and then said aloud for the family. The baby is placed in the palna (cradle) as the women of the family sing.',
      why:
        'It is a baby’s first ceremony — the first time the whole family says the name aloud, together.',
      included: [
        'Puja samagri',
        'Help with name letters from the birth nakshatra, if you’d like',
        'Guidance on the palna ceremony'
      ],
      arrange: [
        'The palna (cradle), decorated if you wish',
        'The chosen name(s), written on a card',
        'Sweets for guests'
      ],
      prep: [
        'Share the baby’s birth date, time and place if you want name suggestions.',
        'Plan around the baby’s feeding and nap time — Guruji will adapt.',
        'Keep the ceremony space warm and draught-free.'
      ],
      slotHint: 'morning'
    }
  ];

  const OCCASIONS = [
    { id: 'all', label: 'All ceremonies' },
    { id: 'newhome', label: 'New home' },
    { id: 'celebration', label: 'Celebration or thanksgiving' },
    { id: 'baby', label: 'New baby' },
    { id: 'festival', label: 'Festival' },
    { id: 'ancestors', label: 'Remembering ancestors' },
    { id: 'office', label: 'Office or shop' }
  ];

  const SLOTS = [
    { id: 'early', label: 'Early morning', range: '6 – 9 am', start: 6, end: 9 },
    { id: 'morning', label: 'Morning', range: '9 am – 12 pm', start: 9, end: 12 },
    { id: 'afternoon', label: 'Afternoon', range: '12 – 4 pm', start: 12, end: 16 },
    { id: 'evening', label: 'Evening', range: '4 – 8 pm', start: 16, end: 20 }
  ];

  const GANESH_DAYS = [
    { v: 1.5, label: '1½ days' },
    { v: 5, label: '5 days' },
    { v: 7, label: '7 days' },
    { v: 10, label: '10 days' }
  ];

  const AREAS = {
    Pune: ['Kothrud', 'Karve Nagar', 'Warje', 'Erandwane', 'Deccan', 'Shivajinagar', 'Sadashiv Peth', 'Narayan Peth',
      'Sinhagad Road', 'Bibwewadi', 'Kondhwa', 'Hadapsar', 'Magarpatta', 'Kharadi', 'Viman Nagar', 'Kalyani Nagar',
      'Aundh', 'Baner', 'Balewadi', 'Pashan', 'Bavdhan', 'Wakad', 'Hinjewadi'],
    'Pimpri-Chinchwad': ['Pimpri', 'Chinchwad', 'Akurdi', 'Nigdi', 'Pradhikaran', 'Ravet', 'Pimple Saudagar',
      'Pimple Nilakh', 'Sangvi', 'Bhosari', 'Moshi', 'Chikhli']
  };

  const GALLERY = [
    { motif: 'kalashHero', tone: 'sand', title: 'Satyanarayan Puja', place: 'Kothrud', when: 'Aug 2026', span: 'tall' },
    { motif: 'havan', tone: 'clay', title: 'Griha Pravesh havan', place: 'Wakad', when: 'Jul 2026' },
    { motif: 'modak', tone: 'haldi', title: 'Ganeshotsav, day one', place: 'Sadashiv Peth', when: 'Sep 2026' },
    { motif: 'rangoli', tone: 'sage', title: 'Vastu Shanti, new office', place: 'Hinjewadi', when: 'Jun 2026', span: 'wide' },
    { motif: 'palna', tone: 'blush', title: 'Barsa for baby Ira', place: 'Aundh', when: 'May 2026' },
    { motif: 'diya', tone: 'green', title: 'Evening aarti', place: 'Pimple Saudagar', when: 'Apr 2026' }
  ];

  return { CONFIG, RITUALS, OCCASIONS, SLOTS, GANESH_DAYS, AREAS, GALLERY };
})();
