// import { DataBaseMemory } from './database-memory.js'
import { fastify } from 'fastify'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DataBaseMemory()
const database = new DataBasePostgres


//rota que pode criar o video
server.post('/videos', async (request,reply) => {
    //destruturando para request body
    const { title, description, duration } = request.body

    
    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()

})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos =  await database.list(search)
  
    return videos
})

//rota para atualizar um vídeo; comument recebe um ID do vídeo (route parameter)
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id  //pegando id do vídeo
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

//rota para deletar um vídeo
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

