

import { createClient } from 'redis';
import env from './env.config'; 

const redisClient = createClient({
   url: env.REDIS_URL,
 
});

redisClient.on('error', (err) => console.error(' Redis Client Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log(' Connected to Redis Cloud');
  } catch (error) {
    console.error(' Failed to connect to Redis:', error);
  }
})();

export default redisClient;


