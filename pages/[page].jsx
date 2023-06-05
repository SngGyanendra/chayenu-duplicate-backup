import { getPageBySlug } from '../api/common';
import { getDirectusAssetUrl } from '../api/util';
import { NextHead } from '../components/common';
import PageComponent from '../components/pages/PageComponent'

export default function Page({ page }) {
    let ogImage = undefined;
    if (page.image) {
        ogImage = getDirectusAssetUrl(page.image.id);
    }

    return (<>
        <NextHead
            title={page.meta_title || page.title}
            description={page.description}
            ogTitle={page.OG_title}
            ogDescription={page.OG_description}
            ogImage={ogImage}
            ogType='article'
        />
        <PageComponent page={page} />
    </>)
}

export async function getServerSideProps({
    query: {
        page: slug,
        includeDraft,
    }
}) {
    try {
        const page = await getPageBySlug(slug, includeDraft === 'true');

        if (page === undefined) {
            return {
                notFound: true,
            };    
        }
        
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