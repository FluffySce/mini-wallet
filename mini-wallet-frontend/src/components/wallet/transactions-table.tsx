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

function TransactionTypeIcon({ type }: { type: string }) {
  if (type === "TOPUP") {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V15a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V5a1 1 0 012 0v9.586l4.293-4.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TransactionsTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <Card
        className="
          border
          border-slate-200
          bg-white
          shadow-sm
          hover:shadow-md
          transition-all
          duration-200
        "
      >
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-slate-800 font-semibold">
            Transactions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 mb-4">
              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <p className="font-medium text-slate-700">No transactions yet</p>

            <p className="text-sm text-slate-500 mt-1">
              Your transaction history will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="
        relative
        overflow-hidden

        border
        border-slate-200

        bg-white

        shadow-sm

        transition-all
        duration-200

        hover:shadow-md
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-[0.02]
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <CardHeader className="relative border-b border-slate-100">
        <CardTitle className="text-slate-800 font-semibold">
          Transactions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="-mx-4 -mb-4 sm:mx-0 sm:mb-0">
          {/* Mobile View */}

          <div className="sm:hidden space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={tx.id}
                className="
                  animate-in
                  fade-in
                  duration-300

                  border
                  border-slate-200

                  bg-slate-50

                  p-4
                  rounded-lg
                "
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex items-center justify-center
                        w-8 h-8
                        rounded-full
                        shrink-0

                        ${
                          tx.type === "TOPUP"
                            ? "bg-emerald-500 text-white"
                            : "bg-blue-500 text-white"
                        }
                      `}
                    >
                      <TransactionTypeIcon type={tx.type} />
                    </div>

                    <span className="font-medium text-sm text-slate-700">
                      {tx.type}
                    </span>
                  </div>

                  <Badge
                    className={
                      tx.status === "SUCCESS"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>

                <div className="text-right">
                  <span className="font-semibold text-slate-900">
                    ₹{(tx.amount / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}

          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="font-semibold text-slate-500 uppercase tracking-wide">
                    Type
                  </TableHead>

                  <TableHead className="text-right font-semibold text-slate-500 uppercase tracking-wide">
                    Amount
                  </TableHead>

                  <TableHead className="font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((tx, index) => (
                  <TableRow
                    key={tx.id}
                    className="
                      animate-in
                      fade-in
                      duration-300

                      hover:bg-slate-50

                      transition-colors
                    "
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            flex items-center justify-center
                            w-8 h-8
                            rounded-full

                            ${
                              tx.type === "TOPUP"
                                ? "bg-emerald-500 text-white"
                                : "bg-blue-500 text-white"
                            }
                          `}
                        >
                          <TransactionTypeIcon type={tx.type} />
                        </div>

                        <span className="font-medium text-slate-700">
                          {tx.type}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-semibold text-slate-900">
                      ₹{(tx.amount / 100).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          tx.status === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
