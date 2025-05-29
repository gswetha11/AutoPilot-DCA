import React from 'react';

interface ConfidenceGaugeProps {
  confidence: number; // 0 to 1
}

const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ confidence }) => {
  const getColor = () => {
    if (confidence >= 0.7) return 'bg-emerald-400';
    if (confidence >= 0.5) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const widthPercentage = `${confidence * 100}%`;
  
  return (
    <div className="relative w-full h-2 bg-[#2a2b36] rounded-full overflow-hidden">
      <div 
        className={`absolute top-0 left-0 h-full ${getColor()} transition-all duration-500 ease-out`}
        style={{ width: widthPercentage }}
      />
      
      {/* Threshold marker for 70% */}
      <div className="absolute top-0 left-[70%] h-full w-px bg-gray-400/30" />
      
      {/* Tick marks */}
      <div className="absolute top-full left-0 w-full flex justify-between text-xs text-gray-500 mt-1">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ConfidenceGauge;