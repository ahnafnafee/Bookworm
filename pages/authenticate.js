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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
                        display: "flex",
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
                        priority={true}
                    />
                </div>
                <TabContext
                    style={{
                        padding: 0,
                        margin: 0,
                        minHeight: "100%",
                    }}
                    value={value}
                >
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel
                        value="1"
                        style={{
                            padding: 0,
                            margin: 0,
                            minHeight: "100%",
                        }}
                    >
                        <div>
                            <div>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <SignUp />
                    </TabPanel>
                </TabContext>
                {/* <TabsUnstyled defaultValue={0}>
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
                </TabsUnstyled> */}
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
