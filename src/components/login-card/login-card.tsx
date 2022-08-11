import { Button, Link, Text, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiLock, FiMail } from "react-icons/fi";
import { Input } from "../input/input";

type LoginAccountFormData = {
  email: string;
  password: string;
};

const signInForSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Precisa ser um email válido")
    .trim(),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .trim(),
});

export function LoginCard() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(signInForSchema),
  });
  const errors = formState.errors;

  const handleLogin: SubmitHandler<LoginAccountFormData> = (credentials) => {
    console.log(credentials);

    reset();
  };

  return (
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
        label="Email*"
        icon={FiMail}
        error={errors.email}
        {...register("email")}
      />
      <Input
        label="Senha*"
        type="password"
        icon={FiLock}
        error={errors.password}
        {...register("password")}
      />

      <Text fontSize="xs">
        <Link href="/">
          <u>Esqueci minha senha</u>
        </Link>
      </Text>

      <Button
        w="100%"
        type="submit"
        mt="2rem"
        colorScheme="teal"
        isLoading={formState.isSubmitting}
      >
        Entrar
      </Button>
      <Button w="100%" variant="outline" mt="2rem" colorScheme="teal">
        Criar nova conta
      </Button>
    </VStack>
  );
}
