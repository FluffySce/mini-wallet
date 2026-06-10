"use client";

import { useState, useEffect } from "react";

import { api } from "@/lib/api";

import { BalanceCard } from "@/components/wallet/balance-card";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchWallet();
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
      <BalanceCard balance={balance}></BalanceCard>
    </div>
  );
}
