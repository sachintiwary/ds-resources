import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Clear existing data
    await prisma.resource.deleteMany({})
    await prisma.tag.deleteMany({})
    await prisma.category.deleteMany({})

    // 2. Create Categories
    const categories = [
        { name: 'Machine Learning', slug: 'machine-learning' },
        { name: 'Deep Learning', slug: 'deep-learning' },
        { name: 'Natural Language Processing', slug: 'nlp' },
        { name: 'Computer Vision', slug: 'computer-vision' },
        { name: 'Data Science Fundamentals', slug: 'data-science' },
        { name: 'MLOps & Engineering', slug: 'mlops' },
        { name: 'LLMs & GenAI', slug: 'llms' },
        { name: 'Mathematics for ML', slug: 'math' },
    ]

    const catMap: Record<string, number> = {}
    for (const c of categories) {
        const cat = await prisma.category.create({ data: c })
        catMap[c.slug] = cat.id
    }

    // 3. Create Tags
    const tagNames = [
        'Python', 'Course', 'Book', 'Library', 'Research Paper', 'Tutorial',
        'Tool', 'Framework', 'YouTube', 'Blog', 'Interactive', 'Dataset',
        'Visualization', 'Certification', 'Community'
    ]
    const tagMap: Record<string, number> = {}
    for (const t of tagNames) {
        const tag = await prisma.tag.create({ data: { name: t } })
        tagMap[t] = tag.id
    }

    // Helper to get Tag IDs
    const getTagIds = (names: string[]) => names.filter(n => tagMap[n]).map(n => ({ id: tagMap[n] }))

    // 4. Create Resources
    const resources = [
        // --- Data Science Fundamentals ---
        {
            title: 'Kaggle Learn',
            description: 'Practical data science courses with interactive code cells. Covers Python, Pandas, SQL, and Deep Learning.',
            url: 'https://www.kaggle.com/learn',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Course', 'Python', 'Interactive'])
        },
        {
            title: 'Data Science for Everyone (Datacamp)',
            description: 'An interactive introduction to data science without coding. Great for beginners.',
            url: 'https://www.datacamp.com/courses/data-science-for-everyone',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Course', 'Interactive'])
        },
        {
            title: 'Pandas Documentation',
            description: 'The definitive guide to the most popular Python library for data manipulation.',
            url: 'https://pandas.pydata.org/docs/',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Library', 'Python'])
        },
        {
            title: 'Python for Data Science Handbook',
            description: 'Free online book by Jake VanderPlas. Essential reading.',
            url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Book', 'Python'])
        },
        {
            title: 'CS109A: Introduction to Data Science',
            description: 'Harvard University course covering data collection, management, analysis, and visualization.',
            url: 'https://cs109.github.io/2020/',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Course', 'Python'])
        },

        // --- Mathematics for ML ---
        {
            title: 'Mathematics for Machine Learning (Book)',
            description: 'A comprehensive book bridging the gap between math and ML code.',
            url: 'https://mml-book.github.io/',
            categoryId: catMap['math'],
            tags: getTagIds(['Book'])
        },
        {
            title: '3Blue1Brown - Neural Networks',
            description: 'Incredible visual explanations of linear algebra, calculus, and neural networks.',
            url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
            categoryId: catMap['math'],
            tags: getTagIds(['YouTube', 'Visualization'])
        },
        {
            title: 'StatQuest with Josh Starmer',
            description: 'Breaks down complicated statistics and ML concepts into small, amusing bites.',
            url: 'https://www.youtube.com/c/joshstarmer',
            categoryId: catMap['math'],
            tags: getTagIds(['YouTube', 'Tutorial'])
        },

        // --- Machine Learning ---
        {
            title: 'Coursera - Machine Learning by Andrew Ng',
            description: 'The updated version of the classic course. Absolute must-take.',
            url: 'https://www.coursera.org/specializations/machine-learning-introduction',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Course', 'Python', 'Certification'])
        },
        {
            title: 'Scikit-learn',
            description: 'Simple and efficient tools for predictive data analysis.',
            url: 'https://scikit-learn.org/stable/',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Library', 'Python'])
        },
        {
            title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
            description: 'The industry-standard practical book for ML engineers.',
            url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Book', 'Python', 'Framework'])
        },
        {
            title: 'Google Machine Learning Crash Course',
            description: 'Google\'s fast-paced, practical introduction to machine learning.',
            url: 'https://developers.google.com/machine-learning/crash-course',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Course', 'Tutorial'])
        },
        {
            title: 'Fast.ai - Practical Deep Learning for Coders',
            description: 'A top-down approach: starts with code, then explains the theory. Excellent for coders.',
            url: 'https://course.fast.ai/',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Course', 'Python', 'Framework'])
        },

        // --- Deep Learning ---
        {
            title: 'Deep Learning Specialization (Andrew Ng)',
            description: 'Master Deep Learning, and break into AI.',
            url: 'https://www.coursera.org/specializations/deep-learning',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Course', 'Python', 'Certification'])
        },
        {
            title: 'PyTorch',
            description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.',
            url: 'https://pytorch.org/',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Library', 'Framework', 'Python'])
        },
        {
            title: 'TensorFlow',
            description: 'An end-to-end open source platform for machine learning.',
            url: 'https://www.tensorflow.org/',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Library', 'Framework', 'Python'])
        },
        {
            title: 'Deep Learning Book',
            description: 'The academic bible of Deep Learning by Goodfellow, Bengio, and Courville.',
            url: 'https://www.deeplearningbook.org/',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Book'])
        },
        {
            title: 'Andrej Karpathy - Neural Networks: Zero to Hero',
            description: 'Building neural nets from scratch. Best lecture series for understanding the internals.',
            url: 'https://karpathy.ai/zero-to-hero.html',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Course', 'YouTube', 'Python'])
        },

        // --- NLP ---
        {
            title: 'Hugging Face Course',
            description: 'Learn how to use transformers to solve NLP tasks.',
            url: 'https://huggingface.co/course/chapter1/1',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Course', 'Library', 'Python'])
        },
        {
            title: 'CS224N: Natural Language Processing with Deep Learning',
            description: 'Stanford\'s cutting-edge course on NLP.',
            url: 'https://web.stanford.edu/class/cs224n/',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Course'])
        },
        {
            title: 'Attention Is All You Need',
            description: 'The research paper that introduced the Transformer architecture.',
            url: 'https://arxiv.org/abs/1706.03762',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Research Paper'])
        },
        {
            title: 'spaCy',
            description: 'Industrial-Strength Natural Language Processing in Python.',
            url: 'https://spacy.io/',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Library', 'Python'])
        },

        // --- LLMs & GenAI ---
        {
            title: 'LangChain',
            description: 'Framework for developing applications powered by Language Models.',
            url: 'https://python.langchain.com/',
            categoryId: catMap['llms'],
            tags: getTagIds(['Library', 'Framework'])
        },
        {
            title: 'The Illustrated Transformer',
            description: 'The best visual explanation of how Transformers work.',
            url: 'https://jalammar.github.io/illustrated-transformer/',
            categoryId: catMap['llms'],
            tags: getTagIds(['Blog', 'Visualization'])
        },
        {
            title: 'OpenAI Cookbook',
            description: 'Example code for accomplishing common tasks with the OpenAI API.',
            url: 'https://github.com/openai/openai-cookbook',
            categoryId: catMap['llms'],
            tags: getTagIds(['Tutorial', 'Python'])
        },
        {
            title: 'LlamaIndex',
            description: 'Data framework for connecting custom data sources to large language models.',
            url: 'https://www.llamaindex.ai/',
            categoryId: catMap['llms'],
            tags: getTagIds(['Library', 'Framework'])
        },

        // --- Computer Vision ---
        {
            title: 'CS231n: Deep Learning for Computer Vision',
            description: 'Stanford University course on CNNs for visual recognition.',
            url: 'http://cs231n.stanford.edu/',
            categoryId: catMap['computer-vision'],
            tags: getTagIds(['Course'])
        },
        {
            title: 'OpenCV',
            description: 'Open Source Computer Vision Library.',
            url: 'https://opencv.org/',
            categoryId: catMap['computer-vision'],
            tags: getTagIds(['Library', 'Tool'])
        },
        {
            title: 'YOLO (You Only Look Once)',
            description: 'Real-time object detection system.',
            url: 'https://pjreddie.com/darknet/yolo/',
            categoryId: catMap['computer-vision'],
            tags: getTagIds(['Research Paper', 'Tool'])
        },

        // --- MLOps ---
        {
            title: 'Full Stack Deep Learning',
            description: 'Learn to ship ML projects. Covers data, training, debugging, and deployment.',
            url: 'https://fullstackdeeplearning.com/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Course', 'Certification'])
        },
        {
            title: 'Made With ML',
            description: 'Learn how to design, build, and deploy ML applications for production.',
            url: 'https://madewithml.com/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Course', 'Tutorial'])
        },
        {
            title: 'MLflow',
            description: 'An open source platform for the machine learning lifecycle.',
            url: 'https://mlflow.org/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Tool', 'Library'])
        },
        {
            title: 'DVC (Data Version Control)',
            description: 'Version Control System for Machine Learning Projects.',
            url: 'https://dvc.org/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Tool'])
        }
    ]

    for (const r of resources) {
        await prisma.resource.create({
            data: {
                title: r.title,
                description: r.description,
                url: r.url,
                categoryId: r.categoryId,
                tags: {
                    connect: r.tags
                }
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
