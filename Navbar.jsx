import React, { useState } from "react";
import { CircleUserRound, ShoppingCart, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCarrinho } from "./CarrinhoContext";
import logo from "./assets/logo.jpg";
import "./Navbar.css";

export default function Navbar() {
  const { usuario, isLogado } = useAuth();
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const totalItens = carrinho.reduce(
    (total, item) => total + Number(item.quantidade || 0),
    0
  );

  function pesquisar(e) {
    e?.preventDefault();
    const termo = busca.trim();
    navigate(termo ? `/?busca=${encodeURIComponent(termo)}` : "/");
  }

  return (
    <header className="site-navbar">
      <Link to="/" className="site-navbar-logo" aria-label="Nana & Mimi">
        <img src={logo} alt="Nana & Mimi" />
      </Link>

      <nav className="site-navbar-menu">
        <Link to="/sobre-nos">Sobre nós</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/">Roupas</Link>
      </nav>

      <form className="site-navbar-search" onSubmit={pesquisar} role="search">
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto..."
          aria-label="Buscar produto"
        />
        <button type="submit" className="site-navbar-search-button" aria-label="Pesquisar">
          <Search size={19} strokeWidth={2} />
        </button>
      </form>

      <div className="site-navbar-actions">
        <Link
          to={isLogado ? "/minha-conta" : "/login"}
          className="site-navbar-account"
          title={isLogado ? "Minha conta" : "Entrar"}
        >
          <CircleUserRound size={30} />
          <span>
            <strong>{isLogado ? usuario?.nome || "Olá!" : "Entrar"}</strong>
            <small>Minha conta</small>
          </span>
        </Link>

        <Link to="/carrinho" className="site-navbar-cart" title="Carrinho">
          <ShoppingCart size={30} />
          {totalItens > 0 && <b>{totalItens}</b>}
        </Link>
      </div>
    </header>
  );
}
