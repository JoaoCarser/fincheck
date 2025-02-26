import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}

// Componente para proteger rotas privadas
export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false; // Simula se o usuário está autenticado

  if (!signedIn && isPrivate) {
    // Se não estiver autenticado e a rota for privada, redirecionaria para login
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    // Se estiver autenticado e a rota for pública, redirecionaria para o dashboard
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Renderiza as rotas filhas
}