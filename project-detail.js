const projects = [
  {
    num: '01', category: 'works', label: 'Motion Graphics',
    title: 'NEW YORK PULSE', type: 'Motion Graphics · 2026', vimeoId: '1170310909',
    desc: 'This project expresses the pure excitement of finally experiencing New York City, a place imagined for a lifetime. Through the language of geometry, I aim to simplify and celebrate the city\'s complexity. Different shapes symbolize the global diversity of people. The animation wants to show the energy and infinite potential of New York, turning personal emotions into a vibrant, rhythmic motion piece.',
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphics' }, { k: 'Location', v: 'USA' }],
    thumb: 'Project file/NEW YORK PULSE/Styleframe06.jpg',
    illustration: 'Project file/NEW YORK PULSE/apple.png.webp',
    processGroups: [
      { group: 'Mind Map', maxWidth: '60%', items: [{ src: 'Project file/NEW YORK PULSE/mindmap.png' }] },
      { group: 'Moodboard', items: [{ src: 'Project file/NEW YORK PULSE/moodboard.png' }] },
      { group: 'Storyboard', items: [{ src: 'Project file/NEW YORK PULSE/Storyboard01.jpg' }, { src: 'Project file/NEW YORK PULSE/Storyboard02.jpg' }] },
      { group: 'Color', maxWidth: '30%', items: [{ src: 'Project file/NEW YORK PULSE/Color.webp' }] },
      { group: 'Styleframe', items: [
        { src: 'Project file/NEW YORK PULSE/Styleframe01.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe02.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe03.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe04.png' },
        { src: 'Project file/NEW YORK PULSE/styleframe05.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe06.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe07.jpg' },
        { src: 'Project file/NEW YORK PULSE/Styleframe08.png' },
        { src: 'Project file/NEW YORK PULSE/Styleframe09.png' },
      ]},
    ],
    page: 'work-new-york-pulse.html',
  },
  {
    num: '02', category: 'works', label: 'Motion Graphics',
    title: 'THE MILKY WAY HOME', type: 'Motion Graphics · 2026', vimeoId: '1170313437',
    desc: '"The Milky Way Home" follows an extraterrestrial visitor who explores Earth through a lens of whimsical confusion, viewing the giant Pyramids and finding more beauty in a stray cat\'s purr than in human monuments.\n\nAfter befriending the world by doodling smiley faces on "Beware of Alien" signs and discovering the joy of cinema story, he decides to depart not with Earth\'s gold, but with a single, calm dairy cow, choosing a lifetime supply of fresh milk as the ultimate souvenir.',
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphics' }, { k: 'Location', v: 'USA' }],
    thumb: 'Project file/The Milky Way Home/Styleframe/Frame-06.jpg',
    processGroups: [
      {
        layout: 'two-col',
        left: { group: 'Character Development', items: [{ src: 'Project file/The Milky Way Home/character development.png' }] },
        right: [
          { group: 'Moodboard', items: [{ src: 'Project file/The Milky Way Home/moodboard.png' }] },
          { group: 'Styleboard', items: [{ src: 'Project file/The Milky Way Home/Styleboard.png' }] },
        ],
      },
      { group: 'Color', maxWidth: '30%', items: [{ src: 'Project file/The Milky Way Home/color.png' }] },
      { group: 'Storyboard', items: [
        { src: 'Project file/The Milky Way Home/Storyboard_3x2 1.jpg' },
        { src: 'Project file/The Milky Way Home/Storyboard_3x2 3.jpg' },
      ]},
      { group: 'Styleframe', cols: 3, items: [
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-01.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-02.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-03.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-04.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-05.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-06.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-07.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-08.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-09.jpg' },
        { src: 'Project file/The Milky Way Home/Styleframe/Frame-10.jpg' },
      ]},
    ],
    page: 'work-milky-way-home.html',
  },
  {
    num: '03', category: 'works', label: 'Motion Graphics',
    title: 'THE GOOD, THE BAD, and THE UGLY - OFFICIAL TITLE SEQUENCE', type: 'Ending Title Sequence · 2025', vimeoId: '1170318485',
    chairFrames: Array.from({length:14}, (_,i) => `Project file/THE GOOD, THE BAD, and THE UGLY/chair/${i+1}.png`),
    desc: 'For this original drama\'s end credits, I dove deep into the script and worked closely with the director and writer. We wanted to create a visual journey that really captured the protagonist\'s search for happiness.\n\nUsing kaleidoscope effects and Dolly-in visuals to pull the audience into the story. I also wove in key locations like the breakfast shop, beauty salon, and toy store. To add more narrative tension, I hid "Easter eggs" throughout the sequence, such as a Chinese chess piece that symbolizes manipulation.',
    specs: [{ k: 'Year', v: '2025' }, { k: 'Type', v: 'Ending Title Sequence' }, { k: 'Location', v: 'Taiwan' }],
    thumb: 'Project file/THE GOOD, THE BAD, and THE UGLY/thumbnail.webp',
    thumbZoom: true,
    deco: 'Project file/THE GOOD, THE BAD, and THE UGLY/Deco.png',
    processGroups: [
      {
        layout: 'two-col', ratio: '1fr 1.5fr',
        left: { group: 'Official Poster', items: [{ src: 'Project file/THE GOOD, THE BAD, and THE UGLY/poster.png' }] },
        right: [
          { group: '', items: [{ src: 'Project file/THE GOOD, THE BAD, and THE UGLY/logo_white.png' }], maxWidth: '50%' },
          { type: 'text', group: 'Technical Execution', body: 'My work was inspired by Fons de Haan\'s visuals for J.I.D and the aesthetic of music videos like Washed Out\'s \'Zonked.\' I built the entire sequence in After Effects using complex scale expressions to create a layered and "infinite" 3D motion feel.' },
          { type: 'text', group: 'The Process', body: 'To push the visuals even further, I integrated AI tools like MidJourney, Tripio AI, and Magnific.ai for concept and asset development. I also collaborated with photographers and shot additional footage myself to make sure the final piece felt seamless and hit all the right emotional notes.' },
        ],
      },
      { group: 'Moodboard', maxWidth: '75%', items: [{ src: 'Project file/THE GOOD, THE BAD, and THE UGLY/moodboard.png' }] },
      { group: 'Styleframe', cols: 5, items: [
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe01.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe02.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe03.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe04.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe05.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe06.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe07.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe08.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe09.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe10.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe11.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe12.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe13.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe14.png' },
        { src: 'Project file/THE GOOD, THE BAD, and THE UGLY/styleframe/styleframe15.png' },
      ]},
      { group: "It's on Netflix Now!", items: [{ src: 'Project file/THE GOOD, THE BAD, and THE UGLY/Netflix.png' }] },
    ],
    page: 'work-good-bad-ugly.html',
  },
  {
    num: '04', category: 'works', label: 'Motion Graphic',
    title: 'The Geometry of Logic - Adelphi', type: 'Motion Graphic · 2026', vimeoId: '1183195558',
    desc: `<strong>Bridging Rationality and Form</strong>\n\nAdelphi is a geometric sans, redefined for the northern side of the English Channel. This motion piece explores its unique balance of mathematical precision and British modernism. Integrating Bauhaus-inspired aesthetics with contemporary motion design, the animation transforms static letterforms into a structured choreography, highlighting the subtle tension between geometric purity and functional utility.`,
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphic' }, { k: 'Location', v: 'USA' }],
    thumb: 'Project file/The Geometry of Logic - Adelphi/Adelphi kinetic specimen.png',
    processGroups: [
      { group: 'Moodboard', items: [{ src: 'Project file/The Geometry of Logic - Adelphi/moodboard.png' }] },
      { group: 'Styleframe', cols: 4, items: [
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-01.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-02.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-03.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-04.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-05.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-06.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-07.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-08.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-09.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-10.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-11.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-12.jpg' },
        { src: 'Project file/The Geometry of Logic - Adelphi/Styleframe/StyleFrame-13.jpg' },
      ]},
    ],
    page: 'work-adelphi.html',
  },
  {
    num: '05', category: 'works', label: 'Motion Graphics',
    title: 'OREO: BRIGHT IDEAS', type: 'Motion Graphics · 2026', vimeoId: '1190259118',
    desc: 'This project reimagines the iconic 1983 Oreo "Bright Ideas" commercial by turning its vintage jingle into the visual star. Through expressive kinetic typography, the animation deconstructs the 80s soundtrack, allowing letters to embody the playful and nostalgic energy of "Milk\'s Favorite Cookie."',
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Motion Graphics' }, { k: 'Location', v: 'USA' }],
    thumb: 'Project file/Oreo/Styleframe/Artboard 5.png',
    processGroups: [
      { type: 'youtube-lyrics', group: 'Original Commercial', youtubeId: 'k4XvShzNvX4',
        lyricsTitle: 'Transcription',
        lyrics: '♪ Oh oh oh, bright ideas and an Oreo cookie ♪<br>♪ It\'s a bright idea to dunk it, or to crunch it or unscrew it ♪<br>♪ Or to lick it, or to trick it, but no matter whatcha do ♪<br>♪ It\'s true, it\'s fun to munch a creamy crunchy chocolate O-R-E-O ♪<br>♪ Goes great with imagination, put the yum in your creation ♪<br>Oreo, and Oreo Double Stuf cookies' },
      { type: 'text', group: 'Design Strategy', body: 'The visual direction bridges 1980s nostalgia with modern motion design. Souvenir Black serves as the primary typeface; its thick, rounded shape directly mirrors the silhouette of an Oreo cookie and its cream filling. This choice creates a natural harmony between the text and the product.<br><br>The brand\'s historic identity is updated with a fresh yet heritage-inspired color palette. While typography leads the 30 second spot, mixed media elements and AI-generated imagery help build a period-specific atmosphere, blending classic vibes with contemporary kinetic expression.' },
      { group: 'Color', maxWidth: '50%', items: [{ src: 'Project file/Oreo/color.png' }] },
      { type: 'typeface', group: 'Typeface', src: 'Project file/Oreo/souvenir-bold-font.png', specs: [
        { k: 'Year of Popularity', v: 'Late 1970s — Early 1980s' },
        { k: 'Visual Connection', v: 'Soft edges reflecting the cream filling and cookie silhouette.' },
      ]},
      { group: 'Research', maxWidth: '50%', items: [{ src: 'Project file/Oreo/Research.png' }] },
      { group: 'Initial Design Test', cols: 4, items: [
        { src: 'Project file/Oreo/Initial design test/test01.png' },
        { src: 'Project file/Oreo/Initial design test/test02.png' },
        { src: 'Project file/Oreo/Initial design test/test03.png' },
        { src: 'Project file/Oreo/Initial design test/test04.png' },
      ]},
      { group: 'Styleframe', cols: 4, items: [
        { src: 'Project file/Oreo/Styleframe/Artboard 1.jpg' },
        { src: 'Project file/Oreo/Styleframe/Artboard 2.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 3.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 4.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 5.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 6.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 7.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 8.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 9.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 10.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 11.png' },
        { src: 'Project file/Oreo/Styleframe/Artboard 12.png' },
      ]},
      { type: 'refine-compare', group: 'Refine', pairs: [
        { before: 'Project file/Oreo/Refine/Artboard 6.png', after: ['Project file/Oreo/Refine/Artboard 6-1.png', 'Project file/Oreo/Refine/Artboard 6-2.png'] },
        { before: 'Project file/Oreo/Refine/Artboard 8.png', after: ['Project file/Oreo/Refine/Artboard 8-1.png'] },
        { before: 'Project file/Oreo/Refine/Artboard 9.png', after: ['Project file/Oreo/Refine/Artboard 9-1.png'] },
        { before: 'Project file/Oreo/Refine/Artboard 12.png', after: ['Project file/Oreo/Refine/Artboard 12-1.png'] },
      ]},
    ],
    page: 'work-oreo.html',
  },
  {
    num: '06', category: 'works', label: 'Projection',
    title: 'NIKE SNEAKER PROJECTION', type: 'Projection · 2026', vimeoId: '1186439648',
    desc: 'Utilizing a retro CRT look to explore how Nike\'s visual identity can transform a space and illustrate the \'energy\' of sneaker culture through motion and light',
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Projection' }, { k: 'Location', v: 'USA' }],
    thumb: 'Project file/Nike Sneaker Projection/Thumbnail.png',
    processGroups: [
      { group: 'Moodboard',                  items: [{ src: 'Project file/Nike Sneaker Projection/01moodboard.png' }] },
      { group: 'Texture Experiment',          items: [{ src: 'Project file/Nike Sneaker Projection/02Texture experiment.png' }] },
      { group: 'First Time Mapping Test',     items: [{ src: 'Project file/Nike Sneaker Projection/03First time mapping test.png' }] },
      { group: 'Mapping Process',             items: [{ src: 'Project file/Nike Sneaker Projection/04Mapping Process.png' }] },
      { group: 'Spatial Setup',               items: [{ src: 'Project file/Nike Sneaker Projection/05Spatial setup.png' }] },
    ],
    page: 'work-nike.html',
  },
  {
    num: '07', category: 'works', label: 'Styleframe Design',
    title: '7 KINDS OF REST', type: 'Styleframe Design · 2026',
    heroImages: [
      'Project file/7 kinds of rest/Styleframe/01.jpg',
      'Project file/7 kinds of rest/Styleframe/02.jpg',
      'Project file/7 kinds of rest/Styleframe/03.jpg',
      'Project file/7 kinds of rest/Styleframe/04.jpg',
      'Project file/7 kinds of rest/Styleframe/05.jpg',
      'Project file/7 kinds of rest/Styleframe/06.jpg',
    ],
    thumb: 'Project file/7 kinds of rest/Styleframe/04.jpg',
    desc: "In Dr. Saundra Dalton-Smith's book, Sacred Rest, she outlines different kinds of rest you may be craving. From the mental to the physical, Dalton-Smith shares how to identify what kind of respite you need and how to embrace rest.",
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Styleframe Design' }, { k: 'Location', v: 'USA' }],
    processGroups: [
      { group: 'Transcripts', type: 'transcripts', entries: [
        { label: 'S01 / 02', body: 'I separate mental and emotional rest because mental rest, we focus primarily on mental processes — decision-making, memory function, the ability to have recall, to concentrate.' },
        { label: 'S03', body: 'or performance where you don\'t have the ability to authentically express your emotions in that moment. Emotional labor in the process of staying at a high level of customer service, ruminating over all of the things that happen in the day.' },
        { label: 'S04 / 05', body: 'Or it\'s a person who finds that they are very forgetful or can\'t seem to focus their attention to get a job done. And so that\'s the mental part of it, the decision, focus aspect of the brain.' },
        { label: 'S06', body: 'The emotional rest part of it is looking at how you process your emotions. And it tends to be one that I find that a lot of people struggle greatly with.' },
        { label: 'S07 / 08', body: 'because many of us have jobs and careers and lifestyles where we carry a large amount of professional emotional labor in the process of staying at a high level of customer service' },
        { label: 'S09', body: 'or performance where you don\'t have the ability to authentically express your emotions in that moment. Emotional labor in the process of staying at a high level of customer service.' },
      ]},
      { group: '', items: [{ src: 'Project file/7 kinds of rest/Visual Essay Boards.jpg' }] },
      { group: 'Styleframe', items: [
        { src: 'Project file/7 kinds of rest/Styleframe/01.jpg' },
        { src: 'Project file/7 kinds of rest/Styleframe/02.jpg' },
        { src: 'Project file/7 kinds of rest/Styleframe/03.jpg' },
        { src: 'Project file/7 kinds of rest/Styleframe/04.jpg' },
        { src: 'Project file/7 kinds of rest/Styleframe/05.jpg' },
        { src: 'Project file/7 kinds of rest/Styleframe/06.jpg' },
      ]},
    ],
    page: 'work-7-kinds-of-rest.html',
  },
  {
    num: '08', category: 'works', label: 'Styleframe Design',
    title: 'WORLD ATHLETICS', type: 'Styleframe Design · 2026',
    heroImages: [
      'Project file/World Athletics/Styleframe/Styleframe 1.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 2.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 3.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 4.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 5.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 6.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 7.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 8.jpg',
      'Project file/World Athletics/Styleframe/Styleframe 9.jpg',
    ],
    thumb: 'Project file/World Athletics/Styleframe/Styleframe 8.jpg',
    desc: 'This motion piece focuses on the intricate details of an athlete\'s sprint. Using slowmotion shots to amplify subtle movements, combined with high-speed kinetic lines to show how athletes push past their physical limits.\n\nWorld Athletics is about more than just a race on the track, it\'s a celebration of human strength and potential. Every second, every step, all for pushing the limits.',
    specs: [{ k: 'Year', v: '2026' }, { k: 'Type', v: 'Styleframe Design' }, { k: 'Location', v: 'USA' }],
    processGroups: [
      { group: 'Storyboard', maxWidth: '50%', items: [{ src: 'Project file/World Athletics/Storyboard.jpg' }] },
      { group: 'Visual Experiment', items: [
        { src: 'Project file/World Athletics/Visual test/Styleframe 1.jpg' },
        { src: 'Project file/World Athletics/Visual test/Styleframe 2.jpg' },
        { src: 'Project file/World Athletics/Visual test/Styleframe 3.jpg' },
        { src: 'Project file/World Athletics/Visual test/Styleframe 4.jpg' },
        { src: 'Project file/World Athletics/Visual test/Styleframe 5.jpg' },
        { src: 'Project file/World Athletics/Visual test/Styleframe 6.jpg' },
      ]},
      { group: 'Final Styleframe', cols: 3, items: [
        { src: 'Project file/World Athletics/Styleframe/Styleframe 1.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 2.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 3.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 4.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 5.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 6.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 7.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 8.jpg' },
        { src: 'Project file/World Athletics/Styleframe/Styleframe 9.jpg' },
      ]},
    ],
    page: 'work-world-athletics.html',
  },
  {
    num: '09', category: 'works', label: 'Projection',
    title: 'CARNIVAL BITES', type: 'Projection · 2026', vimeoId: '1197953604',
    desc: 'Animation created for the walls of Carnival, capturing the pure joy of savoring a delicious meal. Through organic brushstrokes, the visual brings to life the satisfying moment of enjoying a classic burger. This piece projects the lively, flavorful atmosphere of Carnival to Montgomery Hall, inviting everyone to step inside and join the feast.',
    specs: [
      { k: 'Year', v: '2026' },
      { k: 'Type', v: 'Projection' },
      { k: 'Location', v: 'USA' },
      { k: 'Venue', v: 'SCAD Montgomery Hall' },
    ],
    thumb: '',
    processGroups: [
      { group: 'Process', cols: 2, items: [
        { src: 'Project file/Carnical Bites/Process01.jpeg' },
        { src: 'Project file/Carnical Bites/Process02.jpeg' },
        { src: 'Project file/Carnical Bites/Process03.jpeg' },
        { src: 'Project file/Carnical Bites/Process04.jpg' },
      ]},
    ],
    page: 'work-carnical-bites.html',
  },
  {
    num: '10', category: 'works', label: 'Projection',
    title: 'FROM 1 TO MANY: THE SHARED BREATH', type: 'Projection · May 2026',
    vimeoId: '1198294003',
    desc: 'We all start with a single, solitary breath. As time moves forward, one becomes many, exploding into a massive society.\n\nUltimately, we are fully socialized. Breathing together in the same rhythm, yet each other holding our own unique pace.',
    specs: [
      { k: 'Year', v: 'May 2026' },
      { k: 'Type', v: 'Projection' },
      { k: 'Location', v: 'USA' },
    ],
    thumb: 'Project file/From 1 to Many The Shared Breath/cover.jpg',
    processGroups: [
      { group: 'LED Test', items: [{ src: 'Project file/From 1 to Many The Shared Breath/LED Test.png' }] },
      { group: 'Moodboard', items: [{ src: 'Project file/From 1 to Many The Shared Breath/Moodboards.png' }] },
    ],
    page: 'work-from-1-to-many.html',
  },
  {
    num: '11', category: 'works', label: 'Broadcast Design',
    title: 'NBA ON ESPN BROADCAST DESIGN', type: 'Graphics Package · May 2026',
    vimeoId: '1198298776',
    desc: '',
    specs: [
      { k: 'Year', v: 'May 2026' },
      { k: 'Type', v: 'Graphics Package' },
      { k: 'Location', v: 'USA' },
    ],
    thumb: 'https://i.vimeocdn.com/video/2165186943-a51ed673e44c9668f52895370c73a4447b2e5558c9b72b7456a9c03e97426557-d_1280',
    processGroups: [
      { group: '', cols: 2, items: [
        { src: 'Project file/NBA on ESP Broadcast Design/01-Head to head 10 Sec_1.mp4', caption: 'Head to Head' },
        { src: 'Project file/NBA on ESP Broadcast Design/02-Player Profile 10 Sec_1.mp4', caption: 'Player Profile' },
        { src: 'Project file/NBA on ESP Broadcast Design/03-Wipe from live 5 Sec_1.mp4', caption: 'Wipe from Live' },
        { src: 'Project file/NBA on ESP Broadcast Design/04-Info Overlay 5 Sec_1.mp4', caption: 'Info Overlay' },
      ]},
    ],
    page: 'work-nba-on-espn.html',
  },
  {
    num: '01', category: 'live-action', label: 'Live Action Motion',
    title: 'Christmas­land in New Taipei City', type: 'Television Commercial · 2025', vimeoId: '1187493872',
    desc: 'The Magic of Christmas\n\nThere\'s something special about the way light brings the holidays to life. For this project, I used glowing lines to unveil the festive energy of the city\'s Christmas event, leading the audience through a wonderland of festive decorations.\n\nTo keep the vibe warm and joyful, I used the animation with charming, childlike illustrations. It\'s a mix of that pure, innocent Christmas spirit we all love.',
    specs: [{ k: 'Year', v: '2025' }, { k: 'Type', v: 'Television Commercial' }, { k: 'Role', v: 'Motion Design' }, { k: 'Location', v: 'Taiwan' }],
    thumb: '',
    loopVideos: [
      'Project file/Live action motion/新北耶誕城/01.mp4',
      'Project file/Live action motion/新北耶誕城/02.mp4',
      'Project file/Live action motion/新北耶誕城/03.mp4',
    ],
    processGroups: [],
    page: 'work-christmasland.html',
  },
  {
    num: '02', category: 'live-action', label: 'Live Action Motion',
    title: 'Taoyuan Pearl Coast Music Festival', type: 'Television Commercial · 2025', vimeoId: '1187495431',
    desc: '',
    specs: [{ k: 'Year', v: '2025' }, { k: 'Type', v: 'Television Commercial' }, { k: 'Role', v: 'Motion Design' }, { k: 'Location', v: 'Taiwan' }],
    thumb: '',
    loopVideos: [
      'Project file/Live action motion/桃園音樂節/01.mp4',
      'Project file/Live action motion/桃園音樂節/02.mp4',
      'Project file/Live action motion/桃園音樂節/03.mp4',
    ],
    processGroups: [],
    page: 'work-taoyuan.html',
  },
  {
    num: '03', category: 'live-action', label: 'Live Action Motion',
    title: 'Love On a Shoestring', type: 'Television Commercial · 2024',
    vimeoIds: ['1187499775', '1187499776', '1187500035'],
    desc: 'Created an advertisement for drama promotion that highlights the distinct personalities of three main characters, embracing a humorous tone that matches the drama\'s style.\n\nDrawing inspiration from Japanese commercial aesthetics, the advertisement features exaggerated elements and includes a unique segment recreating the iconic Sailor Moon opening sequence. Each character received a personalized "Super" design, adding to the playful nature of the promotion.',
    specs: [{ k: 'Year', v: '2024' }, { k: 'Type', v: 'Television Commercial' }, { k: 'Role', v: 'Motion Design' }, { k: 'Location', v: 'Taiwan' }],
    thumb: '',
    loopVideos: [
      'Project file/Live action motion/完全省錢/01.mp4',
      'Project file/Live action motion/完全省錢/02.mp4',
      'Project file/Live action motion/完全省錢/03.mp4',
      'Project file/Live action motion/完全省錢/04.mp4',
      'Project file/Live action motion/完全省錢/05.mp4',
      'Project file/Live action motion/完全省錢/06.mp4',
      'Project file/Live action motion/完全省錢/07.mp4',
    ],
    processGroups: [
      {
        layout: 'two-col', ratio: '1fr 1fr', rightStyle: 'justify-content: space-between',
        left: { group: 'Assist on the filming set', maxWidth: '50%', items: [{ src: 'Project file/Live action motion/完全省錢/Assist of the filming set.png' }] },
        right: [
          { group: 'Visual experiments and prototyping', items: [{ src: 'Project file/Live action motion/完全省錢/Visual experiment.png' }] },
          { type: 'text', group: 'Production Process', body: 'Comprehensive pre-production included collaborative layout design with the director. Provided on-set guidance for actor positioning and tracking marker setup.' },
        ],
      },
      { group: 'Moodboard', maxWidth: '60%', items: [{ src: 'Project file/Live action motion/完全省錢/moodboard.png' }] },
    ],
    page: 'work-love-on-shoestring.html',
  },
  {
    num: '04', category: 'live-action', label: 'Live Action Motion',
    title: 'Taipei City Cup International Esports Tournament', type: 'Television Commercial · 2025', vimeoId: '1187495234',
    desc: '',
    specs: [{ k: 'Year', v: '2025' }, { k: 'Type', v: 'Television Commercial' }, { k: 'Role', v: 'VFX' }],
    thumb: '',
    loopVideos: [
      'Project file/Live action motion/台北城市盃/01.mp4',
      'Project file/Live action motion/台北城市盃/02.mp4',
      'Project file/Live action motion/台北城市盃/03.mp4',
    ],
    processGroups: [],
    page: 'work-taipei-esports.html',
  },
  {
    num: '05', category: 'live-action', label: 'Live Action Motion',
    title: "Who's The Boss Teaser", type: 'Television Commercial · 2024', vimeoId: '1187501636',
    desc: '',
    specs: [{ k: 'Year', v: '2024' }, { k: 'Type', v: 'Television Commercial' }, { k: 'Role', v: 'Motion Design' }, { k: 'Location', v: 'Taiwan' }],
    thumb: '',
    loopVideos: [
      'Project file/Live action motion/秘書俱樂部/01.mp4',
      'Project file/Live action motion/秘書俱樂部/02.mp4',
      'Project file/Live action motion/秘書俱樂部/03.mp4',
    ],
    processGroups: [],
    page: 'work-whos-the-boss.html',
  },
];

window._lbGroups = [];
let _lbGrp = 0, _lbIdx = 0;

function stackSelect(idx) {
  const cards = document.querySelectorAll('#d-multi-video .stack-card');
  const tabs  = document.querySelectorAll('#d-multi-video .stack-tab');
  const n = cards.length;
  cards.forEach((card, i) => { card.dataset.pos = (i - idx + n) % n; });
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
}

function renderGroup(g) {
  if (g.type === 'youtube-lyrics') {
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <div class="yt-lyrics-wrap">
        <div>
          <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;background:var(--card)">
            <iframe style="position:absolute;inset:0;width:100%;height:100%" src="https://www.youtube.com/embed/${g.youtubeId}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
        <div>
          ${g.lyricsTitle ? `<div class="process-section-label" style="margin-bottom:12px">${g.lyricsTitle}</div>` : ''}
          <p class="process-body" style="font-style:italic;opacity:.82">${g.lyrics}</p>
        </div>
      </div>
    </div>`;
  }
  if (g.type === 'youtube') {
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;background:var(--card)">
        <iframe style="position:absolute;inset:0;width:100%;height:100%" src="https://www.youtube.com/embed/${g.youtubeId}" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>`;
  }
  if (g.type === 'lyrics') {
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <p class="process-body" style="font-style:italic;opacity:.82">${g.body}</p>
    </div>`;
  }
  if (g.type === 'refine-compare') {
    const grpIdx = window._lbGroups.length;
    const allSrcs = g.pairs.flatMap(p => [p.before, ...p.after]);
    window._lbGroups.push({ label: g.group, srcs: allSrcs });
    const maxAfter = Math.max(...g.pairs.map(p => p.after.length));
    const gridCols = `1fr 40px ${Array(maxAfter).fill('1fr').join(' ')}`;
    let sIdx = 0;
    const pairHtml = g.pairs.map(pair => {
      const bIdx = sIdx++;
      const aIdxs = pair.after.map(() => sIdx++);
      const afterCells = Array.from({length: maxAfter}, (_, i) => {
        if (i < pair.after.length) {
          return `<img src="${pair.after[i]}" loading="lazy" onclick="lbOpen(${grpIdx},${aIdxs[i]})" style="width:100%;display:block;cursor:none;transition:transform .3s ease" onmouseenter="document.body.classList.add('hovering');this.style.transform='scale(1.02)'" onmouseleave="document.body.classList.remove('hovering');this.style.transform='scale(1)'">`;
        }
        return '<div></div>';
      }).join('');
      return `<div style="display:grid;grid-template-columns:${gridCols};gap:8px;align-items:center">
        <img src="${pair.before}" loading="lazy" onclick="lbOpen(${grpIdx},${bIdx})" style="width:100%;display:block;cursor:none;transition:transform .3s ease" onmouseenter="document.body.classList.add('hovering');this.style.transform='scale(1.02)'" onmouseleave="document.body.classList.remove('hovering');this.style.transform='scale(1)'">
        <div style="color:var(--red);font-family:'Anton',sans-serif;font-size:1.8rem;line-height:1;text-align:center">→</div>
        ${afterCells}
      </div>`;
    }).join('');
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <div style="display:flex;flex-direction:column;gap:8px">${pairHtml}</div>
    </div>`;
  }
  if (g.type === 'typeface') {
    const grpIdx = window._lbGroups.length;
    window._lbGroups.push({ label: g.group, srcs: [g.src] });
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <div style="max-width:50%;margin:0 auto;text-align:center">
        <div class="process-section-grid" style="grid-template-columns:repeat(1,1fr)">
          <img src="${g.src}" alt="${g.group}" loading="lazy" onclick="lbOpen(${grpIdx},0)">
        </div>
        <div style="margin-top:20px;display:flex;gap:48px;flex-wrap:wrap;justify-content:center">
          ${g.specs.map(s => `<div><div class="spec-label">${s.k}</div><div style="font-size:.9rem;color:var(--muted);margin-top:4px">${s.v}</div></div>`).join('')}
        </div>
      </div>
    </div>`;
  }
  if (g.type === 'text') {
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <p class="process-body">${g.body}</p>
    </div>`;
  }
  if (g.type === 'transcripts') {
    return `<div class="process-section">
      ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
      <div class="transcripts-grid">
        ${g.entries.map(e => `<div class="transcript-entry"><div class="transcript-label">${e.label}</div><p class="transcript-body">${e.body}</p></div>`).join('')}
      </div>
    </div>`;
  }
  const isVideo = src => /\.(mp4|webm|mov)$/i.test(src);
  const grpIdx = window._lbGroups.length;
  window._lbGroups.push({ label: g.group, srcs: g.items.filter(i => !isVideo(i.src)).map(i => i.src) });
  const n = g.cols || (g.items.length === 1 ? 1 : g.items.length === 2 ? 2 : 3);
  const st = [`grid-template-columns:repeat(${n},1fr)`, g.maxWidth ? `max-width:${g.maxWidth};margin:0 auto` : ''].filter(Boolean).join(';');
  let imgIdx = 0;
  return `<div class="process-section">
    ${g.group ? `<div class="process-section-label">${g.group}</div>` : ''}
    <div class="process-section-grid" style="${st}">
      ${g.items.map((item) => {
        const media = isVideo(item.src)
          ? `<video src="${item.src}" autoplay muted loop playsinline style="width:100%;display:block;aspect-ratio:16/9;object-fit:cover"></video>`
          : `<img src="${item.src}" alt="${g.group}" loading="lazy" onclick="lbOpen(${grpIdx},${imgIdx++})">`;
        return item.caption ? `<div><div class="process-video-label">${item.caption}</div>${media}</div>` : media;
      }).join('')}
    </div></div>`;
}

function updateMoreProjects(currentIdx) {
  const n = projects.length;
  const prevIdx = (currentIdx - 1 + n) % n;
  const nextIdx = (currentIdx + 1) % n;
  const prev = projects[prevIdx], next = projects[nextIdx];
  const thumbHtml = (p) => {
    if (p.thumb) return `<img src="${p.thumb}" alt="${p.title}" loading="lazy">`;
    const vid = p.vimeoId || (p.vimeoIds && p.vimeoIds[0]) || '';
    return vid ? `<span class="dmp-vimeo-ph" data-vimeo="${vid}" style="display:block;width:100%;height:100%"></span>` : '';
  };
  const el = document.getElementById('d-more-projects');
  el.className = 'detail-more-projects';
  el.innerHTML = `
    <p class="dmp-label">More Projects /</p>
    <div class="dmp-nav">
      <a class="dmp-item" href="${prev.page}">
        <div class="dmp-thumb">${thumbHtml(prev)}</div>
        <div class="dmp-dir">← Previous</div>
        <div class="dmp-title-wrap"><span class="dmp-arrow">←</span><span class="dmp-title">${prev.title}</span></div>
        <div class="dmp-type">${prev.type}</div>
      </a>
      <a class="dmp-item" href="${next.page}">
        <div class="dmp-thumb">${thumbHtml(next)}</div>
        <div class="dmp-dir">Next →</div>
        <div class="dmp-title-wrap dmp-title-wrap--right"><span class="dmp-title">${next.title}</span><span class="dmp-arrow">→</span></div>
        <div class="dmp-type">${next.type}</div>
      </a>
    </div>`;
  el.querySelectorAll('.dmp-vimeo-ph').forEach(ph => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${ph.dataset.vimeo}&width=1280`)
      .then(r => r.json())
      .then(d => {
        const img = document.createElement('img');
        img.src = d.thumbnail_url; img.loading = 'lazy';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
        ph.replaceWith(img);
      }).catch(() => {});
  });
  el.querySelectorAll('.dmp-item').forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

function renderProject(idx) {
  const p = projects[idx];
  const catCount = projects.filter(pr => pr.category === p.category).length;
  document.getElementById('d-counter').textContent = `${p.num} / ${String(catCount).padStart(2,'0')}`;
  document.getElementById('d-label').textContent = p.label;
  const titleEl = document.getElementById('d-title');
  titleEl.textContent = p.title;
  titleEl.style.fontSize = p.title.length > 20 ? 'clamp(2rem, 5vw, 5rem)' : '';
  document.getElementById('d-desc').innerHTML = p.desc;

  const videoWrap = document.getElementById('d-video-wrap');
  const heroEl = document.getElementById('d-hero-images');

  if (p.heroImages) {
    videoWrap.style.display = 'none';
    heroEl.classList.add('show');
  } else if (p.vimeoIds) {
    videoWrap.style.display = 'none';
    heroEl.classList.remove('show');
    heroEl.innerHTML = '';
    const multi = document.createElement('div');
    multi.id = 'd-multi-video';
    multi.className = 'detail-stacked-video';
    multi.innerHTML = `
      <div class="video-stack">
        ${p.vimeoIds.map((id, i) => `
          <div class="stack-card" data-pos="${i}" onclick="stackSelect(${i})">
            <iframe src="https://player.vimeo.com/video/${id}?autoplay=0&color=e33e3e&title=0&byline=0"
              frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>`).join('')}
      </div>
      <div class="stack-tabs">
        ${p.vimeoIds.map((_, i) => `
          <button class="stack-tab${i === 0 ? ' active' : ''}" onclick="stackSelect(${i})">
            ${String(i + 1).padStart(2, '0')}
          </button>`).join('')}
      </div>`;
    videoWrap.parentNode.insertBefore(multi, videoWrap.nextSibling);
  } else {
    videoWrap.style.display = '';
    heroEl.classList.remove('show');
    heroEl.innerHTML = '';
    document.getElementById('d-video').src =
      `https://player.vimeo.com/video/${p.vimeoId}?autoplay=0&color=e33e3e&title=0&byline=0`;
  }

  const loopEl = document.getElementById('d-loop-videos');
  if (p.loopVideos && p.loopVideos.length) {
    loopEl.innerHTML = `<div class="process-section-label" style="margin-bottom:20px">Final clips</div>
      <div class="detail-loop-videos${p.loopVideos.length > 3 ? ' detail-loop-videos--many' : ''}">${p.loopVideos.map(src =>
        `<video src="${src}" autoplay muted loop playsinline></video>`
      ).join('')}</div>`;
  } else {
    loopEl.innerHTML = '';
  }

  document.getElementById('d-specs').innerHTML = p.specs.map(s =>
    `<div class="spec-row"><div class="spec-label">${s.k}</div><div class="spec-val">${s.v}</div></div>`).join('');

  const illEl = document.getElementById('d-illustration');
  illEl.innerHTML = p.illustration
    ? `<div class="detail-illustration"><img src="${p.illustration}" alt="Illustration"></div>` : '';

  const decoEl = document.getElementById('d-deco');
  decoEl.innerHTML = p.deco
    ? `<div class="detail-deco"><img src="${p.deco}" alt="Deco"></div>` : '';

  window._lbGroups = [];
  const procEl = document.getElementById('d-process');

  if (p.heroImages) {
    const lbIdx = window._lbGroups.length;
    window._lbGroups.push({ label: 'Styleframe', srcs: p.heroImages });
    heroEl.innerHTML = p.heroImages.map((src, i) =>
      `<img src="${src}" alt="${p.title}" loading="lazy" onclick="lbOpen(${lbIdx},${i})">`
    ).join('');
  }

  if (p.processGroups && p.processGroups.length) {
    procEl.innerHTML = p.processGroups.map(g => {
      if (g.layout === 'two-col') {
        const ratio = g.ratio || '1fr 2fr';
        const rightStyle = g.rightStyle || '';
        return `<div class="process-two-col" style="grid-template-columns:${ratio}">
          <div class="process-two-col-left">${renderGroup(g.left)}</div>
          <div class="process-two-col-right" style="${rightStyle}">${g.right.map(renderGroup).join('')}</div>
        </div>`;
      }
      return renderGroup(g);
    }).join('');
  } else {
    procEl.innerHTML = '';
  }

  updateMoreProjects(idx);

  // Chair flipbook
  const chairStrip = document.getElementById('chair-strip');
  const chairFrameImg = document.getElementById('chair-frame-img');
  window._chairFrames = p.chairFrames || [];
  if (window._chairFrames.length) {
    chairFrameImg.src = window._chairFrames[0];
    chairStrip.classList.add('visible');
  } else {
    chairStrip.classList.remove('visible');
  }
}

// ── Lightbox ──
const lbEl    = document.getElementById('lightbox');
const lbImg   = document.getElementById('lb-img');
const lbVideo = document.getElementById('lb-video');
const lbGrpEl = document.getElementById('lb-group');
const lbCntEl = document.getElementById('lb-counter');
const lbPrevEl = document.getElementById('lb-prev');
const lbNextEl = document.getElementById('lb-next');

function _lbShowMedia(src, type) {
  if (type === 'video') {
    lbImg.style.display = 'none'; lbImg.classList.remove('lb-vis'); lbImg.src = '';
    lbVideo.style.display = 'block';
    lbVideo.src = src; lbVideo.load(); lbVideo.play().catch(() => {});
  } else {
    lbVideo.style.display = 'none'; lbVideo.pause(); lbVideo.src = '';
    lbImg.style.display = 'block';
    lbImg.src = src;
    requestAnimationFrame(() => requestAnimationFrame(() => lbImg.classList.add('lb-vis')));
  }
}

function lbOpen(grpIdx, imgIdx) {
  _lbGrp = grpIdx; _lbIdx = imgIdx;
  const grp = window._lbGroups[grpIdx];
  lbGrpEl.textContent = grp.label;
  lbCntEl.textContent = `${imgIdx + 1} / ${grp.srcs.length}`;
  lbPrevEl.style.visibility = grp.srcs.length > 1 ? 'visible' : 'hidden';
  lbNextEl.style.visibility = grp.srcs.length > 1 ? 'visible' : 'hidden';
  lbEl.classList.add('lb-open');
  _lbShowMedia(grp.srcs[imgIdx], 'image');
}

function lbClose() {
  lbImg.classList.remove('lb-vis');
  lbEl.classList.remove('lb-open');
  setTimeout(() => { lbImg.src = ''; lbVideo.pause(); lbVideo.src = ''; lbVideo.style.display = 'none'; }, 380);
}

function lbChange(delta) {
  const len = window._lbGroups[_lbGrp].srcs.length;
  _lbIdx = (_lbIdx + delta + len) % len;
  lbImg.classList.remove('lb-vis');
  setTimeout(() => {
    const grp = window._lbGroups[_lbGrp];
    lbImg.src = grp.srcs[_lbIdx];
    lbCntEl.textContent = `${_lbIdx + 1} / ${grp.srcs.length}`;
    requestAnimationFrame(() => requestAnimationFrame(() => lbImg.classList.add('lb-vis')));
  }, 200);
}

document.getElementById('lb-close').addEventListener('click', lbClose);
lbPrevEl.addEventListener('click', () => lbChange(-1));
lbNextEl.addEventListener('click', () => lbChange(1));
lbEl.addEventListener('click', e => { if (e.target === lbEl || e.target.id === 'lb-stage') lbClose(); });

document.querySelectorAll('#lb-close, #lb-prev, #lb-next').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ── Cursor ──
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px'; cur.style.top  = e.clientY + 'px';
  ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ── Chair scroll (page-level scroll) ──
window.addEventListener('scroll', function() {
  const frames = window._chairFrames;
  if (!frames || !frames.length) return;
  const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  const loops = 3;
  const frameIdx = Math.floor(progress * frames.length * loops) % frames.length;
  document.getElementById('chair-frame-img').src = frames[frameIdx];
});

// ── Keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lbEl.classList.contains('lb-open')) lbClose();
  if (e.key === 'ArrowLeft'  && lbEl.classList.contains('lb-open')) lbChange(-1);
  if (e.key === 'ArrowRight' && lbEl.classList.contains('lb-open')) lbChange(1);
});

// ── Scroll reveal ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Process image hover ──
document.addEventListener('mouseover', e => {
  if (e.target.matches('.process-section-grid img')) document.body.classList.add('hovering');
});
document.addEventListener('mouseout', e => {
  if (e.target.matches('.process-section-grid img')) document.body.classList.remove('hovering');
});

// ── Init ──
// PROJECT_INDEX is set by the inline <script> in each project page.
// Top-level `const` is not a window property, so we access it directly.
/* global PROJECT_INDEX */
renderProject(typeof PROJECT_INDEX !== 'undefined' ? PROJECT_INDEX : 0);
