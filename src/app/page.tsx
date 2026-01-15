'use client';

import { useState, useRef, MouseEvent } from 'react';
import { RESOURCES, Level } from '@/data/resources';
import styles from './page.module.css';
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
    const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');

    const filtered = RESOURCES.filter(r =>
        selectedLevel === 'All' ? true : r.level === selectedLevel
    ).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

    return (
        <main className={styles.main}>
            <header className={styles.hero}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.titleMain}
                >
                    Master the <br /><span className={styles.titleHighlight}>Intelligence Stack.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ fontSize: '1.25rem', color: '#8892b0', maxWidth: '600px' }}
                >
                    A carefully sequenced roadmap from the first line of Python code to deploying production-grade LLMs.
                </motion.p>

                <div className={styles.controls}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${selectedLevel === 'All' ? styles.active : ''}`}
                            onClick={() => setSelectedLevel('All')}
                        >
                            Full Roadmap
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
            </header>

            <motion.div layout className={styles.grid}>
                <AnimatePresence>
                    {filtered.map((resource) => (
                        <Card key={resource.id} resource={resource} />
                    ))}
                </AnimatePresence>
            </motion.div>
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
