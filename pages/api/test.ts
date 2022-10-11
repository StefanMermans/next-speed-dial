import { NextApiRequest, NextApiResponse } from "next";

let count = 0;

export default function test(req: NextApiRequest, res: NextApiResponse) {
  res.send(++count);
}
