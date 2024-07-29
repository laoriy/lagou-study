import { createClient } from "redis";

const client = createClient({
  url: "redis://120.79.66.173:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => {
  console.log("connect...");
});
await client.connect();

console.log(client);

await client.disconnect();
