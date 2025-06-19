const blog = require('../models/blogmodel')
const mongoose = require('mongoose')

//get all blogs (only public ones)
const getBlogs = async (req,res) =>{
    try {
        const blogs = await blog.find({choice: 'public'}).sort({createdAt:-1})
        res.status(200).json(blogs)
        console.log(blogs)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//get single blog (only if public)
const getoneBlog = async (req,res) =>{
    const { id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such blog. Id is not valid'})
    }
    
    try {
        const oneblog = await blog.findOne({_id: id, choice: 'public'})

        if(!oneblog){
            return res.status(404).json({error:'No such blog or blog is private'})
        }
        res.status(200).json(oneblog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//create blog
const createBlog = async(req,res)=>{
    const {title,image,choice,description,author} = req.body

    try{
        const Blog = await blog.create({title,image,choice,description,author})
        res.status(200).json(Blog)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete blog
const deleteBlog = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such blog. Id is not valid'})
    }

    try {
        const deletedBlog = await blog.findOneAndDelete({_id: id})

        if(!deletedBlog){
            return res.status(404).json({error:'No such blog'})
        }

        res.status(200).json(deletedBlog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog. Id is not valid' });
  }

  try {
    const updatedBlog = await blog.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//add comment 
// const addBlogComment = async (req, res) => {
//   const { id } = req.params;
//   const { newComment } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: 'No such blog. Id is not valid' });
//   }

//   if (!newComment || typeof newComment !== 'string') {
//     return res.status(400).json({ error: 'Invalid comment provided' });
//   }

//   try {
//     const updatedBlog = await blog.findOneAndUpdate(
//       { _id: id },
//       { $push: { comments: newComment } },
//       { new: true, runValidators: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ error: 'No such blog' });
//     }

//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const addBlogComment = async (req, res) => {
  const { id } = req.params;
  const { newComment } = req.body;

  // Add debugging
  console.log('Blog ID:', id);
  console.log('Request body:', req.body);
  console.log('New comment:', newComment);
  console.log('Comment type:', typeof newComment);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog. Id is not valid' });
  }

  if (!newComment || typeof newComment !== 'string' || newComment.trim() === '') {
    return res.status(400).json({ error: 'Invalid comment provided' });
  }

  try {
    const updatedBlog = await blog.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment.trim() } }, // Trim the comment before saving
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    console.log('Updated blog:', updatedBlog);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: error.message });
  }
};


//update blog likes
const updateBlogLikes = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog. Id is not valid' });
  }

  try {
    const updatedBlog = await blog.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {getBlogs,getoneBlog,createBlog,deleteBlog,updateBlog,updateBlogLikes,addBlogComment}