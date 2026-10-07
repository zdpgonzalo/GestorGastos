export interface IRepository<T> {
    /**
     * Returns the entity with the specified ID, or null if it doesn't exist.
     * @param id ID of the entity to retrieve.
     */
    getById(id: string): Promise<T | null>;

    /**
     * Adds the specified entity to the repository.
     * @param entity The entity to add.
     */
    add(entity: T): Promise<void>;
    
    /**
     * Deletes the specified entity from the repository.
     * @param entity The entity to delete.
     */
    delete(entity: T): Promise<void>;
}