export type StatisticsPeriod = {
  year: number;
  month: number;
};

export type MonthlyStatistics = {
  period: StatisticsPeriod;
  income: number;
  expenses: number;
  balance: number;
};

export type ExpenseCategoryStatistics<
  TCategory extends string = string,
> = {
  category: TCategory;
  amount: number;
  percentage: number;
};

export type StatisticsData<
  TCategory extends string = string,
> = {
  monthlyStatistics: MonthlyStatistics[];
  categoryStatistics: ExpenseCategoryStatistics<TCategory>[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
};