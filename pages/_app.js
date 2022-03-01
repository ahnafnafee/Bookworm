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
import { ChakraProvider, Image, Text } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { isMobile, isSafari } from "react-device-detect";

const theme = createTheme();

function MyApp({ Component, pageProps }) {
    const footerStyle = {
        position: "fixed",
        bottom: 0,
        zIndex: 10,
        backgroundColor: "black",
        left: 0,
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        boxShadow: "0 4px 14px 0 rgb(0 118 255 / 39%)",
    };

    if (isMobile) {
        return (
            <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto text-base text-gray-900 bg-cool-gray-200 xs:py-8">
                <div
                    className="relative flex flex-col flex-1 overflow-hidden bg-white shadow xs:max-w-sm"
                    style={{ minHeight: "100vh", minHeight: "100vw" }}
                >
                    <main className="flex flex-1 overflow-scroll">
                        <ThemeProvider theme={theme}>
                            <ChakraProvider>
                                <Component {...pageProps} />
                            </ChakraProvider>
                        </ThemeProvider>
                    </main>

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
                                        <Book size="35" color="#fff" />
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
                                    <BookOutline size="35" color="#fff" />
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
                                        <Search size="35" color="#fff" />
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
                                    <SearchOutline size="35" color="#fff" />
                                )
                            }
                        </Link>
                        <Link
                            href="/authenticate"
                            className="flex items-center justify-center w-1/3 py-4 text-gray-500"
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <div className="flex flex-col items-center justify-around">
                                        <Heart size="35" color="#fff" />
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
                                    <HeartOutline size="35" color="#fff" />
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
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto text-base bg-white xs:py-8">
            <Image
                width={200}
                objectFit="contain"
                alt="Logo"
                src="/images/bookworm-logo.png"
                align={"center"}
            />
            <Text fontSize="20px" marginTop={20}>
                is <Text as={"i"}>not supported</Text> in Desktop yet
            </Text>
        </div>
    );
}

export default MyApp;
