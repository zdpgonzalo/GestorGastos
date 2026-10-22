const formatter = new Intl.DateTimeFormat("es-ES", {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export function formatTransactionDay(date: Date): string{
    const today = new Date();

    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    if(isSameDay(date, today)){
        return "Hoy";
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if(isSameDay(date, yesterday)){
        return "Ayer";
    }

    const result = formatter.format(date);

    return result.charAt(0).toUpperCase() + result.slice(1);
}