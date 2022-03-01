import "tailwindcss/tailwind.css";
import { Link } from "../components/Link";
import {
    Book,
    BookOutline,
    Search,
    SearchOutline,
    Heart,
    HeartOutline,
} from "react-ionicons";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
    const footerStyle = {
        position: "fixed",
        bottom: 0,
        zIndex: 10,
        backgroundColor: "white",
        left: 0,
        width: "100%",
        boxShadow: "0 4px 14px 0 rgb(0 118 255 / 39%)",
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto text-base text-gray-900 bg-cool-gray-200 xs:py-8">
            <div
                className="relative flex flex-col flex-1 w-full overflow-hidden bg-white shadow xs:max-w-sm"
                style={{ minHeight: "100vh", minHeight: "100vw" }}
            >
                <main className="flex-1 overflow-scroll">
                    <ChakraProvider>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </main>

                <footer id="footer-main" className="flex" style={footerStyle}>
                    <Link
                        href="/library"
                        className="flex items-center justify-center w-1/3 py-5"
                    >
                        {({ isActive }) =>
                            isActive ? (
                                <div className="flex flex-col items-center justify-center">
                                    <Book size="35" color="#000" />
                                    <div
                                        style={{
                                            position: "absolute",
                                            fontSize: "0.75rem",
                                            marginTop: 35,
                                        }}
                                    >
                                        Library
                                    </div>
                                </div>
                            ) : (
                                <BookOutline size="35" color="#000" />
                            )
                        }
                    </Link>
                    <Link
                        href="/search"
                        className="flex items-center justify-center w-1/3 py-5 text-gray-500"
                    >
                        {({ isActive }) =>
                            isActive ? (
                                <div className="flex flex-col items-center justify-center">
                                    <Search size="35" color="#000" />
                                    <div
                                        style={{
                                            position: "absolute",
                                            fontSize: "0.75rem",
                                            marginTop: 35,
                                        }}
                                    >
                                        Search
                                    </div>
                                </div>
                            ) : (
                                <SearchOutline size="35" color="#000" />
                            )
                        }
                    </Link>
                    <Link
                        href="/authenticate"
                        className="flex items-center justify-center w-1/3 py-5 text-gray-500"
                    >
                        {({ isActive }) =>
                            isActive ? (
                                <div className="flex flex-col items-center justify-center">
                                    <Heart size="35" color="#000" />
                                    <div
                                        style={{
                                            position: "absolute",
                                            fontSize: "0.75rem",
                                            marginTop: 35,
                                        }}
                                    >
                                        Wishlist
                                    </div>
                                </div>
                            ) : (
                                <HeartOutline size="35" color="#000" />
                            )
                        }
                    </Link>
                </footer>
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

export default MyApp;
