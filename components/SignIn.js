import * as React from "react";
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";

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
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <InputGroup className="my-4" size="md">
                    <Input
                        height={50}
                        pr="4.5rem"
                        type={"email"}
                        placeholder="Email"
                    />
                </InputGroup>
                <InputGroup className="my-4" size="md">
                    <Input
                        height={50}
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
                    />
                    <InputRightElement height={50} width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </div>
            <div className="flex flex-col flex-1 mt-12">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{
                        backgroundColor: "black",
                        borderRadius: 8,
                        color: "white",
                        height: 60,
                    }}
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
}
