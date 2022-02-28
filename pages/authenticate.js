import Head from "next/head";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../components/Link";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
// import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
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
        <Container>
            <Head>
                <title>Authenticate - Bookworm</title>
            </Head>
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
    );
}

export async function getServerSideProps(context) {
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    const json = await res.json();
    return {
        props: { stars: json.stargazers_count },
    };
}

export default AuthPage;
