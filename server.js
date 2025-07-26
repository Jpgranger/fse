import app from './app.js';
import db from './db/client.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
