import { prisma } from '@/lib/db'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const getTodos = createServerFn({
  method: 'GET',
}).handler(async () => {
  console.log('Fetching todos from the database...')
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
    return await prisma.todo.create({
      data,
    })
  })

export { createTodo, getTodos }
