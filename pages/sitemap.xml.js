import { getAllStories } from "../api/common";

function generateSiteMap(baseUrl, links) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links.map(link => `<url>
        <loc>${baseUrl}/${link}</loc>
    </url>
    `)
    .join("")
    }
   </urlset>
 `;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const links = [
    '',
    'subscribe',
    'login',
    'forgot-password',
    'comingsoon',
    'explore-chayenu',
  ];

  // Stories
  const { data: stories } = await getAllStories();
  stories.forEach(({ slug }) => links.push(`chayenu-section/${slug}`))

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSiteMap(baseUrl, links));
  res.end();

  return {
    props: {},
  };
}