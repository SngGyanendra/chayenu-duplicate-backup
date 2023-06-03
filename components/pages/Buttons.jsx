import { useRouter } from 'next/router'
import Button from './Button';
import Styles from '../../styles/buttons.module.scss';

export default function Buttons({ buttons }) {
    const router = useRouter();

    return buttons && buttons.length && <div className={Styles.buttonsWrapper}>
        {buttons.map(button => {
            return <Button
                type={button.style}
                key={button.label}
                onClick={() => router.push(button.url)}
                label={button.label}
            />
        })}
    </div>
}