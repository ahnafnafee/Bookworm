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
import { Search as SearchIcon, Close } from "react-ionicons";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Search() {
    const inputLeftRef = React.useRef();
    const inputRightRef = React.useRef();
    const [isFocused, setIsFocused] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log("Queried");
        }
    };

    const {
        touched,
        errors,
        getFieldProps,
        validateForm,
        isValid,
        dirty,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm,
        values,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            query: "",
        },
        validationSchema: Yup.object().shape({
            query: Yup.string().required("Required"),
        }),
        async onSubmit(values, formikActions) {
            console.log(values);
        },
    });

    React.useEffect(() => {
        if (values.query.length > 0) setShow(true);
        else setShow(false);
    }, [values.query.length]);

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
                <div className="flex flex-col justify-between h-16 mt-7 px-5">
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
                            onChange={handleChange("query")}
                            value={values.query}
                        />
                        {show && (
                            <InputRightElement
                                ref={inputRightRef}
                                w="fit-content"
                                pe={4}
                                h="full"
                                color="grey.600"
                                onClick={() => {
                                    resetForm();
                                }}
                            >
                                <Close size="20" color="#000" />
                            </InputRightElement>
                        )}
                    </InputGroup>
                    <div className="flex flex-col mt-4">
                        <Text fontSize="xl" fontWeight={"bold"}>
                            Category
                        </Text>
                    </div>
                </div>

                <div className="flex flex-col flex-1 px-5 pt-2 mt-1"></div>
            </div>
        </div>
    );
}
