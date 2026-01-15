export type Category = {
    id: string;
    name: string;
    slug: string;
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
    createdAt: string;
};

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Machine Learning', slug: 'machine-learning' },
    { id: '2', name: 'Deep Learning', slug: 'deep-learning' },
    { id: '3', name: 'Natural Language Processing', slug: 'nlp' },
    { id: '4', name: 'Computer Vision', slug: 'computer-vision' },
    { id: '5', name: 'Data Science Fundamentals', slug: 'data-science' },
    { id: '6', name: 'MLOps & Engineering', slug: 'mlops' },
    { id: '7', name: 'LLMs & GenAI', slug: 'llms' },
    { id: '8', name: 'Mathematics for ML', slug: 'math' },
];

export const TAGS: Tag[] = [
    { id: '1', name: 'Python' }, { id: '2', name: 'Course' }, { id: '3', name: 'Book' },
    { id: '4', name: 'Library' }, { id: '5', name: 'Research Paper' }, { id: '6', name: 'Tutorial' },
    { id: '7', name: 'Tool' }, { id: '8', name: 'Framework' }, { id: '9', name: 'YouTube' },
    { id: '10', name: 'Blog' }, { id: '11', name: 'Interactive' }, { id: '12', name: 'Dataset' },
    { id: '13', name: 'Visualization' }, { id: '14', name: 'Certification' }, { id: '15', name: 'Community' }
];

const getTags = (names: string[]) => names.map(n => TAGS.find(t => t.name === n)!).filter(Boolean);
const getCat = (slug: string) => CATEGORIES.find(c => c.slug === slug)!;

export const RESOURCES: Resource[] = [
    // --- Data Science Fundamentals ---
    {
        id: 1,
        title: 'Kaggle Learn',
        description: 'Practical data science courses with interactive code cells. Covers Python, Pandas, SQL, and Deep Learning.',
        url: 'https://www.kaggle.com/learn',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Course', 'Python', 'Interactive']),
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Data Science for Everyone (Datacamp)',
        description: 'An interactive introduction to data science without coding. Great for beginners.',
        url: 'https://www.datacamp.com/courses/data-science-for-everyone',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Course', 'Interactive']),
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: 'Pandas Documentation',
        description: 'The definitive guide to the most popular Python library for data manipulation.',
        url: 'https://pandas.pydata.org/docs/',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Library', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: 'Python for Data Science Handbook',
        description: 'Free online book by Jake VanderPlas. Essential reading.',
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Book', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: 'CS109A: Introduction to Data Science',
        description: 'Harvard University course covering data collection, management, analysis, and visualization.',
        url: 'https://cs109.github.io/2020/',
        categoryId: getCat('data-science').id,
        category: getCat('data-science'),
        tags: getTags(['Course', 'Python']),
        createdAt: new Date().toISOString()
    },

    // --- Mathematics for ML ---
    {
        id: 6,
        title: 'Mathematics for Machine Learning (Book)',
        description: 'A comprehensive book bridging the gap between math and ML code.',
        url: 'https://mml-book.github.io/',
        categoryId: getCat('math').id,
        category: getCat('math'),
        tags: getTags(['Book']),
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        title: '3Blue1Brown - Neural Networks',
        description: 'Incredible visual explanations of linear algebra, calculus, and neural networks.',
        url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
        categoryId: getCat('math').id,
        category: getCat('math'),
        tags: getTags(['YouTube', 'Visualization']),
        createdAt: new Date().toISOString()
    },
    {
        id: 8,
        title: 'StatQuest with Josh Starmer',
        description: 'Breaks down complicated statistics and ML concepts into small, amusing bites.',
        url: 'https://www.youtube.com/c/joshstarmer',
        categoryId: getCat('math').id,
        category: getCat('math'),
        tags: getTags(['YouTube', 'Tutorial']),
        createdAt: new Date().toISOString()
    },

    // --- Machine Learning ---
    {
        id: 9,
        title: 'Coursera - Machine Learning by Andrew Ng',
        description: 'The updated version of the classic course. Absolute must-take.',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Course', 'Python', 'Certification']),
        createdAt: new Date().toISOString()
    },
    {
        id: 10,
        title: 'Scikit-learn',
        description: 'Simple and efficient tools for predictive data analysis.',
        url: 'https://scikit-learn.org/stable/',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Library', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 11,
        title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
        description: 'The industry-standard practical book for ML engineers.',
        url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Book', 'Python', 'Framework']),
        createdAt: new Date().toISOString()
    },
    {
        id: 12,
        title: 'Google Machine Learning Crash Course',
        description: 'Google\'s fast-paced, practical introduction to machine learning.',
        url: 'https://developers.google.com/machine-learning/crash-course',
        categoryId: getCat('machine-learning').id,
        category: getCat('machine-learning'),
        tags: getTags(['Course', 'Tutorial']),
        createdAt: new Date().toISOString()
    },
    {
        id: 13,
        title: 'Fast.ai - Practical Deep Learning for Coders',
        description: 'A top-down approach: starts with code, then explains the theory. Excellent for coders.',
        url: 'https://course.fast.ai/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Course', 'Python', 'Framework']),
        createdAt: new Date().toISOString()
    },

    // --- Deep Learning ---
    {
        id: 14,
        title: 'Deep Learning Specialization (Andrew Ng)',
        description: 'Master Deep Learning, and break into AI.',
        url: 'https://www.coursera.org/specializations/deep-learning',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Course', 'Python', 'Certification']),
        createdAt: new Date().toISOString()
    },
    {
        id: 15,
        title: 'PyTorch',
        description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.',
        url: 'https://pytorch.org/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Library', 'Framework', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 16,
        title: 'TensorFlow',
        description: 'An end-to-end open source platform for machine learning.',
        url: 'https://www.tensorflow.org/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Library', 'Framework', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 17,
        title: 'Deep Learning Book',
        description: 'The academic bible of Deep Learning by Goodfellow, Bengio, and Courville.',
        url: 'https://www.deeplearningbook.org/',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Book']),
        createdAt: new Date().toISOString()
    },
    {
        id: 18,
        title: 'Andrej Karpathy - Neural Networks: Zero to Hero',
        description: 'Building neural nets from scratch. Best lecture series for understanding the internals.',
        url: 'https://karpathy.ai/zero-to-hero.html',
        categoryId: getCat('deep-learning').id,
        category: getCat('deep-learning'),
        tags: getTags(['Course', 'YouTube', 'Python']),
        createdAt: new Date().toISOString()
    },

    // --- NLP ---
    {
        id: 19,
        title: 'Hugging Face Course',
        description: 'Learn how to use transformers to solve NLP tasks.',
        url: 'https://huggingface.co/course/chapter1/1',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Course', 'Library', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 20,
        title: 'CS224N: Natural Language Processing with Deep Learning',
        description: 'Stanford\'s cutting-edge course on NLP.',
        url: 'https://web.stanford.edu/class/cs224n/',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Course']),
        createdAt: new Date().toISOString()
    },
    {
        id: 21,
        title: 'Attention Is All You Need',
        description: 'The research paper that introduced the Transformer architecture.',
        url: 'https://arxiv.org/abs/1706.03762',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Research Paper']),
        createdAt: new Date().toISOString()
    },
    {
        id: 22,
        title: 'spaCy',
        description: 'Industrial-Strength Natural Language Processing in Python.',
        url: 'https://spacy.io/',
        categoryId: getCat('nlp').id,
        category: getCat('nlp'),
        tags: getTags(['Library', 'Python']),
        createdAt: new Date().toISOString()
    },

    // --- LLMs & GenAI ---
    {
        id: 23,
        title: 'LangChain',
        description: 'Framework for developing applications powered by Language Models.',
        url: 'https://python.langchain.com/',
        categoryId: getCat('llms').id,
        category: getCat('llms'),
        tags: getTags(['Library', 'Framework']),
        createdAt: new Date().toISOString()
    },
    {
        id: 24,
        title: 'The Illustrated Transformer',
        description: 'The best visual explanation of how Transformers work.',
        url: 'https://jalammar.github.io/illustrated-transformer/',
        categoryId: getCat('llms').id,
        category: getCat('llms'),
        tags: getTags(['Blog', 'Visualization']),
        createdAt: new Date().toISOString()
    },
    {
        id: 25,
        title: 'OpenAI Cookbook',
        description: 'Example code for accomplishing common tasks with the OpenAI API.',
        url: 'https://github.com/openai/openai-cookbook',
        categoryId: getCat('llms').id,
        category: getCat('llms'),
        tags: getTags(['Tutorial', 'Python']),
        createdAt: new Date().toISOString()
    },
    {
        id: 26,
        title: 'LlamaIndex',
        description: 'Data framework for connecting custom data sources to large language models.',
        url: 'https://www.llamaindex.ai/',
        categoryId: getCat('llms').id,
        category: getCat('llms'),
        tags: getTags(['Library', 'Framework']),
        createdAt: new Date().toISOString()
    },

    // --- Computer Vision ---
    {
        id: 27,
        title: 'CS231n: Deep Learning for Computer Vision',
        description: 'Stanford University course on CNNs for visual recognition.',
        url: 'http://cs231n.stanford.edu/',
        categoryId: getCat('computer-vision').id,
        category: getCat('computer-vision'),
        tags: getTags(['Course']),
        createdAt: new Date().toISOString()
    },
    {
        id: 28,
        title: 'OpenCV',
        description: 'Open Source Computer Vision Library.',
        url: 'https://opencv.org/',
        categoryId: getCat('computer-vision').id,
        category: getCat('computer-vision'),
        tags: getTags(['Library', 'Tool']),
        createdAt: new Date().toISOString()
    },
    {
        id: 29,
        title: 'YOLO (You Only Look Once)',
        description: 'Real-time object detection system.',
        url: 'https://pjreddie.com/darknet/yolo/',
        categoryId: getCat('computer-vision').id,
        category: getCat('computer-vision'),
        tags: getTags(['Research Paper', 'Tool']),
        createdAt: new Date().toISOString()
    },

    // --- MLOps ---
    {
        id: 30,
        title: 'Full Stack Deep Learning',
        description: 'Learn to ship ML projects. Covers data, training, debugging, and deployment.',
        url: 'https://fullstackdeeplearning.com/',
        categoryId: getCat('mlops').id,
        category: getCat('mlops'),
        tags: getTags(['Course', 'Certification']),
        createdAt: new Date().toISOString()
    },
    {
        id: 31,
        title: 'Made With ML',
        description: 'Learn how to design, build, and deploy ML applications for production.',
        url: 'https://madewithml.com/',
        categoryId: getCat('mlops').id,
        category: getCat('mlops'),
        tags: getTags(['Course', 'Tutorial']),
        createdAt: new Date().toISOString()
    },
    {
        id: 32,
        title: 'MLflow',
        description: 'An open source platform for the machine learning lifecycle.',
        url: 'https://mlflow.org/',
        categoryId: getCat('mlops').id,
        category: getCat('mlops'),
        tags: getTags(['Tool', 'Library']),
        createdAt: new Date().toISOString()
    },
    {
        id: 33,
        title: 'DVC (Data Version Control)',
        description: 'Version Control System for Machine Learning Projects.',
        url: 'https://dvc.org/',
        categoryId: getCat('mlops').id,
        category: getCat('mlops'),
        tags: getTags(['Tool']),
        createdAt: new Date().toISOString()
    }
];
