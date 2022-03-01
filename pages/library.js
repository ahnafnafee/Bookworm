import * as React from "react";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";

export default function Library() {
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        fetch(
            "https://www.googleapis.com/books/v1/volumes?q=The Last Wish&maxResults=40"
        ).then((response) =>
            response.json().then((data) => setBooks(data.items))
        );
    }, []);

    console.log(books);

    return (
        <div className="flex h-full w-screen">
            <Head>
                <title>Library - Bookworm</title>
            </Head>
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-row justify-between items-center content-center my-7 px-5">
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Welcome Alyssa
                    </Text>
                    <Avatar size="sm" bg="black" onClick={() => null} />
                </div>

                <Text className="px-5" fontSize="xl" fontWeight={"semibold"}>
                    Library
                </Text>

                <div
                    className="flex flex-col flex-1 px-5 pt-2 mt-1"
                    style={{
                        maxHeight: "100vh",
                        paddingBottom: 120,
                        overflowY: "scroll",
                    }}
                >
                    {books &&
                        books.map(({ id, volumeInfo }) => (
                            <BookDetails
                                id={id}
                                volumeInfo={volumeInfo}
                                isLibrary={true}
                                isSearch={false}
                            />
                        ))}
                </div>
            </div>
            <style jsx>
                {`
                    .back {
                        padding: 10px;
                        background-color: dodgerblue;
                        color: white;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                `}
            </style>
        </div>
    );
}

export const getStaticProps = async () => {
    const data = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
    ).then((response) => response.json());
    return {
        props: { data },
    };
};
