import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axio'

// 1. Create the context
const PostContext = createContext()

// 2. Create provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/posts')
      setPosts(res.data)
    } catch (err) {
      console.error('Failed to fetch posts:', err)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  // Add a new post
  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev])
  }

  // Initial fetch
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts, addPost }}>
      {children}
    </PostContext.Provider>
  )
}

// 3. Custom hook for ease of use
export const usePosts = () => useContext(PostContext)
