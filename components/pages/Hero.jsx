import { getDirectusAssetUrl } from '../../api/util';
import ContentStyles from '../../styles/content.module.scss';
import Styles from '../../styles/hero.module.scss';
import Buttons from './Buttons';

export default function Hero({ hero }) {
    return <div className={Styles.wrapper}>
        <div className={Styles.contentWrapper}>
            <h2 className={Styles.headline}>{hero.headline}</h2>
            <div
                className={ContentStyles.content}
                dangerouslySetInnerHTML={{ __html: hero.content }}
            />
            <Buttons buttons={hero.buttons} />
        </div>
        {hero.image && <div className={Styles.imageWrapper}>
            <img
                className={Styles.img}
                src={getDirectusAssetUrl(hero.image.id)}
                alt={hero.image.title}
            />
        </div>}
    </div>;
}