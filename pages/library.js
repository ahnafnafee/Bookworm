import * as React from "react";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import { supabaseClient } from "../lib/client";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Library() {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const { data: bookData, error } = useSWR(
        `https://www.googleapis.com/books/v1/volumes?q=George R R Martin&maxResults=15`,
        fetcher
    );
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
        }
    }, [user]);

    React.useEffect(() => {
        if (bookData) setData(bookData.items);
    }, [bookData]);

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
                        data.map(({ id, volumeInfo }) => (
                            <BookDetails
                                key={id}
                                id={id}
                                volumeInfo={volumeInfo}
                                isLibrary={true}
                                isSearch={false}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Library;
