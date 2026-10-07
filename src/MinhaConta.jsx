import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useCarrinho } from "./CarrinhoContext";

export default function MinhaConta() {
  const { usuario, logout, isCliente } = useAuth();
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();

  const sair = () => {
    logout();
    navigate("/");
  };

  if (!usuario) {
    return (
      <div style={{ maxWidth: 700, margin: "60px auto", padding: 20, textAlign: "center" }}>
        <h1>Minha conta</h1>
        <p>Você ainda não está conectado.</p>
        <Link to="/login">Entrar</Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 850,
      margin: "40px auto",
      padding: "20px",
      fontFamily: "inherit"
    }}>
      <div style={{ marginBottom: 25 }}>
        <Link to="/" style={{ color: "#000", textDecoration: "none", fontWeight: "bold" }}>
          ← Voltar para a loja
        </Link>
      </div>

      <div style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 30,
        background: "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 25 }}>
          <CircleUserRound size={50} />
          <div>
            <h1 style={{ margin: 0 }}>Minha conta</h1>
            <p style={{ margin: "5px 0 0", color: "#666" }}>
              {usuario.tipo === "funcionario" ? "Funcionário" : "Cliente"}
            </p>
          </div>
        </div>

        <div style={{ lineHeight: 1.8 }}>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
          {usuario.cargo && <p><strong>Cargo:</strong> {usuario.cargo}</p>}
        </div>

        {isCliente && (
          <Link
            to="/carrinho"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 15,
              color: "#000",
              fontWeight: "bold"
            }}
          >
            <ShoppingCart size={20} />
            Meu carrinho ({carrinho.reduce((total, item) => total + Number(item.quantidade || 0), 0)})
          </Link>
        )}

        <div style={{ marginTop: 30 }}>
          <button
            type="button"
            onClick={sair}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fff",
              cursor: "pointer"
            }}
          >
            <LogOut size={18} />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
