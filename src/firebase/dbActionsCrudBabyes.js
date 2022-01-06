import { db } from "./firebase-config";

export async function addProduct(productb) {
  // example usind ADD
  // await db.collection("projects").add(project);

  // example usind SET
  await db.collection("productsbabyes").doc().set(productb);
}

// export async function loadProducts() {
//   const products = [];

//   const response = await db.collection("products").get();
//   response.forEach((product) => {
//     products.push({ id: product.id, ...product.data() });
//   });

//   return products;
// }

export async function deleteProduct(id) {
  await db.collection("productsbabyes").doc(id).delete();
}