import http from "http";
import dotenv from "dotenv";
import {
  connectDB,
  deletePasswordDoc,
  readPasswordDoc,
  PasswordDoc,
  createPasswordDoc,
} from "./db";

dotenv.config();

const port = process.env.PORT;

const url = process.env.MONGODB_URL;

connectDB(url, "privat-manager-moritz");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Safe Me!</h1>");
    return;
  }
  const handlePost = async (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) => {
    const passwordDoc = await parseJSONBody<PasswordDoc>(request);

    const isSuccesful = await createPasswordDoc(passwordDoc);
    if (!isSuccesful) {
      response.statusCode = 400;
      response.end();
      return;
    }

    response.statusCode = 201;
    response.end();
  };
  const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
    return new Promise((resolve) => {
      let json = "";
      request.on("data", (chunk) => {
        json += chunk;
      });
      request.on("end", () => {
        const body = JSON.parse(json);
        resolve(body);
      });
    });
  };

  if (request.method == "POST") {
    handlePost(request, response);
  }

  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  const handleGet = async (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    passwordName: string
  ) => {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.end();
    return;
  };

  if (request.method === "GET") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
    return;
  }
  if (request.method === "DELETE") {
    const passwordDoc = await deletePasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "application/json");
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(await deletePasswordDoc(passwordName)));
    return;
  }
  response.end();
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
