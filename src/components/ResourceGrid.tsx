import styles from './ResourceGrid.module.css';
import ResourceCard from './ResourceCard';

export default function ResourceGrid({ resources }: { resources: any[] }) {
    return (
        <div className={styles.grid}>
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
}
