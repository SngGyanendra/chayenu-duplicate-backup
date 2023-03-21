import Link from "next/link";
import Styles from "./storiesNav.module.scss";
import { useSelector } from "react-redux";

export function StoriesNav() {
  const { stories } = useSelector((state) => state.stories);

  return (
    <div className={Styles.navWrapper}>
      <nav className={Styles.nav}>
        <div className={Styles.indexButtonWrapper}>
          <span className={Styles.indexText}>Index</span>
          <UpArrow />
          <DownArrow />
        </div>
        <ul className={Styles.ul}>
          {stories.map((story) => (
            <li className={Styles.li} key={story.id}>
              <Link className={Styles.link} href={`/stories/${story.id}`}>
                {story.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function UpArrow() {
  return (
    <svg
      className={`${Styles.arrowIcon} ${Styles.showOnHover}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      className={`${Styles.arrowIcon} ${Styles.hideOnHover}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
