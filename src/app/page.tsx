'use client';

import { useState } from 'react';
import { ROADMAPS } from '@/data/roadmaps';
import { RESOURCES, Level, CategorySlug, Resource } from '@/data/resources';
import styles from './page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Search, Filter } from 'lucide-react';

const CATEGORIES: { label: string; value: CategorySlug | 'All' }[] = [
    { label: 'All', value: 'All' },
    { label: 'Foundations', value: 'foundations' },
    { label: 'Data Science', value: 'data-science' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'Deep Learning', value: 'dl' },
    { label: 'NLP', value: 'nlp' },
    { label: 'Computer Vision', value: 'cv' },
    { label: 'GenAI', value: 'gen-ai' },
    { label: 'MLOps', value: 'mlops' },
];

export default function Home() {
    const [activeTab, setActiveTab] = useState<'vault' | 'roadmap'>('vault');
    const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);

    // Vault Filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<CategorySlug | 'All'>('All');

    // Filter Logic
    const filteredVault = RESOURCES.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || r.category === category;
        return matchesSearch && matchesCategory;
    });

    // Animation variants
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className={styles.main}>
            {/* --- FLOATING GLASS NAV --- */}
            <div className={styles.navContainer}>
                <nav className={styles.glassNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'vault' ? styles.active : ''}`}
                        onClick={() => setActiveTab('vault')}
                    >
                        Vault
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'roadmap' ? styles.active : ''}`}
                        onClick={() => setActiveTab('roadmap')}
                    >
                        Guide
                    </button>
                </nav>
            </div>

            {/* --- HERO SECTION --- */}
            <header className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8 }}
                    className={styles.heroContent}
                >
                    <h1 className={styles.title}>
                        Intelligence <br /> <span className={styles.titleGradient}>Index</span>
                    </h1>
                    <p className={styles.subtitle}>
                        The definitive knowledge base for the artificial intelligence era.
                    </p>
                </motion.div>
            </header>

            {/* --- CONTENT SWITCHER --- */}
            <section className={styles.section}>
                <AnimatePresence mode='wait'>
                    {activeTab === 'vault' ? (
                        <motion.div
                            key="vault"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* SEARCH & FILTERS */}
                            <div className={styles.vaultControls}>
                                <div className={styles.searchBar}>
                                    <Search size={20} className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Search protocols, papers, tools..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>
                                <div className={styles.filterRow}>
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.value}
                                            onClick={() => setCategory(cat.value)}
                                            className={`${styles.filterChip} ${category === cat.value ? styles.filterActive : ''}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* RESULTS GRID */}
                            <motion.div
                                variants={containerVars}
                                initial="hidden"
                                animate="show"
                                className={styles.grid}
                            >
                                {filteredVault.map((r) => (
                                    <motion.a
                                        key={r.id}
                                        href={r.url}
                                        target="_blank"
                                        variants={itemVars}
                                        className={styles.libCard}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={styles.cardGlow} />
                                        <div className={styles.libContent}>
                                            <div className={styles.cardHeader}>
                                                <span className={styles.idBadge}>{r.id < 10 ? `0${r.id}` : r.id}</span>
                                                <ArrowUpRight size={20} className={styles.arrowIcon} />
                                            </div>

                                            <h3 className={styles.libTitle}>{r.title}</h3>
                                            <p className={styles.libDesc}>{r.description}</p>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.pill}>{r.level}</span>
                                            <span className={styles.pill}>{r.type}</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="roadmap"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className={styles.roadmapList}
                        >
                            {ROADMAPS.map((rm) => (
                                <motion.div
                                    key={rm.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={styles.roadmapItem}
                                >
                                    <div
                                        className={styles.roadmapHeader}
                                        onClick={() => setOpenRoadmap(openRoadmap === rm.id ? null : rm.id)}
                                    >
                                        <div>
                                            <h2 className={styles.roleTitle}>{rm.role}</h2>
                                            <p className={styles.roleDesc}>{rm.description}</p>
                                        </div>
                                        <div className={styles.arrowWrapper}>
                                            <motion.div animate={{ rotate: openRoadmap === rm.id ? 180 : 0 }}>
                                                <ArrowDown size={20} />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {openRoadmap === rm.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className={styles.timeline}
                                            >
                                                {rm.phases.map((phase, i) => (
                                                    <div key={i} className={styles.phase}>
                                                        <h3 className={styles.phaseTitle}>{phase.title}</h3>
                                                        <p className={styles.phaseDesc}>{phase.description}</p>
                                                        <div className={styles.phaseResources}>
                                                            {phase.resources.map((res, j) => (
                                                                <a key={j} href={res.url} target="_blank" className={styles.resourceLink}>
                                                                    <div className={styles.resRow}>
                                                                        <span className={styles.resName}>{res.title}</span>
                                                                        <span className={styles.resInfo}>{res.type}</span>
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
