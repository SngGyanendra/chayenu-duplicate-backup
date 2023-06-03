import ButtonStyles from '../../styles/button.module.scss';

export default function Button({
    type = 'main',
    onClick,
    label
}) {
    return <button className={`${ButtonStyles[type]} ${ButtonStyles.button}`} onClick={onClick}>{label}</button>
}