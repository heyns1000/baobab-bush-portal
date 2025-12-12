import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Maximize2 } from "lucide-react";

interface DoughnutChartProps {
  title: string;
  subtitle: string;
  data: { label: string; value: number }[];
  dataSource: string;
  height?: number;
  showControls?: boolean;
  onExport?: () => void;
  onFullscreen?: () => void;
}

export default function DoughnutChart({ 
  title, 
  subtitle, 
  data, 
  dataSource, 
  height = 400,
  showControls = true,
  onExport,
  onFullscreen
}: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const colors = ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.value),
          backgroundColor: colors.slice(0, data.length),
          borderColor: colors.slice(0, data.length),
          borderWidth: 2,
          hoverBorderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: {
                size: 12
              },
              color: '#6B7280',
              padding: 15,
            }
          },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '60%',
        interaction: {
          intersect: false,
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div className="flex flex-col h-full">
      {showControls && (title || subtitle) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            {onFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFullscreen}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="relative flex-grow" style={{ height: `${height}px` }}>
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      
      {showControls && dataSource && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Data Source: {dataSource}</span>
            <span className="text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
