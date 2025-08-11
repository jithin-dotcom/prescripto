

// module.exports = {
//   randomMessage: () => {
//     const messages = [
//       "Hello Doctor!",
//       "How are you?",
//       "Need help with my prescription",
//       "Video call ready",
//       "Thanks!"
//     ];
//     return messages[Math.floor(Math.random() * messages.length)];
//   }
// };











// module.exports = {
//   randomMessage: () => {
//     const messages = [
//       "Hello Doctor!",
//       "How are you?",
//       "Need help with my prescription",
//       "Video call ready",
//       "Thanks!"
//     ];
//     return messages[Math.floor(Math.random() * messages.length)];
//   },
//   handleLoginResponse: (requestParams, response, context, ee, next) => {
//     console.log(`Login response: Status=${response.statusCode}, Body=${response.body}`);
//     if (response.statusCode !== 200) {
//       console.error(`Login failed: Status=${response.statusCode}, Body=${response.body}`);
//     }
//     return next(); // Continue even if login fails to avoid VU failure
//   }
// };











// module.exports = {
//   randomMessage: () => {
//     const messages = [
//       "Hello Doctor!",
//       "How are you?",
//       "Need help with my prescription",
//       "Video call ready",
//       "Thanks!"
//     ];
//     return messages[Math.floor(Math.random() * messages.length)];
//   },
//   handleLoginResponse: (requestParams, response, context, ee, next) => {
//     console.log(`Login response: Status=${response.statusCode}, Body=${response.body}`);
//     if (response.statusCode !== 200) {
//       console.error(`Login failed: Status=${response.statusCode}, Body=${response.body}`);
//     }
//     return next();
//   },
//   storeToken: (requestParams, context, ee, next) => {
//     if (context.vars.accessToken) {
//       context.vars.$processEnvironment.accessToken = context.vars.accessToken;
//       console.log(`Stored accessToken: ${context.vars.accessToken}`);
//     }
//     return next();
//   }
// };













// module.exports = {
//   randomMessage: () => {
//     const messages = [
//       "Hello Doctor!",
//       "How are you?",
//       "Need help with my prescription",
//       "Video call ready",
//       "Thanks!"
//     ];
//     return messages[Math.floor(Math.random() * messages.length)];
//   },
//   handleLoginResponse: (requestParams, response, context, ee, next) => {
//     console.log(`Login response: Status=${response.statusCode}, Body=${response.body}`);
//     if (response.statusCode !== 200) {
//       console.error(`Login failed: Status=${response.statusCode}, Body=${response.body}`);
//     }
//     // Log captured accessToken (if any)
//     console.log(`Captured accessToken: ${context.vars.accessToken || 'undefined'}`);
//     return next();
//   },
//   storeToken: (requestParams, context, ee, next) => {
//     if (context.vars.accessToken) {
//       context.vars.$processEnvironment.accessToken = context.vars.accessToken;
//       console.log(`Stored accessToken: ${context.vars.accessToken}`);
//     } else {
//       console.error('No accessToken captured, skipping storage');
//     }
//     return next();
//   }
// };














module.exports = {
  randomMessage: () => {
    const messages = [
      "Hello Doctor!",
      "How are you?",
      "Need help with my prescription",
      "Video call ready",
      "Thanks!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  },
  handleLoginResponse: (requestParams, response, context, ee, next) => {
    console.log(`Login response: Status=${response.statusCode}, Body=${response.body}`);
    console.log(`Captured accessToken: ${context.vars.accessToken || 'undefined'}`);
    if (response.statusCode !== 200) {
      console.error(`Login failed: Status=${response.statusCode}, Body=${response.body}`);
    }
    return next();
  }
};