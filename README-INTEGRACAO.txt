NANA & MIMI — VERSÃO INTEGRADA

O que foi corrigido nesta versão:
- Imagens dos 8 produtos originais voltaram a aparecer usando os arquivos que já estão em src/assets.
- Produtos continuam vindo do backend /products.
- Carrinho continua vinculado ao usuário e salvo no backend.
- Botão "Finalizar compra" agora abre a etapa "Completar pedido".
- A etapa de checkout pede nome, e-mail, telefone, endereço e forma de pagamento.
- Ao confirmar, o carrinho é limpo e aparece uma confirmação. É uma simulação para o TCC; não existe gateway de pagamento real.
- Minha conta ganhou layout novo, dados do usuário e botão "Sair da conta" com texto.
- No topo da loja, o ícone de login agora mostra o nome do usuário e "Minha conta" quando conectado.
- URLs de imagens do Render são normalizadas para HTTPS.
- Para os produtos originais, o frontend usa as imagens locais quando o Render ainda não tiver o arquivo em /uploads.

CONFIGURAÇÃO DO VERCEL
Mantenha:
VITE_API_URL=https://back-ahgw.onrender.com

Não coloque barra / no final.

CONFIGURAÇÃO OPCIONAL DO RENDER
Pode adicionar:
PUBLIC_API_URL=https://back-ahgw.onrender.com

Depois de substituir os arquivos:
1. Faça commit/push do frontend.
2. Faça um novo deploy no Vercel.
3. Se alterar o backend, faça commit/push no repositório do backend e aguarde o Render redeployar.
