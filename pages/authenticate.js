import * as React from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { NextSeo } from "next-seo";
import { ClerkLoaded } from "@clerk/clerk-react";

function AuthPage(props) {
    return (
        <ClerkLoaded>
            <div className="flex h-full">
                <NextSeo
                    locale="en_US"
                    title="Authenticate"
                    description="📚 Authenticates users ot use Bookworm"
                />
                <div className="flex flex-col flex-1 min-w-0">
                    <Flex
                        alignItems={"center"}
                        justifyContent="center"
                        className="mt-11"
                        direction={"column"}
                    >
                        <Image
                            width={"70%"}
                            objectFit="contain"
                            alt="Logo"
                            src="/images/bookworm-logo.png"
                            align={"center"}
                        />
                        <Text
                            className="mt-8"
                            height={20}
                            align={"center"}
                            as="i"
                            noOfLines={[2, 3]}
                        >
                            Search and store all your <br />
                            books without a worry
                        </Text>
                    </Flex>
                    <div className="px-5">
                        <Tabs isFitted variant="unstyled">
                            <TabList
                                mb="1em"
                                style={{
                                    backgroundColor: "black",
                                    borderRadius: 8,
                                    color: "white",
                                    padding: 4,
                                }}
                            >
                                <Tab
                                    _selected={{
                                        color: "black",
                                        bg: "white",
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                    }}
                                    fontWeight={"bold"}
                                >
                                    Sign In
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: "black",
                                        bg: "white",
                                        borderRadius: 8,
                                    }}
                                    fontWeight={"bold"}
                                >
                                    Sign Up
                                </Tab>
                            </TabList>
                            <TabPanels className="h-full" flex="1 1 auto">
                                <TabPanel
                                    flex={1}
                                    padding={0}
                                    height="100%"
                                    className="p-0 m-0 h-full"
                                >
                                    <SignIn />
                                </TabPanel>
                                <TabPanel
                                    flex={1}
                                    padding={0}
                                    height="100%"
                                    className="p-0 m-0 h-full"
                                >
                                    <SignUp />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </div>
        </ClerkLoaded>
    );
}

export default AuthPage;
