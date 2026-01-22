const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./models/db"); // Pool da Railway

const app = express();

// ==========================
// CORS
// ==========================
const allowedOrigins = [
  "http://localhost:5173",   // Dev frontend
  process.env.FRONTEND_URL   // Frontend produção
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ==========================
// JSON Middleware
// ==========================
app.use(express.json());

// ==========================
// ROTAS
// ==========================
app.use("/api/produtos", require("./routes/produtos"));
app.use("/api/favoritos", require("./routes/favoritos"));
app.use("/api/users", require("./routes/users"));
app.use("/api/carrinho", require("./routes/carrinho"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api/contact", require("./routes/contato"));
app.use("/api/localizacao", require("./routes/localizacao"));
app.use("/api/compras", require("./routes/compras"));
app.use("/api/pagamento", require("./routes/pagamento"));
app.use("/public", express.static("public"));

// ==========================
// HEALTHCHECK
// ==========================
app.get("/health/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ==========================
// EXPORT
// ==========================
module.exports = app;
