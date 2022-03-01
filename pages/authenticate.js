import * as React from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
} from "@chakra-ui/react";
import Head from "next/head";

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
                <Tabs isFitted variant="unstyled">
                    <TabList mb="1em">
                        <Tab
                            _selected={{
                                color: "white",
                                bg: "black",
                            }}
                        >
                            Sign In
                        </Tab>
                        <Tab
                            _selected={{
                                color: "white",
                                bg: "black",
                            }}
                        >
                            Sign Up
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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
