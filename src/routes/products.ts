import { Router } from 'express';
import { productController } from '../controllers/products';

const productRouter = Router();
productRouter.post('/', productController.insertProduct);

export {
  productRouter
}
