import { TrendingUp, TrendingDown, Thermometer, Flame, Droplets, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: 'thermometer' | 'flame' | 'droplets' | 'leaf';
  color: 'red' | 'orange' | 'green' | 'blue';
  progress: number;
}

const iconComponents = {
  thermometer: Thermometer,
  flame: Flame,
  droplets: Droplets,
  leaf: Leaf,
};

const colorClasses = {
  red: {
    bg: 'bg-red-100 dark:bg-red-900/50',
    icon: 'text-red-600 dark:text-red-400',
    value: 'text-red-600 dark:text-red-400',
    change: 'text-red-500',
    progress: 'bg-red-500',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/50',
    icon: 'text-orange-600 dark:text-orange-400',
    value: 'text-orange-600 dark:text-orange-400',
    change: 'text-orange-500',
    progress: 'bg-orange-500',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    icon: 'text-green-600 dark:text-green-400',
    value: 'text-green-600 dark:text-green-400',
    change: 'text-green-500',
    progress: 'bg-green-500',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    icon: 'text-blue-600 dark:text-blue-400',
    value: 'text-blue-600 dark:text-blue-400',
    change: 'text-blue-500',
    progress: 'bg-blue-500',
  },
};

export default function MetricCard({
  title,
  subtitle,
  value,
  change,
  trend,
  icon,
  color,
  progress
}: MetricCardProps) {
  const IconComponent = iconComponents[icon];
  const colorClass = colorClasses[color];
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="widget-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn("p-2 rounded-lg", colorClass.bg)}>
            <IconComponent className={cn("w-5 h-5", colorClass.icon)} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <span className={cn("text-2xl font-bold", colorClass.value)}>
              {value}
            </span>
            <TrendIcon className={cn("w-4 h-4", colorClass.change)} />
          </div>
          <p className={cn("text-xs", colorClass.change)}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-300", colorClass.progress)}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
