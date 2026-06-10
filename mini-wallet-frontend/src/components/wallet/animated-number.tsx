"use client";

import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  duration?: number;
};

export function AnimatedNumber({
  value,
  decimals = 2,
  duration = 800,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out-cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const prevValue = displayValue;
      const difference = value - prevValue;
      const newValue = prevValue + difference * easeProgress;

      setDisplayValue(newValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, displayValue, duration]);

  return displayValue.toFixed(decimals);
}
