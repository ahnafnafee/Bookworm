import * as React from "react";
import { IconButton, Image, Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Rating from "react-rating";
import {
    IoEllipsisVertical as EllipsisVertical,
    IoHeartOutline as HeartOutline,
    IoAddOutline as AddOutline,
    IoStar as Star,
    IoStarOutline as StarOutline,
} from "react-icons/io5";
import { supabaseClient } from "../lib/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function BookDetails({
    id,
    volumeInfo,
    isSearch = true,
    isLibrary = false,
}) {
    const router = useRouter();
    const user = supabaseClient.auth.user();
    const toast = useToast();

    // Hacky way to remove data from list.\
    // TODO: Use a reducer instead
    const [removed, setRemoved] = useState(false);

    const extractThumbnail = ({ imageLinks }) => {
        const DEFAULT_THUMBNAIL = "https://via.placeholder.com/180x280";
        if (!imageLinks || !imageLinks.thumbnail) {
            return DEFAULT_THUMBNAIL;
        }
        return imageLinks.thumbnail.replace("http://", "https://");
    };

    const toastMsg = (title, status) => {
        return toast({
            title: title,
            status: status ? status : "success",
            duration: 1000,
            isClosable: true,
        });
    };

    const bookData = (id, volumeInfo) => {
        return [
            {
                user_id: user.id,
                g_id: id,
                title: volumeInfo.title,
                authors:
                    volumeInfo.authors !== undefined
                        ? volumeInfo.authors[0]
                        : "Unknown",
                thumbnail: extractThumbnail(volumeInfo),
                categories:
                    volumeInfo.categories === undefined
                        ? "Others"
                        : volumeInfo.categories[0],
                rating: volumeInfo.averageRating,
            },
        ];
    };

    const existingBookData = (id, volumeInfo) => {
        return [
            {
                user_id: user.id,
                g_id: id,
                title: volumeInfo.title,
                authors: volumeInfo.authors,
                thumbnail: volumeInfo.thumbnail,
                categories: volumeInfo.categories,
                rating: volumeInfo.averageRating,
            },
        ];
    };

    const moveToLibrary = (id, volumeInfo) => {
        if (user) {
            supabaseClient
                .from("book_library")
                .insert(existingBookData(id, volumeInfo))
                .then(({ data, error }) => {
                    if (!error) {
                        supabaseClient
                            .from("book_wishlist")
                            .delete()
                            .eq("g_id", id)
                            .then(({ data, error }) => {
                                if (!error) {
                                    setRemoved(true);
                                    console.log(data);
                                    toastMsg("Moved to Library");
                                } else {
                                    console.log(error);
                                    toastMsg("Failed", "error");
                                }
                            });
                    } else {
                        console.log(error);
                        toastMsg("Failed", "error");
                    }
                });
        }
    };

    const addToWishlist = (id, volumeInfo) => {
        if (user) {
            supabaseClient
                .from("book_wishlist")
                .insert(bookData(id, volumeInfo))
                .then(({ data, error }) => {
                    if (!error) {
                        setRemoved(true);
                        console.log(data);
                        toastMsg("Added to Wishlist");
                    } else {
                        console.log(error);
                        toastMsg("Failed", "error");
                    }
                });
        }
    };

    const addToLibrary = (id, volumeInfo) => {
        if (user) {
            supabaseClient
                .from("book_library")
                .insert(bookData(id, volumeInfo))
                .then(({ data, error }) => {
                    if (!error) {
                        setRemoved(true);
                        console.log(data);
                        toastMsg("Added to Library");
                    } else {
                        console.log(error);
                        toastMsg("Failed", "error");
                    }
                });
        }
    };

    const deleteFromWishlist = (id, volumeInfo) => {
        if (user) {
            supabaseClient
                .from("book_wishlist")
                .delete()
                .eq("id", volumeInfo.id)
                .then(({ data, error }) => {
                    if (!error) {
                        setRemoved(true);
                        console.log(data);
                        toastMsg("Deleted from Wishlist");
                    } else {
                        console.log(error);
                        toastMsg("Failed", "error");
                    }
                });
        }
    };

    const deleteFromLibrary = (id, volumeInfo) => {
        if (user) {
            supabaseClient
                .from("book_library")
                .delete()
                .eq("id", volumeInfo.id)
                .then(({ data, error }) => {
                    if (!error) {
                        setRemoved(true);
                        console.log(data);
                        toastMsg("Deleted from Library");
                    } else {
                        console.log(error);
                        toastMsg("Failed", "error");
                    }
                });
        }
    };

    if (removed) return <div></div>;

    return (
        <div key={id}>
            <div
                style={{
                    padding: 10,
                    marginBottom: 16,
                    borderRadius: 8,
                    minHeight: 150,
                    borderColor: "var(--chakra-colors-gray-300)",
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
                        src={
                            isSearch
                                ? extractThumbnail(volumeInfo)
                                : volumeInfo.thumbnail
                        }
                        align={"center"}
                        borderRadius={8}
                        marginRight={4}
                        className="self-start"
                        fallbackSrc="https://via.placeholder.com/180x280"
                        style={{
                            width: 90,
                        }}
                    />
                    <div className="flex flex-col justify-between">
                        <Text fontWeight={"medium"} fontSize="lg" noOfLines={2}>
                            {volumeInfo.title}
                        </Text>
                        <Text fontSize="sm" noOfLines={1}>
                            by{" "}
                            {isSearch
                                ? volumeInfo.authors !== undefined &&
                                  volumeInfo.authors[0]
                                : volumeInfo.authors}
                        </Text>
                        <Text
                            fontWeight={"light"}
                            as="i"
                            fontSize="sm"
                            noOfLines={1}
                        >
                            {isSearch
                                ? volumeInfo.categories === undefined
                                    ? "Others"
                                    : volumeInfo.categories
                                : volumeInfo.categories}
                        </Text>
                        <Rating
                            readonly
                            size={10}
                            initialRating={volumeInfo.averageRating}
                            emptySymbol={<StarOutline size={16} color="#000" />}
                            fullSymbol={<Star size={16} color="#000" />}
                            fractions={2}
                        />
                    </div>
                </div>
                <div width={50} className="flex flex-col justify-between pl-2">
                    {isSearch ? (
                        <>
                            <IconButton
                                aria-label="wishlist"
                                icon={<HeartOutline size={20} color="#000" />}
                                variant="outline"
                                onClick={() => addToWishlist(id, volumeInfo)}
                            />
                            <IconButton
                                aria-label="add-to-library"
                                icon={<AddOutline size={20} color="#000" />}
                                variant="outline"
                                onClick={() => addToLibrary(id, volumeInfo)}
                            />
                        </>
                    ) : (
                        <>
                            <Menu autoSelect={false}>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="options"
                                    icon={
                                        <EllipsisVertical
                                            size={20}
                                            color="#000"
                                        />
                                    }
                                    variant="outline"
                                />
                                {isLibrary ? (
                                    <>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    deleteFromLibrary(
                                                        id,
                                                        volumeInfo
                                                    )
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                ) : (
                                    <>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    moveToLibrary(
                                                        id,
                                                        volumeInfo
                                                    )
                                                }
                                            >
                                                Move to Library
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    deleteFromWishlist(
                                                        id,
                                                        volumeInfo
                                                    )
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
