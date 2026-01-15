export type Level = 'Novice' | 'Intermediate' | 'Advanced' | 'Expert';
export type CategorySlug = 'foundations' | 'data-science' | 'ml' | 'dl' | 'nlp' | 'cv' | 'mlops' | 'gen-ai';

export type Resource = {
    id: number;
    title: string;
    description: string;
    url: string;
    level: Level;
    category: CategorySlug;
    tags: string[];
    featured?: boolean;
};

export const RESOURCES: Resource[] = [
    // --- LEVEL 0: NOVICS (Foundations) ---
    {
        id: 1,
        title: 'CS50: Introduction to Computer Science',
        description: 'Harvard\'s legendary introduction to the intellectual enterprises of computer science and the art of programming.',
        url: 'https://cs50.harvard.edu/x/',
        level: 'Novice',
        category: 'foundations',
        tags: ['Computer Science', 'Python', 'C', 'SQL'],
        featured: true
    },
    {
        id: 2,
        title: 'Python for Everybody (PY4E)',
        description: 'The definitive absolute beginner guide to Python programming. Free, open, and incredibly well-taught.',
        url: 'https://www.py4e.com/',
        level: 'Novice',
        category: 'foundations',
        tags: ['Python', 'Coding'],
    },
    {
        id: 3,
        title: '3Blue1Brown: Linear Algebra',
        description: 'Essence of Linear Algebra. Visualizing vectors, matrices, and space is crucial for ML intuition.',
        url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
        level: 'Novice',
        category: 'foundations',
        tags: ['Math', 'Visualization'],
        featured: true
    },
    {
        id: 4,
        title: 'StatQuest with Josh Starmer',
        description: 'Statistics and ML concepts explained clearly, with simple visuals and zero jargon.',
        url: 'https://statquest.org/',
        level: 'Novice',
        category: 'foundations',
        tags: ['Statistics', 'Probability'],
    },

    // --- LEVEL 1: INTERMEDIATE (Data Science) ---
    {
        id: 10,
        title: 'Kaggle Learn',
        description: 'Bite-sized, practical courses on Pandas, SQL, and Data Visualization. The fastest way to start coding.',
        url: 'https://www.kaggle.com/learn',
        level: 'Intermediate',
        category: 'data-science',
        tags: ['Pandas', 'Python', 'Practice'],
        featured: true
    },
    {
        id: 11,
        title: 'Python for Data Science Handbook',
        description: 'The "O\'Reilly" standard. Deep dives into NumPy, Pandas, Matplotlib, and Scikit-Learn.',
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        level: 'Intermediate',
        category: 'data-science',
        tags: ['Book', 'Reference'],
    },
    {
        id: 12,
        title: 'SQLZoo',
        description: 'Interactive SQL tutorials. Learn to query databases, a non-negotiable skill for data scientists.',
        url: 'https://sqlzoo.net/',
        level: 'Intermediate',
        category: 'data-science',
        tags: ['SQL', 'Database'],
    },
    {
        id: 13,
        title: 'Streamlit',
        description: 'Turn data scripts into shareable web apps in minutes. Essential for showcasing projects.',
        url: 'https://streamlit.io/',
        level: 'Intermediate',
        category: 'data-science',
        tags: ['Tool', 'Visualization'],
    },

    // --- LEVEL 2: ADVANCED (Machine Learning) ---
    {
        id: 20,
        title: 'Machine Learning Specialization (Andrew Ng)',
        description: 'The modern version of the course that launched the industry. Supervised and Unsupervised learning.',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        level: 'Advanced',
        category: 'ml',
        tags: ['Course', 'Certification', 'Standard'],
        featured: true
    },
    {
        id: 21,
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
        description: 'The best practical book on the market. Reads like a novel, teaches like a senior engineer.',
        url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
        level: 'Advanced',
        category: 'ml',
        tags: ['Book', 'Code-Heavy'],
        featured: true
    },
    {
        id: 22,
        title: 'Fast.ai: Practical Deep Learning for Coders',
        description: 'Top-down approach. Build world-class models first, understand the math later. Highly effective.',
        url: 'https://course.fast.ai/',
        level: 'Advanced',
        category: 'dl',
        tags: ['Course', 'PyTorch'],
    },
    {
        id: 23,
        title: 'Hugging Face Course',
        description: 'Master Transformers and NLP. From tokenization to fine-tuning large language models.',
        url: 'https://huggingface.co/course',
        level: 'Advanced',
        category: 'nlp',
        tags: ['Transformers', 'NLP'],
        featured: true
    },
    {
        id: 24,
        title: 'CS231n: Deep Learning for Computer Vision',
        description: 'Stanford\'s premier course on CNNs, backprop, and visual recognition.',
        url: 'http://cs231n.stanford.edu/',
        level: 'Advanced',
        category: 'cv',
        tags: ['University', 'Vision'],
    },

    // --- LEVEL 3: EXPERT (GenAI & MLOps) ---
    {
        id: 30,
        title: 'Neural Networks: Zero to Hero (Karpathy)',
        description: 'Andrej Karpathy builds GPT from scratch. The single best resource for understanding LLMs internally.',
        url: 'https://karpathy.ai/zero-to-hero.html',
        level: 'Expert',
        category: 'gen-ai',
        tags: ['Deep Dive', 'LLMs'],
        featured: true
    },
    {
        id: 31,
        title: 'Full Stack Deep Learning',
        description: 'How to ship ML. Data management, testing, deployment, and monitoring in production.',
        url: 'https://fullstackdeeplearning.com/',
        level: 'Expert',
        category: 'mlops',
        tags: ['Production', 'Engineering'],
        featured: true
    },
    {
        id: 32,
        title: 'Attention Is All You Need',
        description: 'The 2017 paper that introduced the Transformer architecture and changed the world.',
        url: 'https://arxiv.org/abs/1706.03762',
        level: 'Expert',
        category: 'nlp',
        tags: ['Paper', 'Research'],
    },
    {
        id: 33,
        title: 'LangChain Documentation',
        description: 'Building complex applications with LLMs: Chains, Agents, and Retrieval Augmented Generation (RAG).',
        url: 'https://python.langchain.com/docs/get_started/introduction',
        level: 'Expert',
        category: 'gen-ai',
        tags: ['Framework', 'Agents'],
    },
    {
        id: 34,
        title: 'Distill.pub',
        description: 'Interactive articles about machine learning. The highest standard of ML explanation.',
        url: 'https://distill.pub/',
        level: 'Expert',
        category: 'dl',
        tags: ['Visualization', 'Research'],
    },
    {
        id: 35,
        title: 'The Annotated Transformer',
        description: 'Harvard NLP group\'s line-by-line implementation of the Transformer paper in PyTorch.',
        url: 'https://nlp.seas.harvard.edu/2018/04/03/attention.html',
        level: 'Expert',
        category: 'nlp',
        tags: ['Code', 'Implementation'],
    },
    {
        id: 36,
        title: 'Chip Huyen: ML System Design',
        description: 'A lecture series and book about designing scalable, reliable ML systems.',
        url: 'https://huyenchip.com/',
        level: 'Expert',
        category: 'mlops',
        tags: ['System Design', 'Production'],
    }
];
