import styles from './ResourceGrid.module.css';

export default function ResourceGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    );
}
