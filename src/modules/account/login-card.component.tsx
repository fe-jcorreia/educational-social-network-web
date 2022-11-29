import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiLock, FiMail } from "react-icons/fi";

import { Input } from "@src/components";
import { SignUpCard } from "./signup-card.component";
import { AppStrings } from "@src/strings";
import { AccountLoginForm } from "@src/model";
import { useAuthenticate } from "@src/domain";

const strings = AppStrings.Login;
const signUpStrings = AppStrings.SignUp;

const signInForSchema = yup.object().shape({
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

export function LoginCard() {
  const { register, handleSubmit, reset, formState } =
    useForm<AccountLoginForm>({
      resolver: yupResolver(signInForSchema),
    });

  const { login } = useAuthenticate();

  const errors = formState.errors;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleLogin: SubmitHandler<AccountLoginForm> = (credentials) => {
    login({ email: credentials.email, password: credentials.password });

    reset();
  };

  return (
    <>
      <VStack
        as="form"
        p="2rem"
        w="50%"
        spacing="1rem"
        alignItems="start"
        justifyContent="center"
        bgColor="white"
        borderRadius="5px"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Input
          type="email"
          label={strings.fields.email}
          icon={FiMail}
          error={errors.email}
          {...register("email")}
        />
        <Input
          type="password"
          label={strings.fields.password}
          icon={FiLock}
          error={errors.password}
          {...register("password")}
        />

        <Text fontSize="xs">
          <Link href="/">
            <u>{strings.forgotPassword}</u>
          </Link>
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
        <Button
          w="100%"
          variant="outline"
          mt="2rem"
          colorScheme="teal"
          onClick={onOpen}
        >
          {strings.buttonSecondary}
        </Button>
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="3xl">
            {signUpStrings.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignUpCard />
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
