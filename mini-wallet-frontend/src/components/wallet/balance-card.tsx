import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  balance: number;
};
export function BalanceCard({ balance }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-bold">₹ {(balance / 100).toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mt-2">Available balance</p>
      </CardContent>
    </Card>
  );
}
