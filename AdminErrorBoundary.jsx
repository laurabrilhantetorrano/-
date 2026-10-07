import React from "react";

export default class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Erro na aplicação Nana & Mimi:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}>
        <div>
          <h1>Ops! Ocorreu um erro na página.</h1>
          <p>Atualize a página. Se o problema continuar, volte para o início.</p>
          <a href="/" style={{ color: "#df3e80", fontWeight: 700 }}>Voltar para a loja</a>
        </div>
      </main>
    );
  }
}
