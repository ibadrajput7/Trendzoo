import { Router } from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(upload.single("image"), createCategory);
router.route("/").get(getAllCategories);
router.route("/:id").patch(upload.single("image"), updateCategory);
router.route("/:id").delete(deleteCategory);

export default router;
