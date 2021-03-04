import { Collection, Db, MongoClient } from "mongodb";

let client: MongoClient = null;
let db: Db = null;

export type PasswordDoc = {
  name: string;
  value: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return db.collection<T>(collectionName);
}

export function closeDB() {
  client.close();
}

export async function createPasswordDoc(passwordDoc: PasswordDoc) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  await passwordCollection.insertOne(passwordDoc);
}

export async function readPasswordDoc(passwordName: string) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.findOne({ name: passwordName });
}

export async function updatePasswordDoc(passwordDoc: PasswordDoc) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.updateOne(
    { name: passwordDoc.name },
    { $set: { value: passwordDoc.value } }
  );
}

export async function deletePasswordDoc(passwordName: string) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.deleteMany({ name: passwordName });
}
