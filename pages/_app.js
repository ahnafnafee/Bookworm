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
import { ChakraProvider, Image, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const tabRoutes = ["/library", "/search", "/wishlist"];

    if (isMobile) {
        return (
            <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto text-base text-gray-900 bg-cool-gray-200 xs:py-8">
                <div className="relative flex flex-col flex-1 overflow-hidden bg-white shadow xs:max-w-sm">
                    <main className="flex flex-1 overflow-scroll">
                        <ChakraProvider>
                            <DefaultSeo
                                titleTemplate="%s | Bookworm"
                                defaultTitle="Bookworm"
                                defaultOpenGraphImageHeight={600}
                                defaultOpenGraphImageWidth={800}
                                locale="en_US"
                                openGraph={{
                                    type: "website",
                                    locale: "en_US",
                                    url: "https://github.com/ahnafnafee",
                                    description:
                                        "📚 Find, search and store books from Google Books by Ahnaf An Nafee",
                                    site_name: "Bookworm",
                                    profile: {
                                        firstName: "Ahnaf",
                                        lastName: "An Nafee",
                                    },
                                    images: [
                                        {
                                            url: "https://raw.githubusercontent.com/ahnafnafee/Bookworm-Client/main/public/images/bookworm-seo-image.png",
                                            width: 800,
                                            height: 600,
                                            alt: "Bookworm Alt",
                                        },
                                    ],
                                }}
                                twitter={{
                                    handle: "@handle",
                                    site: "@site",
                                    cardType: "summary_large_image",
                                }}
                            />
                            <Component {...pageProps} />
                        </ChakraProvider>
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
