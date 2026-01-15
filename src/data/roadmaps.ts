export type Resource = {
    title: string;
    url: string;
    type: 'Course' | 'Book' | 'Paper' | 'Tool' | 'Project';
    duration?: string;
};

export type Phase = {
    title: string;
    description: string;
    resources: Resource[];
};

export type Roadmap = {
    id: string;
    role: string;
    description: string;
    icon: string;
    color: string;
    phases: Phase[];
};

export const ROADMAPS: Roadmap[] = [
    {
        id: 'ds',
        role: 'The Data Scientist',
        description: 'Master the art of extracting insights from data. From Python basics to advanced statistical modeling.',
        icon: '📊',
        color: '#00f3ff', // Cyan
        phases: [
            {
                title: 'Phase 1: Foundations',
                description: 'Learn the language of data.',
                resources: [
                    { title: 'CS50: Intro to CS', url: 'https://cs50.harvard.edu/x/', type: 'Course', duration: '8 weeks' },
                    { title: 'Python for Everybody', url: 'https://www.py4e.com/', type: 'Course', duration: '4 weeks' },
                    { title: 'SQLZoo', url: 'https://sqlzoo.net/', type: 'Tool', duration: '1 week' },
                ]
            },
            {
                title: 'Phase 2: Analysis & Viz',
                description: 'Wrangle data and tell stories.',
                resources: [
                    { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/', type: 'Tool' },
                    { title: 'Kaggle Learn: Data Viz', url: 'https://www.kaggle.com/learn/data-visualization', type: 'Course' },
                    { title: 'Storytelling with Data', url: 'https://www.storytellingwithdata.com/', type: 'Book' },
                ]
            },
            {
                title: 'Phase 3: Machine Learning',
                description: 'Predict the future.',
                resources: [
                    { title: 'Intro to Statistical Learning', url: 'https://www.statlearning.com/', type: 'Book' },
                    { title: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', type: 'Project' },
                ]
            }
        ]
    },
    {
        id: 'ml',
        role: 'The ML Engineer',
        description: 'Build scalable AI systems. Focus on engineering, deployment, and production-grade models.',
        icon: '🤖',
        color: '#bc13fe', // Purple
        phases: [
            {
                title: 'Phase 1: Engineering Core',
                description: 'Software engineering first.',
                resources: [
                    { title: 'Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'Book' },
                    { title: 'Docker for Beginners', url: 'https://docker-curriculum.com/', type: 'Course' },
                ]
            },
            {
                title: 'Phase 2: Deep Learning',
                description: 'Neural networks in depth.',
                resources: [
                    { title: 'Fast.ai', url: 'https://course.fast.ai/', type: 'Course' },
                    { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', type: 'Course' },
                    { title: 'PyTorch Blitz', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'Tool' },
                ]
            },
            {
                title: 'Phase 3: MLOps',
                description: 'Productionizing models.',
                resources: [
                    { title: 'Full Stack Deep Learning', url: 'https://fullstackdeeplearning.com/', type: 'Course' },
                    { title: 'Made With ML', url: 'https://madewithml.com/', type: 'Course' },
                    { title: 'Chip Huyen: ML Systems', url: 'https://huyenchip.com/machine-learning-systems-design/', type: 'Book' },
                ]
            }
        ]
    },
    {
        id: 'llm',
        role: 'The LLM Specialist',
        description: 'The cutting edge. Transformers, RAG, Agents, and Fine-tuning.',
        icon: '🧠',
        color: '#ff0055', // Pink
        phases: [
            {
                title: 'Phase 1: The Transformer',
                description: 'Understand the architecture that changed everything.',
                resources: [
                    { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', type: 'Paper' },
                    { title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Project' },
                    { title: 'Karpathy: Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', type: 'Course' },
                ]
            },
            {
                title: 'Phase 2: Application Frameworks',
                description: 'Building on top of giants.',
                resources: [
                    { title: 'LangChain', url: 'https://python.langchain.com/', type: 'Tool' },
                    { title: 'LlamaIndex', url: 'https://www.llamaindex.ai/', type: 'Tool' },
                    { title: 'OpenAI Cookbook', url: 'https://github.com/openai/openai-cookbook', type: 'Project' },
                ]
            },
            {
                title: 'Phase 3: Fine-Tuning & Quantization',
                description: 'Customizing models efficiently.',
                resources: [
                    { title: 'Hugging Face PEFT', url: 'https://huggingface.co/docs/peft/index', type: 'Tool' },
                    { title: 'QLoRA Paper', url: 'https://arxiv.org/abs/2305.14314', type: 'Paper' },
                ]
            }
        ]
    }
];
