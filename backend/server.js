const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "seu_segredo_jwt_aqui";

app.use(cors());
app.use(express.json());

// Caminhos dos arquivos
const dataDir = path.join(__dirname, "data");
const professionalsFile = path.join(dataDir, "professionals.json");
const usersFile = path.join(dataDir, "users.json");

// Funções utilitárias
function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(professionalsFile)) {
    fs.writeFileSync(
      professionalsFile,
      JSON.stringify({ professionals: [] }, null, 2)
    );
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify({ users: [] }, null, 2));
  }
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}

function saveJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON file:", error);
    return [];
  }
}

// Inicializa arquivos se não existirem
ensureDataFiles();

// "Banco em memória"
let { professionals } = loadJSON(professionalsFile);
let users = loadJSON(usersFile);
let nextUserId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

// ---------- Helpers de validação ----------
function validaEmailBasico(email) {
  return (
    typeof email === "string" &&
    email.includes("@") &&
    email.indexOf(" ") === -1
  );
}
function retornaSemSenha(usuario) {
  const { senha, ...rest } = usuario;
  return rest;
}

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido." });
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/professionals", (req, res) => {
  res.json(professionals);
});

app.post("/signup", async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  if (!validaEmailBasico(email)) {
    return res.status(400).json({ error: "Email inválido." });
  }
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email já cadastrado." });
  }
  const hashedPassword = await bcrypt.hash(senha, 6);
  const newUser = {
    id: nextUserId++,
    nome,
    email,
    senha: hashedPassword,
  };
  users.push(newUser);
  saveJSON(usersFile, users);
  const token = gerarToken(newUser);
  res.status(201).json({ user: retornaSemSenha(newUser), token });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Email ou senha incorretos." });
  }
  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    return res.status(400).json({ error: "Email ou senha incorretos." });
  }
  const token = gerarToken(user);
  res.json({ user: retornaSemSenha(user), token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
