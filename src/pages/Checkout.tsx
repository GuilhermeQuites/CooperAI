
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CartItem, { CartItemData } from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import PaymentGateway from '@/components/PaymentGateway';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Função para carregar produtos da URL ou usar dados de exemplo
  useEffect(() => {
    const loadCartFromURL = () => {
      try {
        const productsParam = searchParams.get('products');
        if (productsParam) {
          const decodedProducts = JSON.parse(decodeURIComponent(productsParam));
          setCartItems(decodedProducts);
        } else {
          // Dados de exemplo para demonstração
          setCartItems([
            {
              id: '1',
              name: 'Tomate Orgânico',
              price: 8.50,
              quantity: 2,
              unit: 'kg'
            },
            {
              id: '2', 
              name: 'Alface Hidropônica',
              price: 4.90,
              quantity: 3,
              unit: 'maço'
            },
            {
              id: '3',
              name: 'Cenoura Baby',
              price: 12.00,
              quantity: 1,
              unit: 'kg'
            }
          ]);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos da URL:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os produtos do carrinho.",
          variant: "destructive"
        });
      }
    };

    loadCartFromURL();
  }, [searchParams]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O produto foi removido do seu carrinho.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 8.90; // Frete grátis acima de R$ 50
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simular processamento do pagamento
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Pagamento realizado com sucesso! 🎉",
        description: "Seu pedido foi confirmado e será processado em breve.",
      });
      
      // Redirecionar para página de sucesso ou limpar carrinho
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Houve um problema ao processar seu pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-agro-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Leaf className="mx-auto text-agro-green mb-4" size={64} />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-6">
              Adicione alguns produtos frescos da nossa cooperativa!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-agro-green hover:bg-agro-green-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Voltar às Compras
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agro-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-agro-green hover:text-agro-green-dark transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Leaf className="text-agro-green" size={28} />
              <h1 className="text-xl font-bold text-gray-800">
                Cooperativa Agro - Checkout
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Carrinho */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Seus Produtos ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
            </h2>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Coluna da Direita - Resumo e Pagamento */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              itemCount={itemCount}
            />

            <PaymentGateway
              total={total}
              onPayment={handlePayment}
              isProcessing={isProcessing}
            />

            {/* Informações Adicionais */}
            <div className="bg-white rounded-xl p-4 mt-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Leaf size={16} className="text-agro-green" />
                <span>
                  Produtos frescos direto da nossa cooperativa. 
                  {shipping === 0 && ' Frete grátis aplicado!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
