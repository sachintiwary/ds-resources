import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Tag } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};

    if (category && category !== 'all') {
        where.category = {
            slug: category,
        };
    }

    if (search) {
        where.OR = [
            { title: { contains: search } }, // SQLite contains is case-sensitive by default usually, but Prisma handles it?
            { description: { contains: search } },
        ];
    }

    try {
        const resources = await prisma.resource.findMany({
            where,
            include: {
                category: true,
                tags: true,
            },
            orderBy: { // Sorting by newest first
                createdAt: 'desc',
            },
        });
        return NextResponse.json(resources);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, url, categoryId, tags } = body;

        // Basic validation
        if (!title || !url || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Process tags: expect comma separated string or array of strings
        let tagConnect: { id: number }[] = [];
        if (tags && Array.isArray(tags)) {
            // Assume tags are IDs or names?
            // implementation plan said "tags: String (comma separated or related table)"
            // UI will likely send array of IDs or names to create?
            // For simplicity, let's assume we receive an array of tag IDs to connect
            // OR creates new tags.
            // Let's implement creating/connecting tags by name.

            // Actually, for MVP let's assume tags are just IDs
            // But better UX is creating tags.
            // Let's stick to connecting existing tags by IDs for now to simplify.
            // Or if the user sends strings, we find/create.
        }

        // Simplest: `tags` is array of Tag IDs
        if (tags && Array.isArray(tags)) {
            tagConnect = tags.map((id: number) => ({ id }));
        }

        const resource = await prisma.resource.create({
            data: {
                title,
                description: description || '',
                url,
                categoryId: parseInt(categoryId),
                tags: {
                    connect: tagConnect
                }
            },
            include: {
                category: true,
                tags: true,
            },
        });

        return NextResponse.json(resource);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
    }
}
