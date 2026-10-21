import { Expense } from "@/domain/expenses/Expense";
import { IExpenseRepository } from "@/domain/expenses/IExpenseRepository";
import { useCallback, useEffect, useState } from "react";

/**
 * Interface representing the result of the useTransactions hook, including the list of expenses, 
 * search string, loading state, error message, and functions to set the search string and reload the data.
 */
interface UseTransactionsResult{
    expenses: Expense[];
    search: string;
    loading: boolean;
    error: string | null;
    setSearch: (search: string) => void;
    reload: () => void;
}

/**
 * Hook to manage transactions
 * @param repository The expense repository
 * @returns The transactions data and actions
 */
export function useTransactions(
    repository: IExpenseRepository,
): UseTransactionsResult {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [revision, setRevision] = useState<number>(0);

    const reload = useCallback(() =>{
        setRevision((current) => current + 1);
    }, []);

    useEffect(() => {
        let active = true;

        const timer = setTimeout(async () => {
            setLoading(true);
            setError(null);

            try{
                const result = await repository.findAll(search);

                if(active){
                    setExpenses(result);
                }
            } catch (error) {
                if(active){
                    setError(error as string);
                }
            } finally {
                if(active){
                    setLoading(false);
                }
            }

        }, search.trim() ? 250 : 0);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [repository, search, revision]);

    return{
        expenses,
        search,
        loading,
        error,
        setSearch,
        reload,
    }
}