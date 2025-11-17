import dotenv from "dotenv";
import { createClient } from "redis";
import { config } from "../../../shared/config";

dotenv.config();

const redisClient = createClient({
  url: config.redis.URL,
  socket: {
    reconnectStrategy(retries) {
      console.log("🔄 Redis reconnecting attempt:", retries);
      return Math.min(1000 * retries, 5000); // backoff
    },
    keepAlive: true, // helps prevent idle disconnect
  },
});

// ERROR HANDLER
redisClient.on("error", (err) => {
  console.error("❌ Redis client Error:", err);
});

// CONNECT
(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully");
  } catch (err) {
    console.error("❌ Redis initial connection failed:", err);
  }
})();

export default redisClient;
