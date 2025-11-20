const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Caminhos dos arquivos
const dataDir = path.join(__dirname, "data");
const professionalsFile = path.join(dataDir, "professionals.json");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/professionals", (req, res) => {
  res.json(professionals);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
