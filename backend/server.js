const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const pool = require("./models/db"); // Importa o pool da Railway

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas do seu backend
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

// Rota de teste da conexão com banco
app.get("/health/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ⚠️ Para Vercel, exporta o app em vez de usar app.listen()
module.exports = app;
