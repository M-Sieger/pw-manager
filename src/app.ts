import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
} from "./db";

dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "privat-manager-moritz");
    await createPasswordDoc({
      name: "Moritz",
      value: "1111",
    });
    console.log(await readPasswordDoc("Moritz"));
    await updatePasswordDoc("Moritz", { name: "Moritz", value: "1112" });
    await deletePasswordDoc("Moritz");
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

// const run = async () => {
//   printWelcomeMessage();
//   const credentials = await askForCredentials();
//   if (!hasAccess(credentials.masterPassword)) {
//     printNoAccess();
//     run();
//     return;
//   }

//   const action = await askForAction();
//   switch (action.command) {
//     case "set":
//       handleSetPassword(action.passwordName);
//       break;
//     case "get":
//       handleGetPassword(action.passwordName);
//       break;
//   }
// };

run();
