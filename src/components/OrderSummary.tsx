
import React from 'react';
import { ShoppingCart, Truck } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal, 
  shipping, 
  total, 
  itemCount 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingCart className="text-agro-green" size={24} />
        Resumo do Pedido
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <Truck size={16} />
            Entrega
          </span>
          <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-xl font-bold text-agro-green">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
