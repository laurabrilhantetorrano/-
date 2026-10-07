import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCarrinho } from './CarrinhoContext';
import { useAuth } from './AuthContext';
import { formatarPreco } from './api';
import './Carrinho.css';

export default function Carrinho() {
  const {
    carrinho,
    carregando,
    removerDoCarrinho,
    atualizarQuantidade,
  } = useCarrinho();

  const { isCliente, isLogado } = useAuth();

  const total = carrinho.reduce(
    (acc, item) => acc + Number(item.preco) * Number(item.quantidade),
    0
  );

  if (!isLogado) {
    return (
      <div className="carrinho-container">
        <div className="carrinho-header-pagina">
          <h1>Meu Carrinho</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p className="carrinho-vazio">Entre na sua conta para acessar seu carrinho.</p>
          <Link to="/login" style={{ color: '#000', fontWeight: 'bold' }}>
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  if (!isCliente) {
    return (
      <div className="carrinho-container">
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p className="carrinho-vazio">Contas de funcionário não possuem carrinho.</p>
          <Link to="/" style={{ color: '#000', fontWeight: 'bold' }}>
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-container">
      <div className="carrinho-header-pagina">
        <h1>Meu Carrinho</h1>
      </div>

      {carregando ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          Carregando seu carrinho...
        </div>
      ) : carrinho.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p className="carrinho-vazio">Seu carrinho está vazio.</p>
          <Link to="/" style={{ color: '#000', fontWeight: 'bold' }}>
            Comprar
          </Link>
        </div>
      ) : (
        <div className="carrinho-conteudo">
          <div className="carrinho-lista">
            {carrinho.map((item) => (
              <div key={item.id} className="carrinho-item-pagina">
                {item.img ? (
                  <img src={item.img} alt={item.nome} />
                ) : (
                  <div style={{ width: 100, height: 100 }}>Sem imagem</div>
                )}

                <div className="info-item">
                  <h3>{item.nome}</h3>
                  <p className="preco-item">{formatarPreco(item.preco)}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => atualizarQuantidade(item.id, Math.max(0, item.quantidade - 1))}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={16} />
                    </button>

                    <span>Qtd: {item.quantidade}</span>

                    <button
                      type="button"
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  className="btn-remover"
                  onClick={() => removerDoCarrinho(item.id)}
                  aria-label={`Remover ${item.nome}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo">
            <h2>Resumo do Pedido</h2>

            <div className="linha-resumo">
              <span>Subtotal</span>
              <span>{formatarPreco(total)}</span>
            </div>

            <div className="linha-resumo">
              <span>Frete</span>
              <span>Grátis</span>
            </div>

            <div className="linha-resumo total">
              <strong>Total</strong>
              <strong>{formatarPreco(total)}</strong>
            </div>

            <button className="btn-finalizar" disabled>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
