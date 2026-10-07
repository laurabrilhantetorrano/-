import React from "react";

export default class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { erro: null };
  }

  static getDerivedStateFromError(error) {
    return { erro: error };
  }

  componentDidCatch(error, info) {
    console.error("Erro na área administrativa:", error, info);
  }

  render() {
    if (this.state.erro) {
      return (
        <main style={{ minHeight: "60vh", padding: "60px 24px", maxWidth: 900, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
          <h1 style={{ color: "#d92f68" }}>Não foi possível abrir a área administrativa</h1>
          <p style={{ lineHeight: 1.6 }}>
            A página encontrou um erro ao carregar. Volte para Minha conta e tente novamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ border: 0, borderRadius: 8, padding: "12px 18px", background: "#df3e80", color: "#fff", fontWeight: 700, cursor: "pointer" }}
          >
            Recarregar página
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
