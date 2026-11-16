// Alle teksten komen van folrenstudio.com (stand 16 november 2026).

export const SKOOL_URL = "https://www.skool.com/folren-6210/about";
export const LOGIN_URL = "https://folrenstudio.com/login/";

export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Styles", href: "/#styles" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const heroWords = [
  "YouTube video.",
  "cartoon Short.",
  "3D investigation.",
  "news video.",
  "stickman story.",
  "documentary.",
];

export const heroReel = [
  { id: "fabletoon", name: "Fable Toon", format: "Short", vertical: true },
  { id: "bloxtoon", name: "Blox Toon", format: "Short", vertical: true },
  { id: "crafttoon", name: "Craft Toon", format: "Short", vertical: true },
  { id: "investigative", name: "Investigative 3D", format: "Long-form", vertical: false },
  { id: "ledger", name: "Industry News", format: "Long-form", vertical: false },
] as const;

export const stats = [
  { value: "13 styles", label: "Long-form and Shorts" },
  { value: "Sound included", label: "Music, effects and captions" },
  { value: "Upload built in", label: "Straight to your channel" },
  { value: "No credits", label: "Uses your own Claude plan" },
];

export const steps = [
  {
    title: "Idea",
    text: "Type one sentence and pick a style. Press Make it for me to let every step below run by itself.",
  },
  {
    title: "Script",
    text: "Claude writes the script on your own plan. Read it, change it, or approve it as it is.",
  },
  {
    title: "Voice",
    text: "Choose a built-in voice, connect a voice service, or upload your own recording.",
  },
  {
    title: "Scenes",
    text: "Folren builds every shot and times it to the spoken words, then checks its own frames.",
  },
  {
    title: "Music and sound",
    text: "Music, sound effects and captions are mixed in. No second editing app.",
  },
  {
    title: "Export and upload",
    text: "You get the video, a title, description, chapters and a thumbnail. Upload to YouTube from the app.",
  },
];

export const pipeline = [
  { name: "Script", time: "17 s" },
  { name: "Voiceover", time: "8 min 25 s" },
  { name: "Audio cleanup", time: "2 s" },
  { name: "Word timing", time: "13 s" },
  { name: "Scene direction", time: "10 min 45 s" },
  { name: "Scenes and checks", time: "11 min 48 s" },
  { name: "Music and sound", time: "38 s" },
  { name: "Export final video", time: "1 min 46 s" },
];

// Aantal afgeronde pipeline-stappen na elke stap in de demo.
export const pipelineDoneAfterStep = [0, 1, 4, 6, 7, 8];

export const scriptLines = [
  { speaker: "Narrator", line: "What if DAD joined your Roblox game?" },
  { speaker: "Dad", line: "Hey buddy! I made an ACCOUNT!" },
  { speaker: "Narrator", line: "His avatar? A total NOOB." },
  { speaker: "Rex", line: "Dad... my friends are HERE." },
  { speaker: "Narrator", line: "He dances in the LOBBY. Everyone sees." },
];

export const shots = [
  "What if DAD joined your Roblox game?",
  "I made an ACCOUNT!",
  "A total NOOB.",
  "My friends are HERE.",
  "He dances in the LOBBY.",
  "He jumps in the LAVA.",
  "Then the PROS show up.",
  "His old HEADSET.",
];

export type Style = { id: string; name: string; line: string; alt: string };

export const longStyles: Style[] = [
  {
    id: "investigative",
    name: "Investigative 3D",
    line: "Dark, fast investigative documentaries with 3D models, labelled diagrams and maps.",
    alt: "A lit drilling ship at dusk with labels pointing at its derrick and frame",
  },
  {
    id: "ledger",
    name: "Industry News",
    line: "Business news for aviation, cars and tech with press footage and route maps.",
    alt: "A dark map with a flight route drawn from Las Vegas to Miami",
  },
  {
    id: "stickman",
    name: "Stickman",
    line: "“What if” stories with black stick figures, smooth 60 fps motion and sound on every move.",
    alt: "A stick figure in a red hoodie and yellow cap stops a falling cup in a kitchen",
  },
  {
    id: "cartoon",
    name: "Cel Cartoon",
    line: "Flat colours, bold outlines and characters drawn for every scene.",
    alt: "A small cartoon robot looks after a plant in a pink room",
  },
  {
    id: "pixel",
    name: "Pixel Art",
    line: "Every shot drawn as pixel art and timed to the voice.",
    alt: "A pixel art ocean liner at night next to an iceberg",
  },
  {
    id: "engraved",
    name: "Engraved Bestiary",
    line: "Monster explainers drawn like old book engravings, white on black.",
    alt: "Rings covered in eyes, drawn in white engraving lines on black",
  },
  {
    id: "mspaint",
    name: "MS Paint",
    line: "Doodle explainers with simple figures and a lot of personality.",
    alt: "A hand-drawn figure waits under a station clock",
  },
  {
    id: "archive",
    name: "Documentary",
    line: "Real footage, archive images, maps and clean text on screen.",
    alt: "Black and white footage of a landing craft at sea in 1944",
  },
  {
    id: "docu3d",
    name: "3D Docu",
    line: "Clean 3D reconstructions of real events, with maps and charts.",
    alt: "A 3D reconstruction of stopped traffic and workers on a bridge",
  },
  {
    id: "kaktus",
    name: "Diorama Reconstruction",
    line: "Real events rebuilt as small 3D rooms floating in black.",
    alt: "A small 3D room with figures around a table, floating in black",
  },
];

export const shortStyles: Style[] = [
  {
    id: "fabletoon",
    name: "Fable Toon",
    line: "One-minute cartoon fables in a painted 3D town.",
    alt: "A bright red cartoon triplane flies over a green airfield while a crowd cheers",
  },
  {
    id: "bloxtoon",
    name: "Blox Toon",
    line: "Bright block-head “What if” cartoon Shorts, cut fast.",
    alt: "A cartoon kid in a green dinosaur onesie looks shocked as Dad joins the game",
  },
  {
    id: "crafttoon",
    name: "Craft Toon",
    line: "Block-world cartoon stories told by two friends.",
    alt: "Blocky cartoon friends hide a small dark creature inside a wooden house",
  },
];

export const comparison = [
  {
    job: "Script",
    hand: "Write it yourself or copy it out of a chatbot",
    folren: "Written on your Claude plan, inside the film",
  },
  {
    job: "Voice",
    hand: "A separate voice app, then export and import",
    folren: "Built-in voices, a voice service or your own recording",
  },
  {
    job: "Pictures",
    hand: "Animate or edit every shot by hand",
    folren: "Every scene built and timed to the words",
  },
  {
    job: "Music and sound effects",
    hand: "Find tracks and place each effect yourself",
    folren: "Mixed in for you",
  },
  {
    job: "Captions",
    hand: "One more tool, or timing by hand",
    folren: "Added in step with the voice",
  },
  {
    job: "Title, description, thumbnail",
    hand: "Written and designed one by one",
    folren: "Made together with the film",
  },
  {
    job: "Upload",
    hand: "Export, open YouTube, fill in the form",
    folren: "Upload and schedule from the app",
  },
];

export const extras = [
  {
    icon: "wand",
    title: "Make it for me",
    text: "One sentence in. Folren researches, writes, voices, builds, checks, mixes and exports without stopping. You come back to a finished video.",
  },
  {
    icon: "repeat",
    title: "Automation Studio",
    text: "Put a whole channel on autopilot. Folren makes film after film in that channel's style, and checks and repairs each one itself.",
  },
  {
    icon: "wrench",
    title: "Ask Claude to fix it",
    text: "Every error has this button. Claude looks at what failed in your film and proposes a fix. You apply it, and you can undo it.",
  },
  {
    icon: "monitor",
    title: "Your computer, your Claude plan",
    text: "Films are built and stored on your own computer. Folren has no credits and no export limit. Writing runs on the Claude plan you pay for.",
  },
] as const;

export const costs = [
  {
    name: "Folren membership",
    tag: "Paid to Skool",
    price: "$47",
    text: "Black Friday deal. The app, every update, the training and the community. Normally $97.",
  },
  {
    name: "Your Claude plan",
    tag: "Paid to Anthropic",
    price: "about $20",
    text: "Claude Pro is enough to start. For daily videos you will want Claude Max, from about $100 a month. Folren shows a usage estimate before each film.",
  },
  {
    name: "A voice service",
    tag: "Optional",
    price: "$0 and up",
    text: "Free voices are built in, and you can record your own. Paid voice services such as ElevenLabs or Gemini bill you directly.",
  },
];

export const joinSteps = [
  "Join the Folren group on Skool.",
  "Install the app from the Start here lesson and connect Claude.",
  "Type your first idea.",
];

export const included = [
  "The Folren app for Windows and Mac, with every update",
  "All 13 styles: 10 long-form and 3 Shorts",
  "Automation Studio for channels on autopilot",
  "Music, sound effects and captions built in",
  "Titles, descriptions, chapters, thumbnails and YouTube upload",
  "Step by step training, from install to your first upload",
  "Help in the community from the person who builds Folren",
];

export const requirements = [
  {
    name: "Windows",
    logo: "/logos/windows.svg",
    status: "Ready",
    items: [
      "Windows 10 or 11, 64-bit, Intel or AMD",
      "Several GB of free disk space for the tools and your films",
      "The installer is not code-signed yet, so Windows may show an “Unknown publisher” warning",
    ],
  },
  {
    name: "Mac",
    logo: "/logos/apple.svg",
    status: "Ready",
    items: [
      "Apple Silicon or Intel",
      "Not notarized by Apple yet. macOS warns you the first time, and you allow the app once in System Settings",
      "Tested less than Windows so far",
    ],
  },
  {
    name: "On both",
    logo: null,
    status: null,
    items: [
      "Your own Claude plan, connected through Claude Code. Setup guides you",
      "An internet connection for writing, online voices and upload",
      "A computer that can stay on while a film renders",
    ],
  },
];

export const fit = {
  good: [
    "You want to run a faceless YouTube channel and you care what goes out on it",
    "You would rather direct a video than animate one",
    "You already pay for Claude, or you are fine adding it",
    "You have a Windows PC or a Mac",
  ],
  bad: [
    "You want a promise of views or income",
    "You want something that runs in a browser or on a phone",
    "You do not want any Claude subscription",
    "You never want to look at a video before it is published",
  ],
};

export const faqs = [
  {
    q: "Will Folren make me money on YouTube?",
    a: "We cannot promise that, and nobody honestly can. Folren makes the videos. Views and income depend on your topics, your titles and thumbnails, and on YouTube. YouTube rewards channels with their own ideas, so you still choose what to make and you review each video before it goes out.",
  },
  {
    q: "Do I need my own Claude plan?",
    a: "Yes. Folren does the writing and scene building through Claude Code on your own Claude plan, and that plan is not part of the membership. Claude Pro (about $20 a month) is enough to try it and make a few videos. If you publish every day you will want Claude Max. Claude's own usage limits apply.",
  },
  {
    q: "Can I use ChatGPT instead of Claude?",
    a: "For some styles, yes, through Codex on a ChatGPT plan. The styles that are drawn in code, such as Pixel Art and Cel Cartoon, need Claude. If you are choosing one plan, choose Claude.",
  },
  {
    q: "How do I cancel?",
    a: "In Skool, at any time. Skool handles the billing, so you cancel there in a few clicks. The films you made are files on your own computer and they stay yours.",
  },
  {
    q: "Does it work on a Mac?",
    a: "Yes, on Apple Silicon and Intel Macs. Apple has not notarized it yet, so macOS shows a warning the first time you open it and you allow the app once in System Settings. It has had less testing than the Windows app so far.",
  },
  {
    q: "Is it really automatic?",
    a: "It can be. Press Make it for me and Folren researches, writes, voices, builds, checks, mixes and exports without stopping. Or stop after any step to read the script and review the scenes. Automation Studio can run a whole channel. We still recommend watching each video before you upload it.",
  },
  {
    q: "Do I have to show my face or use my own voice?",
    a: "No. Folren has free built-in voices and works with paid voice services. If you prefer your own voice, record it and upload the file. Folren times the scenes to it.",
  },
  {
    q: "Will YouTube monetize these videos?",
    a: "That is YouTube's decision and it depends on the channel. Their rules are stricter on repetitive, mass-produced videos. Pick your own topics, check the facts and make sure each video is worth watching. Folren is a production tool, not a way around the rules.",
  },
  {
    q: "What stays on my computer?",
    a: "Your projects, the rendering and the finished videos. The script is written through your own Claude account, and online voices go through the voice service you pick. You sign in to the app with a Folren account.",
  },
  {
    q: "Where are the member results?",
    a: "Folren is new, so there are none to show yet, and we will not make any up. The clips on this page are from real films made with Folren. Member results will be added here when they exist.",
  },
];

export const footerNote =
  "Claude is a trademark of Anthropic. Codex and ChatGPT are trademarks of OpenAI. Gemini is a trademark of Google LLC. ElevenLabs is a trademark of ElevenLabs. Named services describe compatibility and do not imply a partnership or endorsement. Skool is a trademark of its owner. Historical footage: US Coast Guard and US Army Signal Corps, 1944, public domain. Folren makes videos; it does not promise views or income.";
