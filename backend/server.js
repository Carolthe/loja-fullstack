// módulos
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// rotas
app.use("/api/produtos", require("./routes/produtos"))
app.use("/api/favoritos", require("./routes/favoritos"))
app.use("/api/users", require("./routes/users"))
app.use("/api/carrinho", require("./routes/carrinho"))
app.use("/api/newsletter", require("./routes/newsletter"))
app.use("/api/categorias", require("./routes/categorias"))
app.use("/api/contact", require("./routes/contato"))
app.use("/api/localizacao", require("./routes/localizacao"))
app.use("/api/compras", require("./routes/compras"))
app.use("/api/pagamento", require("./routes/pagamento"))
app.use("/public", express.static("public"))

// servidor
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
