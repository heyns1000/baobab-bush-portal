import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Maximize2 } from "lucide-react";

interface LineChartProps {
  title: string;
  subtitle: string;
  data: { label: string; value: number }[];
  dataSource: string;
  height?: number;
  showControls?: boolean;
  onExport?: () => void;
  onFullscreen?: () => void;
}

export default function LineChart({ 
  title, 
  subtitle, 
  data, 
  dataSource, 
  height = 400,
  showControls = true,
  onExport,
  onFullscreen
}: LineChartProps) {
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

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: title,
          data: data.map(d => d.value),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
            },
            ticks: {
              color: '#6B7280',
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6B7280',
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        elements: {
          point: {
            hoverBorderWidth: 3,
          }
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
