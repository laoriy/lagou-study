const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    // 开始连接
    await client.connect();

    const testDb = client.db("test");
    const inventoryCollection = testDb.collection("inventory");

    // 创建文档
    await inventoryCollection.insertOne({
      a: 1,
      b: "2",
      c: true,
      d: [1, 2, 3],
    });

    // console.log(ret)

    // 查询文档
    const ret = await inventoryCollection.findOne({
    });

    // find()  ret.toArray()
    // findOne() ret
    // console.log(ret)
    // console.log(await ret.toArray())

    // 删除文档
    // const ret = await inventoryCollection({
    //   _id: ObjectID('5fa5164f95060000060078b1')
    // })
    // console.log(ret)

    // 更新文档
    // const ret = await inventoryCollection.updateOne(
    //   {
    //     _id: ObjectID("5fa5164f95060000060078af"),
    //   },
    //   {
    //     $set: {
    //       qty: 100,
    //     },
    //   }
    // );
    console.log(ret);
  } catch (err) {
    // 连接失败
    console.log("连接失败", err);
  } finally {
    // 关闭连接
    await client.close();
  }
}
run();
