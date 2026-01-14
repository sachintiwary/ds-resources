import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} Data Science Resources. All rights reserved.</p>
                <p className={styles.subtext}>Built with Next.js & Vanilla CSS</p>
            </div>
        </footer>
    );
}
