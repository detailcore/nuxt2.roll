module.exports = {
  apps: [
    {
      name: "Nuxt2Roll",
      port: "3007",
      // exec_mode: 'cluster',
      // instances: 3, // 'max' or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
