import * as React from "react";
import Head from "next/head";
import { IconButton, Image, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import Rating from "@mui/material/Rating";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
import { EllipsisVertical, Trash } from "react-ionicons";

export default function Library() {
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        fetch(
            "https://www.googleapis.com/books/v1/volumes?q=The Last Wish&maxResults=40"
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
                            <div key={id}>
                                <div
                                    style={{
                                        padding: 10,
                                        marginBottom: 16,
                                        borderRadius: 8,
                                        minHeight: 150,
                                        borderColor:
                                            "var(--chakra-colors-gray-300)",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                    }}
                                    className="flex flex-row justify-between"
                                >
                                    <div className="flex flex-row">
                                        <Image
                                            width={"30%"}
                                            objectFit="contain"
                                            alt="Logo"
                                            src={extractThumbnail(volumeInfo)}
                                            align={"center"}
                                            borderRadius={8}
                                            marginRight={4}
                                            className="self-start"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <Text
                                                fontWeight={"medium"}
                                                fontSize="lg"
                                                noOfLines={2}
                                            >
                                                {volumeInfo.title}
                                            </Text>
                                            <Text fontSize="sm" noOfLines={1}>
                                                by {volumeInfo.authors}
                                            </Text>
                                            <Text
                                                fontWeight={"light"}
                                                as="i"
                                                fontSize="sm"
                                                noOfLines={1}
                                            >
                                                {volumeInfo.categories ===
                                                undefined
                                                    ? "Others"
                                                    : volumeInfo.categories}
                                            </Text>
                                            <Rating
                                                size="small"
                                                defaultValue={2.5}
                                                precision={0.1}
                                                value={volumeInfo.averageRating}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <Menu autoSelect={false}>
                                        <MenuButton
                                            as={IconButton}
                                            aria-label="Options"
                                            icon={
                                                <EllipsisVertical
                                                    size="20"
                                                    color="#000"
                                                />
                                            }
                                            variant="outline"
                                        />
                                        <MenuList>
                                            <MenuItem>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
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
