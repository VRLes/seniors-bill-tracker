export type BillCategory =
  | "electricity"
  | "water"
  | "internet"
  | "phone"
  | "rent"
  | "insurance"
  | "subscription"
  | "other";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  category: BillCategory;
}
