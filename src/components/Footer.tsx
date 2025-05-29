import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-4">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="flex items-center justify-center space-x-1">
          <span>Powered by Allora's predictive oracle</span>
          <Heart className="h-3 w-3 text-red-500" fill="#ef4444" />
        </div>
        <p>© {new Date().getFullYear()} AutoPilot DCA</p>
      </div>
    </footer>
  );
};

export default Footer;