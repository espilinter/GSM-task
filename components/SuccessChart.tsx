import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
interface propsType {
    completed: number,
    pending: number
}

interface labelType {
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    percent: number,
    index: number,
}
const SuccessChart: React.FC<propsType> = ({ completed, pending }) => {
    const data = [
        { name: 'انجام شده', value: completed, color: '#1f1f46' },
        { name: 'در حال انجام', value: pending, color: '#28af65' },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel: React.FC<labelType> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x + 10} y={y + 2} fill="white" textAnchor={"center"} alignmentBaseline='middle' className='text-[10px]'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='text-center'>
            <PieChart width={100} height={60} >
                <Pie
                    label={renderCustomizedLabel}
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="100%"
                    outerRadius={50}
                    innerRadius={28}
                    startAngle={180}
                    endAngle={0}
                    fill="#8884d8"
                    paddingAngle={2}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default SuccessChart;
