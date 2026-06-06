import { prisma } from '@/lib/db'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { ensureSession } from './auth.functions'

const getTodos = createServerFn({
  method: 'GET',
}).handler(async () => {
  const session = await ensureSession()
  console.log('Authenticated user:', session.user)
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })
})

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
})
const createTodo = createServerFn({
  method: 'POST',
})
  .inputValidator(createTodoSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    console.log('Authenticated user:', session.user)
    return await prisma.todo.create({
      data,
    })
  })

export { createTodo, getTodos }
