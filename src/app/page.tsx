import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourceGrid from '@/components/ResourceGrid';
import styles from './page.module.css';
import Link from 'next/link';
import { RESOURCES, CATEGORIES } from '@/data/resources';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }> | { category?: string; search?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category || 'all';
  const calculateSearch = resolvedSearchParams?.search || '';

  let filteredResources = [...RESOURCES];

  if (categorySlug !== 'all') {
    filteredResources = filteredResources.filter(r => r.category.slug === categorySlug);
  }

  if (calculateSearch) {
    const searchLower = calculateSearch.toLowerCase();
    filteredResources = filteredResources.filter(r =>
      r.title.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort by Newest (simulated by ID logic or just existing order)
  filteredResources.sort((a, b) => b.id - a.id);

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.title}>Data Science & ML Resources</h1>
        <p className={styles.subtitle}>
          A curated collection of the best tools, libraries, and learning materials.
        </p>

        <form className={styles.searchForm} action={async (formData) => {
          "use server";
          const query = formData.get('search')?.toString();
          const cat = categorySlug;
          let url = '/';
          if (cat && cat !== 'all') url += `?category=${cat}`;
          if (query) url += `${url.includes('?') ? '&' : '?'}search=${query}`;
          else if (cat === 'all') url = '/';

          const { redirect } = await import('next/navigation');
          redirect(url);
        }}>
          <input
            type="text"
            name="search"
            placeholder="Search resources..."
            className={styles.searchInput}
            defaultValue={calculateSearch}
          />
        </form>

        <div className={styles.categories}>
          <Link
            href="/"
            className={`${styles.categoryChip} ${categorySlug === 'all' ? styles.active : ''}`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}${calculateSearch ? `&search=${calculateSearch}` : ''}`}
              className={`${styles.categoryChip} ${categorySlug === cat.slug ? styles.active : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.content}>
        {filteredResources.length > 0 ? (
          <ResourceGrid resources={filteredResources as any} />
        ) : (
          <div className={styles.emptyState}>No resources found.</div>
        )}
      </section>

      <Footer />
    </main>
  );
}
