import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from '@mui/x-charts';
import { styled } from '@mui/material/styles';

const ExpenseStatistics = () => {
  const data = [
    { id: 0, value: 30, label: "Entertainment", color: "#343C6A" },
    { id: 1, value: 15, label: "Bill Expense", color: "#FC7900" },
    { id: 2, value: 20, label: "Investment", color: "#FA00FF" },
    { id: 3, value: 35, label: "Others", color: "#396AFF" },
  ];

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 14,
    fontWeight: 600,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const valueFormatter = (item) => `${item.value}%`;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 dashboard-card">
      
        <div className="h-64">
          <PieChart
            series={[
              {
                data: data,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5,
                valueFormatter,
              },
            ]}
            slotProps={{
              legend: { hidden: true },
            }}
            height={300}
            width={400}
          >
          </PieChart>
        </div>
        
        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-8">
          {data.map((item) => (
            <div key={item.id} className="flex items-center">
            </div>
          ))}
        </div>
      </div>
  );
};

export default ExpenseStatistics;