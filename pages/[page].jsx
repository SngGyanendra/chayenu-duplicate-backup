import { getPageBySlug } from '../api/common';
import { NextHead } from '../components/common';
import styles from '../styles/page.module.scss';

export default function Page({ page }) {
    return (<>
        <NextHead title={page.title} description={page.description} />
        <main className={styles.main}>
            <h1 className={styles.title} id={page.title}>
                {page.title}
            </h1>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </main>
    </>)
}

export async function getServerSideProps({
    query: {
        page: slug
    }
}) {
    try {
        const page = await getPageBySlug(slug);
        return {
            props: {
                page,
            }
        }
    } catch (e) {
        console.error(e.message)
        return {
            notFound: true,
        };
    }
}