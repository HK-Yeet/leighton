function checkProperties(fileName: string, command: any) {
  const { name, aliases, callback, execute, run } = command;
  if (!name) {
    throw new Error(
      `HKUtilities ❯ ${fileName} ❯ Does not have property "name" ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
    );
  }
  if (typeof name != "string") {
    throw new Error(
      `HKUtilities ❯ ${fileName} ❯ Name provided isn't a string ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
    );
  }
  if (aliases) {
    if (!Array.isArray(aliases)) {
      throw new Error(
        `HKUtilities ❯ ${fileName} ❯ Aliases is not an array ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
      );
    }
  }
  let functionCounter = 0;
  if (callback) functionCounter++;
  if (execute) functionCounter++;
  if (run) functionCounter++;

  if (functionCounter > 1) {
    throw new Error(`HKUtilities ❯ ${fileName} ❯ Has more than 1 function`);
  }
  if (functionCounter == 0) {
    throw new Error(`HKUtilities ❯ ${fileName} ❯ Has no functions`);
  }
  return true;
}
function checkEvent(eventName: string) {
  const validEvents = [
    "channelCreate",
    "channelDelete",
    "channelPinsUpdate",
    "channelUpdate",
    "debug",
    "emojiCreate",
    "emojiDelete",
    "emojiUpdate",
    "error",
    "guildBanAdd",
    "guildBanRemove",
    "guildCreate",
    "guildDelete",
    "guildIntegrationsUpdate",
    "guildMemberAdd",
    "guildMemberAvailable",
    "guildMemberRemove",
    "guildMembersChunk",
    "guildMemberSpeaking",
    "guildMemberUpdate",
    "guildUnavailable",
    "guildUpdate",
    "invalidated",
    "inviteCreate",
    "inviteDelete",
    "message",
    "messageDelete",
    "messageDeleteBulk",
    "messageReactionAdd",
    "messageReactionRemove",
    "messageReactionRemoveAll",
    "messageReactionRemoveEmoji",
    "messageUpdate",
    "presenceUpdate",
    "rateLimit",
    "ready",
    "roleCreate",
    "roleDelete",
    "roleUpdate",
    "shardDisconnect",
    "shardError",
    "shardReady",
    "shardReconnecting",
    "shardResume",
    "typingStart",
    "userUpdate",
    "voiceStateUpdate",
    "warn",
    "webhookUpdate",
  ];
  if (!validEvents.includes(eventName))
    throw new Error(`
        HKUtilities ❯ Unknown Event "${eventName}" ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`);
  return true;
}
export { checkProperties, checkEvent };
