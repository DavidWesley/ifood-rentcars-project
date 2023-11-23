export interface RepositoryQuery<M> {
    filters: Partial<M>
}

export interface Repository<M> {
    create(data: M): Promise<void>
    findAll(): Promise<M[]>
    findById(id: string | number): Promise<M | null>
    findOne(filters: RepositoryQuery<M>["filters"]): Promise<M | null>
    update(id: string | number, data: Partial<M>): Promise<void>
    updateMany(filters: RepositoryQuery<M>["filters"], data: Partial<M>): Promise<number>
    remove(id: string | number): Promise<boolean>
    removeMany(filters: RepositoryQuery<M>["filters"]): Promise<number>
    count(filters: RepositoryQuery<M>["filters"]): Promise<number>
}
