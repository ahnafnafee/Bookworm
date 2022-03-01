import * as React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        // <ThemeProvider theme={theme}>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "50vh",
            }}
            // component="form"
            // onSubmit={handleSubmit}
            // noValidate
        >
            <div>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </div>
        // </ThemeProvider>
    );
}
