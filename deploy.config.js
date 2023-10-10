module.exports = {
  apps: [
    {
      name: "JCWD-0110-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
      },
      time: true,
    },
  ],
};
