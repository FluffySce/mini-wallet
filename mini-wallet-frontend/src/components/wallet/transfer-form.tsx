"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { api } from "@/lib/api";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  onSuccess: () => void;
};

export function TransferForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleTransfer = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/wallet/transfer", {
        receiver_email: email,

        amount: Number(amount) * 100,
      });

      setEmail("");
      setAmount("");

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Money</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Receiver Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            className="w-full"
            onClick={handleTransfer}
            disabled={loading}
          >
            {loading ? "Transferring..." : "Transfer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
