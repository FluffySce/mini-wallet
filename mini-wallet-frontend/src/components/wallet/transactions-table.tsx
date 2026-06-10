"use client";

import { Transaction } from "@/types/transactionType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  transactions: Transaction[];
};

export function TransactionsTable({ transactions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>

              <TableHead>Amount</TableHead>

              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.type}</TableCell>

                <TableCell>₹ {(tx.amount / 100).toFixed(2)}</TableCell>

                <TableCell>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
