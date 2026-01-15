'use client';

import { useState } from 'react';
import { ROADMAPS } from '@/data/roadmaps';
import { RESOURCES, Level } from '@/data/resources';
import styles from './page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, Layers, Zap } from 'lucide-react';

const icons: Record<string, any> = { 'Course': Layers, 'Book': Box, 'Paper': Zap, 'Tool': Box, 'Project': Layers };

export default function Home() {
    const [view, setView] = useState<'pathways' | 'library'>('pathways');
    const [expandedRoadmap, setExpandedRoadmap] = useState<string | null>(ROADMAPS[0].id);
    const [filter, setFilter] = useState<Level | 'All'>('All');

    const filteredLib = RESOURCES.filter(r => filter === 'All' || r.level === filter);

    return (
        <main className={styles.main}>
            <nav className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.logoDot} />
                    DS_RES // 1.0
                </div>
                <div className={styles.nav}>
                    <button
                        className={`${styles.navBtn} ${view === 'pathways' ? styles.active : ''}`}
                        onClick={() => setView('pathways')}
                    >
                        Pathways
                    </button>
                    <button
                        className={`${styles.navBtn} ${view === 'library' ? styles.active : ''}`}
                        onClick={() => setView('library')}
                    >
                        Library
                    </button>
                </div>
            </nav>

            {view === 'pathways' && (
                <>
                    <section className={styles.hero}>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className={styles.titleMain}
                        >
                            Systematic Mastery.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                            className={styles.heroDesc}
                        >
                            Structured learning protocols for high-leverage technical roles.
                        </motion.p>
                    </section>

                    <div className={styles.container}>
                        <div className={styles.roadmapList}>
                            {ROADMAPS.map((rm) => (
                                <div key={rm.id} className={styles.roadmapRow}>
                                    <div
                                        className={styles.roadmapHeader}
                                        onClick={() => setExpandedRoadmap(expandedRoadmap === rm.id ? null : rm.id)}
                                    >
                                        <div className={styles.rowLeft}>
                                            <h2>{rm.role}</h2>
                                            <p>{rm.description}</p>
                                        </div>
                                        <motion.div animate={{ rotate: expandedRoadmap === rm.id ? 90 : 0 }}>
                                            <ArrowRight size={20} color="#666" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedRoadmap === rm.id && (
                                            <motion.div
                                                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                                                className={styles.roadmapContent}
                                            >
                                                <div className={styles.phaseList}>
                                                    {rm.phases.map((phase, i) => (
                                                        <div key={i} className={styles.phase}>
                                                            <h3>{phase.title}</h3>
                                                            {phase.resources.map((res, j) => (
                                                                <a key={j} href={res.url} target="_blank" className={styles.resLink}>
                                                                    <div className={styles.resTitle}>{res.title}</div>
                                                                    <div className={styles.resMeta}>
                                                                        <span>{res.type}</span>
                                                                        {res.duration && <span>{res.duration}</span>}
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {view === 'library' && (
                <div className={styles.container}>
                    <div className={styles.filterBar}>
                        {['All', 'Novice', 'Intermediate', 'Advanced', 'Expert'].map(f => (
                            <button
                                key={f}
                                className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                                onClick={() => setFilter(f as any)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className={styles.grid}>
                        {filteredLib.map(r => {
                            const Icon = icons[r.type as any] || Box;
                            return (
                                <motion.a
                                    layout
                                    href={r.url}
                                    target="_blank"
                                    key={r.id}
                                    className={styles.card}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                >
                                    <div className={styles.cardIcon}>
                                        <Icon size={20} />
                                    </div>
                                    <div className={styles.cardTitle}>{r.title}</div>
                                    <div className={styles.cardDesc}>{r.description}</div>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.cardTag}>{r.level}</span>
                                        <span className={styles.cardTag}>{r.category}</span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>
            )}
        </main>
    );
}
