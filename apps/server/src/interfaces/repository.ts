import { ModelProps } from "@/interfaces/model.ts"

export interface RepositoryQuery<M> {
    filters: Partial<M>
}

export interface Repository<Model extends ModelProps, Query extends RepositoryQuery<Model> = RepositoryQuery<Model>> {
    create(data: Required<Model>): Promise<void>
    update(id: string | number, data: Partial<Model>): Promise<void>
    remove(id: string | number): Promise<boolean>
    findAll(): Promise<Model[]>
    findById(id: string | number): Promise<Model | null>
    findOne(filters: Query["filters"]): Promise<Model | null>
    updateMany(filters: Query["filters"], data: Partial<Model>): Promise<number>
    removeMany(filters: Query["filters"]): Promise<number>
    count(filters: Query["filters"]): Promise<number>
}
