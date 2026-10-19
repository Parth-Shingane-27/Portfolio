// Single source of truth for portfolio content.
// Everything here comes from the resume (v3/v4) or from public GitHub repositories
// inspected on 2026-10-19. Nothing is estimated.

export const profile = {
  name: 'Parth Shingane',
  email: 'parthshingane27@gmail.com',
  github: 'https://github.com/Parth-Shingane-27',
  githubUser: 'Parth-Shingane-27',
  linkedin: 'https://www.linkedin.com/in/parth-shingane-943323400/',
  instagram: 'https://www.instagram.com/parth_ns21/',
  resume: '/Parth_Shingane_Resume.pdf',
  location: 'Pune, India',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

export const highlights = [
  { label: 'Studying', value: 'B.Tech CSE, MITAOE Pune' },
  { label: 'Focus', value: 'Full-stack · AI/ML · IoT' },
  { label: 'Languages', value: 'English, Marathi, Hindi' },
  { label: 'Based in', value: 'Pune, India' },
]

export interface CaseStudy {
  problem: string
  contribution: string[]
  approach: string[]
  decisions: string[]
  results: string[]
}

export interface FeaturedProject {
  id: 'safedrain' | 'gridlock' | 'weather'
  name: string
  category: string
  tagline: string
  summary: string
  stack: string[]
  results: string[]
  links: { label: string; href: string; kind: 'repo' | 'demo' }[]
  note?: string
  caseStudy: CaseStudy
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'safedrain',
    name: 'SafeDrain',
    category: 'Safety · IoT · Machine Learning',
    tagline: 'Sanitation Worker Safety & Monitoring System',
    summary:
      'Sanitation workers face toxic gases and low oxygen in sewers, and safety practice is mostly manual and reactive. SafeDrain brings real-time hazard monitoring, emergency alerts and centralised incident tracking into one platform.',
    stack: ['React.js', 'Python', 'FastAPI', 'MongoDB', 'Machine Learning', 'IoT'],
    results: [
      'Built for the national-level SAMVED hackathon, where the team reached the finals.',
      'Public deployment with a worker site and a supervisor dashboard.',
    ],
    links: [
      { label: 'Source', href: 'https://github.com/NIRAKARANA/SAMVED2026', kind: 'repo' },
      { label: 'Live demo', href: 'https://safe-drain.vercel.app', kind: 'demo' },
    ],
    caseStudy: {
      problem:
        'Sewer entry exposes workers to toxic gases and low oxygen. Current safety checks are manual and reactive, so supervisors learn about danger after it has happened.',
      contribution: [
        'Developed the safety monitoring platform covering real-time hazard monitoring, emergency alerts and incident tracking.',
        'Implemented the machine-learning anomaly detection layer (resume).',
      ],
      approach: [
        'Workers get a live app with GPS tracking, gas readings and an SOS action.',
        'Supervisors get a dashboard that centralises worker status and incidents.',
        'IoT sensor data feeds an AI engine for pre-entry risk prediction.',
      ],
      decisions: [
        'Isolation Forest and Random Forest were used to flag anomalous conditions and support proactive risk assessment.',
        'Separate worker and supervisor views, so each role sees only what it needs.',
      ],
      results: [
        'National-level hackathon finalist (SAMVED).',
        'Working deployment: worker app, supervisor dashboard and a hosted backend.',
      ],
    },
  },
  {
    id: 'gridlock',
    name: 'Flipkart GRIDLOCK 2.0',
    category: 'Predictive Analytics · Geospatial ML',
    tagline: 'Traffic Demand Prediction',
    summary:
      'A machine-learning pipeline that predicts traffic demand from geospatial, temporal and environmental features, tuned with leakage-aware validation and an ensemble of gradient-boosted models.',
    stack: ['Python', 'Pandas', 'NumPy', 'LightGBM', 'CatBoost', 'Scikit-learn'],
    results: ['92.695 leaderboard score (from resume).'],
    links: [
      {
        label: 'Prototype repo',
        href: 'https://github.com/Vijayantra27/GRIDLOCK2.0_Prototype',
        kind: 'repo',
      },
      { label: 'Prototype demo', href: 'https://gridlock-2-0-prototype.vercel.app', kind: 'demo' },
    ],
    note: 'The linked prototype is the team’s hackathon dashboard (parking-violation hotspots and patrol planning). The scoring pipeline itself is not in that repository.',
    caseStudy: {
      problem:
        'Traffic demand varies with place, time and weather. The challenge was to predict it accurately from geospatial, temporal and environmental signals.',
      contribution: [
        'Engineered the machine-learning pipeline for traffic demand prediction (resume).',
      ],
      approach: [
        'Feature engineering across geospatial, temporal and environmental inputs.',
        'GroupKFold validation so that evaluation mirrors unseen locations.',
        'Blended LightGBM and CatBoost models into one ensemble.',
      ],
      decisions: [
        'GroupKFold instead of plain K-fold to avoid optimistic scores from related rows landing in both train and validation.',
        'Ensemble blending to combine two gradient-boosting models with different strengths.',
      ],
      results: ['92.695 leaderboard score.'],
    },
  },
  {
    id: 'weather',
    name: 'National Weather Big Data Analytics Platform',
    category: 'Data Platform · Meteorology',
    tagline: 'PS 26069 — Weather Intelligence & Analytics',
    summary:
      'A weather intelligence platform that ingests and validates forecasts, rainfall, warnings and nowcasts, and presents them on an interactive geospatial dashboard.',
    stack: ['Python', 'FastAPI', 'React', 'MongoDB', 'Pandas', 'IMD APIs', 'Machine Learning'],
    results: [],
    links: [],
    note: 'No public repository or live deployment is available, so none is linked.',
    caseStudy: {
      problem:
        'Weather data arrives from several sources in different forms. Analysts need it ingested, validated and visualised by location in one place.',
      contribution: [
        'Integrated weather-data sources for centralised ingestion, validation and analysis of forecasts, rainfall, warnings and nowcasts.',
        'Designed an interactive geospatial dashboard with location-based visualisation, event filtering and monitoring of weather reports.',
      ],
      approach: [
        'FastAPI services ingest and validate data from IMD APIs into MongoDB.',
        'Pandas-based analytics prepare data for the React dashboard.',
        'Machine-learning techniques support anomaly detection, trend analysis and weather-event verification.',
      ],
      decisions: [
        'A validation step sits between ingestion and analysis so that bad records do not reach the dashboard.',
      ],
      results: ['No quantitative results are claimed.'],
    },
  },
]

export type RepoKind = 'own' | 'team'

export interface Repo {
  owner: string
  name: string
  title: string
  blurb: string
  stack: string[]
  kind: RepoKind
  demo?: string
  fallbackLanguage?: string
}

// Every repository where GitHub shows commits by Parth-Shingane-27 (commit search, 2026-10-19).
// Blurbs come from each repository's README; where a README is empty the blurb says so.
export const repos: Repo[] = [
  {
    owner: 'NIRAKARANA',
    name: 'SAMVED2026',
    title: 'SafeDrain (hackathon repository)',
    blurb: 'Real-time sanitation worker safety platform: GPS tracking, gas monitoring, SOS alerts and a supervisor dashboard.',
    stack: ['React', 'Vite', 'Capacitor', 'AI engine'],
    kind: 'team',
    demo: 'https://safe-drain.vercel.app',
    fallbackLanguage: 'JavaScript',
  },
  {
    owner: 'Lord-Aditya-01',
    name: 'Team-Nirakarana',
    title: 'SafeDrain (team repository)',
    blurb: 'Team Nirakarana’s SafeDrain codebase, deployed with worker and supervisor views.',
    stack: ['React', 'Node', 'Render'],
    kind: 'team',
    demo: 'https://safe-drain.vercel.app',
    fallbackLanguage: 'JavaScript',
  },
  {
    owner: 'Vijayantra27',
    name: 'GRIDLOCK2.0_Prototype',
    title: 'GridLock AI',
    blurb: 'Predictive parking intelligence and smart enforcement: hotspot detection, congestion risk, patrol planning and what-if simulation.',
    stack: ['Next.js', 'FastAPI', 'XGBoost', 'OR-Tools'],
    kind: 'team',
    demo: 'https://gridlock-2-0-prototype.vercel.app',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'Kurukshetra_Eklavya',
    title: 'ASBO — Autonomous Scheme-Bundle Optimizer',
    blurb: 'Helps citizens find government schemes they qualify for and bundles them without conflicts, with multilingual chat and policy search over about 3,400 scheme records.',
    stack: ['FastAPI', 'LangGraph', 'MongoDB', 'React', 'Gemini'],
    kind: 'own',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'nova9_CyberForge',
    title: 'TraceGuard AI',
    blurb: 'Connects email, web and authentication signals into evidence-based incident reports. Early build: landing page, sign-in and event ingestion exist; detectors and reports are planned.',
    stack: ['FastAPI', 'React', 'TypeScript', 'SQLite'],
    kind: 'own',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'SmartLearning',
    title: 'StudyPath',
    blurb: 'Turns one study topic into ranked video lectures, practice problems and certifications, scoring videos with a composite quality score.',
    stack: ['Node.js', 'TypeScript', 'FastAPI', 'React'],
    kind: 'own',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'SmartHome_Automation_Dashboard',
    title: 'Smart Home Automation Dashboard',
    blurb: 'React and Vite dashboard for smart-home automation. The repository has no README, so the description is limited to what the live app shows.',
    stack: ['React', 'Vite'],
    kind: 'own',
    demo: 'https://smart-home-automation-dashboard-psi.vercel.app',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'DBMS_MiniProject_University_Registrar_Management_System',
    title: 'University Registrar Management System',
    blurb: 'DBMS mini project for managing university registrar records.',
    stack: ['SQL', 'CSS'],
    kind: 'own',
  },
  {
    owner: 'Harshini-Bhandary21',
    name: 'University_Registrar_Management_System',
    title: 'University Registrar Management System (team copy)',
    blurb: 'Teammate-hosted copy of the DBMS mini project.',
    stack: ['JavaScript'],
    kind: 'team',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'AIML_Practicals',
    title: 'AI/ML Practicals',
    blurb: 'Coursework notebooks for artificial intelligence and machine learning.',
    stack: ['Python', 'Jupyter'],
    kind: 'own',
  },
  {
    owner: 'Parth-Shingane-27',
    name: 'Lab_Assignment_5_DS',
    title: 'Data Structures Lab Assignment 5',
    blurb: 'Data-structures lab assignment published as a web page.',
    stack: ['HTML'],
    kind: 'own',
    demo: 'https://parth-shingane-27.github.io/Lab_Assignment_5_DS/',
  },
  {
    owner: 'Vijayantra27',
    name: 'Aetheris',
    title: 'AI Mentor Classroom',
    blurb: 'AI-powered platform for interactive one-to-one learning sessions. Under development.',
    stack: ['Next.js', 'FastAPI'],
    kind: 'team',
  },
  {
    owner: 'Vijayantra27',
    name: 'Vijayantra-DigitalShield',
    title: 'Guardian Lens AI',
    blurb: 'Multi-service project with a Node backend, Python ML service and Google Cloud Vertex pipelines. The README does not list features.',
    stack: ['Node.js', 'Python', 'Docker'],
    kind: 'team',
  },
  {
    owner: 'Harshini-Bhandary21',
    name: 'A_Star_shortest_pathFinding',
    title: 'A* Pathfinding',
    blurb: 'A* shortest-path implementation with separate frontend and backend. Related to the A* Pathfinding Robot on my resume.',
    stack: ['A* Search', 'JavaScript'],
    kind: 'team',
  },
  {
    owner: 'Harshini-Bhandary21',
    name: 'Object_Detection',
    title: 'Object Detection',
    blurb: 'Object-detection project with Python models and a web frontend. The README is empty.',
    stack: ['Python'],
    kind: 'team',
  },
  {
    owner: 'Harshini-Bhandary21',
    name: 'EVS',
    title: 'EVS',
    blurb: 'TypeScript web project with a live deployment. The repository has no README.',
    stack: ['TypeScript'],
    kind: 'team',
    demo: 'https://evs-seven.vercel.app',
  },
]

export const resumeOnlyProjects = [
  {
    name: 'Krishi Bhav',
    title: 'AI-Powered Agricultural Price Intelligence & Market Linkage Platform',
    blurb: 'Market price forecasting and mandi recommendations from historical Agmarknet data, with a workflow linking farmers to buyers. No public repository.',
    stack: ['React.js', 'FastAPI', 'MongoDB', 'LightGBM'],
  },
  {
    name: 'A* Pathfinding Robot',
    title: 'Intelligent Autonomous Navigation System',
    blurb: 'Autonomous robot using A* search with movement costs and heuristic distances to route around obstacles on a grid.',
    stack: ['Python/C++', 'Arduino', 'Computer Vision'],
  },
]

export interface SkillGroup {
  title: string
  items: { name: string; href?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'Java', href: 'https://docs.oracle.com/en/java/' },
      { name: 'C++', href: 'https://en.cppreference.com/' },
      { name: 'Python', href: 'https://docs.python.org/3/' },
      { name: 'JavaScript', href: 'https://developer.mozilla.org/docs/Web/JavaScript' },
      { name: 'SQL' },
    ],
  },
  {
    title: 'Frontend Engineering',
    items: [
      { name: 'React.js', href: 'https://react.dev' },
      { name: 'Next.js', href: 'https://nextjs.org/docs' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com/docs' },
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      { name: 'Node.js', href: 'https://nodejs.org/docs/latest/api/' },
      { name: 'FastAPI', href: 'https://fastapi.tiangolo.com' },
    ],
  },
  {
    title: 'Databases & Developer Tools',
    items: [
      { name: 'MongoDB', href: 'https://www.mongodb.com/docs/' },
      { name: 'MySQL', href: 'https://dev.mysql.com/doc/' },
      { name: 'Git', href: 'https://git-scm.com/doc' },
      { name: 'GitHub', href: 'https://docs.github.com' },
      { name: 'Docker', href: 'https://docs.docker.com' },
    ],
  },
  {
    title: 'Machine Learning & Data Science',
    items: [
      { name: 'Scikit-learn', href: 'https://scikit-learn.org/stable/' },
      { name: 'PyTorch', href: 'https://pytorch.org/docs/stable/' },
      { name: 'Pandas', href: 'https://pandas.pydata.org/docs/' },
      { name: 'NumPy', href: 'https://numpy.org/doc/' },
      { name: 'LightGBM', href: 'https://lightgbm.readthedocs.io' },
      { name: 'CatBoost', href: 'https://catboost.ai/docs/' },
      { name: 'Regression' },
      { name: 'Classification' },
      { name: 'Clustering' },
      { name: 'NLP' },
      { name: 'RAG' },
      { name: 'Model Training & Evaluation' },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    items: [
      { name: 'Data Structures & Algorithms' },
      { name: 'Object-Oriented Design' },
      { name: 'Operating Systems' },
      { name: 'DBMS' },
      { name: 'Computer Networks' },
    ],
  },
]

export const achievements = [
  {
    title: 'National-level hackathon finalist',
    detail: 'SAMVED — reached the finals with SafeDrain.',
    tag: 'Hackathon',
  },
  {
    title: 'National-level hackathon semi-finalist',
    detail: 'Advanced to the semi-finals of national-level hackathons, building technology-driven solutions to real-world problems.',
    tag: 'Hackathon',
  },
  {
    title: '100+ LeetCode problems solved',
    detail: 'Arrays, strings, linked lists, stacks, queues, trees, graphs, searching, sorting and recursion.',
    tag: 'Problem solving',
  },
  {
    title: 'CodeChef 1-Star coder',
    detail: 'Practising algorithmic problem-solving through competitive programming.',
    tag: 'Problem solving',
  },
  {
    title: 'State-level handball & kabaddi player',
    detail: 'Team sports at state level.',
    tag: 'Sports',
  },
  {
    title: 'Tech member, Girl Script Club',
    detail: 'MIT Academy of Engineering.',
    tag: 'Community',
  },
]

export const education = {
  school: 'MIT Academy of Engineering, Pune',
  degree: 'B.Tech in Computer Science and Engineering',
  years: '2024 – 2028',
}
