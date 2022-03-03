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

export function BookDetails({
    id,
    volumeInfo,
    isSearch = true,
    isLibrary = false,
}) {
    const extractThumbnail = ({ imageLinks }) => {
        const DEFAULT_THUMBNAIL = "https://via.placeholder.com/180x280";
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
                        src={extractThumbnail(volumeInfo)}
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
                            by {volumeInfo.authors}
                        </Text>
                        <Text
                            fontWeight={"light"}
                            as="i"
                            fontSize="sm"
                            noOfLines={1}
                        >
                            {volumeInfo.categories === undefined
                                ? "Others"
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
                                onClick={() =>
                                    console.log("Wishlisted", id, volumeInfo)
                                }
                            />
                            <IconButton
                                aria-label="add-to-library"
                                icon={<AddOutline size={20} color="#000" />}
                                variant="outline"
                                onClick={() =>
                                    console.log(
                                        "Added to Library",
                                        id,
                                        volumeInfo
                                    )
                                }
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
                                                    console.log(
                                                        "Deleted from Library",
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
                                                    console.log(
                                                        "Moved to Library",
                                                        id,
                                                        volumeInfo
                                                    )
                                                }
                                            >
                                                Move to Library
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    console.log(
                                                        "Deleted from Wishlist",
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
