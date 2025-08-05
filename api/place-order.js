// File: api/place-order.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { side, symbol, current_price, qty } = req.body;

  console.log("Webhook received:", { side, symbol, current_price, qty });

  // Forward this to local MT5 bridge
  try {
    const response = await fetch('http://localhost:8000/execute-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ side, symbol, price: current_price, qty })
    });

    const result = await response.json();
    return res.status(200).json({ message: "Order forwarded", result });
  } catch (err) {
    return res.status(500).json({ message: "Failed to forward order", error: err.message });
  }
}
