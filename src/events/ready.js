module.exports = (client) => {
  console.log("Logged in as", client.user.tag);
  setInterval(() => {
    client.user.setActivity("Bqre sleep", { type: "WATCHING" });
  }, 20000);
};
