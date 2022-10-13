import { api } from "@src/services";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
  name: string;
  description: string;
  birthday: string;
  avatar: string;
}

interface CreateUserDatasource {
  data?: User;
  error?: {
    message: string;
  };
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateUserDatasource>
) {
  try {
    const { input } = req.body;
    const user: User = await api.post("/user/create", {
      input: {
        ...input,
        description: "",
        birthday: "02/02/2000",
        avatar: "avatar.com",
      },
    });
    // console.log(JSON.stringify(user));
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
}
