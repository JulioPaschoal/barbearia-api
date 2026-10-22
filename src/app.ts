import express from "express";

// CRIAR A APLICAÇÃO EXPRESS \\
const app = express();

// MIDDLEWARES; fazer o express entender corpo de requisição JSON \\
app.use(express.json());

//
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export { app };
