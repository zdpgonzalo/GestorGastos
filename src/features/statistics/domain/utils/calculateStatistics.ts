import type {
    ExpenseCategoryStatistics,
    MonthlyStatistics,
    StatisticsData,
    StatisticsPeriod,
} from '@/features/statistics/domain/types/Statistics';

export type StatisticsTransaction = {
    amount: number;
    date: Date | string;
}

export type StatisticsExpense<TCategory extends string = string> =
  StatisticsTransaction & {
    category: TCategory;
  };

export type CalculateStatisticsParams<
    TCategory extends string = string,
> = {
    incomes: readonly StatisticsTransaction[];
    expenses: readonly StatisticsExpense<TCategory>[];
    selectedMonth: StatisticsPeriod;
    monthsToShow?: number;
}

function getPeriod(date: Date | string): StatisticsPeriod{
    if(typeof date === 'string') {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

        if (match) {
            const year = Number(match[1]);
            const month = Number(match[2]);
            const day = Number(match[3]);

            const parsedDate = new Date(year, month - 1, day);

            if (
                month < 1 ||
                month > 12 ||
                parsedDate.getFullYear() !== year ||
                parsedDate.getMonth() !== month - 1 ||
                parsedDate.getDate() !== day
            ) {
                throw new Error("Invalid transaction date.");
            }

            return { year, month };
        }
    }

    const parsedDate =
        date instanceof Date ? date : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Invalid transaction date.");
    }

    return {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
    };
}


function getPeriodKey(period: StatisticsPeriod): number {
  return period.year * 12 + period.month - 1;
}

function getPeriodFromKey(key: number): StatisticsPeriod {
  return {
    year: Math.floor(key / 12),
    month: (key % 12) + 1,
  };
}

function validateAmount(amount: number): void {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(
      "Transaction amounts must be finite and non-negative.",
    );
  }
}

function validatePeriod(period: StatisticsPeriod): void {
  if (
    !Number.isInteger(period.year) ||
    !Number.isInteger(period.month) ||
    period.month < 1 ||
    period.month > 12
  ) {
    throw new Error("Invalid statistics period.");
  }
}

export function calculateStatistics<
  TCategory extends string,
>({
  incomes,
  expenses,
  selectedMonth,
  monthsToShow = 6,
}: CalculateStatisticsParams<TCategory>): StatisticsData<TCategory> {
  validatePeriod(selectedMonth);

  if (!Number.isInteger(monthsToShow) || monthsToShow < 1) {
    throw new Error("monthsToShow must be a positive integer.");
  }

  const monthlyTotals = new Map<
    number,
    { income: number; expenses: number }
  >();

  const getOrCreateMonth = (key: number) => {
    let totals = monthlyTotals.get(key);

    if (!totals) {
      totals = { income: 0, expenses: 0 };
      monthlyTotals.set(key, totals);
    }

    return totals;
  };

  for (const income of incomes) {
    validateAmount(income.amount);

    const key = getPeriodKey(getPeriod(income.date));
    getOrCreateMonth(key).income += income.amount;
  }

  for (const expense of expenses) {
    validateAmount(expense.amount);

    const key = getPeriodKey(getPeriod(expense.date));
    getOrCreateMonth(key).expenses += expense.amount;
  }

  const selectedKey = getPeriodKey(selectedMonth);
  const firstKey = selectedKey - monthsToShow + 1;

  const monthlyStatistics: MonthlyStatistics[] = Array.from(
    { length: monthsToShow },
    (_, index) => {
      const period = getPeriodFromKey(firstKey + index);
      const totals = monthlyTotals.get(firstKey + index);

      const income = totals?.income ?? 0;
      const expenses = totals?.expenses ?? 0;

      return {
        period,
        income,
        expenses,
        balance: income - expenses,
      };
    },
  );

  const categoryTotals = new Map<TCategory, number>();

  for (const expense of expenses) {
    const period = getPeriod(expense.date);

    if (
      period.year !== selectedMonth.year ||
      period.month !== selectedMonth.month
    ) {
      continue;
    }

    categoryTotals.set(
      expense.category,
      (categoryTotals.get(expense.category) ?? 0) +
        expense.amount,
    );
  }

  const totalIncome =
    monthlyTotals.get(selectedKey)?.income ?? 0;

  const totalExpenses =
    monthlyTotals.get(selectedKey)?.expenses ?? 0;

  const categoryStatistics: ExpenseCategoryStatistics<TCategory>[] =
    Array.from(categoryTotals, ([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpenses > 0
          ? (amount / totalExpenses) * 100
          : 0,
    })).sort((a, b) => b.amount - a.amount);

  return {
    monthlyStatistics,
    categoryStatistics,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
}