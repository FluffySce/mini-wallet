"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Mini Wallet</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
