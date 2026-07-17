"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BannerProps {
  showBanner: boolean;
  handleCloseBanner: () => void;
  bannerImageUrl: string | null;
}

const Banner: React.FC<BannerProps> = ({ showBanner, handleCloseBanner, bannerImageUrl }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the target date for the countdown
  const targetDate = new Date("2026-06-10T23:59:59").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  if (!showBanner || !bannerImageUrl) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="relative rounded-r-2xl md:rounded-3xl overflow-hidden">
        <X
          className="absolute top-3.5 right-3.5 text-2xl p-1 bg-neutral-200/30 rounded-full text-center border-none text cursor-pointer z-10"
          onClick={handleCloseBanner}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerImageUrl}
          alt="Banner"
          className="h-auto max-h-[70vh] w-auto"
        />
        <div className="absolute top-11/13 left-1/5 -translate-x-1/2 -translate-y-1/2 text-black text-center">
          <div className="flex font-roboto items-center space-x-1 md:space-x-2">
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-4xl font-bold">
                {formatNumber(countdown.days)}
              </span>
              <span className="hidden md:block text-xs">Days</span>
            </div>
            <span className="text-lg md:text-2xl md:pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-4xl font-bold">
                {formatNumber(countdown.hours)}
              </span>
              <span className="hidden md:block text-xs">Hours</span>
            </div>
            <span className="text-lg md:text-2xl md:pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-4xl font-bold">
                {formatNumber(countdown.minutes)}
              </span>
              <span className="hidden md:block text-xs">Minutes</span>
            </div>
            <span className="text-lg md:text-2xl md:pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-4xl font-bold">
                {formatNumber(countdown.seconds)}
              </span>
              <span className="hidden md:block text-xs">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
