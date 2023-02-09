import { Request, Response } from 'express';
import { badRequest, internalServerError } from '../services/util';
import { Product, productModel } from '../models/products';


const insertProduct = (req: Request, res: Response) => {

  {
    const product = req.body;
    if (!product)
      return badRequest(res, "Invalid Product");

    if (!product.name)
      return badRequest(res, "Inform product's name");

    if (parseFloat(product.price) > 0)
      return badRequest(res, "Please inform price");
  }

  const product = req.body as Product;
  productModel.insertProduct(product)
    .then(product => {
      res.json(
        (product)
      )
    })
    .catch(err => internalServerError(res, err));
}

export const productController = {
  insertProduct
}