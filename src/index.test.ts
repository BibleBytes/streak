import { expect } from "chai";
import { GetStatus } from "./index.js";
import type { DateString, Status } from "./model.js";
import {
    getDateDaysAgo,
    isDateConsecutive,
    parseDateString,
} from "./utilities.js";

describe("Parse Date String", () => {
    it("Parse Date String 1", () => {
        const date = "2024-10-17";
        const actual = parseDateString(date).toISOString();
        expect(actual).to.equal("2024-10-17T00:00:00.000Z");
    });

    it("Parse Date String 2", () => {
        const date = "2010-12-31";
        const actual = parseDateString(date).toISOString();
        expect(actual).to.equal("2010-12-31T00:00:00.000Z");
    });

    it("Parse Date String 3", () => {
        const date = "2001-12-29";
        const actual = parseDateString(date).toISOString();
        expect(actual).to.equal("2001-12-29T00:00:00.000Z");
    });

    it("Parse Date String 4", () => {
        const date = "1999-01-01";
        const actual = parseDateString(date).toISOString();
        expect(actual).to.equal("1999-01-01T00:00:00.000Z");
    });

    it("Parse Date String 5", () => {
        const date = "2022-08-05";
        const actual = parseDateString(date).toISOString();
        expect(actual).to.equal("2022-08-05T00:00:00.000Z");
    });
});

describe("Consecutive Dates", () => {
    it("Consecutive 1", () => {
        const date1 = "2024-09-25";
        const date2 = "2024-09-26";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 2", () => {
        const date1 = "2019-01-01";
        const date2 = "2019-01-02";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 3", () => {
        const date1 = "2001-09-24";
        const date2 = "2001-09-25";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 4", () => {
        const date1 = "2001-12-29";
        const date2 = "2001-12-30";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 5", () => {
        const date1 = "1999-03-12";
        const date2 = "1999-03-13";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 6", () => {
        const date1 = "2006-06-09";
        const date2 = "2006-06-10";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 7", () => {
        const date1 = "2012-12-29";
        const date2 = "2012-12-30";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 8 - Month Spanning", () => {
        const date1 = "2024-09-30";
        const date2 = "2024-10-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 9 - Month Spanning", () => {
        const date1 = "1999-06-30";
        const date2 = "1999-07-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 10 - Month Spanning", () => {
        const date1 = "2003-07-31";
        const date2 = "2003-08-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 11 - Month Spanning", () => {
        const date1 = "2008-10-31";
        const date2 = "2008-11-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 12 - Year Spanning", () => {
        const date1 = "2008-12-31";
        const date2 = "2009-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 13 - Year Spanning", () => {
        const date1 = "1999-12-31";
        const date2 = "2000-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 14 - Year Spanning", () => {
        const date1 = "2000-12-31";
        const date2 = "2001-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 15 - Year Spanning", () => {
        const date1 = "2020-12-31";
        const date2 = "2021-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Consecutive 16 - Year Spanning", () => {
        const date1 = "2024-12-31";
        const date2 = "2025-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(true);
    });

    it("Nonconsecutive 1", () => {
        const date1 = "2024-09-25";
        const date2 = "2024-09-27";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 2", () => {
        const date1 = "2019-01-01";
        const date2 = "2019-01-03";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 3", () => {
        const date1 = "2001-09-24";
        const date2 = "2001-09-26";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 4", () => {
        const date1 = "2001-12-26";
        const date2 = "2001-12-30";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 5", () => {
        const date1 = "1999-03-12";
        const date2 = "1999-03-18";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 6", () => {
        const date1 = "2006-06-09";
        const date2 = "2006-06-11";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 7 - Month Spanning", () => {
        const date1 = "2001-11-26";
        const date2 = "2001-12-30";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 8 - Month Spanning", () => {
        const date1 = "1999-03-12";
        const date2 = "1999-09-18";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 9 - Month Spanning", () => {
        const date1 = "2006-06-09";
        const date2 = "2006-12-11";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 10 - Year Spanning", () => {
        const date1 = "2008-12-31";
        const date2 = "2009-01-02";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 11 - Year Spanning", () => {
        const date1 = "1999-12-31";
        const date2 = "2001-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 12 - Year Spanning", () => {
        const date1 = "2000-12-30";
        const date2 = "2001-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 13 - Year Spanning", () => {
        const date1 = "2020-12-31";
        const date2 = "2025-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });

    it("Nonconsecutive 14 - Year Spanning", () => {
        const date1 = "2024-12-30";
        const date2 = "2025-01-01";
        const isConsecutive = isDateConsecutive(date1, date2);
        expect(isConsecutive).to.equal(false);
    });
});

describe("Streak", () => {
    it("Single Past Streak (1 Day)", () => {
        const status = GetStatus(["2024-09-25"]);
        checkStatus(status, {
            totalDays: 1,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 1,
            longestStreak: 1,
        });
    });

    it("Single Past Streak (2 Day)", () => {
        const status = GetStatus(["2024-09-25", "2024-09-26"]);
        checkStatus(status, {
            totalDays: 2,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 2,
            longestStreak: 2,
        });
    });

    it("Single Past Streak (5 Day)", () => {
        const status = GetStatus([
            "2022-12-21",
            "2022-12-22",
            "2022-12-23",
            "2022-12-24",
            "2022-12-25",
        ]);
        checkStatus(status, {
            totalDays: 5,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 5,
            longestStreak: 5,
        });
    });

    it("Single Past Streak - Month Spanning (9 Day)", () => {
        const status = GetStatus([
            "2024-09-26",
            "2024-09-27",
            "2024-09-28",
            "2024-09-29",
            "2024-09-30",
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",
        ]);
        checkStatus(status, {
            totalDays: 9,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 9,
            longestStreak: 9,
        });
    });

    it("Multiple Past Streak - Month Spanning (12 Day)", () => {
        const status = GetStatus([
            "2024-09-26",
            "2024-09-27",
            "2024-09-28",
            "2024-09-29",
            "2024-09-30",
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",

            "2024-12-29",
            "2024-12-30",
            "2024-12-31",
        ]);
        checkStatus(status, {
            totalDays: 12,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 3,
            longestStreak: 9,
        });
    });

    it("Multiple Past Streak - Multiple Month Spanning (46 Day)", () => {
        const status = GetStatus([
            "2019-02-26",
            "2019-02-27",
            "2019-02-28",

            "2019-03-01",
            "2019-03-02",
            "2019-03-03",
            "2019-03-04",
            "2019-03-05",
            "2019-03-06",
            "2019-03-07",
            "2019-03-08",
            "2019-03-09",
            "2019-03-10",
            "2019-03-11",
            "2019-03-12",
            "2019-03-13",
            "2019-03-14",
            "2019-03-15",
            "2019-03-16",
            "2019-03-17",
            "2019-03-18",
            "2019-03-19",
            "2019-03-20",
            "2019-03-21",
            "2019-03-22",
            "2019-03-23",
            "2019-03-24",
            "2019-03-25",
            "2019-03-26",
            "2019-03-27",
            "2019-03-28",
            "2019-03-29",
            "2019-03-30",
            "2019-03-31",

            "2019-04-01",
            "2019-04-02",
            "2019-04-03",

            "2019-04-05",
            "2019-04-06",
            "2019-04-07",
            "2019-04-08",
            "2019-04-09",
            "2019-04-10",
            "2019-04-11",
            "2019-04-12",
            "2019-04-13",
        ]);
        checkStatus(status, {
            totalDays: 46,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 9,
            longestStreak: 37,
        });
    });

    it("Multiple Past Streak - Year Spanning (21 Day)", () => {
        const status = GetStatus([
            "2024-09-26",
            "2024-09-27",
            "2024-09-28",
            "2024-09-29",
            "2024-09-30",
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",

            "2024-12-29",
            "2024-12-30",
            "2024-12-31",

            "2025-01-01",
            "2025-01-02",
            "2025-01-03",
            "2025-01-04",
            "2025-01-05",
            "2025-01-06",
            "2025-01-07",
            "2025-01-08",
            "2025-01-09",
        ]);
        checkStatus(status, {
            totalDays: 21,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 12,
            longestStreak: 12,
        });
    });

    it("Multiple Past Streak - Year Spanning (15 Day)", () => {
        const status = GetStatus([
            "2024-09-26",
            "2024-09-27",
            "2024-09-28",
            "2024-09-29",
            "2024-09-30",
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",

            "2024-12-29",
            "2024-12-30",
            "2024-12-31",

            "2025-01-01",
            "2025-01-02",
            "2025-01-03",
        ]);
        checkStatus(status, {
            totalDays: 15,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 6,
            longestStreak: 9,
        });
    });

    it("Single Current Streak - Today (1 Day)", () => {
        const status = GetStatus([getDateDaysAgo(0)]);
        checkStatus(status, {
            totalDays: 1,
            hasStreakToday: true,
            hasStreakYesterday: false,
            currentStreak: 1,
            latestStreak: 1,
            longestStreak: 1,
        });
    });

    it("Single Current Streak - Yesterday (1 Day)", () => {
        const status = GetStatus([getDateDaysAgo(1)]);
        checkStatus(status, {
            totalDays: 1,
            hasStreakToday: false,
            hasStreakYesterday: true,
            currentStreak: 1,
            latestStreak: 1,
            longestStreak: 1,
        });
    });

    it("Single Current Streak - 2 day ago (1 Day)", () => {
        const status = GetStatus([getDateDaysAgo(2)]);
        checkStatus(status, {
            totalDays: 1,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 1,
            longestStreak: 1,
        });
    });

    it("Single Current Streak - Today (4 Day)", () => {
        const status = GetStatus([
            getDateDaysAgo(3),
            getDateDaysAgo(2),
            getDateDaysAgo(1),
            getDateDaysAgo(0),
        ]);
        checkStatus(status, {
            totalDays: 4,
            hasStreakToday: true,
            hasStreakYesterday: true,
            currentStreak: 4,
            latestStreak: 4,
            longestStreak: 4,
        });
    });

    it("Single Current Streak - Yesteray (3 Day)", () => {
        const status = GetStatus([
            getDateDaysAgo(3),
            getDateDaysAgo(2),
            getDateDaysAgo(1),
        ]);
        checkStatus(status, {
            totalDays: 3,
            hasStreakToday: false,
            hasStreakYesterday: true,
            currentStreak: 3,
            latestStreak: 3,
            longestStreak: 3,
        });
    });

    it("Single Current Streak - 2 days ago (2 Day)", () => {
        const status = GetStatus([getDateDaysAgo(3), getDateDaysAgo(2)]);
        checkStatus(status, {
            totalDays: 2,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 2,
            longestStreak: 2,
        });
    });

    it("Single Current Streaks - Month Spanning - Today", () => {
        const status = GetStatus([...createDateRange(0, 40)]);
        checkStatus(status, {
            totalDays: 41,
            hasStreakToday: true,
            hasStreakYesterday: true,
            currentStreak: 41,
            latestStreak: 41,
            longestStreak: 41,
        });
    });

    it("Single Current Streaks - Month Spanning - Yesterday", () => {
        const status = GetStatus([...createDateRange(1, 40)]);
        checkStatus(status, {
            totalDays: 40,
            hasStreakToday: false,
            hasStreakYesterday: true,
            currentStreak: 40,
            latestStreak: 40,
            longestStreak: 40,
        });
    });

    it("Single Current Streaks - Month Spanning - 2 days ago", () => {
        const status = GetStatus([...createDateRange(2, 40)]);
        checkStatus(status, {
            totalDays: 39,
            hasStreakToday: false,
            hasStreakYesterday: false,
            currentStreak: 0,
            latestStreak: 39,
            longestStreak: 39,
        });
    });

    it("Multiple Current Streaks - Month Spanning - Today", () => {
        const status = GetStatus([
            ...createDateRange(60, 200),
            ...createDateRange(0, 40),
        ]);
        checkStatus(status, {
            totalDays: 182,
            hasStreakToday: true,
            hasStreakYesterday: true,
            currentStreak: 41,
            latestStreak: 41,
            longestStreak: 141,
        });
    });

    it("Single Current Streaks - Year Spanning - Yesterday", () => {
        const status = GetStatus([
            ...createDateRange(1, 400),
            ...createDateRange(402, 1002),
        ]);
        checkStatus(status, {
            totalDays: 1001,
            hasStreakToday: false,
            hasStreakYesterday: true,
            currentStreak: 400,
            latestStreak: 400,
            longestStreak: 601,
        });
    });

    it("Single Current Streaks - Year Spanning - Yoday", () => {
        const status = GetStatus([
            ...createDateRange(0, 400),
            ...createDateRange(402, 1002),
            ...createDateRange(1008, 1203),
        ]);
        checkStatus(status, {
            totalDays: 1198,
            hasStreakToday: true,
            hasStreakYesterday: true,
            currentStreak: 401,
            latestStreak: 401,
            longestStreak: 601,
        });
    });
});

function createDateRange(start: number, end: number): DateString[] {
    const dates: DateString[] = [];
    for (let i = end; i >= start; i--) {
        dates.push(getDateDaysAgo(i));
    }
    return dates;
}

function checkStatus(actual: Status, expected: Status) {
    expect(actual.totalDays, 'Incorrect "totalDays"').to.equal(
        expected.totalDays,
    );
    expect(actual.hasStreakToday, 'Incorrect "hasStreakToday"').to.equal(
        expected.hasStreakToday,
    );
    expect(
        actual.hasStreakYesterday,
        'Incorrect "hasStreakYesterday"',
    ).to.equal(expected.hasStreakYesterday);
    expect(actual.latestStreak, 'Incorrect "latestStreak"').to.equal(
        expected.latestStreak,
    );
    expect(actual.longestStreak, 'Incorrect "longestStreak"').to.equal(
        expected.longestStreak,
    );
    expect(actual.currentStreak, 'Incorrect "currentStreak"').to.equal(
        expected.currentStreak,
    );
}
