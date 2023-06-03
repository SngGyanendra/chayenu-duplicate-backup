import Buttons from './Buttons';
import Styles from '../../styles/card.module.scss';
import { getDirectusAssetUrl } from '../../api/util';

export default function Card({ card: { block_card_id: card } }) {
    return <div className={Styles.cardWrapper}>
        <img
            className={Styles.image}
            src={getDirectusAssetUrl(card.image.id)}
            alt={card.image.title}
        />
        <h3 className={Styles.headline}>{card.headline}</h3>
        <div
            className={Styles.content}
            dangerouslySetInnerHTML={{ __html: card.content }}
        />
        <Buttons buttons={card.buttons} />
    </div>
}