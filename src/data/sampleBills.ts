import { Bill } from "@/types/bill";

export const sampleBills: Bill[] = [
  {
    id: "1",
    name: "Electricity",
    amount: 120.5,
    dueDate: "2026-09-15",
    paid: false,
    category: "electricity",
  },
  {
    id: "2",
    name: "Internet",
    amount: 79.99,
    dueDate: "2026-09-10",
    paid: true,
    category: "internet",
  },
  {
    id: "3",
    name: "Water",
    amount: 45.0,
    dueDate: "2026-09-20",
    paid: false,
    category: "water",
  },
];
