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
const recommendationsFile = path.join(dataDir, "recommendations.json");
const messagesFile = path.join(dataDir, "messages.json");

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
  if (!fs.existsSync(recommendationsFile)) {
    fs.writeFileSync(
      recommendationsFile,
      JSON.stringify({ recommendations: [] }, null, 2)
    );
  }
  if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, JSON.stringify({ messages: [] }, null, 2));
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
let recommendations = loadJSON(recommendationsFile);
let messages = loadJSON(messagesFile);

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

app.post("/recommend/:professionalId", autenticarToken, (req, res) => {
  const professionalId = parseInt(req.params.professionalId);
  const userId = req.user.id;

  const professional = professionals.find((p) => p.id === professionalId);
  if (!professional) {
    return res.status(404).json({ error: "Profissional não encontrado." });
  }

  // procura recomendação existente
  const existing = recommendations.find(
    (r) => r.professionalId === professionalId && r.userId === userId
  );

  let recommended;

  if (existing) {
    // remover recomendação (toggle)
    const index = recommendations.indexOf(existing);
    recommendations.splice(index, 1);
    recommended = false;
  } else {
    // adicionar recomendação
    recommendations.push({ professionalId, userId });
    recommended = true;
  }

  // salvar no arquivo JSON
  saveJSON(recommendationsFile, recommendations);

  // total de recomendações desse profissional
  const total = recommendations.filter(
    (r) => r.professionalId === professionalId
  ).length;

  return res.json({
    professionalId,
    recommended,
    total,
  });
});

app.get("/my-recommendations", autenticarToken, (req, res) => {
  const userId = req.user.id;

  const myRecs = recommendations
    .filter((r) => r.userId === userId)
    .map((r) => r.professionalId);

  res.json({ myRecommendations: myRecs });
});

app.post("/send-message", (req, res) => {
  const { professionalId, userId, content } = req.body;

  if (!professionalId || !userId || !content) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  let messages = [];

  if (fs.existsSync(messagesFile)) {
    messages = JSON.parse(fs.readFileSync(messagesFile));
  }

  const newMessage = {
    id: Date.now(),
    professionalId,
    userId,
    content,
    date: new Date().toISOString(),
  };

  messages.push(newMessage);

  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  res.json({ success: true, message: "Mensagem salva!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
