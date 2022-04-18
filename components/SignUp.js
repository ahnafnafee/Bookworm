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
import { useToast } from "@chakra-ui/react";
import { supabaseClient } from "../lib/client";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [show, setShow] = React.useState(false);
    const [error, setError] = useState(null);
    const handleClick = () => setShow(!show);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const toast = useToast();

    const toastMsg = (desc) => {
        return toast({
            title: "Failed",
            description: desc,
            status: "error",
            duration: 1000,
            isClosable: true,
        });
    };

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
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                .matches(
                    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                    "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
                )
                .required("Required"),
        }),
        async onSubmit(values, formikActions) {
            try {
                const { error } = await supabaseClient.auth.signUp(
                    {
                        email: values.email,
                        password: values.password,
                    },
                    {
                        data: {
                            first_name: values.name,
                        },
                    }
                );
                if (error) {
                    toastMsg(error.message);
                    console.log(error);
                } else {
                    setIsSubmitted(true);
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        },
    });

    const isDisabled = () => {
        return !(isValid && dirty) || isSubmitting;
    };

    return (
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <FormControl
                    isInvalid={Boolean(errors.name)}
                    isRequired
                    className="my-4"
                    size="md"
                >
                    <FormLabel htmlFor="email">First Name</FormLabel>
                    <InputGroup size="md">
                        <Input
                            height={50}
                            pr="4.5rem"
                            type={"name"}
                            errorBorderColor="red.300"
                            placeholder="First Name"
                            onChange={handleChange("name")}
                            autoComplete={"name"}
                            value={values.name}
                            isInvalid={Boolean(errors.name)}
                        />
                    </InputGroup>
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={Boolean(errors.email)}
                    isRequired
                    className="my-4"
                    size="md"
                >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <InputGroup size="md">
                        <Input
                            height={50}
                            pr="4.5rem"
                            type={"email"}
                            errorBorderColor="red.300"
                            placeholder="Email"
                            onChange={handleChange("email")}
                            autoComplete={"email"}
                            value={values.email}
                            isInvalid={Boolean(errors.email)}
                        />
                    </InputGroup>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={Boolean(errors.password)}
                    isRequired
                    className="my-4"
                >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            height={50}
                            pr="4.5rem"
                            errorBorderColor="red.300"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange("password")}
                            value={values.password}
                            isInvalid={Boolean(errors.password)}
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
                    Sign Up
                </Button>
            </div>
        </div>
    );
}
