import { dbQuery } from "../services/db";


export type Product = {
  id: number;
  name: string;
  price: number;
}

const insertProduct = async (product: Product) => {
  await dbQuery(`INSERT INTO product (name, price) VALUES(?, ?)`, [product.name, product.price])
  let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'product'`);
  return retorno[0].Id as number | undefined;
}

export const productModel = {
  insertProduct
}