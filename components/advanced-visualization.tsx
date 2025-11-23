"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AdvancedVisualization() {
  const capacityData = [
    { month: "Week 1", before: 60, after: 72 },
    { month: "Week 2", before: 62, after: 75 },
    { month: "Week 3", before: 65, after: 79 },
    { month: "Week 4", before: 68, after: 85 },
    { month: "Week 8", before: 72, after: 92 },
    { month: "Week 12", before: 75, after: 98 },
  ]

  const efficiencyData = [
    { name: "Process Loss", value: 28, fill: "#ef4444" },
    { name: "Output Delivered", value: 72, fill: "#22c55e" },
  ]

  const processImprovementData = [
    { area: "Automation", value: 35 },
    { area: "Integration", value: 28 },
    { area: "Training", value: 22 },
    { area: "Optimization", value: 15 },
  ]

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-2xl animate-in fade-in zoom-in-95 duration-700">
        <h3 className="text-lg font-bold mb-4 text-gradient-text">Capacity Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={capacityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.1)" />
            <XAxis dataKey="month" stroke="rgba(147, 51, 234, 0.5)" />
            <YAxis stroke="rgba(147, 51, 234, 0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 10, 40, 0.8)", border: "1px solid rgba(147, 51, 234, 0.3)" }}
              cursor={{ stroke: "rgba(147, 51, 234, 0.2)" }}
            />
            <Line type="monotone" dataKey="before" stroke="#ef4444" strokeWidth={2} name="Before" />
            <Line type="monotone" dataKey="after" stroke="#22c55e" strokeWidth={2} name="After" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6 rounded-2xl animate-in fade-in zoom-in-95 duration-700 delay-200">
        <h3 className="text-lg font-bold mb-4 text-gradient-text">Output Efficiency</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={efficiencyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {efficiencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 10, 40, 0.8)", border: "1px solid rgba(147, 51, 234, 0.3)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6 rounded-2xl animate-in fade-in zoom-in-95 duration-700 delay-400">
        <h3 className="text-lg font-bold mb-4 text-gradient-text">Key Improvement Areas</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={processImprovementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.1)" />
            <XAxis dataKey="area" stroke="rgba(147, 51, 234, 0.5)" />
            <YAxis stroke="rgba(147, 51, 234, 0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(15, 10, 40, 0.8)", border: "1px solid rgba(147, 51, 234, 0.3)" }}
            />
            <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
