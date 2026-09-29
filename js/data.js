/* Site content for Ramakant Guruji's booking page.
   Everything a priest would edit lives here: contact, ceremonies, areas, gallery.
   Text fields are { mr, en } pairs; Marathi is the default language.
   Durations (minutes) and dakshina options mirror Guruji's existing booking page. */
window.SITE = (() => {
  const b = (mr, en) => ({ mr, en });

  const CONFIG = {
    // Placeholder number — replace before sharing publicly.
    phoneDisplay: '+91 90000 00000',
    phoneHref: 'tel:+919000000000',
    whatsapp: '919000000000',
    // Guruji's portrait; the page falls back to an illustration until this file exists.
    photo: 'assets/ramakant-guruji.jpg',
    advancePct: 50,
    featured: 9, // ceremonies shown before "Show all"
    responseTime: b('2 तासांत', 'within 2 hours'),
    callHours: b('सकाळी 7 ते रात्री 9', '7 am – 9 pm')
  };

  /* Each ceremony: mins = duration; prices = dakshina options offered (₹).
     online = can be performed over video call. */
  const RITUALS = [
    {
      id: 'satyanarayan', motif: 'kalash', tone: 'sand', online: true,
      name: b('सत्यनारायण पूजा', 'Satyanarayan Puja'),
      badge: b('सर्वाधिक बुकिंग', 'Most booked'),
      mins: 90, prices: [1100, 2100, 3100, 5100],
      occasions: ['special', 'newhome', 'office'],
      short: b('घरगुती कार्यक्रम, वाढदिवस आणि नव्या सुरुवातीसाठी कृतज्ञतेची पूजा.',
        'A thanksgiving puja for house functions, birthdays and new beginnings.'),
      about: b('श्री विष्णूंच्या सत्यनारायण रूपाची पूजा, त्यानंतर सत्यनारायणाची कथा — दिलेला शब्द पाळणे आणि कृतज्ञ राहणे यावरील पाच छोट्या कथा. शेवटी आरती आणि सर्वांना शिऱ्याचा प्रसाद.',
        'A puja to Lord Vishnu in his Satyanarayan form, followed by the Satyanarayan Katha — five short stories about keeping one’s word and remembering to be grateful. It closes with aarti and sheera prasad shared with everyone present.'),
      why: b('संपूर्ण कुटुंबाने मिळून “धन्यवाद” म्हणण्याचा हा सर्वात सोपा मार्ग — आणि मित्र-शेजाऱ्यांना आमंत्रित करण्यासाठी सर्वात सोयीची पूजा.',
        'It is the simplest way for a family to say “thank you” together — and the easiest puja to invite friends and neighbours to.'),
      goodFor: b(['घरगुती कार्यक्रम', 'वाढदिवस व लग्नाचा वाढदिवस', 'मनोकामना पूर्ण झाल्यावर', 'नवी नोकरी किंवा व्यवसाय'],
        ['House functions', 'Birthdays & anniversaries', 'Thanksgiving', 'New job or business']),
      included: b(['पूजेचे साहित्य (हळद-कुंकू, फुले, सुपारी, पंचामृताचे साहित्य इ.)', 'कथेचे वाचन, सोबत अर्थ समजावून', 'आरती व प्रसाद वाटपाचे मार्गदर्शन'],
        ['Puja samagri (haldi-kunku, flowers, supari, panchamrut items, etc.)', 'Katha recitation, with the meaning explained as he goes', 'Aarti and guidance on prasad distribution']),
      arrange: b(['सुमारे 6 × 6 फूट स्वच्छ जागा आणि पाट किंवा चौरंग', 'शिऱ्याचा प्रसाद (प्रमाण व्हॉट्सॲपवर कळवले जाईल)', 'पाच प्रकारची फळे, घरातील कलश व ताम्हण'],
        ['A clean space of about 6 × 6 ft, and a low wooden paat or chowrang', 'Sheera prasad (quantities shared on WhatsApp)', 'Five kinds of fruit, a kalash and a plate from your kitchen']),
      prep: b(['गुरुजी येण्यापूर्वी शिऱ्याचा प्रसाद तयार ठेवा.', 'घरात पूजेपर्यंत उपवास करण्याची प्रथा असल्यास ती पाळा — हे ऐच्छिक आहे.', 'कथा व आरतीसाठी पाहुण्यांना बोलवा.'],
        ['Prepare the sheera prasad before Guruji arrives.', 'If your family keeps a fast until the puja, continue as usual — it’s optional.', 'Invite guests for the Katha and aarti.']),
      slotHint: 'evening'
    },
    {
      id: 'griha-pravesh', motif: 'toranDoor', tone: 'clay', online: false,
      name: b('गृहप्रवेश', 'Griha Pravesh'), sub: b('', 'Housewarming'),
      mins: 60, prices: [1500],
      occasions: ['newhome'],
      short: b('नव्या घरात पारंपरिक पहिला प्रवेश.', 'The traditional first entry into a new home.'),
      about: b('गणेश पूजन, पुण्याहवाचन (वास्तूची शुद्धी) आणि कलशासह संपूर्ण कुटुंबाचा गृहप्रवेश — व नव्या स्वयंपाकघरात पहिल्यांदा दूध उतू घालणे. होमासह सविस्तर विधी हवा असल्यास वास्तुशांती पाहा.',
        'Ganesh puja, Punyahavachan (purification of the space) and the family’s entry together with the kalash — then boiling milk in the new kitchen for the first time. For a fuller rite with a havan, see Vastu Shanti.'),
      why: b('घर “आपले” होण्याचा हा क्षण — आणि त्या घरातील संपूर्ण कुटुंबाची पहिली एकत्र आठवण.',
        'It marks the moment a house becomes your home, and gives the whole family its first shared memory there.'),
      goodFor: b(['नवीन फ्लॅट किंवा घर', 'नूतनीकरण केलेले घर', 'खरेदीनंतरचा पहिला प्रवेश'], ['New flat or house', 'Renovated home', 'First entry after purchase']),
      included: b(['गृहप्रवेशाचा मुहूर्त निवडण्यास मदत', 'प्रत्येक विधीचे टप्प्याटप्प्याने स्पष्टीकरण'], ['Help choosing the muhurat for your entry', 'Step-by-step explanation of each ritual']),
      arrange: b(['दूध व पहिल्यांदा उतू घालण्यासाठी नवे भांडे', 'मुख्य दारासाठी आंब्याच्या पानांचे तोरण (ऐच्छिक)', 'प्रसादासाठी फळे व मिठाई'],
        ['Milk and a new vessel for the first boil in the kitchen', 'Mango-leaf toran for the main door (optional)', 'Fruits and sweets for prasad']),
      prep: b(['पत्ता व पसंतीची तारीख लवकर कळवा — मुहूर्ताच्या तारखा लवकर भरतात.', 'मुख्य दार व स्वयंपाकघर मोकळे ठेवा; फर्निचर नंतर आणता येईल.', 'गोत्र माहीत नसल्यास काळजी करू नका.'],
        ['Share the address and preferred date early — muhurat dates fill fast.', 'Keep the main door and kitchen clear; furniture can come in after.', 'Don’t worry if you don’t know the gotra.']),
      slotHint: 'early'
    },
    {
      id: 'vastu-shanti', motif: 'rangoli', tone: 'sage', online: false,
      name: b('वास्तुशांती', 'Vastu Shanti'),
      mins: 180, prices: [7100, 11000, 15000, 21000],
      occasions: ['newhome', 'office', 'shanti'],
      short: b('घर किंवा ऑफिसमध्ये सुसंवाद आणि वास्तुदोष निवारणासाठी पूजा व होम — तोडफोड न करता.',
        'A puja and homa to bring harmony to a home or office and correct vastu doshas — no demolition needed.'),
      about: b('वास्तुपुरुषाची पूजा, सोबत नवग्रह शांती व होम. जागा आणि तिथे राहणारी किंवा काम करणारी माणसे यांच्यात सुसंवाद साधणे हा हेतू — परंपरेनुसार भिंती न पाडता किंवा खोल्या न बदलता.',
        'A puja to Vastu Purush, the deity of the dwelling, together with Navagraha shanti and a homa. It seeks harmony between a space and the people who live or work in it — traditionally without breaking walls or moving rooms.'),
      why: b('नवी वास्तू असो किंवा जागेत अस्वस्थता जाणवत असो — स्थिर पायावर सुरुवात करण्याचा हा पारंपरिक मार्ग आहे.',
        'Whether the space is new or simply doesn’t feel settled, it is the traditional way to begin on a steady footing.'),
      goodFor: b(['नव्या घराचा गृहप्रवेश होमासह', 'नवीन ऑफिस किंवा दुकान', 'मोठ्या नूतनीकरणानंतर'], ['A new home, with a full havan', 'New office or shop', 'After major renovation']),
      included: b(['योग्य संकल्पासाठी आधी घराच्या नकाशाचे अवलोकन', 'सोपे, व्यवहार्य पुढील उपाय (महागडे “उपाय” नाहीत)'],
        ['A look at your floor plan beforehand, to prepare the right sankalp', 'Simple, practical follow-ups (no expensive “remedies”)']),
      arrange: b(['घराच्या नकाशाचा फोटो व्हॉट्सॲपवर (ऐच्छिक)', 'होमकुंडासाठी हवेशीर जागा', 'मालक किंवा घरातील प्रमुख व्यक्तींची उपस्थिती'],
        ['A photo of the floor plan on WhatsApp (optional)', 'A ventilated spot for the havan kund', 'The owner or main family members present']),
      prep: b(['ऑफिससाठी कामकाजापूर्वी किंवा सुट्टीच्या दिवशी बुक करा.', 'सोसायटीला होमाबद्दल आधी कळवा.'],
        ['For offices, book before working hours or on a holiday.', 'Let your building or society know about the havan.']),
      slotHint: 'early'
    },
    {
      id: 'vivah', motif: 'toranDoor', tone: 'blush', online: false,
      name: b('विवाह', 'Vivah'), sub: b('', 'Wedding'),
      mins: 210, prices: [7100, 11000, 15000, 21000],
      occasions: ['wedding'],
      short: b('वैदिक पद्धतीने संपूर्ण विवाह संस्कार — कन्यादानापासून सप्तपदीपर्यंत.', 'The complete Vedic wedding — from kanyadaan to saptapadi.'),
      about: b('कन्यादान, मंगलाष्टके, विवाह होम, लाजाहोम व सप्तपदी — महाराष्ट्रीय परंपरेनुसार संपूर्ण विवाहविधी. दोन्ही कुटुंबांच्या प्रथांनुसार विधींची आखणी गुरुजी आधीच करून देतात.',
        'Kanyadaan, mangalashtake, the wedding homa, laja homa and saptapadi — the complete Maharashtrian wedding rite. Guruji plans the sequence with both families beforehand, respecting each side’s customs.'),
      why: b('दोन व्यक्ती आणि दोन कुटुंबे एकत्र येण्याचा सर्वात महत्त्वाचा संस्कार — प्रत्येक विधीचा अर्थ कळला, तर तो क्षण अधिक अर्थपूर्ण होतो.',
        'The most important samskara for two people and two families — and far more meaningful when everyone understands each step.'),
      goodFor: b(['हॉलमधील विवाह', 'घरगुती / छोटेखानी विवाह', 'नोंदणी विवाहानंतर वैदिक विधी'], ['Hall weddings', 'Small home weddings', 'Vedic rites after a registered marriage']),
      included: b(['विवाहाच्या मुहूर्ताचे मार्गदर्शन', 'संपूर्ण विधी, सोबत अर्थ समजावून'], ['Guidance on the wedding muhurat', 'The full ceremony, explained as it happens']),
      arrange: b(['मंडप / हॉल व होमासाठी जागा', 'दोन्ही कुटुंबांची नावे, गोत्रे व कुलदेवता'], ['Mandap or hall, with space for the homa', 'Names, gotras and kuladevata of both families']),
      prep: b(['मुहूर्त ठरताच लवकर बुक करा — लग्नसराईत तारखा लवकर भरतात.', 'विधींचा क्रम हॉलच्या वेळापत्रकाशी जुळवण्यासाठी गुरुजींशी आधी बोला.'],
        ['Book as soon as the muhurat is fixed — wedding-season dates go quickly.', 'Talk to Guruji early to fit the rites to the hall’s schedule.']),
      slotHint: 'morning'
    },
    {
      id: 'abhishek', motif: 'bel', tone: 'green', online: true,
      name: b('अभिषेक', 'Abhishek'),
      mins: 60, prices: [1100, 2100, 3100, 5100],
      occasions: ['special', 'festival'],
      short: b('मंत्रोच्चारासह शिवलिंगावर किंवा देवमूर्तीवर अभिषेक — आरोग्य, शांती व श्रावणी सोमवारांसाठी.',
        'Abhishek of the Shivling or a deity with Vedic chanting — for health, peace and Shravan Mondays.'),
      about: b('मंत्रपठण सुरू असताना पाणी, दूध, दही, मध इत्यादींचा अभिषेक, त्यानंतर बेलपत्र अर्चना व आरती.',
        'Water, milk, curd, honey and other offerings are poured while the mantras are chanted, followed by bel-patra archana and aarti.'),
      why: b('कोणाच्या आरोग्याची काळजी असेल किंवा नवी सुरुवात करायची असेल, तेव्हा कुटुंबे अनेकदा ही शांत, पारंपरिक पूजा निवडतात.',
        'A calm, traditional puja families often choose when someone’s health or a new start is on their mind.'),
      goodFor: b(['श्रावणी सोमवार', 'महाशिवरात्री', 'वाढदिवस', 'कुटुंबातील व्यक्तीच्या आरोग्यासाठी'], ['Shravan Mondays', 'Mahashivratri', 'Birthdays', 'Prayers for a family member’s health']),
      included: b(['मंत्रपठण व अभिषेकाचे मार्गदर्शन', 'आरती व प्रसादाचे मार्गदर्शन'], ['Chanting and guidance through the abhishek', 'Aarti and prasad guidance']),
      arrange: b(['सुमारे 2 लिटर दूध', 'मिळाल्यास ताजी बेलपत्रे', 'नैवेद्यासाठी फळे'], ['About 2 litres of milk', 'Fresh bel leaves, if you can find them', 'Fruits for naivedya']),
      prep: b(['ताम्हण किंवा परात तयार ठेवा — अभिषेकात द्रव ओतले जातात.', 'श्रावणातील सोमवार लवकर बुक होतात.'],
        ['Keep a tray or basin ready — abhishek involves pouring liquids.', 'Mondays in Shravan get booked early.']),
      slotHint: 'early'
    },
    {
      id: 'shraddha', motif: 'pinda', tone: 'stone', online: true,
      name: b('श्राद्ध / पिंडदान', 'Shraddha / Pind Daan'),
      mins: 60, prices: [1100, 2100],
      occasions: ['ancestors'],
      short: b('दिवंगत आई-वडील व पूर्वजांसाठी वार्षिक विधी — तिथीला किंवा पितृपक्षात.', 'Annual rites for departed parents and ancestors, on their tithi or in Pitru Paksha.'),
      about: b('तीळ मिसळलेले भाताचे पिंड पाणी व प्रार्थनेसह दिवंगतांच्या शांतीसाठी अर्पण केले जातात, त्यानंतर त्यांच्या स्मरणार्थ भोजन. गुरुजी हा विधी आपल्या कुटुंबाच्या प्रथेनुसारच करतात.',
        'Pinda — rice balls mixed with til — are offered with water and prayers for the peace of the departed, followed by a meal offered in their memory. Guruji follows your family’s own customs.'),
      why: b('आठवण जपण्याचा हा कुटुंबाचा मार्ग — आणि पुढच्या पिढीला आपली मुळे दाखवण्याचाही.', 'It is a family’s way of remembering — and of showing the next generation where they come from.'),
      goodFor: b(['आई-वडिलांची वार्षिक तिथी', 'पितृपक्ष / महालय', 'वर्षश्राद्ध'], ['Annual tithi of a parent', 'Pitru Paksha / Mahalaya', 'First-year rites']),
      included: b(['निधनाच्या तारखेवरून योग्य तिथी काढण्यास मदत', 'विधी करणाऱ्या व्यक्तीला शांत, सावकाश मार्गदर्शन'], ['Help working out the tithi from the date of passing', 'Quiet, unhurried guidance for whoever performs the rites']),
      arrange: b(['घरी केलेला पारंपरिक स्वयंपाक (यादी आधी पाठवली जाईल)', 'दिवंगतांचे नाव व माहीत असल्यास गोत्र'], ['The traditional meal, cooked at home (list shared in advance)', 'Name(s) of the departed and, if known, the gotra']),
      prep: b(['निधनाची तारीख कळवा — या वर्षीची तिथी गुरुजी निश्चित करतील.', 'त्या दिवशी कांदा-लसूण न वापरता स्वयंपाक करा.'],
        ['Share the date of passing — Guruji will confirm this year’s tithi.', 'Cook without onion and garlic on the day.']),
      slotHint: 'afternoon'
    },
    {
      id: 'lakshmi-kuber', motif: 'diya', tone: 'haldi', online: true,
      name: b('लक्ष्मी-कुबेर पूजन', 'Lakshmi Kuber Pujan'), sub: b('दिवाळी पूजा', 'Diwali puja'),
      mins: 65, prices: [3100],
      occasions: ['festival', 'office'],
      short: b('दिवाळीत घरी किंवा दुकानात श्रीलक्ष्मी व कुबेराची पूजा.', 'Lakshmi and Kuber puja for Diwali, at home or in your shop.'),
      about: b('लक्ष्मीपूजनाच्या मुहूर्तावर श्रीलक्ष्मी व धनाधिपती कुबेर यांची पूजा, वह्या-चोपड्यांचे पूजन व आरती.',
        'Worship of Shri Lakshmi and Kuber, lord of wealth, at the Lakshmi Pujan muhurat — with the account books and aarti.'),
      why: b('वर्षभराच्या समृद्धीबद्दल कृतज्ञता आणि नव्या वर्षाची शुभ सुरुवात.', 'Gratitude for the year’s prosperity and an auspicious start to the next.'),
      goodFor: b(['दिवाळी — लक्ष्मीपूजन', 'दुकान / ऑफिसमधील वही पूजन'], ['Diwali Lakshmi Pujan', 'Account-book puja for shops and offices']),
      included: b(['लक्ष्मीपूजनाच्या मुहूर्ताचे मार्गदर्शन', 'पूजा, सोबत अर्थ समजावून'], ['Guidance on the Lakshmi Pujan muhurat', 'The puja, explained as it happens']),
      arrange: b(['लक्ष्मीची मूर्ती किंवा फोटो, नाणी / दागिने', 'वह्या-चोपड्या, फुले, धने-गूळ, बत्तासे'], ['A Lakshmi murti or picture, coins or jewellery', 'Account books, flowers, dhane-gul and battase']),
      prep: b(['लक्ष्मीपूजनाचा मुहूर्त अल्प असतो — खूप आधी बुक करा.', 'पूजेची जागा आदल्या दिवशी स्वच्छ करून रांगोळी काढा.'],
        ['The Lakshmi Pujan muhurat is short — book well ahead.', 'Clean the puja space the day before and draw a rangoli.']),
      slotHint: 'evening'
    },
    {
      id: 'ganesh', motif: 'modak', tone: 'haldi', online: true,
      name: b('गणेश स्थापना व विसर्जन', 'Ganesh Sthapana & Visarjan'),
      badge: b('उत्सव', 'Festival'),
      durationLabel: b('पहिल्या दिवशी 1 तास, नंतर रोज ~30 मिनिटे', '1 hour on day one, then ~30 min daily'),
      mins: 60, prices: [1500], perDay: true,
      occasions: ['festival'],
      short: b('गणेशोत्सवात घरी गणपतीची स्थापना, रोजची पूजा व विसर्जनापूर्वी उत्तरपूजा.', 'Installing Ganpati at home for Ganeshotsav, daily puja, and uttarpuja before visarjan.'),
      about: b('पहिल्या दिवशी प्राणप्रतिष्ठा — मूर्तीत गणपतीचे आवाहन — त्यानंतर जितके दिवस गणपती घरी असतील तितके दिवस रोजची पूजा व आरती. शेवटच्या दिवशी विसर्जनापूर्वी गुरुजी उत्तरपूजा करून उत्सवाची सांगता करतात.',
        'Pranpratishtha — inviting Ganpati into the murti — on the first day, then daily puja and aarti for as many days as your family keeps Ganpati. On the last day, Guruji performs the uttarpuja that closes the festival before visarjan.'),
      why: b('गणपतीचे स्वागत विधिवत करणे आणि तितक्याच प्रेमाने निरोप देणे — हेच अनेक मराठी घरांसाठी उत्सवाचे मर्म आहे.', 'Welcoming Ganpati home properly, and sending him off with the same care, is the heart of the festival for many Marathi families.'),
      goodFor: b(['घरचा गणपती', 'दीड, 5, 7 किंवा 10 दिवसांचा गणपती', 'सोसायटीचा गणेशोत्सव'], ['Ganpati at home', '1½, 5, 7 or 10-day Ganpati', 'Society pandals']),
      included: b(['प्राणप्रतिष्ठेचे मंत्र', 'कुटुंबासोबत रोजची पूजा व आरती', 'विसर्जनाच्या दिवशी उत्तरपूजा'], ['Pranpratishtha mantras', 'Daily puja and aarti with the family', 'Uttarpuja on visarjan day']),
      arrange: b(['गणपतीची मूर्ती व मखर / सजावट', 'रोज ताजी फुले व 21 दूर्वा', 'मोदक किंवा इतर नैवेद्य'], ['The Ganpati murti and makhar / decoration', 'Fresh flowers and 21 durva blades each day', 'Modak or other naivedya']),
      prep: b(['लवकर बुक करा — गणेशोत्सवाच्या तारखा 2–3 महिने आधीच भरतात.', 'स्थापनेपर्यंत मूर्तीचा चेहरा झाकून ठेवा.'], ['Book early — Ganeshotsav dates fill 2–3 months ahead.', 'Keep the murti’s face covered until the sthapana.']),
      slotHint: 'morning'
    },
    {
      id: 'udak-shanti', motif: 'kalash', tone: 'sage', online: false,
      name: b('उदक शांती', 'Udak Shanti'),
      mins: 80, prices: [4100],
      occasions: ['special', 'newhome', 'shanti'],
      short: b('कलशातील जलावर शांतिमंत्रांचे पठण — घर व कुटुंबाच्या शांतीसाठी.', 'Shanti mantras chanted over water in a kalash — for peace in the home and family.'),
      about: b('वरुणदेवतेचे आवाहन करून कलशातील जलावर शांतिसूक्तांचे पठण; ते अभिमंत्रित जल घरभर व कुटुंबीयांवर शिंपडले जाते. आजारपणानंतर, अडचणींनंतर किंवा शुभकार्यापूर्वी केली जाते.',
        'Varuna is invoked and shanti suktas are chanted over water in a kalash; the sanctified water is then sprinkled through the home and on the family. Done after illness or difficulty, or before a family function.'),
      why: b('घरात पुन्हा शांतता व सकारात्मकता आणण्याचा पारंपरिक, होमविरहित विधी.', 'A traditional way — without a havan — to bring calm back into a home.'),
      goodFor: b(['आजारपण किंवा अडचणींनंतर', 'शुभकार्यापूर्वी', 'वाढदिवस (विशेषतः 60 / 75 वा)'], ['After illness or difficulty', 'Before a family function', 'Milestone birthdays (60th, 75th)']),
      included: b(['शांतिसूक्तांचे पठण', 'अभिमंत्रित जलाचे प्रोक्षण'], ['Recitation of the shanti suktas', 'Sprinkling of the sanctified water']),
      arrange: b(['कलश व आंब्याची पाने', 'संपूर्ण कुटुंबाची उपस्थिती'], ['A kalash and mango leaves', 'The whole family present']),
      prep: b(['सर्व खोल्या उघड्या ठेवा.', 'कुटुंबीयांची नावे गुरुजींना आधी कळवा.'], ['Keep all rooms open.', 'Share family members’ names with Guruji beforehand.']),
      slotHint: 'morning'
    },
    {
      id: 'sakharpuda', motif: 'kalash', tone: 'blush', online: false,
      name: b('साखरपुडा', 'Sakharpuda'), sub: b('', 'Engagement'),
      mins: 90, prices: [2100, 2500, 3100, 5000],
      occasions: ['wedding'],
      short: b('साखरपुडा — वाङ्निश्चयाचा पारंपरिक विधी.', 'Sakharpuda — the traditional Marathi engagement.'),
      about: b('गणपती पूजन, वाङ्निश्चय (लग्न ठरल्याची औपचारिक घोषणा), वधू-वरांची ओटी व अंगठी — दोन्ही कुटुंबांच्या उपस्थितीत छोटा, आनंदी विधी.',
        'Ganesh puja, vangnishchay (the formal promise of marriage), the oti and the exchange of rings — a short, joyful rite with both families present.'),
      why: b('लग्नाच्या तयारीची शुभ सुरुवात — दोन्ही कुटुंबांनी एकमेकांना दिलेला शब्द.', 'An auspicious start to the wedding preparations — the word given by both families.'),
      goodFor: b(['घरी किंवा हॉलमध्ये साखरपुडा', 'लग्नापूर्वी वाङ्निश्चय'], ['Engagement at home or in a hall', 'Vangnishchay before the wedding']),
      included: b(['गणेश पूजन व वाङ्निश्चयाचे मंत्र', 'विधीचा क्रम व मार्गदर्शन'], ['Ganesh puja and vangnishchay mantras', 'Guidance on the order of the ceremony']),
      arrange: b(['अंगठ्या, ओटीचे साहित्य व साखर', 'दोन्ही कुटुंबांसाठी बसण्याची व्यवस्था'], ['Rings, oti items and sugar', 'Seating for both families']),
      prep: b(['दोन्ही कुटुंबांच्या प्रथा गुरुजींना आधी कळवा.', 'मुहूर्तासाठी गुरुजींचा सल्ला घ्या.'], ['Tell Guruji about both families’ customs beforehand.', 'Ask Guruji to suggest the muhurat.']),
      slotHint: 'evening'
    },
    {
      id: 'sanskar', motif: 'palna', tone: 'blush', online: false,
      name: b('सोळा संस्कार', 'The 16 samskaras'),
      sub: b('कोणताही एक संस्कार — गर्भाधान, नामकरण, अन्नप्राशन, मुंज इ.', 'Any one — garbhadhan, naamkaran, annaprashan, munj and others'),
      mins: 150, prices: [5100],
      occasions: ['wedding', 'baby'],
      short: b('सोळा संस्कारांपैकी कोणताही एक — गर्भाधानापासून नामकरण, अन्नप्राशन, मुंजीपर्यंत.', 'Any one of the sixteen samskaras — from garbhadhan to naamkaran, annaprashan and munj.'),
      about: b('जन्मापूर्वीपासून आयुष्यभर केले जाणारे सोळा वैदिक संस्कार — गर्भाधान, पुंसवन, सीमंतोन्नयन, जातकर्म, नामकरण, अन्नप्राशन, चौल, उपनयन (मुंज) इत्यादी. कुटुंबाच्या प्रथेनुसार गुरुजी योग्य संस्कार विधिवत करतात.',
        'The sixteen Vedic samskaras that mark a life from before birth onwards — garbhadhan, punsavan, simantonnayan, jatakarma, naamkaran, annaprashan, chaul, upanayan (munj) and more. Guruji performs the one you need, following your family’s customs.'),
      why: b('आयुष्याच्या प्रत्येक महत्त्वाच्या टप्प्याला दिलेला अर्थ — आणि कुटुंबाची परंपरा पुढे नेण्याचा मार्ग.', 'Each marks a milestone of life with meaning — and carries the family’s tradition forward.'),
      goodFor: b(['बाळाचे बारसे / नामकरण', 'अन्नप्राशन', 'मुंज (उपनयन)', 'गर्भाधान व सीमंतोन्नयन'], ['Barsa / naamkaran', 'Annaprashan', 'Munj (upanayan)', 'Garbhadhan and simantonnayan']),
      included: b(['कोणता संस्कार व केव्हा — याचे मार्गदर्शन', 'संपूर्ण विधी, सोबत अर्थ समजावून'], ['Guidance on which samskara and when', 'The full rite, explained as it happens']),
      arrange: b(['संस्कारानुसार साहित्याची यादी व्हॉट्सॲपवर मिळेल', 'बाळ / व्यक्तीची जन्मतारीख, वेळ व ठिकाण'], ['A samagri list for your samskara, on WhatsApp', 'Birth date, time and place of the child or person']),
      prep: b(['बुक करताना नोंदीत कोणता संस्कार ते लिहा.', 'बाळाच्या झोपेच्या व दूध पिण्याच्या वेळेनुसार नियोजन करा.'], ['Mention which samskara in the booking notes.', 'Plan around the baby’s feeding and nap times.']),
      slotHint: 'morning'
    },
    {
      id: 'janan-shanti', motif: 'lotus', tone: 'blush', online: false,
      name: b('जनन शांती', 'Janan Shanti'),
      sub: b('मघा, मूळ, आश्लेषा, विशाखा, ज्येष्ठा, धनिष्ठा, विष्टी, व्यतिपात, अमावस्या, कृष्ण चतुर्दशी', 'Magha, Mool, Ashlesha, Vishakha, Jyeshtha, Dhanishtha, Vishti, Vyatipat, Amavasya, Krishna Chaturdashi'),
      mins: 150, prices: [5100],
      occasions: ['baby', 'shanti'],
      short: b('विशिष्ट नक्षत्र, योग किंवा तिथीवर जन्म झाल्यास बाळासाठी केली जाणारी शांती.', 'A shanti for a baby born under particular nakshatras, yogas or tithis.'),
      about: b('मघा, मूळ, आश्लेषा, विशाखा, ज्येष्ठा, धनिष्ठा या नक्षत्रांवर, किंवा विष्टी, व्यतिपात, अमावस्या, कृष्ण चतुर्दशी अशा वेळी जन्म झाल्यास परंपरेनुसार बाळाच्या व कुटुंबाच्या कल्याणासाठी ही शांती केली जाते.',
        'By tradition, when a child is born in the Magha, Mool, Ashlesha, Vishakha, Jyeshtha or Dhanishtha nakshatras, or at times such as Vishti, Vyatipat, Amavasya or Krishna Chaturdashi, this shanti is performed for the wellbeing of the baby and family.'),
      why: b('बाळाच्या आयुष्याची शांत सुरुवात — आणि कुटुंबाच्या मनाला निश्चिंती.', 'A calm start for the baby — and peace of mind for the family.'),
      goodFor: b(['जन्मनक्षत्रानुसार शांती', 'बारशाच्या आसपास'], ['Shanti by birth nakshatra', 'Often done around the naming']),
      included: b(['जन्मवेळेवरून शांती आवश्यक आहे का ते तपासणे', 'शांतीचे मंत्र व होम'], ['Checking from the birth time whether the shanti is needed', 'Shanti mantras and homa']),
      arrange: b(['बाळाची जन्मतारीख, वेळ व ठिकाण', 'होमासाठी हवेशीर जागा'], ['Baby’s birth date, time and place', 'A ventilated spot for the homa']),
      prep: b(['जन्माची नेमकी वेळ गुरुजींना आधी पाठवा.', 'बाळ व आई-वडिलांची उपस्थिती आवश्यक.'], ['Send the exact birth time to Guruji beforehand.', 'The baby and both parents should be present.']),
      slotHint: 'morning'
    },
    {
      id: 'mangalagaur', motif: 'lotus', tone: 'blush', online: true,
      name: b('मंगळागौर पूजन', 'Mangalagaur Pujan'),
      mins: 60, prices: [2100],
      occasions: ['festival'],
      short: b('नवविवाहितांसाठी श्रावणातील मंगळवारी मंगळागौरीची पूजा.', 'The Shravan Tuesday Mangalagaur puja for newly married women.'),
      about: b('लग्नानंतरच्या पहिल्या पाच वर्षांत श्रावणातील मंगळवारी नववधू शिव-गौरीची पूजा करतात. गुरुजी पूजा सांगतात; त्यानंतरचे पारंपरिक खेळ व जागरण कुटुंबाचे.',
        'In the first five years after marriage, brides worship Shiva and Gauri on Tuesdays in Shravan. Guruji leads the puja; the traditional games and celebration follow with the family.'),
      why: b('नव्या संसारासाठी आशीर्वाद — आणि माहेर-सासरच्या स्त्रियांना एकत्र आणणारा सण.', 'Blessings for a new marriage — and a festival that brings the women of both families together.'),
      goodFor: b(['लग्नानंतरची पहिली मंगळागौर', 'श्रावणातील मंगळवार'], ['The first Mangalagaur after the wedding', 'Tuesdays in Shravan']),
      included: b(['पूजेचे संपूर्ण मार्गदर्शन', 'कहाणी व आरती'], ['Guidance through the full puja', 'The katha and aarti']),
      arrange: b(['पत्री, फुले व सोळा प्रकारची पाने', 'ओटी व नैवेद्य'], ['Patri, flowers and sixteen kinds of leaves', 'Oti and naivedya']),
      prep: b(['श्रावणातील मंगळवार लवकर भरतात — आधीच बुक करा.', 'इतर नववधू सहभागी होणार असल्यास नोंदीत लिहा.'], ['Shravan Tuesdays fill fast — book early.', 'Note in the booking if other brides will join.']),
      slotHint: 'morning'
    },
    {
      id: 'mangalagaur-udyapan', motif: 'havan', tone: 'blush', online: false,
      name: b('मंगळागौर पूजन व हवन उद्यापन', 'Mangalagaur Udyapan with Havan'),
      mins: 150, prices: [5100],
      occasions: ['festival'],
      short: b('पाच वर्षांच्या मंगळागौर व्रताची होमासह विधिवत सांगता.', 'The formal completion of the five-year Mangalagaur vrat, with a havan.'),
      about: b('पाच वर्षे मंगळागौरीचे व्रत केल्यानंतर पूजा, हवन व दानासह त्याची सांगता — उद्यापन.', 'After five years of the Mangalagaur vrat, it is completed — udyapan — with puja, a havan and daan.'),
      why: b('संकल्प पूर्ण केल्याचे समाधान — व्रताचा शेवट त्याच्या सुरुवातीइतकाच महत्त्वाचा.', 'The satisfaction of a vow fulfilled — the end of a vrat matters as much as its start.'),
      goodFor: b(['मंगळागौर व्रताचे पाचवे वर्ष'], ['The fifth year of the Mangalagaur vrat']),
      included: b(['पूजा व हवनाचे मार्गदर्शन', 'दानाबद्दल मार्गदर्शन'], ['Guidance through the puja and havan', 'Guidance on the daan']),
      arrange: b(['होमासाठी हवेशीर जागा', 'दानाचे साहित्य (यादी व्हॉट्सॲपवर)'], ['A ventilated spot for the havan', 'Daan items (list on WhatsApp)']),
      prep: b(['श्रावणात तारखा लवकर भरतात.'], ['Shravan dates fill quickly.']),
      slotHint: 'morning'
    },
    {
      id: 'somvar-udyapan', motif: 'bel', tone: 'green', online: false,
      name: b('सोमवार व्रत उद्यापन', 'Somvar Vrat Udyapan'),
      mins: 135, prices: [5100],
      occasions: ['festival'],
      short: b('सोमवारच्या व्रताची विधिवत सांगता.', 'The formal completion of the Monday vrat.'),
      about: b('ठरलेल्या सोमवारांचे व्रत पूर्ण झाल्यावर शिवपूजन, हवन व दानासह त्याची सांगता.', 'When the vowed number of Mondays is complete, the vrat is closed with Shiva puja, a havan and daan.'),
      why: b('संकल्प पूर्ण केल्याचे समाधान — व्रताचा शेवट त्याच्या सुरुवातीइतकाच महत्त्वाचा.', 'The satisfaction of a vow fulfilled — the end of a vrat matters as much as its start.'),
      goodFor: b(['सोळा सोमवार व्रत', 'श्रावणी सोमवार व्रत'], ['Solah Somvar vrat', 'Shravan Monday vrat']),
      included: b(['शिवपूजन व हवनाचे मार्गदर्शन', 'दानाबद्दल मार्गदर्शन'], ['Guidance through the Shiva puja and havan', 'Guidance on the daan']),
      arrange: b(['होमासाठी हवेशीर जागा', 'बेलपत्र, फुले व नैवेद्य'], ['A ventilated spot for the havan', 'Bel leaves, flowers and naivedya']),
      prep: b(['व्रताचा संकल्प केव्हा केला ते गुरुजींना सांगा.'], ['Tell Guruji when the vrat was begun.']),
      slotHint: 'early'
    },
    {
      id: 'bhumi-pujan', motif: 'kalash', tone: 'clay', online: false,
      name: b('भूमिपूजन', 'Bhoomi Pujan'),
      mins: 60, prices: [2100],
      occasions: ['newhome', 'office'],
      short: b('बांधकाम सुरू करण्यापूर्वी जमिनीची पूजा.', 'Worship of the land before construction begins.'),
      about: b('भूमातेची व वास्तुपुरुषाची पूजा आणि पायाभरणीचा शुभारंभ — बांधकाम निर्विघ्न व्हावे यासाठी.', 'Worship of Bhoomi Devi and Vastu Purush, and the ceremonial start of the foundation — for construction without obstacles.'),
      why: b('नव्या वास्तूचा पहिला पाया — शुभ मुहूर्तावर, विधिवत.', 'The first foundation of a new building — laid at an auspicious time, with due rites.'),
      goodFor: b(['घर / बंगल्याचे बांधकाम', 'इमारत किंवा व्यावसायिक प्रकल्प'], ['Building a house or bungalow', 'Buildings and commercial projects']),
      included: b(['भूमिपूजनाच्या मुहूर्ताचे मार्गदर्शन', 'पूजा, सोबत अर्थ समजावून'], ['Guidance on the muhurat', 'The puja, explained as it happens']),
      arrange: b(['साइटवर पूजेसाठी सपाट, स्वच्छ जागा', 'कुदळ / पहिली वीट'], ['A flat, clean spot on site for the puja', 'A spade or the first brick']),
      prep: b(['साइटचा पत्ता व लोकेशन पिन व्हॉट्सॲपवर पाठवा.', 'ऊन-पावसासाठी छोटी शेड ठेवा.'], ['Send the site address and location pin on WhatsApp.', 'Arrange a small shade against sun or rain.']),
      slotHint: 'early'
    },
    {
      id: 'grahayadnya', motif: 'havan', tone: 'stone', online: false,
      name: b('ग्रहयज्ञ, देवब्राह्मण व देवप्रतिष्ठा', 'Graha Yadnya, Devbrahman & Dev Pratishtha'),
      mins: 150, prices: [5100],
      occasions: ['wedding', 'shanti'],
      short: b('नवग्रह यज्ञ, देवब्राह्मण व देवप्रतिष्ठा — मोठ्या शुभकार्यांपूर्वीचे विधी.', 'Navagraha yadnya, devbrahman and dev pratishtha — rites before major family functions.'),
      about: b('नवग्रहांच्या शांतीसाठी यज्ञ, देवब्राह्मण (देवता व ब्राह्मणांना आमंत्रण) आणि देवप्रतिष्ठा — विवाह, मुंज यांसारख्या कार्यांपूर्वी परंपरेने हे विधी केले जातात.',
        'A yadnya for the nine planets, devbrahman (inviting the deities and brahmins) and dev pratishtha — traditionally performed before weddings, thread ceremonies and similar functions.'),
      why: b('मोठ्या शुभकार्याची निर्विघ्न सुरुवात.', 'An unobstructed start to a major family occasion.'),
      goodFor: b(['लग्नापूर्वी', 'मुंजीपूर्वी', 'ग्रहशांतीसाठी'], ['Before a wedding', 'Before a munj', 'For planetary shanti']),
      included: b(['यज्ञ व प्रतिष्ठेचे मंत्र', 'विधीचा क्रम व मार्गदर्शन'], ['Yadnya and pratishtha mantras', 'Guidance on the order of rites']),
      arrange: b(['होमासाठी हवेशीर जागा', 'कुटुंबाची नावे, गोत्र व कुलदेवता'], ['A ventilated spot for the homa', 'Family names, gotra and kuladevata']),
      prep: b(['मुख्य कार्याच्या तारखेनुसार गुरुजी योग्य दिवस सुचवतील.'], ['Guruji will suggest the right day relative to the main function.']),
      slotHint: 'early'
    },
    {
      id: 'ganesh-yag', motif: 'havan', tone: 'haldi', online: false,
      name: b('गणेश याग', 'Ganesh Yag'),
      mins: 255, prices: [15000],
      occasions: ['shanti', 'office'],
      short: b('अथर्वशीर्ष आवर्तने व गणेश मंत्रांनी मोठा होम — विघ्ननिवारणासाठी.', 'A large homa with Atharvashirsha recitations and Ganesh mantras — to remove obstacles.'),
      about: b('गणपती अथर्वशीर्षाची आवर्तने व गणेश मंत्रांनी होम — नव्या कार्याच्या सुरुवातीला किंवा अडथळे दूर होण्यासाठी केला जाणारा याग.',
        'A homa with recitations of the Ganapati Atharvashirsha and Ganesh mantras — performed at the start of a new venture or to clear obstacles.'),
      why: b('कोणत्याही कार्याची सुरुवात गणपतीपासून — आणि मोठ्या कार्यासाठी मोठा संकल्प.', 'Every beginning starts with Ganpati — and a big undertaking deserves a full yag.'),
      goodFor: b(['नवा व्यवसाय किंवा कारखाना', 'अडथळे दूर होण्यासाठी', 'संकष्टी / अंगारकी'], ['A new business or factory', 'Clearing obstacles', 'Sankashti / Angaraki']),
      included: b(['यागाचे मंत्र व आवर्तने', 'विधीचा क्रम व मार्गदर्शन'], ['Yag mantras and recitations', 'Guidance through the rite']),
      arrange: b(['मोठ्या होमकुंडासाठी हवेशीर जागा', 'प्रसादासाठी मोदक'], ['A ventilated space for a larger havan kund', 'Modak for prasad']),
      prep: b(['जागा व सोसायटी परवानगी आधी निश्चित करा.'], ['Confirm the space and any society permission in advance.']),
      slotHint: 'early'
    },
    {
      id: 'laghurudra', motif: 'bel', tone: 'green', online: false,
      name: b('लघुरुद्र', 'Laghurudra'),
      mins: 180, prices: [11000, 15000, 21000],
      occasions: ['shanti', 'special'],
      short: b('अनेक ब्राह्मणांकडून रुद्राध्यायाची आवर्तने, अभिषेकासह.', 'Recitations of the Rudradhyaya by a group of brahmins, with abhishek.'),
      about: b('रुद्राध्यायाच्या अकरा एकादशणी आवर्तनांसह शिवलिंगावर अभिषेक — अभिषेकाचे विस्तृत, सामूहिक रूप.', 'Eleven ekadashani recitations of the Rudradhyaya with abhishek of the Shivling — the fuller, collective form of the abhishek.'),
      why: b('आरोग्य, दीर्घायुष्य व कुटुंबाच्या कल्याणासाठी केला जाणारा प्रभावी, सामूहिक पाठ.', 'A powerful collective recitation for health, long life and the family’s wellbeing.'),
      goodFor: b(['महाशिवरात्री व श्रावण', 'आरोग्यासाठी संकल्प', 'वाढदिवस (60 / 75 वा)'], ['Mahashivratri and Shravan', 'A sankalp for health', 'Milestone birthdays (60th, 75th)']),
      included: b(['ब्राह्मणांचे पथक व रुद्रपठण', 'अभिषेक व आरती'], ['A group of brahmins and the Rudra recitation', 'Abhishek and aarti']),
      arrange: b(['सर्वांना बसण्यासाठी पुरेशी जागा', 'अभिषेकासाठी दूध व बेलपत्रे'], ['Enough space for everyone to sit', 'Milk and bel leaves for the abhishek']),
      prep: b(['ब्राह्मणसंख्या व व्यवस्था गुरुजींसोबत आधी ठरवा.'], ['Agree the number of brahmins and arrangements with Guruji beforehand.']),
      slotHint: 'early'
    },
    {
      id: 'shri-sukta', motif: 'diya', tone: 'haldi', online: false,
      name: b('श्रीसूक्त पूजन व हवन', 'Shri Sukta Pujan & Havan'),
      mins: 120, prices: [2500, 3500, 5100],
      occasions: ['special', 'shanti'],
      short: b('श्रीसूक्ताच्या पठणासह लक्ष्मीपूजन व हवन — समृद्धीसाठी.', 'Lakshmi puja and havan with the Shri Sukta — for prosperity.'),
      about: b('श्रीसूक्ताचे पठण करत श्रीलक्ष्मीचे पूजन व हवन.', 'Worship of Shri Lakshmi and a havan while the Shri Sukta is recited.'),
      why: b('घरात समृद्धी व स्थैर्य येवो, यासाठी केला जाणारा पारंपरिक विधी.', 'A traditional rite asking for prosperity and stability in the home.'),
      goodFor: b(['शुक्रवार / पौर्णिमा', 'नवा व्यवसाय', 'वाढदिवस'], ['Fridays / full moon', 'A new business', 'Birthdays']),
      included: b(['पूजन, पठण व हवनाचे मार्गदर्शन'], ['Guidance through the puja, recitation and havan']),
      arrange: b(['होमासाठी हवेशीर जागा', 'कमळ किंवा लाल फुले, नैवेद्य'], ['A ventilated spot for the havan', 'Lotus or red flowers, naivedya']),
      prep: b(['सोसायटीला होमाबद्दल आधी कळवा.'], ['Let your society know about the havan.']),
      slotHint: 'morning'
    },
    {
      id: 'mahalakshmi', motif: 'diya', tone: 'blush', online: true,
      name: b('महालक्ष्मी पूजन', 'Mahalakshmi Pujan'),
      mins: 30, prices: [2100],
      occasions: ['festival'],
      short: b('श्री महालक्ष्मीची विधिवत पूजा.', 'A formal puja to Shri Mahalakshmi.'),
      about: b('श्री महालक्ष्मीची षोडशोपचार पूजा व आरती — गौरी-महालक्ष्मी, मार्गशीर्षातील गुरुवार किंवा इतर शुभदिवशी.', 'Shodashopachar puja and aarti to Shri Mahalakshmi — for Gauri-Mahalakshmi, Margashirsha Thursdays or other auspicious days.'),
      why: b('कमी वेळात होणारी, पण पूर्ण विधीची पूजा.', 'A short puja, performed in full.'),
      goodFor: b(['गौरी-महालक्ष्मी', 'मार्गशीर्ष गुरुवार'], ['Gauri-Mahalakshmi', 'Margashirsha Thursdays']),
      included: b(['पूजा व आरती'], ['The puja and aarti']),
      arrange: b(['देवीची मूर्ती / मुखवटे, फुले व नैवेद्य'], ['The murti or masks, flowers and naivedya']),
      prep: b(['सणाच्या दिवशी वेळा लवकर भरतात — आधी बुक करा.'], ['Festival-day slots fill quickly — book ahead.']),
      slotHint: 'morning'
    },
    {
      id: 'navchandi', motif: 'havan', tone: 'clay', online: false,
      name: b('नवचंडी (1 दिवस)', 'Navchandi (1 day)'),
      mins: 300, prices: [21000],
      occasions: ['shanti', 'festival'],
      short: b('दुर्गा सप्तशतीचे पाठ व चंडी होम — एका दिवसात.', 'Durga Saptashati recitations and a Chandi homa, in one day.'),
      about: b('दुर्गा सप्तशतीच्या पाठांसह देवीचे पूजन आणि चंडी होम — एका दिवसात पूर्ण होणारा विधी.', 'Worship of the Devi with recitations of the Durga Saptashati and a Chandi homa — completed in a single day.'),
      why: b('शक्ती, संरक्षण व कुटुंबाच्या कल्याणासाठी केला जाणारा मोठा विधी.', 'A major rite for strength, protection and the family’s wellbeing.'),
      goodFor: b(['नवरात्र', 'मोठे संकल्प'], ['Navratri', 'Major sankalps']),
      included: b(['पाठ, पूजन व होम', 'विधीचा क्रम व मार्गदर्शन'], ['Recitation, puja and homa', 'Guidance through the day']),
      arrange: b(['मोठ्या होमकुंडासाठी हवेशीर जागा', 'पूर्ण दिवसासाठी कुटुंबाची उपस्थिती'], ['A ventilated space for a larger havan kund', 'The family present through the day']),
      prep: b(['नवरात्रातील तारखा खूप आधी भरतात.'], ['Navratri dates fill well in advance.']),
      slotHint: 'early'
    },
    {
      id: 'murti-sthapana', motif: 'kalashHero', tone: 'sand', online: false,
      name: b('मूर्ती स्थापना (5 ब्राह्मण)', 'Murti Sthapana (5 brahmins)'),
      mins: 210, prices: [21000],
      occasions: ['newhome', 'shanti'],
      short: b('घर, मंदिर किंवा सोसायटीत देवमूर्तीची प्राणप्रतिष्ठा — पाच ब्राह्मणांसह.', 'Pranpratishtha of a deity’s murti at home, a temple or a society — with five brahmins.'),
      about: b('नव्या मूर्तीचे शुद्धीकरण, प्राणप्रतिष्ठा व होम — पाच ब्राह्मणांच्या उपस्थितीत विधिवत स्थापना.', 'Purification of the new murti, pranpratishtha and homa — a full installation performed with five brahmins.'),
      why: b('मूर्तीत देवत्वाचे आवाहन — पुढील सर्व पूजेचा पाया.', 'Invoking the deity into the murti — the foundation of all worship that follows.'),
      goodFor: b(['नवे देवघर', 'मंदिर / सोसायटीतील मूर्ती'], ['A new home shrine', 'Temple or society murtis']),
      included: b(['पाच ब्राह्मणांचे पथक', 'प्राणप्रतिष्ठा व होम'], ['A group of five brahmins', 'Pranpratishtha and homa']),
      arrange: b(['मूर्ती व आसन', 'होमासाठी हवेशीर जागा'], ['The murti and its seat', 'A ventilated spot for the homa']),
      prep: b(['मूर्तीचा फोटो व आकार गुरुजींना आधी पाठवा.'], ['Send Guruji a photo and the size of the murti beforehand.']),
      slotHint: 'early'
    },
    {
      id: 'ganga-havan', motif: 'havan', tone: 'sage', online: false,
      name: b('गंगा पूजन व हवन', 'Ganga Pujan & Havan'),
      mins: 120, prices: [4501],
      occasions: ['ancestors', 'shanti'],
      short: b('गंगापूजन व होम — शुद्धी व शुभारंभासाठी.', 'Ganga pujan with a havan — for purification and new beginnings.'),
      about: b('कलशातील गंगाजलात गंगेचे आवाहन करून पूजा, त्यानंतर होम. सुतक संपल्यावर, तीर्थयात्रेनंतर किंवा नव्या कार्याच्या आधी केला जातो.',
        'Ganga is invoked in a kalash of Gangajal and worshipped, followed by a havan. Often done at the end of a mourning period, after a pilgrimage, or before a new undertaking.'),
      why: b('घर व मन दोन्हींच्या शुद्धीचा पारंपरिक मार्ग.', 'A traditional way to cleanse both the home and the mind.'),
      goodFor: b(['सुतक संपल्यावर', 'तीर्थयात्रेनंतर', 'नव्या कार्याच्या आधी'], ['At the end of a mourning period', 'After a pilgrimage', 'Before a new undertaking']),
      included: b(['गंगापूजन व होमाचे मंत्र'], ['Ganga pujan and havan mantras']),
      arrange: b(['गंगाजल (असल्यास)', 'होमासाठी हवेशीर जागा'], ['Gangajal, if you have it', 'A ventilated spot for the havan']),
      prep: b(['सोसायटीला होमाबद्दल आधी कळवा.'], ['Let your society know about the havan.']),
      slotHint: 'morning'
    },
    {
      id: 'ganga-pujan', motif: 'kalash', tone: 'sage', online: false,
      name: b('गंगा पूजन', 'Ganga Pujan'),
      mins: 30, prices: [1100],
      occasions: ['ancestors'],
      short: b('गंगेची छोटी पूजा — होमाशिवाय.', 'A short Ganga puja, without a havan.'),
      about: b('कलशातील गंगाजलात गंगेचे आवाहन करून पूजा व आरती — सुतक संपल्यावर, तीर्थयात्रेनंतर किंवा घरगुती शुभकार्यापूर्वी.', 'Ganga is invoked in a kalash of Gangajal and worshipped with aarti — after a mourning period, a pilgrimage, or before a family function.'),
      why: b('कमी वेळात होणारा, पण अर्थपूर्ण शुद्धीचा विधी.', 'A short but meaningful rite of purification.'),
      goodFor: b(['सुतक संपल्यावर', 'तीर्थयात्रेनंतर'], ['At the end of a mourning period', 'After a pilgrimage']),
      included: b(['पूजा व आरती'], ['The puja and aarti']),
      arrange: b(['गंगाजल (असल्यास), कलश व फुले'], ['Gangajal if you have it, a kalash and flowers']),
      prep: b(['कुटुंबीयांची उपस्थिती ठरवून वेळ निवडा.'], ['Pick a time when the family can be present.']),
      slotHint: 'morning'
    },
    {
      id: 'udak-shanti-13', motif: 'kalash', tone: 'stone', online: false,
      name: b('13/14 एकत्र उदक शांती', 'Combined Udak Shanti (13th/14th day)'),
      mins: 150, prices: [7100],
      occasions: ['ancestors', 'shanti'],
      short: b('दिवसकार्यानंतर 13व्या / 14व्या दिवशी एकत्रित उदक शांती.', 'The combined Udak Shanti on the 13th/14th day after a death.'),
      about: b('निधनानंतरचे विधी पूर्ण झाल्यावर, 13व्या / 14व्या दिवशी घराच्या व कुटुंबाच्या शांतीसाठी एकत्रितपणे केली जाणारी उदक शांती.', 'Performed together on the 13th/14th day, once the rites after a death are complete, for the peace of the home and family.'),
      why: b('शोकाच्या काळानंतर घराला पुन्हा नेहमीच्या आयुष्याकडे नेणारा विधी.', 'A rite that helps a home return to everyday life after mourning.'),
      goodFor: b(['दिवसकार्यानंतर 13वा / 14वा दिवस'], ['The 13th/14th day after a death']),
      included: b(['शांतिसूक्तांचे पठण व प्रोक्षण'], ['Recitation of the shanti suktas and sprinkling of the water']),
      arrange: b(['कलश व आंब्याची पाने', 'संपूर्ण कुटुंबाची उपस्थिती'], ['A kalash and mango leaves', 'The whole family present']),
      prep: b(['निधनाची तारीख कळवा — दिवस गुरुजी निश्चित करतील.'], ['Share the date of passing — Guruji will confirm the day.']),
      slotHint: 'morning'
    }
  ];

  // "special" replaces "Celebration or thanksgiving": people look for the occasion they are
  // marking (a birthday, an anniversary, a new job), not for a feeling.
  const OCCASIONS = [
    { id: 'all', label: b('सर्व पूजा', 'All ceremonies') },
    { id: 'newhome', label: b('घर व वास्तू', 'Home & property') },
    { id: 'special', label: b('वाढदिवस व शुभ प्रसंग', 'Birthdays & special occasions') },
    { id: 'wedding', label: b('विवाह व संस्कार', 'Weddings & samskaras') },
    { id: 'baby', label: b('बाळासाठी', 'For a new baby') },
    { id: 'festival', label: b('सण व व्रते', 'Festivals & vrats') },
    { id: 'shanti', label: b('शांती, होम व याग', 'Shantis, homas & yags') },
    { id: 'ancestors', label: b('पितृकार्य', 'Remembering ancestors') },
    { id: 'office', label: b('ऑफिस / दुकान', 'Office or shop') },
    { id: 'online', label: b('ऑनलाइन उपलब्ध', 'Available online') }
  ];

  const SLOTS = [
    { id: 'early', label: b('पहाटे / लवकर सकाळी', 'Early morning'), range: b('सकाळी 6 – 9', '6 – 9 am'), start: 6, end: 9 },
    { id: 'morning', label: b('सकाळी', 'Morning'), range: b('सकाळी 9 – दुपारी 12', '9 am – 12 pm'), start: 9, end: 12 },
    { id: 'afternoon', label: b('दुपारी', 'Afternoon'), range: b('दुपारी 12 – 4', '12 – 4 pm'), start: 12, end: 16 },
    { id: 'evening', label: b('संध्याकाळी', 'Evening'), range: b('संध्या. 4 – 8', '4 – 8 pm'), start: 16, end: 20 }
  ];

  const GANESH_DAYS = [
    { v: 1.5, label: b('दीड दिवस', '1½ days') },
    { v: 5, label: b('5 दिवस', '5 days') },
    { v: 7, label: b('7 दिवस', '7 days') },
    { v: 10, label: b('10 दिवस', '10 days') }
  ];

  const PLATFORMS = ['WhatsApp', 'Google Meet', 'Zoom'];

  const COUNTRY_CODES = [
    { code: '+91', label: 'IN +91' },
    { code: '+1', label: 'US/CA +1' },
    { code: '+44', label: 'UK +44' },
    { code: '+971', label: 'UAE +971' },
    { code: '+65', label: 'SG +65' },
    { code: '+61', label: 'AU +61' },
    { code: '+49', label: 'DE +49' }
  ];

  const a = (en, mr) => ({ en, mr });
  const AREAS = [
    {
      city: a('Pune', 'पुणे'),
      list: [a('Kothrud', 'कोथरूड'), a('Karve Nagar', 'कर्वेनगर'), a('Warje', 'वारजे'), a('Erandwane', 'एरंडवणे'),
        a('Deccan', 'डेक्कन'), a('Shivajinagar', 'शिवाजीनगर'), a('Sadashiv Peth', 'सदाशिव पेठ'), a('Narayan Peth', 'नारायण पेठ'),
        a('Sinhagad Road', 'सिंहगड रस्ता'), a('Bibwewadi', 'बिबवेवाडी'), a('Kondhwa', 'कोंढवा'), a('Hadapsar', 'हडपसर'),
        a('Magarpatta', 'मगरपट्टा'), a('Kharadi', 'खराडी'), a('Viman Nagar', 'विमाननगर'), a('Kalyani Nagar', 'कल्याणीनगर'),
        a('Aundh', 'औंध'), a('Baner', 'बाणेर'), a('Balewadi', 'बालेवाडी'), a('Pashan', 'पाषाण'), a('Bavdhan', 'बावधन'),
        a('Wakad', 'वाकड'), a('Hinjewadi', 'हिंजवडी')]
    },
    {
      city: a('Pimpri-Chinchwad', 'पिंपरी-चिंचवड'),
      list: [a('Pimpri', 'पिंपरी'), a('Chinchwad', 'चिंचवड'), a('Akurdi', 'आकुर्डी'), a('Nigdi', 'निगडी'),
        a('Pradhikaran', 'प्राधिकरण'), a('Ravet', 'रावेत'), a('Pimple Saudagar', 'पिंपळे सौदागर'), a('Pimple Nilakh', 'पिंपळे निलख'),
        a('Sangvi', 'सांगवी'), a('Bhosari', 'भोसरी'), a('Moshi', 'मोशी'), a('Chikhli', 'चिखली')]
    }
  ];

  // img: a photo for the tile (falls back to the illustration if missing).
  // representative: true labels AI-generated or stock images so visitors don't take them for Guruji's own ceremonies.
  const GALLERY = [
    {
      motif: 'kalashHero', tone: 'sand', span: 'tall', title: a('Satyanarayan Puja', 'सत्यनारायण पूजा'), meta: a('Kothrud · Aug 2026', 'कोथरूड · ऑगस्ट 2026'),
      img: 'assets/gallery/satyanarayan-puja.jpg', representative: true,
      alt: a('A family sits with folded hands before a garlanded Satyanarayan image while a priest in a saffron pheta performs the puja beside a small havan, with modak, fruit and a rangoli in front.',
        'हार घातलेल्या सत्यनारायणाच्या प्रतिमेसमोर कुटुंब हात जोडून बसले आहे; केशरी फेटा घातलेले पुरोहित छोट्या होमाजवळ पूजा करत आहेत; समोर मोदक, फळे व रांगोळी.')
    },
    {
      motif: 'havan', tone: 'clay', title: a('Vastu Shanti havan', 'वास्तुशांतीचा होम'), meta: a('Wakad · Jul 2026', 'वाकड · जुलै 2026'),
      img: 'assets/gallery/vastu-shanti-havan.jpg', representative: true,
      alt: a('A priest offers ghee into a brick havan kund while a young couple sits with folded hands and elders look on, in a flat decorated with marigold torans.',
        'झेंडूच्या तोरणांनी सजवलेल्या फ्लॅटमध्ये विटांच्या होमकुंडात पुरोहित तूप अर्पण करत आहेत; तरुण जोडपे हात जोडून बसले आहे आणि ज्येष्ठ पाहत आहेत.')
    },
    {
      motif: 'modak', tone: 'haldi', title: a('Ganeshotsav, day one', 'गणेशोत्सव, पहिला दिवस'), meta: a('Sadashiv Peth · Sep 2026', 'सदाशिव पेठ · सप्टेंबर 2026'),
      img: 'assets/gallery/ganeshotsav.jpg', representative: true,
      alt: a('A priest in a saffron pheta performs aarti before a Ganpati murti in a carved, garlanded makhar, while a young man sits with folded hands and family watch; plates of modak, fruit and flowers are laid out around a rangoli.',
        'कोरीव, फुलांनी सजवलेल्या मखरातील गणपतीच्या मूर्तीसमोर केशरी फेटा घातलेले पुरोहित आरती करत आहेत; तरुण हात जोडून बसला आहे आणि कुटुंब पाहत आहे; रांगोळीभोवती मोदक, फळे व फुलांची ताटे.')
    },
    {
      motif: 'rangoli', tone: 'sage', span: 'wide', title: a('Vastu Shanti, new office', 'वास्तुशांती, नवीन ऑफिस'), meta: a('Hinjewadi · Jun 2026', 'हिंजवडी · जून 2026'),
      img: 'assets/gallery/vastu-shanti-office.jpg', representative: true,
      alt: a('In a modern open-plan office decorated with marigold garlands, a priest performs a puja with a small havan while the owner’s family sits with folded hands and staff look on.',
        'झेंडूच्या माळांनी सजवलेल्या आधुनिक ऑफिसमध्ये पुरोहित छोट्या होमासह पूजा करत आहेत; मालकांचे कुटुंब हात जोडून बसले आहे आणि कर्मचारी पाहत आहेत.')
    },
    {
      motif: 'palna', tone: 'blush', title: a('Naamkaran for baby Ira', 'बाळ इराचे नामकरण'), meta: a('Aundh · May 2026', 'औंध · मे 2026'),
      img: 'assets/gallery/naamkaran.jpg', representative: true,
      alt: a('A baby girl lies in a decorated palna under a golden canopy; her mother holds a plate with the name “इरा”, her grandmother waves an aarti lamp and her father sits with folded hands.',
        'सोनेरी छत असलेल्या सजवलेल्या पाळण्यात बाळ झोपले आहे; आई “इरा” नाव लिहिलेले ताट धरून आहे, आजी आरती ओवाळत आहे आणि वडील हात जोडून बसले आहेत.')
    },
    {
      motif: 'diya', tone: 'green', title: a('Online aarti with a family in Dubai', 'दुबईतील कुटुंबासोबत ऑनलाइन आरती'), meta: a('Video call · Apr 2026', 'व्हिडिओ कॉल · एप्रिल 2026'),
      img: 'assets/gallery/online-aarti.jpg', representative: true,
      alt: a('A family sits with folded hands around a puja set-up at home while the priest leads the aarti from a laptop screen on the low table.',
        'घरी मांडलेल्या पूजेभोवती कुटुंब हात जोडून बसले आहे; समोरच्या चौरंगावरील लॅपटॉपच्या स्क्रीनवरून पुरोहित आरती सांगत आहेत.')
    }
  ];

  return { CONFIG, RITUALS, OCCASIONS, SLOTS, GANESH_DAYS, PLATFORMS, COUNTRY_CODES, AREAS, GALLERY };
})();
