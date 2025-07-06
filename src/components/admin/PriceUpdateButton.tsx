// In an admin component
import { useState } from 'react';

export function PriceUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [result, setResult] = useState<{success: boolean, message?: string} | null>(null);
  
  const handleUpdatePrices = async () => {
    setIsUpdating(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/update-prices', { method: 'POST' });
      const data = await response.json();
      
      setResult({
        success: data.success,
        message: data.success ? 'Prices updated successfully!' : `Error: ${data.error}`
      });
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div>
      <button
        onClick={handleUpdatePrices}
        disabled={isUpdating}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isUpdating ? 'Updating Prices...' : 'Update Product Prices'}
      </button>
      
      {result && (
        <div className={`mt-2 p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}