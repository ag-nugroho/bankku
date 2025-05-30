import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { day: 'Sat', deposit: 220, withdraw: 180 },
  { day: 'Sun', deposit: 350, withdraw: 120 },
  { day: 'Mon', deposit: 180, withdraw: 280 },
  { day: 'Tue', deposit: 320, withdraw: 180 },
  { day: 'Wed', deposit: 400, withdraw: 220 },
  { day: 'Thu', deposit: 180, withdraw: 160 },
  { day: 'Fri', deposit: 420, withdraw: 380 },
];

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex justify-end gap-6 mb-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600 font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip Component for Weekly Activity
const CustomTooltipWeekly = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-1">{`Day: ${label}`}</p>
        {payload.map((pld, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-2.5 h-2.5 rounded-full mr-2" 
                style={{ backgroundColor: pld.fill }}
              />
              <span className="text-sm mr-2" style={{ color: pld.fill === '#16DBCC' ? '#0D9488' : '#2563EB' }}>{`${pld.name}:`}</span>
            </div>
            <span className="text-sm font-medium" style={{ color: pld.fill === '#16DBCC' ? '#0D9488' : '#2563EB' }}>{`$${pld.value}`}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const WeeklyActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 dashboard-card">

      <CustomLegend payload={[
        { value: 'Deposit', color: '#16DBCC' },
        { value: 'Withdraw', color: '#396AFF' }
      ]} />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            barCategoryGap="25%" 
          >
            <CartesianGrid strokeDasharray="3 3" stroke='#E5E7EB' />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              domain={[0, 500]}
              tickFormatter={(value) => `$${value}`}
            />
            {/* Use the custom tooltip component */}
            <Tooltip content={<CustomTooltipWeekly />} cursor={{ fill: 'rgba(230, 230, 230, 0.3)' }} />
            <Bar 
              dataKey="deposit" 
              fill="#16DBCC" 
              name="Deposit"
              radius={[6, 6, 0, 0]}
              barSize={12}
            />
            <Bar 
              dataKey="withdraw" 
              fill="#396AFF" 
              name="Withdraw"
              radius={[6, 6, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyActivity;