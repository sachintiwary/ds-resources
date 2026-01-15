import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourceCard from '@/components/ResourceCard';
import ResourceGrid from '@/components/ResourceGrid';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getResources(category?: string, search?: string) {
  try {
    const where: any = {};
    if (category) where.category = { slug: category };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const resources = await prisma.resource.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return resources;
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (e) {
    return [];
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string; search?: string }> }) {
  const { category, search } = await searchParams; // Next.js 15 requires awaiting searchParams, or 14 works directly. Safest to await if type says Promise, but here type is object. 
  // Wait, in Next.js 15 searchParams is a Promise. In 14 it's an object. 
  // Since I just installed latest, it's likely 15 (RC) or 14 latest. 
  // Let's assume standard object for now or await if needed.
  // Actually, standard Next.js 14 Page props `searchParams` is NOT a promise. 
  // Next.js 15 makes it a promise.
  // I will treat it as object for now, if error (searchParams.category undefined) I will fix.

  const resources = await getResources(category, search);
  const categories = await getCategories();

  async function searchAction(formData: FormData) {
    'use server';
    const query = formData.get('query');
    redirect(`/?search=${query}`);
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Data Science & ML Resources</h1>
          <p className={styles.subtitle}>
            A curated collection of the best tools, libraries, and learning materials.
          </p>

          <div className={styles.filters}>
            <form action={searchAction} className={styles.searchForm}>
              <input
                name="query"
                type="text"
                placeholder="Search resources..."
                defaultValue={search || ''}
                className={styles.searchInput}
              />
            </form>
            <div className={styles.categoryList}>
              <Link href="/" className={`${styles.categoryTag} ${!category ? styles.active : ''}`}>All</Link>
              {categories.map(c => (
                <Link
                  key={c.id}
                  href={`/?category=${c.slug}`}
                  className={`${styles.categoryTag} ${category === c.slug ? styles.active : ''}`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.content}>
          {resources.length === 0 ? (
            <div className={styles.empty}>
              <p>No resources found.{search && ` Try searching for something else.`}</p>
            </div>
          ) : (
            <ResourceGrid>
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </ResourceGrid>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
