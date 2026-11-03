import { Link } from "react-router";
import styles from "./sideBar.module.css";
import { Pen, Globe,  } from "lucide-react";
import { Button } from "@blog/ui";
import { useAuth } from "@blog/features";

interface ISideBar {
  avatar?: string;
  fullName?: string; //should be user object
}

const sideBarNav = [
  {
    label: "New Post",
    icon: <Pen className="icon" />,
    path: "new",
  },

  {
    label: "Dashboard",
    icon: <Globe className="icon" />,
    path: "/",
  },
  {
    label: "Posts",
    icon: <Globe className="icon" />,
    path: "posts",
  },
 
];
export function SideBar({ avatar, fullName }: ISideBar) {
  const {logout} = useAuth()
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
          {sideBarNav.map(({ label, icon, path }) => (
            <li >
              <Link to={path} className={styles.item}>
                {icon}
                <span className={styles.label}>{label}</span>
              </Link>
              {/*  */}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer">
        <Button onClick={logout} size={"full"}>Log out</Button>
      </div>
    </aside>
  );
}
