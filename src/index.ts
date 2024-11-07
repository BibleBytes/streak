/*
 *   Copyright (C) 2024 Bible Bytes.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Wed Nov 6 2024
 *   file: index.ts
 *   project: Streak
 *   purpose: Analyses
 *
 */

import type { DateString, Status } from "./model.js";
import { GetDate, getDateDaysAgo, isDateConsecutive } from "./utilities.js";

export function GetStatus(days: DateString[]): Status {
    days.sort();
    const hasStreakToday = HasStreakToday(days);
    const hasStreakYesterday = HasStreakYesterday(days, hasStreakToday);
    const streak = CalculateStreak(days, hasStreakToday, hasStreakYesterday);
    return {
        totalDays: days.length,
        hasStreakToday: hasStreakToday,
        hasStreakYesterday: hasStreakYesterday,
        ...streak,
    };
}

function CalculateStreak(
    days: DateString[],
    hasStreakToday: boolean,
    hasStreakYesterday: boolean,
): {
    currentStreak: number;
    latestStreak: number;
    longestStreak: number;
} {
    let longestStreak = 0;
    let latestStreak = 0;
    let currentStreak = 0;
    for (let i = 0; i < days.length; i++) {
        if (i === 0 || isDateConsecutive(days[i], days[i - 1])) {
            currentStreak += 1;
            latestStreak = currentStreak;
        } else {
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 1;
        }
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    if (!hasStreakYesterday) {
        currentStreak = hasStreakToday ? 1 : 0;
    }
    return {
        longestStreak,
        latestStreak,
        currentStreak,
    };
}

function HasStreakToday(days: DateString[]): boolean {
    if (days.length >= 1) {
        return days[days.length - 1] === GetDate();
    }
    return false;
}

function HasStreakYesterday(
    days: DateString[],
    hasStreakToday: boolean,
): boolean {
    if (days.length >= 2 && hasStreakToday) {
        return days[days.length - 2] === getDateDaysAgo(1);
    }
    if (days.length >= 1 && !hasStreakToday) {
        return days[days.length - 1] === getDateDaysAgo(1);
    }
    return false;
}

// If you declare with your mouth, “Jesus is Lord,” and believe in your heart
// that God raised him from the dead, you will be saved.
// - Romans 10:9
