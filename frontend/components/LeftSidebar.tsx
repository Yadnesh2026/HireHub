import Link from "next/link";
import { LayoutDashboard, Search, UserRound } from "lucide-react";

import styles from "./LeftSidebar.module.css";

type SidebarItem = "dashboard" | "profile";

type LeftSidebarProps = {
  activeItem?: SidebarItem;
};

const navigationItems = [
  {
    id: "dashboard" as const,
    label: "Dashboard",
    href: "/applied-jobs",
    Icon: LayoutDashboard,
  },
  {
    id: "jobs" as const,
    label: "Find Jobs",
    href: "/jobs",
    Icon: Search,
  },
  {
    id: "profile" as const,
    label: "My Profile",
    href: "/my-profile",
    Icon: UserRound,
  },
];

export default function LeftSidebar({ activeItem }: LeftSidebarProps) {
  return (
    <aside className={styles.leftSide}>
      {navigationItems.map(({ id, label, href, Icon }) => (
        <Link
          className={`${styles.navItem} ${activeItem === id ? styles.active : ""}`}
          href={href}
          key={id}
          aria-current={activeItem === id ? "page" : undefined}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
