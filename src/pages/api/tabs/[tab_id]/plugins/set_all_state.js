import { data } from "@/db";

export default function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { tab_id } = req.query;
      let tabDataCopy = { ...data.tabdata };
      const { state } = JSON.parse(req.body);
      tabDataCopy[tab_id].allDisabled = state;
      res.status(200).json(tabDataCopy);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
