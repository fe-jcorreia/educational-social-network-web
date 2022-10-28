import { Location, UserData } from "@src/model";
import { nextApi } from "@src/services";

interface UseAuthenticate {
  updateUser: (data: UpdateUserData) => Promise<UserData>;
}

interface UpdateUserData {
  id?: string;
  name: string;
  location: Location;
  description: string;
}

export const useUpdateUser = (): UseAuthenticate => {
  const updateUser = async ({
    id,
    name,
    location,
    description,
  }: UpdateUserData): Promise<UserData> => {
    const { data } = await nextApi.post("/user/update", {
      input: {
        id,
        name,
        city: location.city,
        state: location.state,
        country: location.country,
        description,
      },
    });

    return {
      nickname: data.nickname,
      name: data.name,
      description: data.description,
      email: data.email,
      career: data.career,
      location: {
        city: data.city,
        state: data.state,
        country: data.country,
      },
    };
  };

  return { updateUser };
};
