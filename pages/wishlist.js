import * as React from "react";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

function Wishlist({ data }) {
    const router = useRouter();

    return (
        <div className="flex h-full w-screen">
            <NextSeo
                title="Wishlist"
                description="Allows the user to wishlist for their favorite books"
                canonical="https://github.com/ahnafnafee"
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-row justify-between items-center h-16 content-center mt-7 px-5">
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Wishlist
                    </Text>
                    <Avatar
                        size="sm"
                        bg="black"
                        onClick={() => {
                            router.push("/settings");
                            console.log("Settings");
                        }}
                    />
                </div>

                <div
                    className="flex flex-col flex-1 px-5 pt-2 mt-1"
                    style={{
                        maxHeight: "100vh",
                        paddingBottom: 120,
                        overflowY: "scroll",
                    }}
                >
                    {data &&
                        data.map(({ id, volumeInfo }) => (
                            <BookDetails
                                key={id}
                                id={id}
                                volumeInfo={volumeInfo}
                                isLibrary={false}
                                isSearch={false}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=Dan Brown&maxResults=15"
    );
    const json = await response.json();
    return {
        props: {
            data: json.items,
        },
    };
}

export default Wishlist;
