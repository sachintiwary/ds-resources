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
        { name: 'LLMs & GenAI', slug: 'llms' }
    ]

    const catMap: Record<string, number> = {}
    for (const c of categories) {
        const cat = await prisma.category.create({ data: c })
        catMap[c.slug] = cat.id
    }

    // 3. Create Tags
    const tagNames = ['Python', 'Course', 'Book', 'Library', 'Research Paper', 'Tutorial', 'Tool', 'Framework', 'YouTube', 'Blog']
    const tagMap: Record<string, number> = {}
    for (const t of tagNames) {
        const tag = await prisma.tag.create({ data: { name: t } })
        tagMap[t] = tag.id
    }

    // Helper to get Tag IDs
    const getTagIds = (names: string[]) => names.map(n => ({ id: tagMap[n] }))

    // 4. Create Resources
    const resources = [
        // ML & Data Science Fundamentals (0-20)
        {
            title: 'Coursera - Machine Learning by Andrew Ng',
            description: 'The classic entry point for ML. Covers broadly all foundational concepts.',
            url: 'https://www.coursera.org/learn/machine-learning',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Course', 'Python'])
        },
        {
            title: 'Kaggle Learn',
            description: 'Practical data science courses with interactive code cells.',
            url: 'https://www.kaggle.com/learn',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Course', 'Python', 'Tutorial'])
        },
        {
            title: 'Deep Learning Specialization (Coursera)',
            description: 'Andrew Ng\'s follow-up specialization focusing on Neural Networks.',
            url: 'https://www.coursera.org/specializations/deep-learning',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Course', 'Python'])
        },
        {
            title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
            description: 'One of the best practical books for getting your hands dirty with code.',
            url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Book', 'Python', 'Framework'])
        },
        {
            title: 'Fast.ai - Practical Deep Learning for Coders',
            description: 'Top-down approach to teaching deep learning. Highly recommended for coders.',
            url: 'https://course.fast.ai/',
            categoryId: catMap['deep-learning'],
            tags: getTagIds(['Course', 'Python', 'Framework'])
        },

        // Core Libraries (20-40)
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
            title: 'Hugging Face Transformers',
            description: 'State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX.',
            url: 'https://huggingface.co/docs/transformers',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Library', 'Python', 'NLP'])
        },
        {
            title: 'Scikit-learn',
            description: 'Simple and efficient tools for predictive data analysis.',
            url: 'https://scikit-learn.org/stable/',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Library', 'Python'])
        },
        {
            title: 'Pandas',
            description: 'Fast, powerful, flexible and easy to use open source data analysis and manipulation tool.',
            url: 'https://pandas.pydata.org/',
            categoryId: catMap['data-science'],
            tags: getTagIds(['Library', 'Python'])
        },

        // NLP & LLMs (40-70)
        {
            title: 'Attention Is All You Need',
            description: 'The seminal paper that introduced the Transformer architecture.',
            url: 'https://arxiv.org/abs/1706.03762',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Research Paper'])
        },
        {
            title: 'LangChain',
            description: 'Building applications with LLMs through composability.',
            url: 'https://python.langchain.com/docs/get_started/introduction',
            categoryId: catMap['llms'],
            tags: getTagIds(['Library', 'Python', 'Framework'])
        },
        {
            title: 'The Illustrated Transformer',
            description: 'A visual guide to understanding the Transformer model.',
            url: 'https://jalammar.github.io/illustrated-transformer/',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Blog', 'Tutorial'])
        },
        {
            title: 'OpenAI Cookbook',
            description: 'Examples and guides for using the OpenAI API.',
            url: 'https://github.com/openai/openai-cookbook',
            categoryId: catMap['llms'],
            tags: getTagIds(['Tutorial', 'Python'])
        },
        {
            title: 'CS224N: Natural Language Processing with Deep Learning',
            description: 'Stanford\'s premier course on NLP.',
            url: 'https://web.stanford.edu/class/cs224n/',
            categoryId: catMap['nlp'],
            tags: getTagIds(['Course'])
        },

        // MLOps & Engineering (70-90)
        {
            title: 'Full Stack Deep Learning',
            description: 'Course on shipping, maintaining, and monitoring Deep Learning projects.',
            url: 'https://fullstackdeeplearning.com/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Course', 'Tutorial'])
        },
        {
            title: 'Google Machine Learning Crash Course',
            description: 'Google\'s fast-paced, practical introduction to machine learning.',
            url: 'https://developers.google.com/machine-learning/crash-course',
            categoryId: catMap['machine-learning'],
            tags: getTagIds(['Course', 'Tutorial'])
        },
        {
            title: 'MLflow',
            description: 'An open source platform for the machine learning lifecycle.',
            url: 'https://mlflow.org/',
            categoryId: catMap['mlops'],
            tags: getTagIds(['Tool', 'Library'])
        },

        // Computer Vision & Advanced (90-100)
        {
            title: 'CS231n: Deep Learning for Computer Vision',
            description: 'Stanford\'s famous course on CNNs and visual recognition.',
            url: 'http://cs231n.stanford.edu/',
            categoryId: catMap['computer-vision'],
            tags: getTagIds(['Course'])
        },
        {
            title: 'YOLO (You Only Look Once)',
            description: 'Real-time object detection system.',
            url: 'https://pjreddie.com/darknet/yolo/',
            categoryId: catMap['computer-vision'],
            tags: getTagIds(['Tool', 'Research Paper'])
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
