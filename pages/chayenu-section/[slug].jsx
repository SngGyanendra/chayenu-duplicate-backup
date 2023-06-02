import Styles from '/styles/story.module.scss';
import ContentStyles from '../../styles/content.module.scss';
import { NextHead } from '/components/common';
import { getStoriesBySlug } from '../../api/common';
import { Print } from '../../components/common/Print.svg';
import { Digital } from '../../components/common/Digital.svg';
import { addIdToHeadings, convertTextToId } from '../../util/htmlProcessor';
import { StoriesNav } from '../../components/common/StoriesNav/StoriesNav';

export default function Story({ story, ids }) {
  return (
    <>
      <NextHead title={story.title} description={story.description} />
      <StoriesNav />
      <main className={Styles.main}>
        <div className={Styles.outlineWrapper}>
          <ul>
            <li>
              <a href={`#${convertTextToId(story.title)}`}>{story.title}</a>
            </li>
            {ids.map((id) => (
              <li key={id.id}>
                <a href={`#${id.id}`}>{id.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <section className={Styles.page}>
          <h1 className={Styles.title} id={convertTextToId(story.title)}>
            {story.title}
          </h1>
          <div className={Styles.digitalPrintIndicatorWrapper}>
            {story.is_print_available && (
              <div title="print">
                <Print />
              </div>
            )}
            {story.is_digital_available && (
              <div title="digital">
                <Digital />
              </div>
            )}
          </div>
          <div
            className={ContentStyles.content}
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const stories = await getStoriesBySlug(slug);

  if (stories.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }

  const story = stories[0];
  const { html, ids } = addIdToHeadings(story.content);
  story.content = html;

  return {
    props: {
      story,
      ids,
    },
  };
}
