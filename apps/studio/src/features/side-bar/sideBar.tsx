import styles from "./sideBar.module.css";

interface ISideBar {
  avatar?: string
  fullName?: string //should be user object
}

export function SideBar({avatar, fullName}:ISideBar) {
  return (
    <aside className={styles.sideBar}>
      <div className="profile">
        <div className={styles.card}>
          <img src={avatar} className={styles.avatar} alt=""  />
          <h1 className={styles.fullName}>{fullName}</h1>
        </div>
      </div>
      <div className="side-bar-list">
        <ul>
          <li>

          </li>
        </ul>
      </div>
    </aside>
  );
}
