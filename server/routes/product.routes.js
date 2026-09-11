import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(upload.array("images", 5), createProduct);
router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);
router.route("/:id").patch(upload.array("images", 5), updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
