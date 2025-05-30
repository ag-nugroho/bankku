import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Jul", value: 200 },
  { name: "Aug", value: 400 },
  { name: "Sep", value: 300 },
  { name: "Oct", value: 600 },
  { name: "Nov", value: 500 },
  { name: "Dec", value: 800 },
  { name: "Jan", value: 700 },
];

const CustomTooltipBalance = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">{`Month: ${label}`}</p>
        <p className="text-sm text-blue-600">{`Value: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BalanceHistory = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 dashboard-card">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValueBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1C64F2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1C64F2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            {/* Use the custom tooltip component */}
            <Tooltip content={<CustomTooltipBalance />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1C64F2"
              fillOpacity={1}
              fill="url(#colorValueBalance)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: '#1C64F2' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceHistory;