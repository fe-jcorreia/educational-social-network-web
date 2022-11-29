import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, HStack, Link, Text, VStack } from "@chakra-ui/react";

import { Input } from "@src/components";
import { AppStrings } from "@src/strings";
import { AccountSignUpForm } from "@src/model";
import { useAuthenticate } from "@src/domain";

const strings = AppStrings.SignUp;

const signInForSchema = yup.object().shape({
  name: yup.string().required(strings.fieldsRequirements.requiredName).trim(),
  lastName: yup
    .string()
    .required(strings.fieldsRequirements.requiredLastName)
    .trim(),
  username: yup
    .string()
    .required(strings.fieldsRequirements.requiredLastName)
    .trim(),
  email: yup
    .string()
    .required(strings.fieldsRequirements.requiredEmail)
    .email(strings.fieldsRequirements.validEmail)
    .trim(),
  password: yup
    .string()
    .required(strings.fieldsRequirements.requiredPassword)
    .min(6, strings.fieldsRequirements.validPassword)
    .trim(),
});

export function SignUpCard() {
  const { register, handleSubmit, reset, formState } =
    useForm<AccountSignUpForm>({
      resolver: yupResolver(signInForSchema),
    });
  const { signUp } = useAuthenticate();

  const errors = formState.errors;

  const handleSignUp: SubmitHandler<AccountSignUpForm> = (credentials) => {
    signUp({
      name: credentials.name,
      lastName: credentials.lastName,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });

    reset();
  };

  return (
    <VStack
      as="form"
      spacing="1rem"
      alignItems="start"
      justifyContent="center"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <HStack spacing="1rem">
        <Input
          label={strings.fields.name}
          error={errors.name}
          {...register("name")}
        />
        <Input
          label={strings.fields.lastName}
          error={errors.lastName}
          {...register("lastName")}
        />
      </HStack>
      <Input
        label={strings.fields.username}
        error={errors.username}
        {...register("username")}
      />
      <Input
        type="email"
        label={strings.fields.email}
        error={errors.email}
        {...register("email")}
      />
      <Input
        label={strings.fields.password}
        type="password"
        error={errors.password}
        {...register("password")}
      />

      <Text fontSize="xs">
        {strings.termsMessage.onSignUp}{" "}
        <Link href="/">
          <u>{strings.termsMessage.terms}</u>
        </Link>{" "}
        <Link href="/">
          <u>{strings.termsMessage.privacyPolicy}</u>
        </Link>{" "}
        {strings.termsMessage.and}{" "}
        <Link href="/">
          <u>{strings.termsMessage.cookiesPolicy}</u>
        </Link>
        {strings.termsMessage.changePolicies}
      </Text>

      <Button
        w="100%"
        type="submit"
        mt="2rem"
        colorScheme="teal"
        isLoading={formState.isSubmitting}
      >
        {strings.button}
      </Button>
    </VStack>
  );
}
