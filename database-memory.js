import { randomUUID } from "node:crypto"

export class DataBaseMemory {
  //criado uma chave privada
  #videos = new Map()

  
  list(search) {
    //encapsulando 
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
         const id = videoArray[0]
         const data = videoArray[1]

         return {
            id,
            ...data, //spread
        }
      })
      .filter(video => {
        if(search){
            return video.title.includes(search)
        }

        return true
      })  
  }

  create(video) {
    const videoId = randomUUID() //UNIVERSAL UNIQUE ID

    this.#videos.set(videoId, video) 
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}