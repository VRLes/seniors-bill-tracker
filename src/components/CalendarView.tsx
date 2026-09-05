"use client";

import { useState, useMemo } from "react";
import { Bill } from "@/types/bill";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarView({
  bills,
  onSelectDay,
}: {
  bills: Bill[];
  onSelectDay: (dayBills: Bill[]) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthLabel = currentMonth.toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      cells.push(new Date(year, month, d));
    }
    return cells;
  }, [currentMonth]);

  function billsOnDay(date: Date) {
    return bills.filter((b) => {
      const due = new Date(b.dueDate);
      return (
        due.getFullYear() === date.getFullYear() &&
        due.getMonth() === date.getMonth() &&
        due.getDate() === date.getDate()
      );
    });
  }

  function isToday(date: Date) {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  function dotColor(dayBills: Bill[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isOverdue = dayBills.some(
      (b) => !b.paid && new Date(b.dueDate) < today,
    );
    const hasUnpaid = dayBills.some((b) => !b.paid);

    if (isOverdue) return "bg-red-500";
    if (hasUnpaid) return "bg-amber-500";
    return "bg-[var(--calendar-paid-dot)]";
  }

  function changeMonth(offset: number) {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1),
    );
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-[var(--calendar-hover-bg)]"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--accent-text)]" />
        </button>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          {monthLabel}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-[var(--calendar-hover-bg)]"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-[var(--accent-text)]" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-[var(--text-secondary)] mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, i) => {
          if (!date) return <div key={i} />;
          const dayBills = billsOnDay(date);
          const clickable = dayBills.length > 0;

          return (
            <button
              key={i}
              type="button"
              onClick={() => clickable && onSelectDay(dayBills)}
              disabled={!clickable}
              aria-label={
                clickable
                  ? `${date.getDate()}: ${dayBills.map((b) => b.name).join(", ")}`
                  : `${date.getDate()}, no bills`
              }
              className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1 ${
                isToday(date)
                  ? "border-[var(--calendar-today-border)]"
                  : "border-[var(--border-default)]"
              } ${clickable ? "cursor-pointer hover:bg-[var(--calendar-hover-bg)]" : "cursor-default"}`}
            >
              <span className="text-sm text-[var(--text-primary)]">
                {date.getDate()}
              </span>
              {dayBills.length > 0 && (
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${dotColor(dayBills)}`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
          Overdue
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />{" "}
          Due
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--calendar-paid-dot)] inline-block" />{" "}
          Paid
        </span>
      </div>
    </div>
  );
}
