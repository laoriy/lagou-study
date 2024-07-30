import { createClient } from "redis";

const client = createClient({
  url: "redis://120.79.66.173:6379", //  redis-server --daemonize yes --protected-mode no
});

client.on("error", (err) => console.log("client Client Error", err));
client.on("connect", () => {
  console.log("connect...");
});

await client.connect();

// 2. 操作 client 数据库
await client.set("foo", "bar11");

const v = await client.get("foo");

await client.hSet("user-session:123", {
  name: "John",
  surname: "Smith",
  company: "Redis",
  age: 29,
});

let userSession = await client.hGetAll("user-session:123");
console.log(JSON.stringify(userSession, null, 2));

// 事务

await client.set("another-key", "another-value");

const [setKeyReply, otherKeyValue] = await client
  .multi()
  .set("key", "value")
  .get("another-key")
  .exec(); // ['OK', 'another-value']

console.log(setKeyReply, otherKeyValue);
