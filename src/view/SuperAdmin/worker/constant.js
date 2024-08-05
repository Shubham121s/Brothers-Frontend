import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

export const worker_status = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

export const payment_options = [
  {
    label: "Debit",
    value: "debit",
    color: "bg-red-50 text-red-500",
    content: <HiArrowTrendingDown />,
  },
  {
    label: "Credit",
    value: "credit",
    color: "bg-emerald-50 text-emerald-500",
    content: <HiArrowTrendingUp />,
  },
];
