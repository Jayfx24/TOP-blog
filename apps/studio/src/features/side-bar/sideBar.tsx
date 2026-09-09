import styles from "./sideBar.module.css";
import { Pen, Globe, FilePen, Archive } from "lucide-react";

interface ISideBar {
  avatar?: string;
  fullName?: string; //should be user object
}

const sideBarNav = [
  {
    label: "New Post",
    icon: <Pen className="icon"/>,
  },

  {
    label: "Dashboard",
    icon: <Globe className="icon"/>,
  },
  {
    label: "Published",
    icon: <Globe className="icon"/>,
  },
  {
    label: "Drafts",
    icon: <FilePen className="icon"/>,
  },
  {
    label: "Archived",
    icon: <Archive className="icon"/>,
  },
];
export function SideBar({ avatar, fullName }: ISideBar) {
  return (
    <aside className={styles.sideBar}>
      <div className="profile">
        <div className={styles.card}>
          <img src={avatar} className={styles.avatar} alt="" />
          <h1 className={styles.fullName}>{fullName}</h1>
        </div>
      </div>
      <div className={styles.list}>
        <ul>
          {sideBarNav.map(({ label, icon }) => (
            <li className={styles.item}>
              {/*  */}
              {icon}
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
