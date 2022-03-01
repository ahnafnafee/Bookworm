import styles from "./BottomNav.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Book,
    BookOutline,
    Search,
    SearchOutline,
    Heart,
    HeartOutline,
} from "react-ionicons";

const BottomNav = (props) => {
    const router = useRouter();
    const [activeTabs, setActiveTabs] = useState(props.name);

    return (
        <div className={`${styles.bottomNav}`}>
            <div className={`${styles.bnTab}`}>
                {activeTabs === "library" ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Book
                            size="35"
                            color="#000"
                            onClick={() => {
                                router.push("/authenticate");
                                console.log("library");
                                setActiveTabs("library");
                            }}
                        />
                        <div
                            style={{
                                fontSize: "0.75rem",
                                marginTop: -6,
                            }}
                        >
                            Library
                        </div>
                    </div>
                ) : (
                    <BookOutline
                        size="35"
                        color="#000"
                        onClick={() => {
                            router.push("/authenticate");
                            console.log("library");
                            setActiveTabs("library");
                        }}
                    />
                )}
            </div>
            <div className={`${styles.bnTab}`}>
                {activeTabs === "search" ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Search
                            size="35"
                            color="#000"
                            onClick={() => {
                                console.log("search");
                                setActiveTabs("search");
                            }}
                        />
                        <div
                            style={{
                                fontSize: "0.75rem",
                                marginTop: -6,
                            }}
                        >
                            Search
                        </div>
                    </div>
                ) : (
                    <SearchOutline
                        size="35"
                        color="#000"
                        onClick={() => {
                            console.log("search");
                            setActiveTabs("search");
                        }}
                    />
                )}
            </div>
            <div className={`${styles.bnTab}`}>
                {activeTabs === "wishlist" ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Heart
                            size="35"
                            color="#000"
                            onClick={() => {
                                router.push("/");
                                console.log("wishlist");
                                setActiveTabs("wishlist");
                            }}
                        />
                        <div
                            style={{
                                fontSize: "0.75rem",
                                marginTop: -6,
                            }}
                        >
                            Wishlist
                        </div>
                    </div>
                ) : (
                    <HeartOutline
                        size="35"
                        color="#000"
                        onClick={() => {
                            router.push("/");
                            console.log("wishlist");
                            setActiveTabs("wishlist");
                        }}
                    />
                )}
            </div>
            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
};

export default BottomNav;
