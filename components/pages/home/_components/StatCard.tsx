import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
}) => {
  const changeColorClass = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow p-6 flex items-start space-x-4">
      <div className="p-3 rounded-full bg-primary-100 text-primary-600">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <p className={`text-sm font-medium ${changeColorClass}`}>
          {change} vs. last period
        </p>
      </div>
    </div>
  );
};

export default StatCard; 