import {
  Brain,
  BarChart3,
  Cpu,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const profile = {
  name: 'Talaviya Sarthak',
  firstName: 'Sarthak',
  roles: ['AI/ML Engineer', 'Deep Learning Enthusiast', 'LLM & NLP Explorer'],
  shortIntro:
    'Aspiring AI/ML Engineer passionate about building scalable intelligent systems with machine learning, computer vision, NLP and transformer-based architectures.',
  location: 'Babra, Amreli, Gujarat',
  phone: '+91 96010 39375',
  availability: 'Open to AI/ML roles & internships',
  resumeUrl: '/resume.pdf',
  email: 'stalaviya709@gmail.com',
  githubUsername: 'Talaviya-Sarthak',
  github: 'https://github.com/Talaviya-Sarthak',
  linkedin: 'https://www.linkedin.com/in/sarthak-talaviya',
  leetcode: 'https://leetcode.com/sarthak-talaviya',
}

export const about = {
  headline: 'Building intelligent systems that solve real problems',
  paragraphs: [
    "I'm an AI/ML Engineering student with a strong foundation in machine learning, deep learning and data science — alongside the full-stack skills needed to ship what I build.",
    'My focus is on practical, scalable AI: clean data pipelines, well-chosen models and transformer-based approaches that work outside the notebook.',
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      school: 'DEPSTAR, CHARUSAT University',
      year: '2024 – 2028',
      detail: 'CGPA 7.95 · Focused on ML, deep learning, data science and system building',
    },
  ],
  objective:
    'To grow as an AI/ML Engineer building scalable intelligent systems using machine learning, computer vision, NLP and transformer architectures to solve real-world problems.',
}

export const skillCategories = [
  {
    title: 'Machine Learning',
    icon: Cpu,
    accent: '#a16207',
    tint: '#f5e9d4',
    skills: [
      'Supervised & Unsupervised',
      'Feature Engineering',
      'Model Selection',
      'Hyperparameter Tuning',
      'Cross Validation',
      'Model Evaluation',
      'scikit-learn',
    ],
  },
  {
    title: 'Deep Learning',
    icon: Brain,
    accent: '#6d4fa1',
    tint: '#ede7f6',
    skills: [
      'ANN',
      'CNN',
      'RNN',
      'LSTM',
      'GRU',
      'Transfer Learning',
      'TensorFlow',
      'PyTorch',
    ],
  },
  {
    title: 'Generative AI & NLP',
    icon: Sparkles,
    accent: '#3a6ea5',
    tint: '#e2ecf6',
    skills: [
      'Transformers',
      'Self-Attention',
      'Encoder–Decoder',
      'LLM Fundamentals',
      'Prompt Engineering',
      'Embeddings',
    ],
  },
  {
    title: 'Data Science',
    icon: BarChart3,
    accent: '#2f7d4f',
    tint: '#e0f0e6',
    skills: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'OpenCV',
      'Data Preprocessing',
      'Data Visualisation',
    ],
  },
  {
    title: 'Languages & Tools',
    icon: Wrench,
    accent: '#8a5a10',
    tint: '#f3ecdc',
    skills: ['Python', 'C++', 'Git & GitHub', 'Docker', 'Jupyter', 'Postman'],
  },
]

export const timeline = [
  {
    type: 'education',
    period: '2024 — Present',
    title: 'B.Tech in Computer Science',
    place: 'DEPSTAR, CHARUSAT University',
    description:
      'Deep focus on machine learning, deep learning, data science and full-stack systems. CGPA 7.95.',
  },
  {
    type: 'achievement',
    period: '2025',
    title: '1st Runner-Up — GDG Sprintathon',
    place: 'GDG Community',
    description:
      'Placed runner-up building an AI-powered solution in a fast-paced team hackathon.',
  },
  {
    type: 'achievement',
    period: '2025',
    title: 'Qualified — Odoo Hackathon 2025',
    place: 'Top participants among 19,000+',
    description:
      'Advanced through qualification rounds and competed among the top participants nationwide.',
  },
  {
    type: 'publication',
    period: '2024',
    title: 'Co-authored C++ Programming Handbook',
    place: 'Department publication',
    description:
      'Co-authored a handbook covering core C++ concepts and problem-solving techniques for students.',
  },
]

export const socials = [
  {
    label: 'GitHub',
    username: 'Talaviya-Sarthak',
    href: profile.github,
  },
  {
    label: 'LinkedIn',
    username: 'sarthak-talaviya',
    href: profile.linkedin,
  },
  {
    label: 'LeetCode',
    username: 'sarthak-talaviya',
    href: profile.leetcode,
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
