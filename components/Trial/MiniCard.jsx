import Styles from "./MiniCard.module.scss";

export default function MiniCard({ icon, title }) {
  const iconPath = `/icons/trial/${icon}`;
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.iconWrapper}>
        <img className={Styles.img} src={iconPath} />
      </div>
      <p className={Styles.title}>{title}</p>
    </div>
  );
}
