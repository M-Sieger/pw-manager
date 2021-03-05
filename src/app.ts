import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { closeDB, connectDB } from "./db";

dotenv.config();

type CommandToFunction = {
  set: (passwordName: string) => Promise<void>;
  get: (passwordName: string) => Promise<void>;
};
const commandToFunction: CommandToFunction = {
  set: handleSetPassword,
  get: handleGetPassword,
};

const run = async () => {
  const url = process.env.MONGODB_URL;

  printWelcomeMessage();

  try {
    const credentials = await askForCredentials();
    if (!hasAccess(credentials.masterPassword)) {
      printNoAccess();
      run();
      return;
    }

    await connectDB(url, "privat-manager-moritz");

    const action = await askForAction();
    const commandFunction = commandToFunction[action.command];
    await commandFunction(action.passwordName);

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
