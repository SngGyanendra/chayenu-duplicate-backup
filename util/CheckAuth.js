import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function CheckAuth() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const route = router.asPath;
    if (route.split('/')[1] === 'portal') {
        if(!isLoggedIn){
            router.push('/login')
        }
    }
  }, [router]);

  return <></>;
}
