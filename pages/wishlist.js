import * as React from "react";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { supabaseClient } from "../lib/client";
import { useEffect } from "react";

function Wishlist() {
    const router = useRouter();
    const [data, setData] = React.useState([]);

    const user = supabaseClient.auth.user();

    useEffect(() => {
        if (user) {
            supabaseClient
                .from("book_wishlist")
                .select("*")
                .eq("user_id", user.id)
                .then(({ data, error }) => {
                    if (!error) {
                        setData(data);
                        console.log(data);
                    }
                });
        }
    }, [user]);

    return (
        <div className="flex h-full w-screen">
            <NextSeo
                locale="en_US"
                title="Wishlist"
                description="📚 Allows the user to wishlist for their favorite books"
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
                        maxHeight: "80vh",
                        paddingBottom: 120,
                        overflowY: "scroll",
                    }}
                >
                    {data &&
                        data.map(
                            ({
                                id,
                                user_id,
                                g_id,
                                title,
                                authors,
                                thumbnail,
                                categories,
                                rating,
                            }) => {
                                const volumeInfo = {
                                    id,
                                    user_id,
                                    g_id,
                                    title,
                                    authors,
                                    thumbnail,
                                    categories,
                                    rating,
                                };
                                return (
                                    <BookDetails
                                        key={g_id}
                                        id={g_id}
                                        volumeInfo={volumeInfo}
                                        isLibrary={false}
                                        isSearch={false}
                                    />
                                );
                            }
                        )}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
