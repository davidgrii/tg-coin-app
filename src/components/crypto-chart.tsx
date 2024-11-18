'use client'

import * as React from 'react'
import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { IChartCoinData } from '@/types'

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface IProps {
  chartData: IChartCoinData
}

export const CryptoChart: React.FC<IProps> = ({ chartData }) => {
  const [timeRange, setTimeRange] = useState("1d")

  if (!chartData) return null

  const getChartData = () => {
    switch (timeRange) {
      case "1d":
        return chartData.one_day.prices.map((price, index) => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
          marketCap: chartData.one_day.market_caps[index][1],
          volume: chartData.one_day.volumes[index][1],
        }))
      case "7d":
        return chartData.seven_days.prices.map((price, index) => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
          marketCap: chartData.seven_days.market_caps[index][1],
          volume: chartData.seven_days.volumes[index][1],
        }))
      default:
        return []
    }
  }

  const filteredData = getChartData()

  return (
    <Card className={'w-full rounded-xl border-chart border-[4px]'}>
      <CardContent className={'p-0'}>
        <ChartContainer config={chartConfig} className={'aspect-auto h-[250px] w-full'}>
          <ResponsiveContainer>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={true}
                tickMargin={5}
                minTickGap={10}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="price"
                type="monotone"
                fill="url(#fillPrice)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className={'border-chart border w-[94%] mx-auto'}></div>

        <div className={'flex justify-between text-sm border-chart mx-5 py-1.5'}>
          <div className={'flex gap-5 font-medium text-muted-foreground'}>
            <span onClick={() => setTimeRange('1d')}>1D</span>
            <span onClick={() => setTimeRange('7d')}>7D</span>
          </div>

          <span>14%</span>
        </div>
      </CardContent>
    </Card>
  )
}
