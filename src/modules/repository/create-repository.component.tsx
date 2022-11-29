import React, { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, VStack } from "@chakra-ui/react";

import { Input, TextArea } from "@src/components";
import { CreateRepositoryForm, Repository } from "@src/model";
import { useAuthenticate, useCreateRepository } from "@src/domain";
import { AppStrings } from "@src/strings";

interface CreateRepositoryProps {
  onSetRepositories: Dispatch<SetStateAction<Repository[]>>;
  onCreationCompleted: () => void;
}

const strings = AppStrings.Repository.create;

const repositoryCreateSchema = yup.object().shape({
  title: yup.string().required(strings.requiredTitle).trim(),
  description: yup.string().trim(),
});

export function CreateRepository({
  onSetRepositories,
  onCreationCompleted,
}: CreateRepositoryProps) {
  const { createRepository } = useCreateRepository();
  const { user } = useAuthenticate();

  const { register, handleSubmit, reset, formState } =
    useForm<CreateRepositoryForm>({
      resolver: yupResolver(repositoryCreateSchema),
    });
  const errors = formState.errors;

  const handleCreateRepository: SubmitHandler<CreateRepositoryForm> = async (
    credentials
  ) => {
    const newRepository = await createRepository({
      userId: user.id,
      title: credentials.title,
      description: credentials.description,
    });

    onSetRepositories((prev) => [...prev, newRepository]);

    reset();
    onCreationCompleted();
  };

  return (
    <>
      <VStack
        as="form"
        spacing={4}
        onSubmit={handleSubmit(handleCreateRepository)}
      >
        <Input
          label={strings.fields.title}
          error={errors.title}
          {...register("title")}
        />
        <TextArea
          label={strings.fields.description}
          error={errors.description}
          {...register("description")}
        />

        <Button
          w="100%"
          type="submit"
          colorScheme="green"
          isLoading={formState.isSubmitting}
        >
          {strings.createButton}
        </Button>
      </VStack>
    </>
  );
}
