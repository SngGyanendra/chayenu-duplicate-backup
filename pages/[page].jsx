import { getPageBySlug } from '../api/common';
import { NextHead } from '../components/common';
import Styles from '../styles/page.module.scss';
import ContentStyles from '../styles/content.module.scss';
import Hero from '../components/pages/Hero'

export default function Page({ page }) {
    return (<>
        <NextHead title={page.title} description={page.description} />
        <main className={Styles.main}>
            {page.blocks.map((block) => {
                let content = '';
                switch(block.collection) {
                    case 'block_hero':
                        content = <Hero hero={block.item} />
                        break;
                    case 'block_richtext':
                        content = <div
                            className={ContentStyles.content}
                            dangerouslySetInnerHTML={{ __html: block.item.content }}
                        />
                        break;
                }
                return content;
            })}
            <div
                className={ContentStyles.content}
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