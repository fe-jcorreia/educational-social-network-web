import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiBuildings, BiCheck, BiDetail, BiUser } from "react-icons/bi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProfileFormData, UserData } from "@src/model";
import { useAuthenticate, useUpdateUser } from "@src/domain/account";
import { AppStrings } from "@src/strings";
import { Input } from "@src/components";
import { ProfileDescriptionStatic } from "./profile-description-static";

interface ProfileDescriptionProps {
  userData: UserData;
}

const profileStrings = AppStrings.Profile;

const profileEditSchema = yup.object().shape({
  name: yup
    .string()
    .required(profileStrings.profileRequirements.requiredName)
    .trim(),
  description: yup.string().trim(),
  career: yup.string().trim(),
  city: yup.string().trim(),
  state: yup.string().trim(),
  country: yup.string().trim(),
});

export const ProfileDescription = (props: ProfileDescriptionProps) => {
  const { user } = useAuthenticate();
  const { updateUser } = useUpdateUser();

  const [onEdit, setOnEdit] = React.useState(false);
  const [profile, setProfile] = React.useState<UserData>(props.userData);

  const { register, handleSubmit, formState } = useForm<EditProfileFormData>({
    resolver: yupResolver(profileEditSchema),
  });
  const errors = formState.errors;

  const handleEditUserData: SubmitHandler<EditProfileFormData> = async (
    credentials
  ) => {
    const response = await updateUser({ id: user?.id, ...credentials });

    setProfile(response);
    setOnEdit(false);
  };

  return (
    <>
      {!onEdit ? (
        <ProfileDescriptionStatic
          userData={profile}
          edit={onEdit}
          onEdit={setOnEdit}
        />
      ) : (
        <VStack
          py="3rem"
          px="4rem"
          w="100%"
          spacing={4}
          alignItems="left"
          as="form"
          onSubmit={handleSubmit(handleEditUserData)}
        >
          <Avatar size="2xl" mb="1rem" name={profile.name} alignSelf="center" />
          <Box>
            <Input
              variant="flushed"
              placeholder={profileStrings.profilePlaceholder.name}
              icon={BiUser}
              value={profile.name}
              error={errors.name}
              {...register("name")}
            />
            <Text size="md" mt="1rem">
              {profile.nickname}
            </Text>
          </Box>
          <Input
            variant="flushed"
            placeholder={profileStrings.profilePlaceholder.description}
            icon={BiDetail}
            value={profile.description}
            error={errors.description}
            {...register("description")}
          />
          <VStack spacing={1} align="left" fontWeight={600}>
            <Flex align="center">
              <Input
                variant="flushed"
                placeholder={profileStrings.profilePlaceholder.career}
                value={profile.career}
                icon={BiBuildings}
                error={errors.career}
                {...register("career")}
              />
            </Flex>
            <Flex align="center">
              <Input
                variant="flushed"
                placeholder={profileStrings.profilePlaceholder.city}
                value={profile.location.city}
                icon={HiOutlineLocationMarker}
                error={errors.location?.city}
                {...register("location.city")}
              />
            </Flex>
            <Flex align="center">
              <Input
                variant="flushed"
                placeholder={profileStrings.profilePlaceholder.state}
                value={profile.location.state}
                icon={HiOutlineLocationMarker}
                error={errors.location?.state}
                {...register("location.state")}
              />
              <Input
                variant="flushed"
                placeholder={profileStrings.profilePlaceholder.country}
                value={profile.location.country}
                icon={HiOutlineLocationMarker}
                error={errors.location?.country}
                {...register("location.country")}
              />
            </Flex>
            <Flex align="center">
              <Icon mr="0.25rem" as={HiOutlineMail} />
              <Text justifyContent="center">{profile.email}</Text>
            </Flex>
          </VStack>
          {user?.nickname === profile.nickname && (
            <Button
              w="25%"
              type="submit"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
            >
              <Icon mr="0.5rem" as={BiCheck} /> Salvar
            </Button>
          )}
        </VStack>
      )}
    </>
  );
};
