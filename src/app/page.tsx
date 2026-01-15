'use client';

import { useState, useRef, useEffect } from 'react';
import { ROADMAPS } from '@/data/roadmaps';
import { RESOURCES, CategorySlug } from '@/data/resources';
import styles from './page.module.css';
import navStyles from './nav.module.css';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Search } from 'lucide-react';

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
    const [isNavVisible, setIsNavVisible] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }
    });

    // Handle Shining Beam Effect on Nav
    const handleNavMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        navRef.current.style.setProperty('--x', `${x}px`);
    };

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
            return (
            <main className={styles.main}>
                {/* SCREEN EDGE EFFECTS */}
                <div className={navStyles.screenFrame} />
                <div className={navStyles.refractionOverlay} />

                {/* --- FLOATING NAV --- */}
                <motion.div
                    className={navStyles.navContainer}
                    initial={{ y: 0 }}
                    animate={{ y: isNavVisible ? 0 : -120 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={navStyles.glassNav}>
                        <button
                            className={`${navStyles.navItem} ${activeTab === 'vault' ? navStyles.active : ''}`}
                            onClick={() => setActiveTab('vault')}
                        >
                            Vault
                        </button>
                        <button
                            className={`${navStyles.navItem} ${activeTab === 'roadmap' ? navStyles.active : ''}`}
                            onClick={() => setActiveTab('roadmap')}
                        >
                            Guide
                        </button>
                    </div>
                </motion.div>

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
                                        <LibraryCard key={r.id} resource={r} variants={itemVars} />
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
                                    <RoadmapCard
                                        key={rm.id}
                                        roadmap={rm}
                                        isOpen={openRoadmap === rm.id}
                                        toggle={() => setOpenRoadmap(openRoadmap === rm.id ? null : rm.id)}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>
            );
}

            // Extracted for cleaner Mouse Move logic
            function LibraryCard({resource, variants}: {resource: any, variants: any }) {
    const ref = useRef<HTMLAnchorElement>(null);

                const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
                    const rect = ref.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ref.current.style.setProperty('--x', `${x}px`);
                    ref.current.style.setProperty('--y', `${y}px`);
    };

                    return (
                    <motion.a
                        ref={ref}
                        href={resource.url}
                        target="_blank"
                        variants={variants}
                        className={styles.libCard}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseMove={handleMove}
                    >
                        <div className={styles.libContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.idBadge}>{resource.id < 10 ? `0${resource.id}` : resource.id}</span>
                                <ArrowUpRight size={20} className={styles.arrowIcon} />
                            </div>

                            <h3 className={styles.libTitle}>{resource.title}</h3>
                            <p className={styles.libDesc}>{resource.description}</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.pill}>{resource.level}</span>
                            <span className={styles.pill}>{resource.type}</span>
                        </div>
                    </motion.a>
                    );
}

                    function RoadmapCard({roadmap, isOpen, toggle}: {roadmap: any, isOpen: boolean, toggle: () => void }) {
    return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.roadmapItem}
                    >
                        <div
                            className={styles.roadmapHeader}
                            onClick={toggle}
                        >
                            <div>
                                <h2 className={styles.roleTitle}>{roadmap.role}</h2>
                                <p className={styles.roleDesc}>{roadmap.description}</p>
                            </div>
                            <div className={styles.arrowWrapper}>
                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                                    <ArrowDown size={20} />
                                </motion.div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={styles.timeline}
                                >
                                    {roadmap.phases.map((phase: any, i: number) => (
                                        <div key={i} className={styles.phase}>
                                            <h3 className={styles.phaseTitle}>{phase.title}</h3>
                                            <p className={styles.phaseDesc}>{phase.description}</p>
                                            <div className={styles.phaseResources}>
                                                {phase.resources.map((res: any, j: number) => (
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
                    );
}
