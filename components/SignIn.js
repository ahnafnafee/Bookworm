import * as React from "react";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/clerk-react";
import { supabaseClient } from "../lib/client";

export default function SignIn() {
    const router = useRouter();
    const [show, setShow] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const handleClick = () => setShow(!show);

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
        values,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                // TODO: Will be added during prod
                // .matches(
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                //     "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
                // )
                .required("Required"),
        }),
        async onSubmit(values, formikActions) {
            console.log(values);
            try {
                const { user, session, error } =
                    await supabaseClient.auth.signIn({
                        email: values.email,
                        password: values.password,
                    });
                if (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
            // router.push("/library");
        },
    });

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const isDisabled = () => {
        return !(isValid && dirty) || isSubmitting;
    };

    return (
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <FormControl isRequired className="my-4" size="md">
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <InputGroup size="md">
                        <Input
                            isInvalid={Boolean(errors.email)}
                            height={50}
                            pr="4.5rem"
                            type={"email"}
                            errorBorderColor="red.300"
                            placeholder="Email"
                            onChange={handleChange("email")}
                            autoComplete={"email"}
                            value={values.email}
                            onFocus={toggleFocus}
                            onBlur={toggleFocus}
                        />
                    </InputGroup>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired className="my-4">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            isInvalid={Boolean(errors.password)}
                            height={50}
                            pr="4.5rem"
                            errorBorderColor="red.300"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange("password")}
                            value={values.password}
                            onFocus={toggleFocus}
                            onBlur={toggleFocus}
                        />
                        <InputRightElement height={50} width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
            </div>
            <div
                className="flex flex-col flex-1 mt-12"
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
                    onClick={handleSubmit}
                    isDisabled={isDisabled()}
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
}
