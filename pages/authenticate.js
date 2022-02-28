import Head from "next/head";
import * as React from "react";
import Container from "@mui/material/Container";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import BottomNav from "../components/BottomNav";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {
    CustomTab,
    CustomTabPanel,
    CustomTabsList,
} from "../components/CustomTab";
import Image from "next/image";

function AuthPage(props) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container
            style={{
                padding: 0,
                flex: 1,
                display: "flex",
            }}
        >
            <Head>
                <title>Authenticate - Bookworm</title>
            </Head>
            <Container>
                <div
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        marginTop: 80,
                        marginBottom: 50,
                    }}
                >
                    <Image
                        alt="Mountains"
                        src="/images/bookworm-logo.png"
                        layout="responsive"
                        width={"200"}
                        height={"30vh"}
                        objectFit="contain"
                    />
                </div>
                <TabsUnstyled defaultValue={0}>
                    <CustomTabsList>
                        <CustomTab>Sign In</CustomTab>
                        <CustomTab>Sign Up</CustomTab>
                    </CustomTabsList>
                    <CustomTabPanel value={0}>
                        <SignIn />
                    </CustomTabPanel>
                    <CustomTabPanel value={1}>
                        <SignUp />
                    </CustomTabPanel>
                </TabsUnstyled>
            </Container>
            <BottomNav name="library" />
            <style jsx global>{`
                html,
                body {
                    margin: 0;
                    font-family: Poppins, Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
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
