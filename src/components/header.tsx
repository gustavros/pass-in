import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite Icon" />

      <nav className="flex items-center gap-5 font-medium text-sm">
        <NavLink className="text-zinc-300" href="/events">
          Eventos
        </NavLink>
        <NavLink href="/participants">Participantes</NavLink>
      </nav>
    </div>
  );
}
