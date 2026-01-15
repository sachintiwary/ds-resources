'use client';

import { useState, useEffect } from 'react';
import { RESOURCES, CATEGORIES } from '@/data/resources';
import styles from './page.module.css';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filtered = RESOURCES.filter(r => {
        const matchesCat = activeCategory === 'all' || r.category.slug === activeCategory;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <main className={styles.main}>
            {/* Dynamic Backgrounds */}
            <div className={styles.gridBg} />
            <div className={styles.glowOrbs}>
                <div className={`${styles.orb} ${styles.orb1}`} />
                <div className={`${styles.orb} ${styles.orb2}`} />
                <div className={`${styles.orb} ${styles.orb3}`} />
            </div>

            <section className={styles.hero}>
                <div className={styles.glitchWrapper}>
                    <h1 className={styles.title} data-text="SYSTEM :: ONLINE">
                        SYSTEM :: ONLINE
                    </h1>
                </div>

                <p className={styles.subtitle}>
                    ACCESSING NEURAL ARCHIVE... <br />
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>PROTOCOL:</span> STUDY_MODE
                </p>

                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="INPUT_QUERY // SEARCH RESOURCES..."
                        className={styles.searchBar}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            </section>

            <nav className={styles.nav}>
                <button
                    className={`${styles.chip} ${activeCategory === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveCategory('all')}
                >
                    [ ALL_DATA ]
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`${styles.chip} ${activeCategory === cat.slug ? styles.active : ''}`}
                        onClick={() => setActiveCategory(cat.slug)}
                    >
                        [ {cat.name.toUpperCase()} ]
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
                        style={{
                            animation: `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s backwards`
                        }}
                    >
                        <div className={styles.categoryLabel}>// {r.category.slug}</div>
                        <h3 className={styles.cardTitle}>{r.title}</h3>
                        <p className={styles.cardDesc}>{r.description}</p>
                        <div className={styles.tags}>
                            {r.tags.map(t => (
                                <span key={t.name} className={styles.tag}>#{t.name.toUpperCase()}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </section>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5, fontFamily: 'monospace' }}>
                    error: null_pointer_exception: resource not found
                </div>
            )}
        </main>
    );
}
