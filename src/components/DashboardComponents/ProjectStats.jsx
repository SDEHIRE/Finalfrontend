"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ZoomIn, ZoomOut, Lock } from "lucide-react"

const generateRandomData = (timeScale) => {
  const basePackage = Math.floor(Math.random() * (800000 - 500000) + 500000)
  const targetPackage = 1000000
  const steps = 5

  const data = []
  for (let i = 0; i < steps; i++) {
    const progress = i / (steps - 1)
    const packageValue = Math.round(basePackage + (targetPackage - basePackage) * progress)
    let time
    if (timeScale === "days") {
      time = `Day ${i * 30}`
    } else if (timeScale === "weeks") {
      time = `Week ${i * 4}`
    } else {
      time = `Month ${i}`
    }
    data.push({ time, package: packageValue })
  }

  return data
}

const formatIndianCurrency = (value) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  })
  return formatter.format(value).replace("₹", "₹ ")
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${formatIndianCurrency(entry.value)} / year`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DynamicProjectStats() {
  const [timeScale, setTimeScale] = useState("months")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFreezed, setIsFreezed] = useState(true)
  const [data, setData] = useState(() => generateRandomData(timeScale))
  const [currentPackage, setCurrentPackage] = useState(data[data.length - 1].package)
  const [progress, setProgress] = useState(Math.round((data[data.length - 1].package / 1000000) * 100))
  const [timeRemaining, setTimeRemaining] = useState(
    Math.max(0, Math.round((1000000 - data[data.length - 1].package) / 10000)),
  )

  const handleZoom = useCallback((factor) => {
    setZoomLevel((prevZoom) => Math.max(0.5, Math.min(prevZoom * factor, 2)))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFreezed) {
        setData((prevData) => {
          const newData = [...prevData]
          const lastIndex = newData.length - 1
          const newPackage = Math.min(1000000, newData[lastIndex].package + Math.random() * 10000)
          newData[lastIndex] = { ...newData[lastIndex], package: newPackage }
          setCurrentPackage(newPackage)
          setProgress(Math.round((newPackage / 1000000) * 100))
          setTimeRemaining(Math.max(0, Math.round((1000000 - newPackage) / 10000)))
          return newData
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isFreezed])

  useEffect(() => {
    setData(generateRandomData(timeScale))
  }, [timeScale])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Target Package Progress</h2>
        <div className="flex items-center gap-4">
          <select
            value={timeScale}
            onChange={(e) => setTimeScale(e.target.value)}
            className="w-[120px] p-2 border rounded"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => handleZoom(0.9)} className="p-2 border rounded">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button onClick={() => handleZoom(1.1)} className="p-2 border rounded">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">Target Package: Up to 10 LPA</p>

      <div className="relative overflow-hidden">
        <div className="h-[400px]" style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                domain={[0, 1000000]}
                ticks={[0, 200000, 400000, 600000, 800000, 1000000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={1000000} label="Target: 10 LPA" stroke="red" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="package"
                name="Current Package"
                stroke="hsl(210, 70%, 50%)"
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600">{formatIndianCurrency(currentPackage)}</div>
            <div className="text-sm text-gray-600">Current Package</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-semibold text-green-600">{progress}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-semibold text-purple-600">{timeRemaining} mo</div>
            <div className="text-sm text-gray-600">Time Remaining</div>
          </div>
        </div>

        {isFreezed && (
          <div className="absolute inset-0 backdrop-filter backdrop-blur-[2px] bg-white bg-opacity-10 flex items-center justify-center">
            <div className="text-center text-gray-800 bg-white bg-opacity-40 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Lock className="h-12 w-12 mx-auto mb-3 text-blue-500 opacity-80" />
              <p className="text-xl font-bold mb-1">Frozen!</p>
              <p className="text-base">Solve at least 15 problems to thaw</p>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full opacity-10"
                  style={{
                    width: `${Math.random() * 15 + 5}px`,
                    height: `${Math.random() * 15 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

