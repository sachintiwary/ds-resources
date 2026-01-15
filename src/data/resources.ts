export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
};

export type Tag = {
    id: string;
    name: string;
};

export type Resource = {
    id: number;
    title: string;
    description: string;
    url: string;
    categoryId: string;
    category: Category;
    tags: Tag[];
    image?: string; // Add image support for better visuals if we had them, defaulting to gradients/icons
};

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Machine Learning', slug: 'machine-learning', description: 'Algorithms that learn from data' },
    { id: '2', name: 'Deep Learning', slug: 'deep-learning', description: 'Neural networks and representation learning' },
    { id: '3', name: 'NLP', slug: 'nlp', description: 'Natural Language Processing & LLMs' },
    { id: '4', name: 'Computer Vision', slug: 'computer-vision', description: 'Image and video understanding' },
    { id: '5', name: 'Data Science', slug: 'data-science', description: 'Fundamentals, Statistics, and Analysis' },
    { id: '6', name: 'MLOps', slug: 'mlops', description: 'Engineering, Deployment, and Pipelines' },
    { id: '7', name: 'Generative AI', slug: 'gen-ai', description: 'Creation of new content by AI' },
];

export const TAGS: Tag[] = [
    { id: '1', name: 'Python' }, { id: '2', name: 'Course' }, { id: '3', name: 'Book' },
    { id: '4', name: 'Library' }, { id: '5', name: 'Paper' }, { id: '6', name: 'Tutorial' },
    { id: '7', name: 'Tool' }, { id: '8', name: 'Framework' }, { id: '9', name: 'Video' },
];

const getTags = (names: string[]) => names.map(n => TAGS.find(t => t.name === n)!).filter(Boolean);
const getCat = (slug: string) => CATEGORIES.find(c => c.slug === slug)!;

export const RESOURCES: Resource[] = [
    // --- Data Science Fundamentals ---
    {
        id: 1,
        title: 'Kaggle Learn',
        description: 'Interactive data science courses. The best place to start coding immediately.',
        url: 'https://www.kaggle.com/learn',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Course', 'Python']),
    },
    {
        id: 2,
        title: 'DataCamp',
        description: 'Interactive Python and R courses for data science.',
        url: 'https://www.datacamp.com/',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Course']),
    },
    {
        id: 3,
        title: 'Pandas',
        description: 'Fast, powerful, flexible and easy to use open source data analysis and manipulation tool.',
        url: 'https://pandas.pydata.org/',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Library', 'Python']),
    },
    {
        id: 9,
        title: 'Andrew Ng\'s Machine Learning',
        description: 'The updated version of the classic course. Absolute must-take for strong foundations.',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Course', 'Python']),
    },
    {
        id: 10,
        title: 'Scikit-learn',
        description: 'Simple and efficient tools for predictive data analysis.',
        url: 'https://scikit-learn.org/stable/',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Library', 'Python']),
    },
    {
        id: 15,
        title: 'PyTorch',
        description: 'An open source machine learning framework that accelerates the path to production.',
        url: 'https://pytorch.org/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Library', 'Framework', 'Python']),
    },
    {
        id: 16,
        title: 'TensorFlow',
        description: 'An end-to-end open source platform for machine learning.',
        url: 'https://www.tensorflow.org/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Library', 'Framework', 'Python']),
    },
    {
        id: 19,
        title: 'Hugging Face',
        description: 'The platform that is democratizing machine learning. Hub of models and datasets.',
        url: 'https://huggingface.co/',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Library', 'Tool']),
    },
    {
        id: 21,
        title: 'Attention Is All You Need',
        description: 'The seminal paper that introduced the Transformer architecture.',
        url: 'https://arxiv.org/abs/1706.03762',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Paper']),
    },
    {
        id: 23,
        title: 'LangChain',
        description: 'Framework for developing applications powered by Language Models.',
        url: 'https://python.langchain.com/',
        categoryId: getCat('gen-ai').id,
        category: getCat('gen-ai'),
        tags: getTags(['Library', 'Framework']),
    },
    {
        id: 25,
        title: 'OpenAI API',
        description: 'Documentation for the most powerful LLM APIs available.',
        url: 'https://platform.openai.com/docs',
        categoryId: getCat('gen-ai').id,
        category: getCat('gen-ai'),
        tags: getTags(['Tool']),
    },
    {
        id: 27,
        title: 'CS231n',
        description: 'Stanford\'s famous course on Deep Learning for Computer Vision.',
        url: 'http://cs231n.stanford.edu/',
        categoryId: getCat('computer-vision').id,
        category: getCat('computer-vision'),
        tags: getTags(['Course']),
    },
    {
        id: 29,
        title: 'YOLO',
        description: 'Real-time object detection system architecture.',
        url: 'https://pjreddie.com/darknet/yolo/',
        categoryId: getCat('computer-vision').id,
        category: getCat('computer-vision'),
        tags: getTags(['Paper', 'Tool']),
    },
];
