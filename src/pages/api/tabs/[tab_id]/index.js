import { data } from "@/db";

export default function handler(req, res) {
  res.status(200).json({ tabdata: data.tabdata });
}
