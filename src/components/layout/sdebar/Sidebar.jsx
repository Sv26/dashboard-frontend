import { NavLink } from "react-router-dom";
import logo from "../../../asetes/logo.png";
import {
  Home,
  Package,
  FileText,
  BarChart2,
  Settings,
  User,
} from "lucide-react";
import "./sidebar.css";

export default function Sidebar() {
  // Read username from login
  const username = localStorage.getItem("user") || "User";

  return (
    <aside className="sidebar">
      {/* Logo (hidden on mobile) */}
      <div className="sidebar-top">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        <NavItem to="/dashboard/home" icon={Home} label="Home" />
        <NavItem to="/dashboard/product" icon={Package} label="Product" />
        <NavItem to="/dashboard/invoice" icon={FileText} label="Invoice" />
        <NavItem
          to="/dashboard/statistics"
          icon={BarChart2}
          label="Statistics"
        />
        <NavItem to="/dashboard/setting" icon={Settings} label="Setting" />
      </nav>

      {/* User section (hidden on mobile) */}
      <div className="sidebar-footer">
        <div className="user">
          <User size={18} />
          <span>{username}</span>
        </div>
        <span className="dot outline" />
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
    >
      <Icon size={20} />
      <span className="label">{label}</span>
    </NavLink>
  );
}
