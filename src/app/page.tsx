'use client';

import { useState } from 'react';
import { RESOURCES, CATEGORIES } from '@/data/resources';
import styles from './page.module.css';
import { Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = RESOURCES.filter(r => {
        const matchesCat = activeCategory === 'all' || r.category.slug === activeCategory;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <main className={styles.main}>
            <div className={styles.bg} />

            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Study Mode
                    <span style={{ display: 'block', fontSize: '0.4em', fontWeight: 400, opacity: 0.7, marginTop: '10px' }}>
                        Data Science & AI Resources
                    </span>
                </h1>
                <p className={styles.subtitle}>
                    Premium curated collection of High-Quality tools, libraries, and courses.<br />
                    Elevate your learning stack.
                </p>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by name, tag or description..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            <nav className={styles.filterBar}>
                <button
                    className={`${styles.categoryChip} ${activeCategory === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveCategory('all')}
                >
                    All
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`${styles.categoryChip} ${activeCategory === cat.slug ? styles.active : ''}`}
                        onClick={() => setActiveCategory(cat.slug)}
                    >
                        {cat.name}
                    </button>
                ))}
            </nav>

            <section className={styles.grid}>
                {filtered.map((r, i) => (
                    <a
                        key={r.id}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card}
                        style={{ animationDelay: `${i * 0.05}s` }} // Staggered entrance
                    >
                        <div className={styles.cardCategory}>{r.category.name}</div>
                        <h3 className={styles.cardTitle}>{r.title}</h3>
                        <p className={styles.cardDesc}>{r.description}</p>
                        <div className={styles.cardFooter}>
                            {r.tags.map(t => (
                                <span key={t.name} className={styles.tag}>{t.name}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </section>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                    <p>No signal found matching coordinates.</p>
                </div>
            )}
        </main>
    );
}
