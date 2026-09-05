"use client";

import { Bill } from "@/types/bill";
import { AlertCircle, Clock } from "lucide-react";

export function ReminderBanner({ bills }: { bills: Bill[] }) {
  const today = new Date();
  const in7days = new Date();
  in7days.setDate(today.getDate() + 7);

  const unpaid = bills.filter((b) => !b.paid);

  const overdue = unpaid.filter((b) => new Date(b.dueDate) < today);
  const dueSoon = unpaid.filter((b) => {
    const due = new Date(b.dueDate);
    return due >= today && due <= in7days;
  });

  if (overdue.length === 0 && dueSoon.length === 0) {
    return (
      <div className="bg-[var(--banner-ok-bg)] border-2 border-[var(--banner-ok-border)] rounded-2xl p-4 mb-6 text-center">
        <p className="text-[var(--banner-ok-text)] font-semibold text-lg">
          All caught up — nothing due soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      {overdue.map((bill) => (
        <div
          key={bill.id}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-lg">
            <span className="font-semibold">{bill.name}</span> was due{" "}
            {new Date(bill.dueDate).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
            })}{" "}
            — it's overdue.
          </p>
        </div>
      ))}

      {dueSoon.map((bill) => (
        <div
          key={bill.id}
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <p className="text-amber-700 text-lg">
            <span className="font-semibold">{bill.name}</span> is due{" "}
            {new Date(bill.dueDate).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
            })}
            .
          </p>
        </div>
      ))}
    </div>
  );
}
