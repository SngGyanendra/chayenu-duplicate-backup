import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

export function CheckAuth() {
  const router = useRouter();
  const firstUpdate = useRef(true);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      const route = router.asPath;
      if (route.split('/')[1] === 'portal') {
        if (isLoggedIn === undefined) return;
        if (!isLoggedIn) {
          router.push('/login');
        }
      }
    }
  }, [router, isLoggedIn]);

  return <></>;
}
