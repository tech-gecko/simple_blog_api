import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPostById).delete(deletePost);

export default router;
