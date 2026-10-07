/**
 * Represents the result of an operation that can either succeed or fail.
 */
export type Result<T> = Success<T> | Failure;

/**
 * Represents a successful result of an operation.
 */
export interface Success<T> {
    readonly isSuccess: true;
    readonly value: T;
}

/**
 * Represents a failed result of an operation.
 */
export interface Failure {
    readonly isSuccess: false;
    readonly error?: string;
    readonly exception?: Error;
}

/**
 * Provides utility functions to create Result instances.
 */
export const Result = {
    /**
     * Creates a successful result with an associated value.
     * @param value Error message describing the failure.
     * @returns result of type Success containing the value.
     */
    success<T>(value: T): Result<T>{
        return {
            isSuccess: true,
            value
        };
    },

    /**
     * Creates a failure result with an associated error message.
     * @param error Error message describing the failure.
     * @returns result of type Failure containing the error message.
     */
    failure(error: string): Failure{
        return {
            isSuccess: false,
            error
        };
    },

    /**
     * Creates a failure result with an associated exception.
     * @param error Error message describing the failure.
     * @param exception Exception object associated with the failure.
     * @returns result of type Failure containing the error message and exception.
     */
    failureWithException(error: string, exception: Error): Failure{
        return {
            isSuccess: false,
            error,
            exception
        };
    }
}
    
