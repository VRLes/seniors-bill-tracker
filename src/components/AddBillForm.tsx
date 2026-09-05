"use client";

import { useState } from "react";
import { Bill, BillCategory } from "@/types/bill";

const categories: { value: BillCategory; label: string }[] = [
  { value: "electricity", label: "Electricity" },
  { value: "water", label: "Water" },
  { value: "internet", label: "Internet" },
  { value: "phone", label: "Phone" },
  { value: "rent", label: "Rent" },
  { value: "insurance", label: "Insurance" },
  { value: "subscription", label: "Subscription" },
  { value: "other", label: "Other" },
];

export function AddBillForm({ onAdd }: { onAdd: (bill: Bill) => void }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<BillCategory>("other");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;

    onAdd({
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      dueDate,
      paid: false,
      category,
    });

    setName("");
    setAmount("");
    setDueDate("");
    setCategory("other");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--bg-card)] rounded-2xl shadow-md p-6 mb-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
        Add a Bill
      </h2>

      <div>
        <label className="block text-base font-medium mb-1 text-[var(--text-primary)]">
          Bill name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Electricity"
          className="w-full border-2 border-[var(--border-default)] focus:border-[var(--accent-button-bg)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-4 text-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1 text-[var(--text-primary)]">
          Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 120.50"
          className="w-full border-2 border-[var(--border-default)] focus:border-[var(--accent-button-bg)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-4 text-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1 text-[var(--text-primary)]">
          Due date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border-2 border-[var(--border-default)] focus:border-[var(--accent-button-bg)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-4 text-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1 text-[var(--text-primary)]">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as BillCategory)}
          className="w-full border-2 border-[var(--border-default)] focus:border-[var(--accent-button-bg)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-4 text-lg outline-none"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--accent-button-bg)] text-white text-xl font-semibold rounded-xl py-4 shadow-md hover:bg-[var(--accent-button-hover)] hover:shadow-lg transition-all"
      >
        Add Bill
      </button>
    </form>
  );
}
