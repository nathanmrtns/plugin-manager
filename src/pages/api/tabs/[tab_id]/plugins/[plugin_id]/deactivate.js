import { data } from "@/db";

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { tab_id, plugin_id } = req.query;
      let tabDataCopy = { ...data.tabdata };
      tabDataCopy[tab_id].active = tabDataCopy[tab_id].active.filter(
        (plugin) => plugin !== plugin_id
      );
      tabDataCopy[tab_id].inactive.push(plugin_id);
      res.status(200).json(tabDataCopy);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
