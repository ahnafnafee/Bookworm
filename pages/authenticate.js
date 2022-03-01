import * as React from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Image,
} from "@chakra-ui/react";
import Head from "next/head";
import SignIn from "../components/SignIn";
// import Image from "next/image";

function AuthPage(props) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="flex">
            <Head>
                <title>Authenticate - Bookworm</title>
            </Head>
            <div className="flex flex-col flex-1 min-w-0">
                {/* <Image
                    alt="Mountains"
                    src="/images/bookworm-logo.png"
                    layout="responsive"
                    width={"200"}
                    height={"30vh"}
                    objectFit="contain"
                /> */}
                <Flex
                    alignItems={"center"}
                    justifyContent="center"
                    className="my-11"
                >
                    <Image
                        boxSize="70%"
                        objectFit="contain"
                        alt="Logo"
                        src="/images/bookworm-logo.png"
                        align={"center"}
                    />
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
                                fontWeight: "bold",
                            }}
                        >
                            <Tab
                                _selected={{
                                    color: "black",
                                    bg: "white",
                                    borderRadius: 8,
                                }}
                            >
                                Sign In
                            </Tab>
                            <Tab
                                _selected={{
                                    color: "black",
                                    bg: "white",
                                    borderRadius: 8,
                                }}
                            >
                                Sign Up
                            </Tab>
                        </TabList>
                        <TabPanels flex="1 1 auto">
                            <TabPanel padding={0} className="p-0 m-0">
                                <SignIn />
                            </TabPanel>
                            <TabPanel padding={0} className="p-0 m-0">
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

// export async function getServerSideProps(context) {
//     const res = await fetch("https://api.github.com/repos/vercel/next.js");
//     const json = await res.json();
//     return {
//         props: { stars: json.stargazers_count },
//     };
// }

export default AuthPage;
