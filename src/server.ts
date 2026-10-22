import { app } from "./app";

const PORT = 3333;

// INICIAR O SERVIDOR \\
app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
