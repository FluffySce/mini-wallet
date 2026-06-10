"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { api } from "@/lib/api";

type Props = {
  onSuccess: () => void;
};

export function TopupForm({ onSuccess }: Props) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isValidAmount = Number(amount) > 0;

  //removing the msgs post 3 seconds - UX
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);
  //top up handler logic
  const handleTopup = async () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      setError("");
      setSuccess("");
      await api.post("/wallet/topup", {
        amount: numericAmount * 100,
      });
      setError("");
      setAmount("");
      onSuccess();
      setSuccess("Money Added Sucessfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to add money");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Up Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Amount in rupees"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <Button
            className="w-full"
            onClick={handleTopup}
            disabled={loading || !isValidAmount}
          >
            {loading ? "Adding..." : "Add Money"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
