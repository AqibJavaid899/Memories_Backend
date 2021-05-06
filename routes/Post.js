import express from 'express'
import { getPosts, createPost, updatePost, deletePost, updateLikeCount } from '../controllers/Post.js'

const router = express.Router()

// Backend Routes
router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/updateLikeCount', updateLikeCount)

export default router