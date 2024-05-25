import { Router } from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/profession";

const router = Router();

router.post("/profession", create);
router.get("/profession", getAll);
router.get("/profession/:id", getById);
router.put("/profession/:id", update);
router.delete("/profession/:id", remove);

export default router;
