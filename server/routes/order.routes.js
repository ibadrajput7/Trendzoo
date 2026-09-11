import { Router } from "express";
import { getAllOrders, updateOrderStatus, createOrder } from "../controllers/order.controller.js";

const router = Router();

router.route("/").get(getAllOrders);
router.route("/").post(createOrder);
router.route("/:id/status").patch(updateOrderStatus);

export default router;
