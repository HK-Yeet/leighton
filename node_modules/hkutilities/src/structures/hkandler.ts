import { Client, Collection } from "discord.js";
import { join } from "path";
import loadStuff from "../functions/handlers";
import { Directories } from "../types";

class HKandler {
  private _commandsDir: string = "commands";
  private _eventsDir: string = "events";
  private _featuresDir: string = "features";
  private _prefix: string = "!";
  private _mentionPreix: boolean = false;
  private _defaultCooldown: number = 3;
  private _owners: String[] = [""];
  private _commands: any = new Collection();
  private _helpDescription: any = null;
  constructor(bot: Client, options: Directories) {
    if (!bot) {
      throw new Error(
        "HKUtilities ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord"
      );
    }

    if (!options.commandsDir) {
      console.warn(
        'HKUtilities ❯ No commands folder prvided, using "commands"'
      );
    }
    if (!options.eventsDir) {
      console.warn('HKUtilities ❯ No events folder provided, using "events"');
    }
    if (!options.featuresDir) {
      console.warn(
        'HKUtilities ❯ No features folder provided, using "features"'
      );
    }

    if (module && require.main) {
      const { path } = require.main;
      if (path) {
        loadStuff(
          bot,
          join(path, options.commandsDir || this._commandsDir),
          join(path, options.eventsDir || this._eventsDir),
          join(path, options.featuresDir || this._featuresDir),
          this
        );
      }
    }
  }
  public get commands() {
    return this._commands;
  }
  public setOwners(owners: String[]) {
    this._owners = owners;
    return this;
  }
  public get owners() {
    return this._owners;
  }
  public setPrefix(prefix: string) {
    this._prefix = prefix;
    return this;
  }
  public get prefix() {
    return this._prefix;
  }
  public setMentionPrefix(mentionPrefix: boolean) {
    this._mentionPreix = mentionPrefix;
    return this;
  }
  public get mentionPrefix() {
    return this._mentionPreix;
  }
  public setDefaultCooldown(cooldown: number) {
    this._defaultCooldown = cooldown;
    return this;
  }
  public get defaultCooldown() {
    return this._defaultCooldown;
  }
  public setHelpDescription(helpDescription: string) {
    this._helpDescription = helpDescription;
    return this;
  }
  public get helpDescription() {
    return this._helpDescription;
  }
}
export = HKandler;
