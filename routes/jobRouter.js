import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllJobs);
router.get("/stats", showStats);

router.get("/:id", validateIdParam, getSingleJob);
router.post("/", createJob);
router.patch("/:id", validateJobInput, validateIdParam, updateJob);
router.delete("/:id", validateIdParam, deleteJob);

export default router;
