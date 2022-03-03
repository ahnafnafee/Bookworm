import * as React from "react";
import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    Text,
} from "@chakra-ui/react";
import { IoArrowBack as ArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Settings() {
    const router = useRouter();

    const values = {
        name: "Alyssa",
        email: "alyssa@gmail.com",
    };

    return (
        <div className="flex h-full w-screen">
            <NextSeo
                locale="en_US"
                title="Settings"
                description="📚 Allows access to settings for the logged-in user"
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-row justify-between items-center content-center my-7 px-5">
                    <IconButton
                        aria-label="wishlist"
                        icon={<ArrowBack size={20} color="#000" />}
                        variant="outline"
                        onClick={() => {
                            console.log("Go Back");
                            router.back();
                        }}
                    />
                </div>

                <Text className="px-5" fontSize="xl" fontWeight={"semibold"}>
                    Settings
                </Text>

                <div className="flex flex-col flex-1 px-5 pt-2 mt-1">
                    <FormControl className="my-4" size="md">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <InputGroup size="md">
                            <Input
                                height={50}
                                pr="4.5rem"
                                type={"name"}
                                placeholder="Name"
                                readOnly
                                value={values.name}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl className="my-4" size="md">
                        <FormLabel htmlFor="email">Email address</FormLabel>
                        <InputGroup size="md">
                            <Input
                                height={50}
                                pr="4.5rem"
                                type={"email"}
                                placeholder="Email"
                                readOnly
                                value={values.email}
                            />
                        </InputGroup>
                    </FormControl>
                </div>
                <div
                    className="flex flex-col flex-1 mt-12 px-5"
                    style={{
                        paddingBottom: 120,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{
                            backgroundColor: "black",
                            borderRadius: 8,
                            color: "white",
                            height: 60,
                        }}
                        onClick={() => {
                            router.push("/authenticate");
                            console.log("Logout");
                        }}
                    >
                        Sign Out
                    </Button>
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
