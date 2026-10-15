"use strict";
// Edit content here. Items with a `verify` note show a flag in "Myself" view.
const PROFILE = {
  email: "anayashende2006@gmail.com",
  photo: "assets/portfolio pfp 2.jpeg",
  about: [
    "I'm a B.Tech Computer Science student at Symbiosis Institute of Technology, Nagpur. I build retrieval, machine learning and web systems, mostly on my own time, and I like checking whether they actually work.",
    "Right now I'm strengthening my problem-solving, programming foundations and software engineering skills, while exploring how AI/ML applies to finance and fintech."
  ],
  links: [
    { label: "Resume", url: "assets/resume.pdf", download: true },
    { label: "GitHub", url: "https://github.com/Anaya2306" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/anaya-shende-148470340/" },
    { label: "LeetCode", url: "https://leetcode.com/u/lhV9B0Lbwa/" }
  ]
};

const EDUCATION = [
  { what: "B.Tech, Computer Science & Engineering", where: "Symbiosis Institute of Technology, Nagpur", when: "2024 – 2028",
    note: "CGPA 7.0. Focus: AI/, data structures and algorithms, DBMS, OOP, computer networks, compiler design, software engineering." },
  { what: "Class 12 (PCMB)", where: "Dinanath High School & Junior College, Nagpur", when: "2024" }
];

const SKILLS = [
  { group: "Languages", items: ["Python", "Java", "C", "JavaScript", "SQL"] },
  { group: "AI / ML", items: ["Regression & classification", "Random Forest", "KNN", "NLP", "RAG", "Knowledge graphs", "LangChain", "ChromaDB", "scikit-learn", "TensorFlow"] },
  { group: "Data", items: ["Pandas", "NumPy", "Data preprocessing", "EDA", "Statistical analysis", "Visualization"] },
  { group: "Web & apps", items: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Firebase", "Flask", "Streamlit"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Jupyter", "Overleaf", "Google Cloud", "WSL2"] },
  { group: "CS foundations", items: ["OOP", "DSA", "DBMS", "Operating systems", "Computer networks", "Theory of computation", "Compiler design"] }
];
const INTERESTS = ["AI/ML engineering", "Software engineering", "Fintech & financial analytics", "ML for finance", "Data-driven decision systems"];

// url: repo or demo link. Swap in each project's real link.
const GH = "https://github.com/Anaya2306";
const PROJECTS = [
  { title: "RAG Chatbot: Document Q&A", tags: ["AI/ML", "Web"], url: GH,
    summary: "Embeds documents into a ChromaDB store, retrieves the top matching chunks and answers with LLaMA 3.3 70B through LangChain. Flask backend, HTML/CSS/JS frontend." },
  { title: "Fake News Detection & Verification", tags: ["AI/ML", "Web"], url: GH,
    summary: "Combines a machine learning classifier, RAG, Firebase and a fact-checking API to help people judge how credible a news item is." },
  { title: "Sahayak: Rural Teacher Support", tags: ["AI/ML"], url: GH, verify: "Concept: confirm what is built before publishing",
    summary: "An AI-assisted concept to help teachers in underserved rural schools find information and teaching support, using NLP and RAG." },
  { title: "IPL Match Prediction", tags: ["AI/ML", "Web"], url: GH,
    summary: "Random Forest model trained on historical IPL data, served through a web interface that predicts match outcomes." },
  { title: "Used Car Price Predictor", tags: ["AI/ML", "Web"], url: GH,
    summary: "scikit-learn pipeline on cleaned Quikr listings, served by Flask with a live-populated form and real-time price estimates." },
  { title: "GaN HEMT Parameter Prediction", tags: ["Research", "AI/ML"], url: GH, verify: "Confirm the patent's legal status wording",
    summary: "Neural network, Random Forest and genetic algorithm models that predict RF and power parameters (LG, POUT, PAE, Vth, RON) from fabrication inputs, using a dataset curated from research papers. A patent application was filed in 2025." },
  { title: "Gesture-Controlled Music Player", tags: ["Web"], url: GH,
    summary: "Runs entirely in the browser: MediaPipe Hands tracks your hand and maps gestures to play/pause, volume and track changes." },
  { title: "CelesTrak / Starlink Analysis", tags: ["Data", "AI/ML"], url: GH, verify: "Mention graph methods only if implemented",
    summary: "Explores relationships in satellite-network data using cosine similarity and graph-based approaches." },
  { title: "Civic Eye", tags: ["Web"], url: GH, verify: "Add the tech stack and current status",
    summary: "A civic-tech concept for reporting infrastructure problems and routing them to the right engineers or workers with notifications. Three-person team, which I lead." }
];

const EXPERIENCE = [
  { what: "Executive Committee Member", where: "IEEE Student Branch", when: "2024 – present", note: "Student engagement, membership initiatives and technical activities." },
  { what: "Coordinator", where: "Cybersecurity Club, SIT Nagpur", when: "", verify: "Add dates", note: "Ran cybersecurity technical activities and student engagement." },
  { what: "Inventor, patent application", where: "Symbiosis International (Deemed University)", when: "2025", note: "System and method for processor-based optimization of GaN HEMT structures, with Dr. Mohankumar N and co-inventors." }
];

const PARTICIPATION = [
  { what: "Bharatiya Antariksh Hackathon: idea submission", where: "ISRO × Hack2Skill", when: "2025" },
  { what: "Google Cloud Agentic AI Day: participant", where: "Google Cloud × Hack2Skill", when: "2025" },
  { what: "SIT Novate Hackathon: volunteer", where: "SIT Nagpur", when: "Multiple editions" },
  { what: "Debate competition", where: "The Orator Club, IIIT Nagpur", when: "2024" }
];

// Put each PDF in assets/certs/ using the file names below.
const CERTS = [
 
  { title: "Red Hat System Administration I (RH124)", by: "Red Hat", when: "Mar 2026", file: "assets/certs/assets/Red Hat netword automation.pdf" },
  { title: "Data Analytics Certification", by: "Infosys", when: "2025", file: "assets/certs/infosys .pdf" }
];

const VIEWERS = {
  recruiter: { label: "Recruiter", hello: "Hiring? Start with the resume and projects.", lead: "B.Tech CS student at Symbiosis Institute of Technology, Nagpur, looking for software engineering and ML internships. Each project below lists its stack.", cta: { label: "Download resume", url: "assets/resume.pdf", download: true } },
  self:      { label: "Myself", hello: "Owner view: items to double-check are flagged.", lead: "Flags mark placeholder links and claims to verify before this goes public.", cta: { label: "Review projects", url: "#projects" } },
  friend:    { label: "Friend (anonymous)", hello: "Hey, glad you stopped by.", lead: "Have a look around. You can also send me a note without giving your name.", cta: { label: "Send a note", url: "#contact" } }
};
