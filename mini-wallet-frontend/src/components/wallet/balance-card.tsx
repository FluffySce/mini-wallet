import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  balance: number;
};
export function BalanceCard({ balance }: Props) {
  return (
    <Card
      className="
    bg-linear-to-r
    from-indigo-600
    to-violet-600
    text-white
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
    "
    >
      <CardHeader>
        <CardTitle className="text-white/80">Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl md:text-5xl font-bold">
          ₹ {(balance / 100).toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground mt-2">Available balance</p>
      </CardContent>
    </Card>
  );
}
