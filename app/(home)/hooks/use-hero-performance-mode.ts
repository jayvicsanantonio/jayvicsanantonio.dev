"use client";

import { useState } from "react";

type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
};

type HeroPerformanceMode = {
  isConstrainedExperience: boolean;
  shouldLoadHeroVideo: boolean;
};

const SLOW_NETWORK_TYPES = new Set(["slow-2g", "2g", "3g"]);

function readHeroPerformanceMode(): HeroPerformanceMode {
  if (typeof navigator === "undefined") {
    return {
      isConstrainedExperience: false,
      shouldLoadHeroVideo: true,
    };
  }

  const nav = navigator as Navigator & {
    connection?: NavigatorConnection;
    mozConnection?: NavigatorConnection;
    webkitConnection?: NavigatorConnection;
    deviceMemory?: number;
  };

  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  const slowNetwork = connection?.effectiveType
    ? SLOW_NETWORK_TYPES.has(connection.effectiveType)
    : false;
  const saveDataEnabled = connection?.saveData === true;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const isConstrainedExperience = slowNetwork || saveDataEnabled || lowMemory || lowCpu;

  return {
    isConstrainedExperience,
    shouldLoadHeroVideo: !isConstrainedExperience,
  };
}

export default function useHeroPerformanceMode(): HeroPerformanceMode {
  const [mode] = useState(readHeroPerformanceMode);
  return mode;
}
