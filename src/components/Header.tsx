import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    DS & ML Ops
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>
                        Browse
                    </Link>
                    <Link href="/add" className={styles.button}>
                        Add Resource
                    </Link>
                </nav>
            </div>
        </header>
    );
}
