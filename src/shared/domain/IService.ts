export interface IService<Entity>{

    /** Retrieves an entity by its unique identifier.
     * @param id Identifier of the entity to retrieve.
     * @returns A promise that resolves to the entity if found, or null if not found.
     */
    getById(id: string): Promise<Entity | null>;

    /**
     * Deletes an entity by its unique identifier.
     * @param id Identifier of the entity to delete.
     * @returns A promise that resolves when the entity is deleted.
     */
    delete(id: string): Promise<void>;
}