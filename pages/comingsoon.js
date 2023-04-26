import { useRouter } from 'next/router';
import Styles from '/styles/comingsoon.module.scss';
import { NextHead } from '/components/common';

export default function Comingsoon() {
  const router = useRouter();
  return (
    <div className={Styles.page}>
      <NextHead title="Chayenu | Coming Soon" />
      <div className={Styles.text}>
        This page will be coming soon.
        <span className={Styles.link}
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </span>
      </div>
    </div>
  );
}
