import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import api from '../api/axio'

const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  body: z.string().min(10, { message: 'Body must be at least 10 characters' }),
  img: z.string().url({ message: 'Invalid image URL' }),
})

const PostForm = () => {
  const { id } = useParams() //  جلب id إن وجد
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [img, setImg] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isEdit = Boolean(id) // نحدد إن كنا في وضع التعديل

  // تحميل بيانات البوست في حالة التعديل
  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/posts/${id}`)
          const { title, body, img } = res.data
          setTitle(title)
          setBody(body)
          setImg(img)
        } catch (err) {
          console.error('Error loading post:', err)
        }
      }

      fetchPost()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = postSchema.safeParse({ title, body, img })
    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, { title, body, img }) //  تعديل
      } else {
        await api.post('/posts', { title, body, img }) //  إنشاء جديد
      }

      navigate('/') // بعد الحفظ نرجع للصفحة الرئيسية
    } catch (err) {
      console.error('Error submitting form:', err)
      setErrors({ general: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-error text-sm">{errors.title}</p>}
        </div>

        {/* Body */}
        <div>
          <label className="label">
            <span className="label-text">Body</span>
          </label>
          <textarea
            className={`textarea textarea-bordered w-full ${errors.body ? 'textarea-error' : ''}`}
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {errors.body && <p className="text-error text-sm">{errors.body}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.img ? 'input-error' : ''}`}
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          {errors.img && <p className="text-error text-sm">{errors.img}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {isEdit ? 'Update Post' : 'Submit Post'}
        </button>

        {errors.general && <p className="text-error text-sm mt-2">{errors.general}</p>}
      </form>
    </div>
  )
}

export default PostForm
