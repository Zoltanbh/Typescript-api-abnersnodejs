import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, validadeNumber } from '../services/util';
import { Product, productModel } from '../models/products';


const insertProduct = (req: Request, res: Response) => {

  {
    const product = req.body;
    if (!product)
      return badRequest(res, "Invalid Product");

    if (!product.name)
      return badRequest(res, "Inform product's name");

    if (!validadeNumber(product.price))
      return badRequest(res, "Please inform price");
  }

  const product = req.body as Product;
   return productModel.insertProduct(product)
    .then(product => {
      res.json(
        { product }
      )
    })
    .catch(err => internalServerError(res, err));
}

const listProducts = ({}: Request, res: Response) => {
  productModel.listProducts()
    .then(products => {
      res.json(products)
    })
    .catch(err => internalServerError(res, err));
}

const getProduct = ({req}: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validadeNumber(id))
       return badRequest(res,'id invalid');
  }

  return productModel.getProduct(id)
    .then((product) => {
      if(product)
         return res.json(product);
      else
         return notFound(res);
    })
    .catch(err => internalServerError(res, err));
}

const updateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
  {

    if(!validadeNumber(id))
       return badRequest(res,'id invalid');

    const product = req.body;
    if (!product)
      return badRequest(res, "Invalid Product");

    if (!product.name)
      return badRequest(res, "Inform product's name");

    if (!validadeNumber(product.price))
      return badRequest(res, "Please inform price");

    const productSaved = await productModel.getProduct(id); 
     if(!productSaved)
      return notFound(res) 
  }

  const product = req.body as Product;
   return productModel.updateProduct(product)
    .then(product => {
      res.json(
        { product }
      )
    })
    .catch(err => internalServerError(res, err));
}

const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validadeNumber(id))
       return badRequest(res,'id invalid');

    const productSaved = await productModel.getProduct(id); 
    if(!productSaved)
      return notFound(res)   
  }

 return  productModel.deleteProduct(id)
    .then(() =>  ok(res) )
    .catch(err => internalServerError(res, err));
}

export const productController = {
  insertProduct,
  listProducts,
  getProduct,
  deleteProduct,
  updateProduct
}