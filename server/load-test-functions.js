
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