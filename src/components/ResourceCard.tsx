import Link from 'next/link';
import styles from './ResourceCard.module.css';
import { Resource, Category, Tag } from '@prisma/client';

type ResourceWithDetails = Resource & {
    category: Category;
    tags: Tag[];
};

export default function ResourceCard({ resource }: { resource: ResourceWithDetails }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.category}>{resource.category.name}</span>
                <span className={styles.date}>{new Date(resource.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className={styles.title}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                </a>
            </h3>
            <p className={styles.description}>{resource.description}</p>
            <div className={styles.tags}>
                {resource.tags.map(tag => (
                    <span key={tag.id} className={styles.tag}>#{tag.name}</span>
                ))}
            </div>
        </div>
    );
}
