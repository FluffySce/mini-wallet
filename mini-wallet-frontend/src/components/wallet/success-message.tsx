"use client";

import { useEffect, useState } from "react";

type SuccessMessageProps = {
  message: string;
  duration?: number;
};

export function SuccessMessage({
  message,
  duration = 3000,
}: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className="
        animate-in fade-in slide-in-from-bottom-4 duration-300
        fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:bottom-4 sm:slide-in-from-top-2
        bg-[#F0F5F2] dark:bg-[#2A4A3A]
        border border-[#6BA896] dark:border-[#4A8B75]
        text-[#4A6B5F] dark:text-[#B0E0C8]
        px-4 py-3 rounded-lg
        flex items-center gap-2
        shadow-lg
        max-w-sm
      "
    >
      <svg
        className="w-5 h-5 shrink-0 animate-in zoom-in-50 duration-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
