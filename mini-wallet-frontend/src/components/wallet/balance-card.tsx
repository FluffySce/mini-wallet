import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnimatedNumber } from "./animated-number";

type Props = {
  balance: number;
  name: string;
  email: string;
};

export function BalanceCard({ balance, name, email }: Props) {
  return (
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

      <CardHeader className="relative border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle
            className="
              text-[10px]
              sm:text-xs

              font-semibold
              tracking-[0.2em]

              text-slate-500
            "
          >
            CURRENT BALANCE
          </CardTitle>

          <div
            className="
              h-3
              w-3
              rounded-full
              bg-emerald-500
              shrink-0

              shadow-[0_0_12px_rgba(34,197,94,0.4)]
            "
          />
        </div>
      </CardHeader>

      <CardContent className="relative pt-8 pb-8">
        <div className="animate-in fade-in duration-500">
          <div
            className="
              text-[10px]
              sm:text-xs

              tracking-[0.15em]
              uppercase

              text-slate-400
              mb-3
            "
          >
            Available Funds
          </div>

          <p
            className="
              text-4xl
              sm:text-6xl
              md:text-7xl

              font-extrabold

              tracking-tight
              leading-none

              tabular-nums

              text-slate-900
            "
          >
            ₹
            <AnimatedNumber value={balance / 100} decimals={2} duration={800} />
          </p>

          <div
            className="
    mt-8

    flex
    items-end
    justify-between

    gap-4
  "
          >
            <div>
              <p
                className="
        text-[10px]
        uppercase
        tracking-[0.15em]
        text-slate-400
        mb-1
      "
              >
                Account Holder
              </p>

              <p className="font-medium text-slate-800">{name}</p>

              <p className="text-sm text-slate-500">{email}</p>
            </div>

            <div
              className="
      text-right
      hidden
      sm:block
    "
            >
              <p
                className="
        text-[10px]
        uppercase
        tracking-[0.15em]
        text-slate-400
      "
              >
                Wallet System
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
