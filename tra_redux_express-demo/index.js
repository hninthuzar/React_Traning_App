const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const customers = [
  { id: 1, name: "Aung Aung", phone: "09848343", address: "afjaljflafjlaf" },
  { id: 2, name: "Phyu Phyu", phone: "06756789", address: "wertyui" },
  { id: 3, name: "Hla Hla", phone: "099123456", address: "poiuytre" },
];

const items = [
  { item_id: 1, item_name: "item1", qty: 10, unit: "pcs" },
  { item_id: 2, item_name: "item2", qty: 20, unit: "pcs" },
  { item_id: 3, item_name: "item3", qty: 30, unit: "box" },
  { item_id: 4, item_name: "item4", qty: 40, unit: "box" },
  { item_id: 5, item_name: "item5", qty: 50, unit: "doz" },
];

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.post("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/items", (req, res) => {
  res.send(items);
});

app.post("/api/items", (req, res) => {
  res.send(items);
});

app.listen(3099, () => console.log("listening on port 3099...."));
