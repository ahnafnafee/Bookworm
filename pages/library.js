import * as React from "react";
import Head from "next/head";
import { Image, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

export default function Library() {
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        fetch(
            "https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40"
        ).then((response) =>
            response.json().then((data) => setBooks(data.items))
        );
    }, []);

    const extractThumbnail = ({ imageLinks }) => {
        const DEFAULT_THUMBNAIL = "/vercel.svg";
        if (!imageLinks || !imageLinks.thumbnail) {
            return DEFAULT_THUMBNAIL;
        }
        return imageLinks.thumbnail.replace("http://", "https://");
    };

    const extractISBN13 = ({ industryIdentifiers }) => {
        industryIdentifiers.filter((isbn) => {
            if (isbn.type === "ISBN_13") {
                return isbn.identifier;
            }
        });
    };

    console.log(books);

    return (
        <div className="flex h-full">
            <Head>
                <title>Library - Bookworm</title>
            </Head>
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-row justify-between items-center content-center my-7 px-5">
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Welcome Alyssa
                    </Text>
                    <Avatar size="sm" bg="gray.600" onClick={() => null} />
                </div>

                <Text className="px-5" fontSize="xl" fontWeight={"semibold"}>
                    Library
                </Text>

                <div
                    className="flex flex-col flex-1 px-5 pt-2 mt-4"
                    style={{
                        maxHeight: "100vh",
                        paddingBottom: 120,
                        overflowY: "scroll",
                    }}
                >
                    {books &&
                        books.map((data) => (
                            <div key={data.id}>
                                <div
                                    style={{
                                        padding: 10,
                                        boxShadow:
                                            "0 4px 14px 0 rgb(0 118 255 / 16%)",
                                        marginBottom: 16,
                                        borderRadius: 8,
                                        minHeight: 150,
                                    }}
                                    className="flex flex-row"
                                >
                                    <Image
                                        boxSize="24%"
                                        objectFit="contain"
                                        alt="Logo"
                                        src={extractThumbnail(data.volumeInfo)}
                                        align={"center"}
                                        borderRadius={8}
                                        marginRight={4}
                                    />
                                    <div className="flex flex-col justify-between">
                                        <Text
                                            fontWeight={"medium"}
                                            fontSize="lg"
                                            noOfLines={2}
                                        >
                                            {data.volumeInfo.title}
                                        </Text>
                                        <Text fontSize="sm" noOfLines={1}>
                                            {data.volumeInfo.authors}
                                        </Text>
                                        <Text
                                            fontWeight={"light"}
                                            as="i"
                                            fontSize="sm"
                                            noOfLines={1}
                                        >
                                            {data.volumeInfo.categories ===
                                            undefined
                                                ? "Others"
                                                : data.volumeInfo.categories}
                                        </Text>
                                    </div>
                                </div>
                            </div>
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
