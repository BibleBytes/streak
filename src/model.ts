type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
export type DateString = `${Year}-${Month}-${Day}`;

export type Status = {
    totalDays: number;
    hasStreakToday: boolean;
    hasStreakYesterday: boolean;
    currentStreak: number;
    latestStreak: number;
    longestStreak: number;
};
