import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Categories
    const ml = await prisma.category.upsert({
        where: { slug: 'machine-learning' },
        update: {},
        create: {
            name: 'Machine Learning',
            slug: 'machine-learning',
        },
    })

    const ds = await prisma.category.upsert({
        where: { slug: 'data-science' },
        update: {},
        create: {
            name: 'Data Science',
            slug: 'data-science',
        },
    })

    const dl = await prisma.category.upsert({
        where: { slug: 'deep-learning' },
        update: {},
        create: {
            name: 'Deep Learning',
            slug: 'deep-learning',
        },
    })

    const nlp = await prisma.category.upsert({
        where: { slug: 'nlp' },
        update: {},
        create: {
            name: 'Natural Language Processing',
            slug: 'nlp',
        },
    })

    // Create Tags
    const python = await prisma.tag.upsert({
        where: { name: 'Python' },
        update: {},
        create: { name: 'Python' },
    })

    const course = await prisma.tag.upsert({
        where: { name: 'Course' },
        update: {},
        create: { name: 'Course' },
    })

    const book = await prisma.tag.upsert({
        where: { name: 'Book' },
        update: {},
        create: { name: 'Book' },
    })

    const library = await prisma.tag.upsert({
        where: { name: 'Library' },
        update: {},
        create: { name: 'Library' },
    })


    // Create Resources
    await prisma.resource.create({
        data: {
            title: 'Coursera - Machine Learning by Andrew Ng',
            description: 'The most popular course for getting started with ML.',
            url: 'https://www.coursera.org/learn/machine-learning',
            categoryId: ml.id,
            tags: {
                connect: [{ id: python.id }, { id: course.id }],
            },
        },
    })

    await prisma.resource.create({
        data: {
            title: 'Scikit-learn Documentation',
            description: 'Official documentation for scikit-learn, a key ML library in Python.',
            url: 'https://scikit-learn.org/stable/',
            categoryId: ml.id,
            tags: {
                connect: [{ id: python.id }, { id: library.id }],
            },
        },
    })

    await prisma.resource.create({
        data: {
            title: 'Deep Learning Book',
            description: 'The "bible" of Deep Learning by Ian Goodfellow, Yoshua Bengio and Aaron Courville.',
            url: 'https://www.deeplearningbook.org/',
            categoryId: dl.id,
            tags: {
                connect: [{ id: book.id }],
            },
        },
    })
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
