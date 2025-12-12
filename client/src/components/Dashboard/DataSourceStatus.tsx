import type { DataSourceStatus } from "@shared/schema";

interface DataSourceStatusProps {
  statuses: DataSourceStatus[];
}

const statusColors = {
  active: 'bg-green-500',
  delayed: 'bg-yellow-500',
  error: 'bg-red-500',
};

const statusTextColors = {
  active: 'text-green-600 dark:text-green-400',
  delayed: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

export default function DataSourceStatus({ statuses }: DataSourceStatusProps) {
  return (
    <div className="space-y-2 text-xs">
      {statuses.map((status) => (
        <div key={status.name} className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">{status.name}</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${statusColors[status.status as keyof typeof statusColors]}`}></div>
            <span className={`capitalize ${statusTextColors[status.status as keyof typeof statusTextColors]}`}>
              {status.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
