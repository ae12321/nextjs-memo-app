//

const { PrismaClient } = require("@prisma/client");
const data = require("./mock.json");
const prisma = new PrismaClient();

(async () => {
  try {
    const userId = "user_2cMuTLMALvN5OxoL49fu2QgLBNK";
    const memos = data.map((memo) => ({
      ...memo,
      userId,
      tag: Math.random() > 0.5 ? "react" : "javascript",
    }));
    for (const memo of memos) {
      await prisma.memo.create({
        data: memo,
      });
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
// % node prisma/seed.js
