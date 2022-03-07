import * as React from "react";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { supabaseClient } from "../lib/client";
import { useEffect, useState } from "react";

function Library() {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [name, setName] = useState("");

    const user = supabaseClient.auth.user();

    useEffect(() => {
        if (user) {
            supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .then(({ data, error }) => {
                    if (!error) {
                        setName(data[0].first_name || "");
                    }
                });

            supabaseClient
                .from("book_library")
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
                title="Library"
                description="📚 Allows the user to view their favorite books in their library"
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-row justify-between items-center h-16 content-center my-7 px-5">
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Welcome {name}
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

                <Text className="px-5" fontSize="xl" fontWeight={"semibold"}>
                    Library
                </Text>

                <div
                    className="flex flex-col flex-1 px-5 pt-2 mt-1"
                    style={{
                        maxHeight: "80vh",
                        paddingBottom: 120,
                        overflowY: "scroll",
                    }}
                >
                    {data &&
                        data.length > 0 &&
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
                                        isLibrary={true}
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

export default Library;
