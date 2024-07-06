import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
interface propsType {
    completed: number,
    pending: number
}
const SuccessChart: React.FC<propsType> = ({ completed, pending }) => {
    const data = [
        { name: 'انجام شده', value: completed, color: '#1f1f46' },
        { name: 'در حال انجام', value: pending, color: '#28af65' },
    ];

    return (
        <div className='text-center'>
            <PieChart width={100} height={60} >
                <Pie
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
