import { LineChart, PlusCircle, List } from "lucide-react";

type LinkType = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const links: LinkType[] = [
  {
    href: "/add-memo",
    title: "メモ追加",
    icon: <PlusCircle />,
  },
  {
    href: "/memos",
    title: "メモ一覧",
    icon: <List />,
  },
  {
    href: "/statistic",
    title: "集計",
    icon: <LineChart />,
  },
];

export default links;
