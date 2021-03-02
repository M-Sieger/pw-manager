import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");

    const db = client.db("privat-manager-moritz");
    await db.collection("inventory").insertOne({
      item: "canvas",
      qty: 250,
      tags: ["polyester"],
      size: { h: 28, w: 35.5, unit: "cm" },
    });
    client.close();
  } catch (error) {
    console.log(error);
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
