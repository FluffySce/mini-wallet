"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SuccessMessage } from "./success-message";

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

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

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
    <>
      <Card
        className="
          relative
          overflow-hidden

          border
          border-slate-200

          bg-white
          text-slate-900

          shadow-sm

          transition-all
          duration-200

          hover:shadow-md
        "
      >
        {/* Subtle grid texture */}
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
          <div className="flex items-center justify-between">
            <CardTitle
              className="
                text-xs
                font-semibold
                tracking-[0.2em]
                text-slate-600
              "
            >
              TOP UP
            </CardTitle>

            <div
              className="
                h-3
                w-3
                rounded-full
                bg-emerald-500
                shadow-[0_0_10px_rgba(34,197,94,0.4)]
              "
            />
          </div>
        </CardHeader>

        <CardContent className="relative pt-6">
          <div className="space-y-5">
            <div>
              <label
                className="
                  block
                  mb-2

                  text-[10px]
                  sm:text-xs

                  font-medium
                  tracking-[0.15em]
                  uppercase

                  text-slate-500
                "
              >
                Amount
              </label>

              <Input
                type="number"
                placeholder="Enter amount in ₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                className="
                p-3
                  h-12

                  border
                  border-slate-300

                  bg-white
                  text-slate-900

                  shadow-none

                  focus-visible:ring-0
                  focus-visible:border-emerald-500
                  focus-visible:shadow-[0_0_0_3px_rgba(34,197,94,0.12)]

                  placeholder:text-slate-400
                "
              />
            </div>

            {error && (
              <div
                className="
                  animate-in
                  fade-in
                  slide-in-from-top-2
                  duration-200

                  border
                  border-red-200

                  bg-red-50

                  px-3
                  py-3

                  text-sm
                  font-medium
                  text-red-700

                  flex
                  items-center
                  gap-2
                "
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>

                {error}
              </div>
            )}

            <Button
              onClick={handleTopup}
              disabled={loading || !isValidAmount}
              className="
                w-full
                h-12

                bg-emerald-600
                text-white

                hover:bg-emerald-700

                transition-all
                duration-200

                shadow-sm

                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  ADDING FUNDS...
                </span>
              ) : (
                "ADD MONEY"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {success && (
        <SuccessMessage message="✓ Funds added successfully!" duration={3000} />
      )}
    </>
  );
}
