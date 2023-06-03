import Styles from '../../styles/richText.module.scss';
import ContentStyles from '../../styles/content.module.scss';

export default function RichText({ richText }) {
    return <div className={Styles.contentWrapper}>
        <h2 className={Styles.headline}>{richText.headline}</h2>
        <div
            className={ContentStyles.content}
            dangerouslySetInnerHTML={{ __html: richText.content }}
        />
    </div>
}