import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
  </div>
);

export default Loader;
