import PostModel from '../models/postSchema.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostModel(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })   
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatedPost = await PostModel.findByIdAndUpdate(_id, {...post, _id}, { new: true })

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    await PostModel.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully!" })
}

export const updateLikeCount = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    const existingPost = await PostModel.findById(id)
    const updatedPost = await PostModel.findByIdAndUpdate(id, { likeCount: existingPost.likeCount+1 }, { new: true })
    
    res.json(updatedPost)
}
