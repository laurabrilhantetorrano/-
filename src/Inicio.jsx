import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { CircleUserRound, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import "swiper/css";
import React, { useEffect, useState } from "react";
import "./Inicio.css";
import { useCarrinho } from "./CarrinhoContext";
import { useAuth } from "./AuthContext";
import { apiFetch, formatarPreco, normalizarImagem } from "./api";

import slider1 from "./assets/slider1.png";
import slider2 from "./assets/slider2.png";
import logo from "./assets/logo.jpg";

export default function Inicio() {
  const { carrinho } = useCarrinho();
  const { isLogado } = useAuth();
  const [termoBusca, setTermoBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregandoProdutos(true);
        const data = await apiFetch('/products');

        if (ativo) {
          setProdutos((data || []).map((produto) => ({
            ...produto,
            id: Number(produto.id),
            preco: Number(produto.preco),
            preco_antigo: produto.preco_antigo == null ? null : Number(produto.preco_antigo),
            imagem: normalizarImagem(produto.imagem),
          })));
          setErroProdutos("");
        }
      } catch (erro) {
        console.error(erro);
        if (ativo) setErroProdutos("Não foi possível carregar os produtos.");
      } finally {
        if (ativo) setCarregandoProdutos(false);
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, []);

  const totalItens = carrinho.reduce(
    (acc, item) => acc + Number(item.quantidade || 0),
    0
  );

  const produtosFiltrados = produtos.filter((produto) =>
    String(produto.nome || "").toLowerCase().includes(termoBusca.toLowerCase())
  );

  const renderCard = (item) => (
    <div
      key={item.id}
      className="card-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Link
        to={`/produto/${item.id}`}
        className="card-link"
        style={{
          textDecoration: "none",
          color: "inherit",
          width: "100%"
        }}
      >
        <div className="card">
          {item.imagem ? (
            <img src={item.imagem} alt={item.nome} />
          ) : (
            <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
              Sem imagem
            </div>
          )}

          <p className="nome">{item.nome}</p>

          <p className="preco-antigo">
            {item.preco_antigo ? <del>{formatarPreco(item.preco_antigo)}</del> : null}
          </p>

          <p className="preco">{formatarPreco(item.preco)}</p>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="app">
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="menu">
          <Link to="/sobre-nos" style={{ textDecoration: "none", color: "inherit" }}>
            <span>Sobre nós</span>
          </Link>

          <Link to="/contato" style={{ textDecoration: "none", color: "inherit" }}>
            <span>Contato</span>
          </Link>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span>Roupas</span>
          </Link>
        </div>

        <div className="container-pesquisa">
          <input
            type="text"
            placeholder="Buscar produto..."
            className="input-pesquisa"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <Search size={18} className="icone-lupa" />
        </div>

        <div className="icons">
          <Link
            to={isLogado ? "/minha-conta" : "/login"}
            style={{ color: "inherit" }}
            title={isLogado ? "Minha conta" : "Entrar"}
          >
            <CircleUserRound size={30} />
          </Link>

          <Link
            to="/carrinho"
            style={{ color: "inherit", position: "relative" }}
          >
            <ShoppingCart size={30} />

            {totalItens > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-8px",
                  background: "#ff3b30",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "11px",
                  fontWeight: "bold"
                }}
              >
                {totalItens}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="banner">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          <SwiperSlide>
            <img src={slider1} alt="slider1" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={slider2} alt="slider2" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="info-barra">
        <div>💳 Parcele em até 12x</div>
        <div>🚛 Frete grátis acima de R$199</div>
        <div>🛡️ Site seguro</div>
        <div>🎯 Produto de qualidade</div>
      </div>

      {carregandoProdutos ? (
        <p style={{ textAlign: "center", padding: "40px" }}>Carregando produtos...</p>
      ) : erroProdutos ? (
        <p style={{ textAlign: "center", padding: "40px", color: "#b00020" }}>
          {erroProdutos}
        </p>
      ) : termoBusca.trim() !== "" ? (
        <>
          <h2 className="titulo-fileira">
            Resultados para "{termoBusca}"
          </h2>

          <div className="produtos">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map(renderCard)
            ) : (
              <p style={{ textAlign: "center", width: "100%", color: "#666", gridColumn: "1 / -1" }}>
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="titulo-fileira">Coleção Nana & Mimi</h2>
          <div className="produtos">
            {produtos.slice(0, 4).map(renderCard)}
          </div>

          {produtos.length > 4 && (
            <>
              <h2 className="titulo-fileira">Conforto & Estilo</h2>
              <div className="produtos">
                {produtos.slice(4, 8).map(renderCard)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
