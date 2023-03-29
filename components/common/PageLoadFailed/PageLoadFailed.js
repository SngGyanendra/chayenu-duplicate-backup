import { useRouter } from 'next/router';
import Styles from './pageloadfail.module.scss';

export function PageLoadFailed({ error }) {
  const router = useRouter();

  return (
    <div className={Styles.error}>
      <div>{error}</div>
      <button
        onClick={() => {
          router.reload();
        }}
      >
        Retry
      </button>
    </div>
  );
}
