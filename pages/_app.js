import "../styles.css";
import { Link } from "../components/Link";
import {
    IoBook as Book,
    IoBookOutline as BookOutline,
    IoSearch as Search,
    IoSearchOutline as SearchOutline,
    IoHeart as Heart,
    IoHeartOutline as HeartOutline,
} from "react-icons/io5";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { supabaseClient } from "../lib/client";
import * as React from "react";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const user = supabaseClient.auth.user();

    const tabRoutes = ["/library", "/search", "/wishlist"];

    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                handleAuthSession(event, session);
                if (event === "SIGNED_IN") {
                    const signedInUser = supabaseClient.auth.user();
                    const userId = signedInUser.id;
                    console.log(signedInUser.user_metadata);
                    if (signedInUser) router.push("/library");
                }
                if (event === "SIGNED_OUT") {
                    router.push("/authenticate");
                }
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, [router]);

    useEffect(() => {
        if (user) {
            if (router.route === "/authenticate") {
                router.push("/library");
            }
        } else {
            if (router.route !== "/authenticate") router.push("/authenticate");
        }
    }, [user, router]);

    const handleAuthSession = async (event, session) => {
        await fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto text-base text-gray-900 bg-cool-gray-200">
            <div className="relative flex flex-col flex-1 bg-white">
                <main className="flex flex-1">
                    <>
                        <DefaultSeo
                            titleTemplate="%s | Bookworm"
                            defaultTitle="Bookworm"
                            defaultOpenGraphImageHeight={600}
                            defaultOpenGraphImageWidth={800}
                            locale="en_US"
                            openGraph={{
                                type: "website",
                                locale: "en_US",
                                url: "https://bookworm-app.vercel.app/library",
                                description:
                                    "📚 Find, search and store books from Google Books by Ahnaf An Nafee",
                                site_name: "Bookworm",
                                images: [
                                    {
                                        url: "https://raw.githubusercontent.com/ahnafnafee/Bookworm-Client/main/public/images/bookworm-seo-image.png",
                                        width: 800,
                                        height: 600,
                                        alt: "Bookworm Hero Image",
                                    },
                                ],
                            }}
                            twitter={{
                                handle: "@ahnaf_nafee",
                                site: "https://github.com/ahnafnafee",
                                cardType: "summary_large_image",
                            }}
                        />
                        <ChakraProvider>
                            <ClerkProvider>
                                <Component {...pageProps} />
                            </ClerkProvider>
                        </ChakraProvider>
                    </>
                </main>

                {tabRoutes.includes(router.route) && (
                    <footer
                        id="footer-main"
                        className="flex"
                        style={footerStyle}
                    >
                        <Link
                            href="/library"
                            className="flex items-center justify-center w-1/3 py-4"
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <div className="flex flex-col items-center justify-around">
                                        <Book size={20} color="#fff" />
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "white",
                                            }}
                                        >
                                            Library
                                        </div>
                                    </div>
                                ) : (
                                    <BookOutline size={20} color="#fff" />
                                )
                            }
                        </Link>
                        <Link
                            href="/search"
                            className="flex items-center justify-center w-1/3 py-4 text-gray-500"
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <div className="flex flex-col items-center justify-around">
                                        <Search size={20} color="#fff" />
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "white",
                                            }}
                                        >
                                            Search
                                        </div>
                                    </div>
                                ) : (
                                    <SearchOutline size={20} color="#fff" />
                                )
                            }
                        </Link>
                        <Link
                            href="/wishlist"
                            className="flex items-center justify-center w-1/3 py-4 text-gray-500"
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <div className="flex flex-col items-center justify-around">
                                        <Heart size={20} color="#fff" />
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "white",
                                            }}
                                        >
                                            Wishlist
                                        </div>
                                    </div>
                                ) : (
                                    <HeartOutline size={20} color="#fff" />
                                )
                            }
                        </Link>
                    </footer>
                )}

                <style jsx global>{`
                    * {
                        padding: 0;
                        margin: 0;
                        font-family: Poppins, Helvetica Neue, sans-serif;
                    }
                `}</style>
            </div>
        </div>
    );
}

export const footerStyle = {
    position: "fixed",
    bottom: 0,
    zIndex: 10,
    backgroundColor: "black",
    left: 0,
    width: "100%",
    height: "8vh",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: "0 4px 14px 0 rgb(0 118 255 / 39%)",
};

export default MyApp;
