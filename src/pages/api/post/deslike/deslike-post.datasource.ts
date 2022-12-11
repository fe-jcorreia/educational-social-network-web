import { api } from "@src/services";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { input } = req.body;
    await api.post("/post/deslike", { input });
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
}
