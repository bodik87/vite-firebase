import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <header className="flex gap-2">
      <Link
        className={`${
          location.pathname === "/" && "bg-yellow-300 !border-orange-600"
        }`}
        to={`/`}
      >
        Home
      </Link>
      <Link
        className={`${
          location.pathname === "/firestore" &&
          "bg-yellow-300 !border-orange-600"
        }`}
        to={`/firestore`}
      >
        Firestore
      </Link>
      <Link
        className={`${
          location.pathname === "/realtime-database" &&
          "bg-yellow-300 !border-orange-600"
        }`}
        to={`/realtime-database`}
      >
        Realtime database
      </Link>
    </header>
  );
}
