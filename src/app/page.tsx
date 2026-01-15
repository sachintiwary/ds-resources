'use client';

import { useState } from 'react';
import { ROADMAPS, Roadmap } from '@/data/roadmaps';
import styles from './roadmaps.module.css';
import Particles from '@/components/Particles';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);

    return (
        <main className={styles.main}>
            <Particles />

            <div className={styles.content}>
                <section className={styles.hero}>
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={styles.glitchTitle}
                    >
                        Choose Your <br /> Destiny
                    </motion.h1>
                    <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        Interactive Neural Pathways for Artificial Intelligence Mastery
                    </p>
                </section>

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

                {/* ACTIVE ROADMAP DISPLAY */}
                <AnimatePresence mode='wait'>
                    {activeRoadmap && (
                        <motion.div
                            key={activeRoadmap.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className={styles.timeline}
                            // @ts-ignore
                            style={{ '--phase-color': activeRoadmap.color }}
                        >
                            <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>
                                {activeRoadmap.role} <span style={{ opacity: 0.5 }}>Protocol</span>
                            </h2>

                            {activeRoadmap.phases.map((phase, idx) => (
                                <div key={idx} className={styles.phase}>
                                    <div className={styles.phaseTitle}>{phase.title}</div>
                                    <p style={{ color: '#888', marginBottom: '1rem' }}>{phase.description}</p>

                                    <div className={styles.resourceGrid}>
                                        {phase.resources.map((res, rIdx) => (
                                            <a
                                                key={rIdx}
                                                href={res.url}
                                                target="_blank"
                                                className={styles.resourceCard}
                                            >
                                                <div className={styles.resourceType}>{res.type}</div>
                                                <div className={styles.resourceTitle}>{res.title}</div>
                                                {res.duration && <div style={{ fontSize: '0.8rem', color: '#444', marginTop: '0.5rem' }}>⏱ {res.duration}</div>}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
