import Card from './Card';
import Styles from '../../styles/cardGroup.module.scss';

function CardOrNull({ card }) {
    return card ? <Card key={card.id} card={card} /> : <div style={{ flex: 1 }}>{' '}</div>
}

export default function CardGroup({ cardGroup }) {
    const cards = cardGroup.cards.filter(card => !!card.block_card_id.image)
    const cardRows = [];

    if (cards.length > 3) {
        while(cards.length) {
            const cardRow = cards.splice(0, 3)
            while (cardRow.length < 3) {
                cardRow.push(null)
            }
            cardRows.push(cardRow)
        }
    }

    return <div className={Styles.cardGroupWrapper}>
        <h2 className={Styles.headline}>{cardGroup.headline}</h2>
        <p className={Styles.subtitle}>{cardGroup.subtitle}</p>
        {cards.length !== 0 && cards.length <= 3 && <div className={Styles.cardsWrapper}>
            {
                cards.map(card => <Card key={card.id} card={card} />)
            }
        </div>}
        {
            cardRows.map((cards, index) => {
                return <div key={index} className={Styles.cardsWrapper}>
                {
                    cards
                        .map(card => <CardOrNull key={card ? card.id : new Date().getTime()} card={card} />)
                }
            </div>  
            })
        }
    </div>
}