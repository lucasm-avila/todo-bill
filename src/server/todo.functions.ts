import { prisma } from '@/lib/db'
import { authFnMiddleware } from '@/middleware/auth.middleware'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const getTodos = createServerFn({
  method: 'GET',
})
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
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
  .middleware([authFnMiddleware])
  .handler(async ({ data, context }) => {
    return await prisma.todo.create({
      data,
    })
  })

export { createTodo, getTodos }
