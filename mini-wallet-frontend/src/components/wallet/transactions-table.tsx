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

import { Badge } from "@/components/ui/badge";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  transactions: Transaction[];
};

export function TransactionsTable({ transactions }: Props) {
  return (
    <Card
      className="
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
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
                  <TableCell>
                    <Badge
                      variant={tx.type === "TOPUP" ? "default" : "secondary"}
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>

                  <TableCell>₹ {(tx.amount / 100).toFixed(2)}</TableCell>

                  <TableCell>
                    <Badge className="bg-green-500 hover:bg-green-500">
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
