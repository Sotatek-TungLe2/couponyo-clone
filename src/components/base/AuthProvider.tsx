import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setAuthorization } from '@lib/authorization';

export default function AuthProvider({ children }: WithChildren): JSX.Element {
  const router = useRouter();
  const { auth } = router.query;

  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (!auth) {
      return;
    }

    setAuthorization(auth.toString());

    router?.replace(router?.pathname);
  }, [auth, localStorage, router]);

  return <>{children}</>;
}
