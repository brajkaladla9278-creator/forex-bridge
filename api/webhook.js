
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log("Received webhook data:", data);
    res.status(200).json({ status: "Success", received: data });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
