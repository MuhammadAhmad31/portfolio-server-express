import { Router } from "express";
import { create, getAll, getById, update } from "../controllers/project";
import { remove } from "../controllers/profession";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
