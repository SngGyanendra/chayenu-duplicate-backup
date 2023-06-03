import { useRouter } from 'next/router'
import { getDirectusAssetUrl } from '../../api/util';
import ContentStyles from '../../styles/content.module.scss';
import HeroStyles from '../../styles/hero.module.scss';
import Button from './Button';

export default function Hero({ hero }) {
    const router = useRouter();

    return <div className={HeroStyles.wrapper}>
        <div className={HeroStyles.contentWrapper}>
            <h2 className={HeroStyles.headline}>{hero.headline}</h2>
            <div
                className={ContentStyles.content}
                dangerouslySetInnerHTML={{ __html: hero.content }}
            />
            {
                hero.buttons && hero.buttons.length && <div className={HeroStyles.buttonsWrapper}>
                    {hero.buttons.map(button => {
                        return <Button
                            type={button.style}
                            key={button.label}
                            onClick={() => router.push(button.url)}
                            label={button.label}
                        />
                    })}
                </div>
            }

        </div>
        {hero.image && <div className={HeroStyles.imageWrapper}>
            <img
                className={HeroStyles.img}
                src={getDirectusAssetUrl(hero.image.id)}
                alt={hero.image.title}
            />
        </div>}
    </div>;
}