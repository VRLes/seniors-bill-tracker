"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Bill } from "@/types/bill";
import { BillIcon } from "@/components/BillIcon";

function getFinancialYearRange(offsetFromCurrent: number) {
  const now = new Date();
  const currentFYStartYear =
    now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  const fyStartYear = currentFYStartYear + offsetFromCurrent;
  const start = new Date(fyStartYear, 6, 1);
  const end = new Date(fyStartYear + 1, 5, 30);
  return { start, end };
}

export default function HistoryPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [activePreset, setActivePreset] = useState<
    "thisFY" | "lastFY" | "custom"
  >("thisFY");

  useEffect(() => {
    const saved = localStorage.getItem("bills");
    if (saved) setBills(JSON.parse(saved));
  }, []);

  function applyPreset(preset: "thisFY" | "lastFY") {
    const offset = preset === "thisFY" ? 0 : -1;
    const { start, end } = getFinancialYearRange(offset);
    setRangeStart(start.toISOString().split("T")[0]);
    setRangeEnd(end.toISOString().split("T")[0]);
    setActivePreset(preset);
  }

  const paidBillsInRange = useMemo(() => {
    if (!rangeStart || !rangeEnd) return [];
    const start = new Date(rangeStart);
    const end = new Date(rangeEnd);
    end.setHours(23, 59, 59, 999);

    return bills
      .filter((b) => b.paid)
      .filter((b) => {
        const due = new Date(b.dueDate);
        return due >= start && due <= end;
      })
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
  }, [bills, rangeStart, rangeEnd]);

  const total = paidBillsInRange.reduce((sum, b) => sum + b.amount, 0);

  return (
    <main className="min-h-screen bg-[var(--bg-page)] p-8 max-w-2xl mx-auto">
      <Link
        href="/"
        className="print:hidden inline-block bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] text-lg font-medium rounded-xl px-5 py-3 shadow-md hover:shadow-lg transition-all mb-6"
      >
        ← Back to My Bills
      </Link>

      <h1 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
        Paid Bills History
      </h1>

      <div className="print:hidden mb-6">
        <Link
          href="/help#history"
          className="inline-block bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] text-lg font-medium rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all"
        >
          How does this work?
        </Link>
      </div>

      <div className="print:hidden bg-[var(--bg-card)] rounded-2xl shadow-md p-6 mb-6 space-y-4">
        <p className="text-lg font-medium text-[var(--text-primary)]">
          Choose a date range
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => applyPreset("thisFY")}
            className={`text-lg font-medium rounded-xl px-5 py-3 border-2 transition-all ${
              activePreset === "thisFY"
                ? "bg-[var(--accent-button-bg)] text-white border-[var(--accent-button-bg)]"
                : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-default)]"
            }`}
          >
            This financial year
          </button>
          <button
            onClick={() => applyPreset("lastFY")}
            className={`text-lg font-medium rounded-xl px-5 py-3 border-2 transition-all ${
              activePreset === "lastFY"
                ? "bg-[var(--accent-button-bg)] text-white border-[var(--accent-button-bg)]"
                : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-default)]"
            }`}
          >
            Last financial year
          </button>
        </div>

        <details
          className="pt-2"
          onToggle={(e) => {
            if ((e.target as HTMLDetailsElement).open)
              setActivePreset("custom");
          }}
        >
          <summary className="cursor-pointer text-base font-medium text-[var(--accent-text)]">
            Or choose a custom date range
          </summary>
          <div className="flex flex-wrap gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                From
              </label>
              <input
                type="date"
                value={rangeStart}
                onChange={(e) => {
                  setRangeStart(e.target.value);
                  setActivePreset("custom");
                }}
                className="border-2 border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 text-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                To
              </label>
              <input
                type="date"
                value={rangeEnd}
                onChange={(e) => {
                  setRangeEnd(e.target.value);
                  setActivePreset("custom");
                }}
                className="border-2 border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 text-lg outline-none"
              />
            </div>
          </div>
        </details>
      </div>

      {rangeStart && rangeEnd && (
        <>
          <div className="bg-[var(--bg-card)] rounded-2xl shadow-md p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[var(--text-secondary)] text-sm">
                {new Date(rangeStart).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {" – "}
                {new Date(rangeEnd).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                {paidBillsInRange.length} bill
                {paidBillsInRange.length !== 1 ? "s" : ""} paid
              </p>
            </div>
            <p className="text-3xl font-bold text-[var(--accent-text)]">
              ${total.toFixed(2)}
            </p>
          </div>

          {paidBillsInRange.length > 0 && (
            <div className="print:hidden mb-3">
              <Link
                href="/help#print"
                className="inline-block bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] text-lg font-medium rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all"
              >
                How do I print or save a PDF?
              </Link>
            </div>
          )}

          {paidBillsInRange.length > 0 && (
            <button
              onClick={() => window.print()}
              className="print:hidden w-full bg-[var(--accent-button-bg)] text-white text-xl font-semibold rounded-xl py-4 shadow-md hover:bg-[var(--accent-button-hover)] hover:shadow-lg transition-all mb-6"
            >
              Print this list
            </button>
          )}

          <div className="space-y-4">
            {paidBillsInRange.length === 0 ? (
              <p className="text-[var(--text-secondary)] text-lg text-center py-8">
                No paid bills found in this date range.
              </p>
            ) : (
              paidBillsInRange.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-[var(--bg-card)] rounded-2xl shadow-md p-6 flex items-center gap-4"
                >
                  <BillIcon category={bill.category} />
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-[var(--text-primary)]">
                      {bill.name}
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      Due: {new Date(bill.dueDate + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    ${bill.amount.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}
