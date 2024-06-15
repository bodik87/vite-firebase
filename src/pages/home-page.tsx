import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
  const location = useLocation();
  return (
    <main className="p-4">
      <Header />

      {location.pathname === "/" && (
        <h1 className="mt-4">CRUD for Firestore and Realtime database</h1>
      )}
      <Outlet />
    </main>
  );
}
