/*
 *   Copyright (C) 2024 Bible Bytes.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Wed Nov 6 2024
 *   file: model.ts
 *   project: Streak
 *   purpose: Models
 *
 */

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

// Consequently, faith comes from hearing the message, and the message is
// heard through the word about Christ.
// - Romans 10:17
