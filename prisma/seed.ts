import { PrismaClient } from "@prisma/client";
import * as data from "../src/data/store_data.json";

const prisma = new PrismaClient();

async function seedData() {
  data?.["DATA"]?.map(async (store) => {
    const storeData = {
      phone: store?.tel_no,
      address: store?.rdn_code_nm,
      lat: store?.y_dnts,
      lng: store?.x_cnts,
      name: store?.upso_nm,
      category: store?.bizcnd_code_nm,
      storeType: store?.cob_code_nm,
      foodCertifyName: store?.crtfc_gbn_nm,
    };

    const res = await prisma.store.create({
      data: storeData,
    });
    console.log(res);
  });
}

async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: "alice@prisma.io" },
//     update: {},
//     create: {
//       email: "alice@prisma.io",
//       name: "Alice",
//       posts: {
//         create: {
//           title: "Check out Prisma with Next.js",
//           content: "https://www.prisma.io/nextjs",
//           published: true,
//         },
//       },
//     },
//   });
//   const bob = await prisma.user.upsert({
//     where: { email: "bob@prisma.io" },
//     update: {},
//     create: {
//       email: "bob@prisma.io",
//       name: "Bob",
//       posts: {
//         create: [
//           {
//             title: "Follow Prisma on Twitter",
//             content: "https://twitter.com/prisma",
//             published: true,
//           },
//           {
//             title: "Follow Nexus on Twitter",
//             content: "https://twitter.com/nexusgql",
//             published: true,
//           },
//         ],
//       },
//     },
//   });
//   console.log({ alice, bob });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
