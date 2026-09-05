import {
  Zap,
  Droplet,
  Wifi,
  Phone,
  Home,
  Shield,
  Repeat,
  HelpCircle,
} from "lucide-react";
import { BillCategory } from "@/types/bill";

const iconMap: Record<BillCategory, React.ElementType> = {
  electricity: Zap,
  water: Droplet,
  internet: Wifi,
  phone: Phone,
  rent: Home,
  insurance: Shield,
  subscription: Repeat,
  other: HelpCircle,
};

export function BillIcon({ category }: { category: BillCategory }) {
  const Icon = iconMap[category];
  return (
    <div className="bg-[var(--icon-bg)] rounded-full p-3 flex items-center justify-center">
      <Icon className="w-7 h-7 text-[var(--icon-text)]" />
    </div>
  );
}
