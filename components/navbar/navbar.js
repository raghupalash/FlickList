import Image from 'next/image';
import SearchIcon from "@mui/icons-material/Search"

import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
        <div>
          <Image 
            width={170}
            height={50}
            src="/images/logo.png"
          />
        </div>
        <div className={styles["search-box"]}>
          <input className={styles.search} type="text" placeholder="Search"/>
          <SearchIcon />
        </div>
        <div>
          <Image
            src="/images/profile.png" 
            width={45}
            height={45}
            className={styles.profile}
          />
        </div>
      </div>
    )
}