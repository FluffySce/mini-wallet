"use client";

import { useState, useEffect } from "react";

import { api } from "@/lib/api";

import { BalanceCard } from "@/components/wallet/balance-card";
import { TopupForm } from "@/components/wallet/topup-form";
import { TransferForm } from "@/components/wallet/transfer-form";
import { TransactionsTable } from "@/components/wallet/transactions-table";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchWallet = async () => {
    try {
      console.log("wallet request");
      const response = await api.get("/wallet");
      setBalance(response.data.balance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");

      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchWallet();
      void fetchTransactions();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-8">Loading Wallet...</div>;
  }
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome Back</p>
      <div className="grid gap-6">
        <BalanceCard balance={balance} />

        <div className="grid md:grid-cols-2 gap-6">
          <TopupForm
            onSuccess={() => {
              fetchWallet();
              fetchTransactions();
            }}
          />

          <TransferForm
            onSuccess={() => {
              fetchWallet();
              fetchTransactions();
            }}
          />
        </div>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}
