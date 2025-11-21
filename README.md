# 📘 ProNetwork -- Conectando Talentos Globais

Bem-vindo ao **ProNetwork**, uma plataforma web profissional inspirada
no LinkedIn e desenvolvida como parte da atividade acadêmica sobre
**Futuro do Trabalho**.

O projeto simula uma rede social onde usuários podem **explorar
profissionais**, visualizar informações completas em **modais
interativos**, **recomendar talentos**, **enviar mensagens**, filtrar
perfis e realizar ações apenas quando autenticados.

O sistema foi desenvolvido utilizando **React + Vite + TailwindCSS**,
com um backend em **Node.js + Express**, persistindo dados em arquivos
JSON.

Este projeto foi desenvolvido como parte da Global Solution 2025 da FIAP, 
integrando as disciplinas de Front-End Design e Web Development do curso de 
Engenharia de Software. O objetivo da solução é aplicar conceitos modernos 
de desenvolvimento web, design responsivo, usabilidade e integração de dados, 
resultando em uma plataforma funcional e alinhada aos desafios reais do mercado tecnológico.

------------------------------------------------------------------------

## 🚀 Resumo do Projeto

O **ProNetwork** é uma SPA moderna, responsiva e interativa, que tem
como objetivo conectar talentos e incentivar a colaboração entre
profissionais de diferentes áreas.

A aplicação permite:

-   Listagem de mais de **60 profissionais fictícios**
-   Filtros por **área, cidade, tecnologia e habilidades**
-   Busca avançada por nome, cargo ou tecnologia
-   Modal detalhado com informações completas
-   Sistema de **recomendações**
-   **Envio de mensagens**
-   Página exclusiva com **mensagens enviadas**
-   Login e cadastro com autenticação via **JWT**
-   Senhas protegidas com **bcrypt**
-   Armazenamento dos dados em arquivos JSON
-   Dark mode
-   Layout moderno com TailwindCSS

------------------------------------------------------------------------

## 🧩 Tecnologias Utilizadas

### Frontend

-   React 19
-   React Router DOM
-   Vite
-   TailwindCSS 4
-   Lucide Icons
-   SweetAlert2

### Backend

-   Node.js
-   Express
-   CORS
-   Bcrypt
-   JSON Web Token
-   Nodemon

### Armazenamento

- Simples e funcional, utilizando arquivos JSON:
  - users.json
  - professionals.json
  - messages.json
  - recommendations.json

------------------------------------------------------------------------

## 👤 Usuários de Teste
Para facilitar a correção, o projeto já inclui usuários cadastrados:

    Email: pedro@example.com
    Senha: 123456
    
Você pode criar novos usuários na tela de Cadastro.
------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    /pro-network
      ├── backend
      │    ├── data
      │    ├── server.js
      ├── frontend
           ├── src
           └── public

------------------------------------------------------------------------

## 🛠 Instalação
Siga os passos para rodar o projeto na sua máquina:

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/pedrofaleirosss/pro-network.git
cd pro-network
```

### 🖥️ 2. Instalar e iniciar o Backend

```bash
cd backend
npm install
npm run dev
```

O servidor iniciará em:

```
http://localhost:3000
```

🌐 3. Instalar e iniciar o Frontend

Abra um novo terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

------------------------------------------------------------------------

## ✨ Funcionalidades Principais

- 🔍 Exploração de profissionais
  - Listagem com mais de 60 profissionais
  - Cards com nome, cargo, cidade e skills
  - Fotos estilizadas
  - Filtros inteligentes

- Perfil Detalhado (Modal)
  - Informações pessoais
  - Formação acadêmica
  - Experiências
  - Hard Skills e Soft Skills
  - Hobbies
  - Ações:
    - ⭐ Recomendar profissional
    - 💬 Enviar mensagem

- ⭐ Recomendações
  - Apenas usuários logados podem recomendar
  - Evita recomendação duplicada
  - Armazenado em recommendations.json

- 💬 Mensagens
  - Envio de mensagens personalizadas
  - Salvas com:
    - ID do remetente
    - ID do profissional
    - Conteúdo
    - Data/hora
  - Página exclusiva “Minhas Mensagens”
 
- 🔐 Autenticação
  - Login + Cadastro
  - Proteção JWT
  - Senhas criptografadas com bcrypt
  - Somente usuários autenticados podem interagir
 
- 🌓 Dark Mode
  - Toggler no header
  - Persistência visual suave e moderna

------------------------------------------------------------------------

## 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/585f546a-76f9-4731-830f-19980577fed4" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80957995-7bbb-4796-8d7c-dc87d9fe462f" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/914ca7f2-312b-407a-9900-72b310c2221b" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a4f4504a-6fc3-4274-b968-e90f77bea060" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/22215f68-576c-4478-acac-18a4b4474fe3" />

<img width="1910" height="1079" alt="image" src="https://github.com/user-attachments/assets/5941ec57-7f29-4cdd-8bb1-110ace90c541" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0319ff0f-e96d-4fee-8122-f9b574ea310a" />

------------------------------------------------------------------------

## 🔗 Link do Repositório

[https://github.com/pedrofaleirosss/pro-network.git](https://github.com/pedrofaleirosss/pro-network.git)

------------------------------------------------------------------------

## 👥 Autor

Desenvolvido por [Pedro Faleiros](https://github.com/pedrofaleirosss) - RM: 562523
