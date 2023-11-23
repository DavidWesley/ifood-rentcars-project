export interface ModelProps {
    id: string | number
    createdAt: Date
    updatedAt: Date
}

// export class Model implements ModelProps {
//     public readonly id: string | number
//     public readonly createdAt: Date
//     public updatedAt: Date

//     constructor() {
//         this.id = createUUID()
//         this.createdAt = new Date()
//         this.updatedAt = this.createdAt
//     }
// }
