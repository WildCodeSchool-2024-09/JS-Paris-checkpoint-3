// src/server.ts

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`Server is running on port ${PORT}`);
});
