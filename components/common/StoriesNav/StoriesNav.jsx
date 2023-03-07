import Link from 'next/link'
import Styles from './storiesNav.module.scss'

export function StoriesNav({ stories }) {
  return <nav className={Styles.nav}>
    <div className={Styles.indexButtonWrapper}>
      <span className={Styles.indexText}>Index</span>
      <UpArrow />
      <DownArrow />
    </div>
    <ul
      className={Styles.ul}>
      {
        stories.map(story => <li className={Styles.li} key={story.id}>
          <Link className={Styles.link} href={`/stories/${story.id}`}>
            {story.title}
          </Link>
        </li>)
      }
    </ul>
  </nav >
}

function UpArrow() {
  return <svg
    className={`${Styles.arrowIcon} ${Styles.showOnHover}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
}

function DownArrow() {
  return <svg
    className={`${Styles.arrowIcon} ${Styles.hideOnHover}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
}