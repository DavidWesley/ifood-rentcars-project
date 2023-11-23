import type { UUID } from "node:crypto"

export interface TableModelQuery<M> {
    filters: Partial<M>
}

export interface Repository<M> {
    create(data: M): Promise<UUID | undefined>
    findAll(): Promise<M[]>
    findById(id: UUID): Promise<M | null>
    findOne(filters: TableModelQuery<M>["filters"]): Promise<M | null>
    update(id: UUID, data: Partial<M>): Promise<void>
    updateMany(filters: TableModelQuery<M>["filters"], data: Partial<M>): Promise<number>
    delete(id: UUID): Promise<boolean>
    deleteMany(filters: TableModelQuery<M>["filters"]): Promise<number>
    count(filters: TableModelQuery<M>["filters"]): Promise<number>
}
