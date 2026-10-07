import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cadastro.css";
import logo from "./assets/logo.jpg";

export default function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erroUsuario, setErroUsuario] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const [mensagem, setMensagem] = useState("");

  const lidarComCadastro = (e) => {
    e.preventDefault();

    // Limpa mensagens anteriores
    setErroUsuario("");
    setErroEmail("");
    setErroSenha("");
    setMensagem("");

    let formularioValido = true;

    // Validação do usuário
    if (usuario.trim() === "") {
      setErroUsuario("Por favor, informe um usuário.");
      formularioValido = false;
    }

    // Validação do e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      setErroEmail(
        "Por favor, insira um e-mail válido (ex: nome@email.com)."
      );
      formularioValido = false;
    }

    // Validação da senha
    if (senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      formularioValido = false;
    }

    // Se houver algum erro, não continua
    if (!formularioValido) {
      return;
    }

    // Cadastro realizado
    setMensagem("Cadastro realizado com sucesso!");

    // Limpa os campos
    setUsuario("");
    setEmail("");
    setSenha("");
  };

  return (
    <div className="cadastro-page-container">

      {/* Botão voltar */}
      <Link to="/" className="btn-voltar-home-cad">
        ← Voltar para o Início
      </Link>

      <section className="cadastro-section">

        {/* Área de boas-vindas */}
        <div className="boas-vindas-cad">

          <img src={logo} alt="Logo Nana & Mimi" />

          <h2>
            Bem-vindo! Por favor, insira seus dados para criar sua conta.
          </h2>

        </div>

        {/* Formulário */}
        <form
          onSubmit={lidarComCadastro}
          className="grupo-input-cad"
        >

          <h1>Cadastre-se</h1>

          {/* Usuário */}
          <label htmlFor="username">
            Usuário:
          </label>

          <input
            type="text"
            id="username"
            name="username"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setErroUsuario("");
              setMensagem("");
            }}
            required
          />

          {erroUsuario && (
            <span className="erro-mensagem">
              {erroUsuario}
            </span>
          )}

          {/* E-mail */}
          <label htmlFor="email">
            E-mail:
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErroEmail("");
              setMensagem("");
            }}
            required
          />

          {erroEmail && (
            <span className="erro-mensagem">
              {erroEmail}
            </span>
          )}

          {/* Senha */}
          <label htmlFor="senha">
            Senha:
          </label>

          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setErroSenha("");
              setMensagem("");
            }}
            required
          />

          {erroSenha && (
            <span className="erro-mensagem">
              {erroSenha}
            </span>
          )}

          {/* Mensagem de sucesso */}
          {mensagem && (
            <span className="mensagem-sucesso">
              {mensagem}
            </span>
          )}

          {/* Botão */}
          <button
            type="submit"
            className="btn-enviar-cad"
          >
            Cadastrar
          </button>

          {/* Login */}
          <p>
            Já tem uma conta?{" "}
            <Link to="/login">
              Faça login
            </Link>
          </p>

        </form>
      </section>
    </div>
  );
}
