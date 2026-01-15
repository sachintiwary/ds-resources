'use client';

import { useState } from 'react';
import { ROADMAPS } from '@/data/roadmaps';
import { RESOURCES, Level } from '@/data/resources';
import styles from './page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default function Home() {
    const [activeTab, setActiveTab] = useState<'roadmap' | 'vault'>('roadmap');
    const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);

    // Animation variants
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className={styles.main}>
            {/* --- FLOATING GLASS NAV --- */}
            <div className={styles.navContainer}>
                <nav className={styles.glassNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'roadmap' ? styles.active : ''}`}
                        onClick={() => setActiveTab('roadmap')}
                    >
                        Guide
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'vault' ? styles.active : ''}`}
                        onClick={() => setActiveTab('vault')}
                    >
                        Vault
                    </button>
                </nav>
            </div>

            {/* --- HERO SECTION --- */}
            <header className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                    className={styles.heroContent}
                >
                    <h1 className={styles.title}>
                        Neural <br /> Architecture
                    </h1>
                    <p className={styles.subtitle}>
                        A curated intelligence layer for the modern AI engineer. <br />
                        Minimalist. Essential. Glass-clear.
                    </p>
                </motion.div>
            </header>

            {/* --- CONTENT SWITCHER --- */}
            <section className={styles.section}>
                <AnimatePresence mode='wait'>
                    {activeTab === 'roadmap' ? (
                        <motion.div
                            key="roadmap"
                            variants={containerVars}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            className={styles.roadmapList}
                        >
                            {ROADMAPS.map((rm) => (
                                <motion.div
                                    key={rm.id}
                                    variants={itemVars}
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
                                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{phase.title}</h3>
                                                        <p style={{ color: '#888', marginBottom: '1rem' }}>{phase.description}</p>
                                                        {phase.resources.map((res, j) => (
                                                            <a key={j} href={res.url} target="_blank" className={styles.resourceLink}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{res.title}</span>
                                                                    <ArrowUpRight size={16} opacity={0.5} />
                                                                </div>
                                                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                                                    {res.type} • {res.duration || 'Self-paced'}
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="vault"
                            variants={containerVars}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            className={styles.grid}
                        >
                            {RESOURCES.map((r) => (
                                <motion.a
                                    key={r.id}
                                    href={r.url}
                                    target="_blank"
                                    variants={itemVars}
                                    className={styles.libCard}
                                >
                                    <div className={styles.cardGlow} />
                                    <div className={styles.libContent}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                            <span style={{ fontSize: '3rem', fontWeight: 800, opacity: 0.1 }}>{r.id < 10 ? `0${r.id}` : r.id}</span>
                                            <ArrowUpRight size={24} />
                                        </div>

                                        <h3 className={styles.libTitle}>{r.title}</h3>
                                        <p className={styles.libDesc}>{r.description}</p>
                                    </div>
                                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                                        <span className={styles.pill}>{r.level}</span>
                                        <span className={styles.pill}>{r.category}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
