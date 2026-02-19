"use client";

import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";

interface PriceDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface PricePathChartProps {
  priceData: PriceDataPoint[];
  rangeLower: number;
  rangeUpper: number;
  currentPrice: number;
}

export function PricePathChart({
  priceData,
  rangeLower,
  rangeUpper,
  currentPrice,
}: PricePathChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || priceData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 460,
      layout: {
        background: { color: "#09090b" },
        textColor: "#71717a",
      },
      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const formattedData = priceData.map((d) => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candlestickSeries.setData(formattedData);
    chart.timeScale().fitContent();

    const rangeLineLower = chart.addLineSeries({
      color: "#a855f7",
      lineWidth: 2,
      lineStyle: 2,
    });
    const rangeLineUpper = chart.addLineSeries({
      color: "#a855f7",
      lineWidth: 2,
      lineStyle: 2,
    });

    rangeLineLower.setData([
      { time: priceData[0].time, value: rangeLower },
      { time: priceData[priceData.length - 1].time, value: rangeLower },
    ]);
    rangeLineUpper.setData([
      { time: priceData[0].time, value: rangeUpper },
      { time: priceData[priceData.length - 1].time, value: rangeUpper },
    ]);

    const currentLine = chart.addLineSeries({
      color: "#eab308",
      lineWidth: 3,
    });
    currentLine.setData([
      { time: priceData[priceData.length - 1].time, value: currentPrice },
    ]);

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 460);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [priceData, rangeLower, rangeUpper, currentPrice]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-3xl overflow-hidden border border-zinc-800"
    />
  );
}
