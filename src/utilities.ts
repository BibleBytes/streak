/*
 *   Copyright (C) 2024 Bible Bytes.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Wed Nov 6 2024
 *   file: utilities.ts
 *   project: Streak
 *   purpose: Utilities
 *
 */

import type { DateString } from "./model.js";

export function GetDate(): DateString {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}` as DateString;
}

export function getDateDaysAgo(daysAgo: number): DateString {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}` as DateString;
}

export function isDateConsecutive(
    dateStr1: DateString,
    dateStr2: DateString,
): boolean {
    const date1 = parseDateString(dateStr1);
    const date2 = parseDateString(dateStr2);
    const oneDay = 24 * 60 * 60 * 1000;
    const difference = Math.abs(date2.getTime() - date1.getTime()) / oneDay;
    return difference === 1;
}

export function parseDateString(date: DateString): Date {
    const [year, month, day] = date.split("-").map(Number);
    const _date = new Date(year, month - 1, day);
    _date.setUTCHours(0);
    _date.setUTCMinutes(0);
    _date.setUTCSeconds(0);
    _date.setUTCMilliseconds(0);
    return _date;
}

// And I will do whatever you ask in my name, so that the Father may be
// glorified in the Son.
// - John 14:13
