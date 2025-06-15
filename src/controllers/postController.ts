import { Request, Response, NextFunction } from "express";
import Post, { IPostModel } from "../models/Post";
import { IPost } from "../types";
import AppError from "../errors/AppError";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts: IPostModel[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: IPostModel | null = await Post.findById(req.params.id);
    if (!post) {
      next(new AppError("Post not found", 404));
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body as IPost;
    if (!title || !content) {
      next(new AppError("Title and content are required", 400));
      return;
    }
    const newPost: IPostModel = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post by ID
// @route   DELETE /api/posts/:id
// @access  Public
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: IPostModel | null = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      next(new AppError("Post not found", 404));
      return;
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
