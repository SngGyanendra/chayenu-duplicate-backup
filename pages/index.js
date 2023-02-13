import Image from 'next/image';
import Styles from '/styles/home.module.scss';

export default function Home() {
  return (
    <div className={Styles.home}>
      <Image src="/design.png" alt="" height={500} width={500} />
    </div>
  );
}
