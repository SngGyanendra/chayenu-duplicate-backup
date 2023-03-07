import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllStories } from '../api/common';
import { NextHead } from '../components/common';
import Styles from '../styles/explore.module.scss';
import SubscribeStyles from '../styles/subscribe.module.scss'
import { StoryCard } from '../components/cards/StoryCard/StoryCard';
import { StoryCardSkeleton } from '../components/cards/StoryCard/StoryCardSkeleton';
import { StoriesNav } from '../components/common/StoriesNav/StoriesNav';

export default function Explore() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getData() {
    try {
      const { data } = await getAllStories();
      setLoading(false);
      setStories(data);
    } catch (error) {
      setLoading(false);
      setError('An error occured, please try after some time');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NextHead title={'Explore'} />
      {!error && (
        <>
          <StoriesNav stories={stories} />
          <main>
            <section className={Styles.main}>
              <div className={Styles.introWrapper}>
                <h1 className={Styles.title}>Explore Chayenu</h1>
                <p className={Styles.introParagraph}>
                  Learn about each section of Chayenu below or <Link
                    className={Styles.introParagraphLinks}
                    href="/subscribe"
                  >
                    Subscribe now.
                  </Link>
                </p>
                <p className={Styles.introParagraph}>
                  Chayenu is your daily Torah study delivered every two weeks in print or digital formats.
                </p>
                <p className={Styles.introParagraph}>
                  <Link
                    className={Styles.introParagraphLinks}
                    href="/subscribe"
                  >
                    Click here
                  </Link> to go to the library of books used in the Chayenu weekly Magazine
                </p>
              </div>

              <div className={Styles.storiesWrapper}>{
                loading ?
                  Array.apply(0, Array(4)).map(function (_, i) {
                    return (<StoryCardSkeleton key={i} />);
                  })
                  : stories.map(story => <StoryCard key={story.id} story={story} />)
              }</div>
            </section>
          </main>
        </>
      )}
      {error && <div className={SubscribeStyles.error}>{error}</div>}
    </>
  );
}
