import Hero from './Hero';
import RichText from './RichText';
import CardGroup from './CardGroup';
import Styles from '../styles/hero.module.scss';

export default function Page({ page }) {
    return <main className={Styles.main}>
        {page.blocks.map((block) => {
            let content = '';
            switch(block.collection) {
                case 'block_hero':
                    content = <Hero key={block.id} hero={block.item} />
                    break;
                case 'block_richtext':
                    content = <RichText key={block.id} richText={block.item} />
                    break;
                case 'block_cardgroup':
                    content = <CardGroup key={block.id} cardGroup={block.item} />
                    break;
            }
            return content;
        })}
    </main>
}