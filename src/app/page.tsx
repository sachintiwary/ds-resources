'use client';

import { useState, useRef, MouseEvent } from 'react';
import { ROADMAPS, Roadmap } from '@/data/roadmaps';
import { RESOURCES, Level } from '@/data/resources';
import styles from './page.module.css';
import Particles from '@/components/Particles';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LEVEL_ORDER = {
    'Novice': 0,
    'Intermediate': 1,
    'Advanced': 2,
    'Expert': 3
};

const levels: Level[] = ['Novice', 'Intermediate', 'Advanced', 'Expert'];

export default function Home() {
    const [viewMode, setViewMode] = useState<'roadmaps' | 'library'>('roadmaps');

    // Roadmap State
    const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);

    // Library State
    const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
    const filteredResources = RESOURCES.filter(r =>
        selectedLevel === 'All' ? true : r.level === selectedLevel
    ).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

    return (
        <main className={styles.main}>
            <Particles />

            <div className={styles.content}>
                <section className={styles.hero}>
                    <motion.h1
                        layout
                        className={styles.titleMain}
                    >
                        Intelligence <span className={styles.titleHighlight}>Archive.</span>
                    </motion.h1>
                    <p style={{ color: '#8892b0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        The definitive hub for AI mastery. Follow a path or explore the vault.
                    </p>

                    <div className={styles.controls}>
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${viewMode === 'roadmaps' ? styles.active : ''}`}
                                onClick={() => setViewMode('roadmaps')}
                            >
                                PATHWAYS
                            </button>
                            <button
                                className={`${styles.tab} ${viewMode === 'library' ? styles.active : ''}`}
                                onClick={() => setViewMode('library')}
                            >
                                LIBRARY
                            </button>
                        </div>
                    </div>
                </section>

                <AnimatePresence mode="wait">
                    {viewMode === 'roadmaps' ? (
                        <motion.div
                            key="roadmaps"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            {/* ROADMAP SELECTOR */}
                            <div className={styles.roadmapGrid}>
                                {ROADMAPS.map((roadmap) => (
                                    <motion.div
                                        key={roadmap.id}
                                        className={styles.roadmapCard}
                                        // @ts-ignore
                                        style={{ '--card-color': roadmap.color }}
                                        onClick={() => setActiveRoadmap(roadmap)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className={styles.roleIcon}>{roadmap.icon}</div>
                                        <h2 className={styles.roleTitle}>{roadmap.role}</h2>
                                        <p className={styles.roleDesc}>{roadmap.description}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* ACTIVE TIMELINE */}
                            <AnimatePresence>
                                {activeRoadmap && (
                                    <motion.div
                                        key={activeRoadmap.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={styles.timeline}
                                        // @ts-ignore
                                        style={{ '--phase-color': activeRoadmap.color }}
                                    >
                                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                                            {activeRoadmap.role}
                                        </h2>

                                        {activeRoadmap.phases.map((phase, idx) => (
                                            <div key={idx} className={styles.phase}>
                                                <div className={styles.phaseTitle}>{phase.title}</div>
                                                <p style={{ color: '#888', marginBottom: '1rem' }}>{phase.description}</p>

                                                <div className={styles.resourceGridSmall}>
                                                    {phase.resources.map((res, rIdx) => (
                                                        <a
                                                            key={rIdx}
                                                            href={res.url}
                                                            target="_blank"
                                                            className={styles.resourceCardSmall}
                                                        >
                                                            <div className={styles.resourceType}>{res.type}</div>
                                                            <div style={{ fontWeight: 600 }}>{res.title}</div>
                                                            {res.duration && <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.5rem' }}>{res.duration}</div>}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="library"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* LIBRARY FILTERS */}
                            <div className={styles.controls} style={{ marginTop: 0 }}>
                                <div className={styles.tabs}>
                                    <button
                                        className={`${styles.tab} ${selectedLevel === 'All' ? styles.active : ''}`}
                                        onClick={() => setSelectedLevel('All')}
                                    >
                                        All Levels
                                    </button>
                                    {levels.map(lvl => (
                                        <button
                                            key={lvl}
                                            className={`${styles.tab} ${selectedLevel === lvl ? styles.active : ''}`}
                                            onClick={() => setSelectedLevel(lvl)}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* BENTO GRID */}
                            <motion.div layout className={styles.grid}>
                                <AnimatePresence>
                                    {filteredResources.map((resource) => (
                                        <Card key={resource.id} resource={resource} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

function Card({ resource }: { resource: any }) {
    const divRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        divRef.current.style.setProperty('--x', `${x}px`);
        divRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <motion.a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={styles.card}
            ref={divRef}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.spotlight} />

            <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                    <span className={`${styles.levelBadge} ${styles['level' + resource.level]}`}>
                        {resource.level}
                    </span>
                    <ArrowUpRight size={20} color="#64748b" />
                </div>

                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardDesc}>{resource.description}</p>

                <div className={styles.cardTags}>
                    {resource.tags.slice(0, 3).map((t: string) => (
                        <span key={t} className={styles.tag}>{t}</span>
                    ))}
                </div>
            </div>
        </motion.a>
    );
}
