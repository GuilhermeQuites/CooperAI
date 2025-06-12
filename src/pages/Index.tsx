
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const goToCheckout = () => {
    // Exemplo de como passar produtos via URL para o checkout
    const exampleProducts = [
      { id: '1', name: 'Tomate Orgânico', price: 8.50, quantity: 2, unit: 'kg' },
      { id: '2', name: 'Alface Hidropônica', price: 4.90, quantity: 3, unit: 'maço' },
      { id: '3', name: 'Cenoura Baby', price: 12.00, quantity: 1, unit: 'kg' }
    ];
    
    const productsParam = encodeURIComponent(JSON.stringify(exampleProducts));
    navigate('/checkout?products=' + productsParam);
  };

  return (
    <div className="min-h-screen bg-agro-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Leaf className="text-agro-green" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Cooperativa Agro
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Produtos frescos direto do campo para sua mesa. 
            Apoie a agricultura local e sustentável.
          </p>

          {/* Demonstração do Checkout */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tela de Checkout Cooperativa Agro
            </h2>
            
            <p className="text-gray-600 mb-8">
              Uma experiência de pagamento moderna e amigável, 
              especialmente desenvolvida para cooperativas agrícolas.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-agro-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  🛒
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Carrinho Dinâmico</h3>
                <p className="text-sm text-gray-600">
                  Listagem completa com controle de quantidade e preços
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-agro-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  📱
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Mobile First</h3>
                <p className="text-sm text-gray-600">
                  Design responsivo adaptado para todos os dispositivos
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-agro-green text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  🔒
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Pagamento Seguro</h3>
                <p className="text-sm text-gray-600">
                  Gateway de pagamento com múltiplas opções
                </p>
              </div>
            </div>

            <Button
              onClick={goToCheckout}
              className="bg-agro-green hover:bg-agro-green-dark text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingCart className="mr-2" size={20} />
              Ver Demonstração do Checkout
            </Button>
          </div>

          {/* Características do Visual */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🎨 Design System
              </h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Paleta de cores verde natural (#6FB14B)</li>
                <li>• Fundo neutro e acolhedor (#F0E4D4)</li>
                <li>• Tipografia legível e amigável</li>
                <li>• Cantos arredondados e design moderno</li>
                <li>• Ícones intuitivos do Lucide React</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                ⚡ Funcionalidades
              </h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Carrinho dinâmico via URL parameters</li>
                <li>• Controle de quantidade em tempo real</li>
                <li>• Cálculo automático de frete</li>
                <li>• Múltiplas opções de pagamento</li>
                <li>• Feedback visual e notifications</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>
              💡 Para usar em produção: passe os produtos via parâmetros de URL no formato JSON
            </p>
            <code className="bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
              /checkout?products=[{'{'}{"id":"1","name":"Produto","price":10.50,"quantity":1,"unit":"kg"}{'}'}]
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
