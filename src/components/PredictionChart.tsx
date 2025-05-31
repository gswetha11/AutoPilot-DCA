import React from 'react';
import { usePrediction } from '../context/PredictionContext';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PredictionChart: React.FC = () => {
  const { predictionHistory } = usePrediction();
  
  if (predictionHistory.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center card">
        <p className="text-slate-500">No chart data available yet</p>
      </div>
    );
  }

  const sortedHistory = [...predictionHistory].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const labels = sortedHistory.map(entry => 
    format(new Date(entry.timestamp), 'HH:mm')
  );
  
  const predictionData = sortedHistory.map(entry => entry.predictionValue);
  const confidenceData = sortedHistory.map(entry => entry.confidence);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Prediction Value',
        data: predictionData,
        borderColor: '#4facfe',
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#4facfe',
        pointBorderColor: '#4facfe',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4facfe',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Confidence',
        data: confidenceData,
        borderColor: '#00ff87',
        backgroundColor: 'rgba(0, 255, 135, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#00ff87',
        pointBorderColor: '#00ff87',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00ff87',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
        borderDash: [5, 5],
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: '#1e293b',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          tickColor: 'transparent',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          tickColor: 'transparent',
        },
        ticks: {
          color: '#4facfe',
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: 'Prediction Value',
          color: '#4facfe',
          font: {
            size: 12,
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#00ff87',
          font: {
            size: 11,
          },
        },
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Confidence',
          color: '#00ff87',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="h-64 card p-4">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default PredictionChart;