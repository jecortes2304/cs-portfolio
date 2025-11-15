export abstract class CrudRepositorySimple<CreateDTO, Entity, Id = number> {
    abstract create(data: CreateDTO): Promise<Entity>;
    abstract findById(id: Id): Promise<Entity | null>;
    abstract findAll(): Promise<Entity[]>;
    abstract update(id: Id, data: Partial<CreateDTO>): Promise<Entity | null>;
    abstract deleteById(id: Id): Promise<boolean>;
}

export abstract class CrudRepositoryComplete<CreateDTO, Entity, Id = number>
    extends CrudRepositorySimple<CreateDTO, Entity, Id> {

    abstract findAllPaginated(page: number, pageSize: number): Promise<Entity[]>;

    abstract findByField<K extends keyof Entity>(
        field: K,
        value: Entity[K]
    ): Promise<Entity | null>;

    abstract count(): Promise<number>;

    abstract exists(id: Id): Promise<boolean>;

    abstract findAllByField<K extends keyof Entity>(
        field: K,
        value: Entity[K]
    ): Promise<Entity[]>;

    abstract deleteAllByIds(ids: Id[]): Promise<number>;

    abstract findByFilters(filters: Partial<Entity>): Promise<Entity[]>;

    abstract findAllPaginatedByField<K extends keyof Entity>(
        field: K,
        value: Entity[K],
        page: number,
        pageSize: number
    ): Promise<Entity[]>;
}
