import Card from './Card';
import Styles from '../../styles/cardGroup.module.scss';

export default function CardGroup({ cardGroup }) {
    return <div className={Styles.cardGroupWrapper}>
        <h2 className={Styles.headline}>{cardGroup.headline}</h2>
        <p className={Styles.subtitle}>{cardGroup.subtitle}</p>
        <div className={Styles.cardsWrapper}>
            {cardGroup.cards
                .filter(card => !!card.block_card_id.image)
                .map(card => <Card key={card.id} card={card} />)}
        </div>
    </div>
}