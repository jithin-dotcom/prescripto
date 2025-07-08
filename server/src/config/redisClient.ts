

// // // using StackExchange.Redis;

// // // public class ConnectBasicExample
// // // {

// // //     public void run()
// // //     {
// // //         var muxer = ConnectionMultiplexer.Connect(
// // //             new ConfigurationOptions{
// // //                 EndPoints= { {"redis-19634.crce206.ap-south-1-1.ec2.redns.redis-cloud.com", 19634} },
// // //                 User="default",
// // //                 Password="eQaHd3ypbGwHvMoX6ESYrled3rVVZymQ"
// // //             }
// // //         );
// // //         var db = muxer.GetDatabase();
        
// // //         db.StringSet("foo", "bar");
// // //         RedisValue result = db.StringGet("foo");
// // //         Console.WriteLine(result); // >>> bar
        
// // //     }
// // // }


// // import { createClient } from 'redis';
// // import dotenv from 'dotenv';

// // dotenv.config();

// // const redisClient = createClient({
// //   socket: {
// //     host: process.env.REDIS_HOST!,
// //     port: Number(process.env.REDIS_PORT),
// //     tls: true,
// //   },
// //   password: process.env.REDIS_PASSWORD,
// // });

// // redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

// // (async () => {
// //   await redisClient.connect();
// //   console.log('✅ Connected to Redis Cloud');
// // })();

// // export default redisClient;







// import { createClient } from 'redis';
// import dotenv from 'dotenv';

// dotenv.config();


// function getEnv(name: string): string {
//   const value = process.env[name];
//   if (!value) {
//     throw new Error(` Missing required environment variable: ${name}`);
//   }
//   return value;
// }

// const redisClient = createClient({
//   socket: {
//     host: getEnv('REDIS_HOST'),
//     port: Number(getEnv('REDIS_PORT')),
//     tls: true,
//   },
//   password: getEnv('REDIS_PASSWORD'),
// });

// redisClient.on('error', (err) => console.error(' Redis Client Error:', err));

// (async () => {
//   try {
//     await redisClient.connect();
//     console.log(' Connected to Redis Cloud');
//   } catch (error) {
//     console.error(' Failed to connect to Redis:', error);
//   }
// })();

// export default redisClient;





import { createClient } from 'redis';
import env from './env.config'; 

const redisClient = createClient({
   url: env.REDIS_URL,
  // socket: {
  //   host: env.REDIS_HOST,
  //   port: Number(env.REDIS_PORT),
  //   tls: true,
  // },
  // password: env.REDIS_PASSWORD,
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



// import { createClient } from 'redis';
// import env from './env.config';

// const redisClient = createClient({
//   url: env.REDIS_URL, // example: rediss://default:abc123@redis-12345.c99.us-east-1-4.ec2.cloud.redislabs.com:6380
// });

// redisClient.on('error', (err) => console.error(' Redis Client Error:', err));

// (async () => {
//   try {
//     await redisClient.connect();
//     console.log(' Connected to Redis Cloud');
//   } catch (error) {
//     console.error(' Failed to connect to Redis:', error);
//   }
// })();

// export default redisClient;
