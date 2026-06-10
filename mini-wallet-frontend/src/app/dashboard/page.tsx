"use client";

import { useState, useEffect } from "react";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { BalanceCard } from "@/components/wallet/balance-card";
import { TopupForm } from "@/components/wallet/topup-form";
import { TransferForm } from "@/components/wallet/transfer-form";
import { TransactionsTable } from "@/components/wallet/transactions-table";
import { SkeletonLoader } from "@/components/wallet/skeleton-loader";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  const fetchWallet = async () => {
    try {
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
  const fetchMe = async () => {
    try {
      const response = await api.get("/me");

      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      void fetchWallet();
      void fetchTransactions();
      void fetchMe();
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <div className="mb-10 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-600">
                Wallet System
              </span>
            </div>
          </div>

          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {/* Header */}

        <div className="mb-10 animate-in fade-in duration-500">
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1

              rounded-full

              bg-white
              border
              border-slate-200

              shadow-sm
            "
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Wallet System
            </span>
            <button
              onClick={handleLogout}
              className="
    px-4
    py-2

    text-sm
    font-medium

    bg-white
    border
    border-slate-200

    rounded-lg

    hover:bg-slate-100

    transition
  "
            >
              Logout
            </button>
          </div>

          <h1
            className="
              mt-5

              text-3xl
              sm:text-4xl
              md:text-5xl

              font-bold

              text-slate-900
            "
          >
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 max-w-xl">
            View your balance, add funds, transfer money and track activity.
          </p>
        </div>

        {/* Content */}

        <div className="grid gap-6 md:gap-8 animate-in fade-in duration-700">
          <div
            className="animate-in fade-in slide-in-from-top-4 duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <BalanceCard
              balance={balance}
              name={user.name}
              email={user.email}
            />
          </div>

          <div
            className="
              grid
              gap-6
              md:gap-8
              lg:grid-cols-2

              animate-in
              fade-in
              slide-in-from-top-4
              duration-500
            "
            style={{ animationDelay: "200ms" }}
          >
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

          <div
            className="animate-in fade-in slide-in-from-top-4 duration-500"
            style={{ animationDelay: "300ms" }}
          >
            <TransactionsTable transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
