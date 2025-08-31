"use client";
import { useHomepage } from "./hooks/useHomepage";
import { 
  PublicHome,
  LoggedInHome,
  LoadingSpinner
} from "./components";

export default function HomePage() {
  const { user, loading, openProfileSidebar } = useHomepage();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? (
    <LoggedInHome user={user} onOpenProfile={openProfileSidebar} />
  ) : (
    <PublicHome />
  );
}
