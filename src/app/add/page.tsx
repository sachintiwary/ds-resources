'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

interface Category {
    id: number;
    name: string;
}

export default function AddResource() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Failed to load categories', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            url: formData.get('url'),
            categoryId: formData.get('categoryId'),
            tags: [], // For MVP, empty tags or implement basic tag input
        };

        try {
            const res = await fetch('/api/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to create resource');
            router.push('/');
            router.refresh();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Add New Resource</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.group}>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" required placeholder="e.g. Scikit-learn Docs" />
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="url">URL</label>
                            <input type="url" id="url" name="url" required placeholder="https://..." />
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="categoryId">Category</label>
                            <select name="categoryId" id="categoryId" required>
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" rows={4} required placeholder="Brief description..." />
                        </div>

                        <button type="submit" disabled={isSubmitting} className={styles.submit}>
                            {isSubmitting ? 'Adding...' : 'Add Resource'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
