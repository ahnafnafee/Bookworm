import * as React from "react";
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    Image,
} from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { NextSeo } from "next-seo";
import { IoSearch as SearchIcon, IoClose as Close } from "react-icons/io5";
import randomColor from "randomcolor";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react";
import useSWR from "swr";
import useWindowDimensions from "../hooks/useWindowDimensions";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Search() {
    const inputLeftRef = React.useRef();
    const inputRightRef = React.useRef();
    const inputRef = React.useRef();
    const [isFocused, setIsFocused] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [searched, setSearched] = React.useState(false);
    const [books, setBooks] = React.useState([]);
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([]);

    const { data: bookData, error } = useSWR(
        `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=RtVynZwGyH7I1VnAZqYiLuxE9QnIRWv4`,
        fetcher
    );

    React.useEffect(() => {
        if (bookData) setData(bookData.results.books);
    }, [bookData]);

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const handleQueryChange = (event) => setValue(event.target.value);

    const handleQuery = async (event) => {
        if (event.key === "Enter") {
            if (value.length > 0) {
                await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=15`
                ).then((response) =>
                    response.json().then((data) => {
                        setBooks(data.items);
                        setSearched(true);
                    })
                );
            }
        }
    };

    const handleGenreQuery = async (subject) => {
        await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=30`
        ).then((response) =>
            response.json().then((data) => {
                setSearched(true);
                setBooks(data.items);
                setValue(`subject:${subject}`);
            })
        );
    };

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    React.useEffect(() => {
        if (value.length > 0) {
            setShow(true);
        } else {
            setSearched(false);
            setBooks("");
            setShow(false);
        }
    }, [value.length]);

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
                locale="en_US"
                title="Search"
                description="📚 Allows the user to search for their favorite books"
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-col justify-between h-16 mt-7">
                    <div className="px-5">
                        <InputGroup>
                            <InputLeftElement
                                ref={inputLeftRef}
                                ps={3}
                                me={4}
                                w="fit-content"
                                h="full"
                                color="grey.600"
                            >
                                <SearchIcon size={20} color="#000" />
                            </InputLeftElement>
                            <Input
                                ref={inputRef}
                                height={50}
                                pr="4.5rem"
                                variant="outline"
                                onFocus={toggleFocus}
                                onBlur={toggleFocus}
                                onKeyDown={handleQuery}
                                placeholder="Search"
                                onChange={handleQueryChange}
                                value={value}
                            />
                            {show && (
                                <InputRightElement
                                    ref={inputRightRef}
                                    w="fit-content"
                                    pe={4}
                                    h="full"
                                    color="grey.600"
                                    onClick={() => {
                                        setValue("");
                                    }}
                                >
                                    <Close size={20} color="#000" />
                                </InputRightElement>
                            )}
                        </InputGroup>
                    </div>
                    {!searched && value.length < 1 && !isFocused ? (
                        <>
                            <div>
                                <div className="flex flex-col mt-4 px-5">
                                    <Text fontSize="xl" fontWeight={"bold"}>
                                        Category
                                    </Text>
                                    <div className="grid grid-rows-2 grid-flow-col gap-4 justify-between items-center mt-4">
                                        {categories.map((item) => (
                                            <div key={item}>
                                                <Button
                                                    className="flex flex-1 flex-col justify-around items-center"
                                                    style={{
                                                        height: 60,
                                                        width: 100,
                                                        backgroundColor:
                                                            randomColor({
                                                                luminosity:
                                                                    "dark",
                                                                format: "rgb",
                                                                hue: "monochrome",
                                                            }),
                                                        borderRadius: 8,
                                                        boxShadow:
                                                            "0 4px 14px 0 rgb(0 118 255 / 8%)",
                                                    }}
                                                    onClick={() => {
                                                        handleGenreQuery(item);
                                                        console.log(
                                                            `Searching ${item}`
                                                        );
                                                    }}
                                                >
                                                    <Text
                                                        color={"white"}
                                                        fontWeight={"bold"}
                                                        align={"center"}
                                                    >
                                                        {item}
                                                    </Text>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Text
                                    className="mt-6 px-5"
                                    fontSize="xl"
                                    fontWeight={"bold"}
                                >
                                    Best Sellers
                                </Text>
                                <div
                                    className="grid grid-cols-3 gap-4 justify-between mt-4 px-5"
                                    style={{
                                        maxHeight: "60vh",
                                        paddingBottom: 120,
                                        overflowY: "scroll",
                                    }}
                                >
                                    {data &&
                                        data.map(
                                            ({
                                                primary_isbn13,
                                                book_image,
                                                title,
                                                author,
                                            }) => (
                                                <div
                                                    key={primary_isbn13}
                                                    className="flex flex-1 flex-col items-center"
                                                >
                                                    <Popover autoFocus={false}>
                                                        <PopoverTrigger>
                                                            <Image
                                                                width={"30%"}
                                                                objectFit="contain"
                                                                alt="Logo"
                                                                src={book_image}
                                                                align={"center"}
                                                                className="self-center"
                                                                borderRadius={8}
                                                                fallbackSrc="https://via.placeholder.com/180x280"
                                                                style={{
                                                                    width: 90,
                                                                    height: 140,
                                                                    marginBottom: 4,
                                                                }}
                                                                onClick={() =>
                                                                    console.log(
                                                                        title
                                                                    )
                                                                }
                                                            />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverCloseButton />
                                                            <PopoverHeader
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                            >
                                                                {toTitleCase(
                                                                    title
                                                                )}
                                                            </PopoverHeader>
                                                            <PopoverBody>
                                                                by {author}
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="sm"
                                                        fontWeight={"light"}
                                                    >
                                                        {toTitleCase(title)}
                                                    </Text>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mt-4">
                            <div
                                className="flex flex-col flex-1 pt-2 mt-1 px-5"
                                style={{
                                    maxHeight: "88vh",
                                    paddingBottom: 120,
                                    overflowY: "scroll",
                                }}
                            >
                                {books &&
                                    books.map(({ id, volumeInfo }) => (
                                        <BookDetails
                                            key={id}
                                            id={id}
                                            volumeInfo={volumeInfo}
                                            isLibrary={false}
                                            isSearch={true}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const categories = [
    "Fiction",
    "Poetry",
    "Fantasy",
    "Romance",
    "Adult",
    "Mystery",
];

export default Search;
