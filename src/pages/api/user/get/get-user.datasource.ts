import { api } from "@src/services";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    const { data } = await api.get(`/user/email/${email}`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
}
