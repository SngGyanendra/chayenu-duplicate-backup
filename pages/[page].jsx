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