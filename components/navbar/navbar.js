"use client";

import Image from 'next/image';
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react";

import styles from "./navbar.module.css";

const POSTER_API = "https://image.tmdb.org/t/p/original"

export default function Navbar() {
    const [query, setQuery] = useState("");
    const [searchRes, setSearchRes] = useState([]);

    async function handleKeyUp(event) {
      const newTerm = event.target.value;
      setQuery(newTerm);
      
      try {
        const res = await fetch(`/api/search?query=${newTerm}`);
        const { data } = await res.json();
        setSearchRes(data["results"])
      } catch(error) {
        console.log("An error occured: ", error.message);
      }
    }

    return (
        <div className={styles.navbar}>
        <div>
          <Image 
            width={170}
            height={50}
            src="/images/logo.png"
            alt="logo of the website 'Flick List'"
          />
        </div>
        <div className={styles["search-box-container"]}>
          <div className={`${styles["search-box"]} ${styles["search-box-expanded"]}`}>
            <div className={styles["line-one"]}>
              <input className={styles.search} type="text" placeholder="Search" onKeyUp={event => handleKeyUp(event)}/>
              <SearchIcon className={styles["search-icon"]}/>
            </div>
            {searchRes.length !== 0 && (
              <>
              <hr className={styles["res-border"]}></hr>
              <div className={styles["search-results"]}>
                {searchRes.map((res, i) => (
                  <div key={res.id}>
                    {res.poster_path ? (
                        <Image width={50} height={60} src={POSTER_API + res.poster_path}></Image>
                    ) : (
                        <Image width={50} height={60} src="/images/no-poster.png"></Image>
                    )}
                    <div>
                      <p className={styles["search-res-title"]}>{res.title}</p>
                      <p className={styles["search-res-date"]}>{res.release_date.split("-")[0]} Flim</p>
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>
        </div>
        <div>
          <Image
            src="/images/profile.png" 
            width={45}
            height={45}
            className={styles.profile}
            alt="profile picture of the user"
          />
        </div>
      </div>
    )
}