import * as React from "react";
import Head from "next/head";
import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Search as SearchIcon } from "react-ionicons";

export default function Search() {
    const inputLeftRef = React.useRef();
    const inputRightRef = React.useRef();
    const [isFocused, setIsFocused] = React.useState(false);

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Queried");
        }
    };

    React.useEffect(() => {
        if (isFocused) {
            document.getElementById("footer-main").classList.add("hidden");
        } else {
            document.getElementById("footer-main").classList.remove("hidden");
        }
    }, [isFocused]);

    return (
        <div className="flex h-full w-screen">
            <NextSeo
                title="Search"
                description="Allows the user to search for their favorite books"
                canonical="https://github.com/ahnafnafee"
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-col justify-between items-center h-16 content-center mt-7 px-5">
                    <InputGroup>
                        <InputLeftElement
                            ref={inputLeftRef}
                            ps={3}
                            me={4}
                            w="fit-content"
                            h="full"
                            color="grey.600"
                        >
                            <SearchIcon size="20" color="#000" />
                        </InputLeftElement>
                        <Input
                            ps={12}
                            variant="outline"
                            onFocus={toggleFocus}
                            onKeyDown={handleSearch}
                            placeholder="Search"
                            onBlur={toggleFocus}
                        />
                        <InputRightElement
                            ref={inputRightRef}
                            w="fit-content"
                            pe={4}
                            h="full"
                            color="grey.600"
                        >
                            {/* <MinusIcon /> */}
                        </InputRightElement>
                    </InputGroup>
                    <Text fontSize="2xl" fontWeight={"extrabold"}>
                        Wishlist
                    </Text>
                    <Avatar
                        size="sm"
                        bg="black"
                        onClick={() => {
                            // router.push("/settings");
                            console.log("Settings");
                        }}
                    />
                </div>

                <div className="flex flex-col flex-1 px-5 pt-2 mt-1"></div>
            </div>
        </div>
    );
}
