<p align="center">
    <a href="https://mybiblebytes.com/opensource">
        <img src="https://github.com/BibleBytes/landing-page/blob/main/favicon/android-chrome-512x512.png" height="128px"/>
        <h1 align="center">Streak</h1>
    </a>
</p>


<p align="center">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/%40biblebytes%2Fstreak"/>
    <img src="https://github.com/BibleBytes/streak/actions/workflows/testing.yml/badge.svg"/>
</p>


---
## Overview
The Streak Library is a tool for analyzing a list of dates to track
activity patterns. It calculates total unique days, checks for streaks today
and yesterday, and determines current, latest, and longest streaks. This
library is useful for applications focused on habit tracking or monitoring
consecutive days of activity.


<br/>


## Installation
To install the package via npm, run:

```
npm i @biblebytes/streak
```


<br/>


## Get Status
Calculates streak status on a list of dates.

```ts
function Process(dates:DateString[]): Status
```

 - **dates**: List of [Date Strings](#date-string)
 - **Returns**: [Status](#status-structure) object

**Examples**:
```typescript
import { GetStatus, type DateString, GetDate } from "@biblebytes/streak";

const dates1:DateString[] = [
    "2022-12-21", "2022-12-22", "2022-12-23",
    "2022-12-24", "2022-12-25"
];

GetStatus(dates1);
// {
//     totalDays: 5,
//     hasStreakToday: false,
//     hasStreakYesterday: false,
//     currentStreak: 0,
//     latestStreak: 5,
//     longestStreak: 5,
// }

const dates2:DateString[] = [
    "2024-09-29", "2024-09-30", "2024-10-01",
    "2024-10-02", "2024-10-03", "2024-10-04",
    getDateDaysAgo(3), getDateDaysAgo(2), getDateDaysAgo(1)
];
GetStatus(dates2);
// {
//     totalDays: 9,
//     hasStreakToday: false,
//     hasStreakYesterday: true,
//     currentStreak: 3,
//     latestStreak: 3,
//     longestStreak: 6,
// }

const dates3:DateString[] = [
    "2024-09-29", "2024-09-30", "2024-10-01",
    "2024-10-02", "2024-10-03", "2024-10-04",
    getDateDaysAgo(3), getDateDaysAgo(2), getDateDaysAgo(1),
    GetDate()
];
GetStatus(dates3);
// {
//     totalDays: 10,
//     hasStreakToday: true,
//     hasStreakYesterday: true,
//     currentStreak: 4,
//     latestStreak: 4,
//     longestStreak: 6,
// }
```


<br/>


## Get Date
Get current date as a [date string](#date-string)

```ts
function GetDate(): DateString
```

 - **Returns**: current date as [date string](#date-string)

**Examples**:
```typescript
import { GetStatus, type DateString, GetDate } from "@biblebytes/streak";

// On September, 1st 2024
GetDate();
// "2024-09-01"
```


<br/>


## Date String
The date string is a format that is utilized by the library to store
dates as strings. The date format is `YYYY-MM-DD` with zero padding on the
month and day identifier.

**Examples**:
```typescript
import { type DateString } from "@biblebytes/streak";

let date1:DateString = "2001-12-29";
let date2:DateString = "2001-01-01";
```

<br/>


## Status Structure
The status structure types, is an object that stores all the streak information
for a list of dates.

 - **totalDays** - total amount of days provided
 - **hasStreakToday** - true if the list contains todays date
 - **hasStreakYesterday** - true if the list contains yesterdays date
 - **currentStreak** - length of current streak
 - **latestStreak** - length of most recent streak
 - **longestStreak** - length of longest streak over all dates

Streaks are reset when a full day ellipses from the last recorded activity.
This means `hasStreakToday` could be `false`, but the streak will still be held
until the end of the day, assuming `hasStreakYesterday` is `true`.

```ts
export type Status = {
    totalDays: number;
    hasStreakToday: boolean;
    hasStreakYesterday: boolean;
    currentStreak: number;
    latestStreak: number;
    longestStreak: number;
};
```
