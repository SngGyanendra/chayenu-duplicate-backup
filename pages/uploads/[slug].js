import { getUploadBySlug } from "../../api/common";
import { directusUrl } from "../../api/config";

export default function Upload() {
  return <p>Something went wrong</p>
}

export async function getServerSideProps({ query: { slug } }) {
  try {
    const upload = await getUploadBySlug(slug);

    if (upload === undefined) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: `${directusUrl}/assets/${upload.file.id}`,
      },
      props: {},
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
