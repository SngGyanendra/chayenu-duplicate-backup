import { getPageBySlug } from '../api/common';
import { NextHead } from '../components/common';
import PageComponent from '../components/pages/PageComponent'

export default function Page({ page }) {
    return (<>
        <NextHead title={page.title} description={page.description} />
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