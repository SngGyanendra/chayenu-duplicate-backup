import { getPageBySlug } from '../api/common';
import { NextHead } from '../components/common';
import Styles from '../styles/page.module.scss';
import Hero from '../components/pages/Hero'
import RichText from '../components/pages/RichText';
import CardGroup from '../components/pages/CardGroup';

export default function Page({ page }) {
    return (<>
        <NextHead title={page.title} description={page.description} />
        <main className={Styles.main}>
            {page.blocks.map((block) => {
                let content = '';
                switch(block.collection) {
                    case 'block_hero':
                        content = <Hero key={block.id} hero={block.item} />
                        break;
                    case 'block_richtext':
                        content = <RichText key={block.id} richText={block.item} />
                        break;
                    case 'block_cardgroup':
                        content = <CardGroup key={block.id} cardGroup={block.item} />
                        break;
                }
                return content;
            })}
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
        return {
            notFound: true,
        };
    }
}