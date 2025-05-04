// pages/api/auth/error.tsx

import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="text-center mt-10">
      <h1 className="text-xl font-bold text-red-600">Erro de Autenticação</h1>
      <p>Ocorreu um erro: {error}</p>
    </div>
  );
}
