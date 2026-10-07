NANA & MIMI - INTEGRACAO FRONTEND + BACKEND

FRONTEND (Vercel)
Configure:
VITE_API_URL=https://back-ahgw.onrender.com
Depois faça um novo deploy.

BACKEND (Render)
A pasta backend/ contém o backend atualizado. O package.json inclui multer.
Mantenha no Render:
JWT_SECRET=uma-chave-secreta-forte
FRONTEND_URL=https://1fjstwfyh-35hecb1pr-laurabrilhante1.vercel.app

INTEGRADO
- Produtos da página inicial vêm de /products.
- Página de produto vem de /products/:id.
- Cadastro/login salvam o JWT.
- Minha conta mostra nome, e-mail e tipo.
- Carrinho usa /cart e fica vinculado ao usuário.
- Adicionar, remover e alterar quantidade usam o backend.
- O botão da conta abre /minha-conta quando logado.
- Imagens do Render são tratadas para HTTPS.
- CORS aceita os domínios Vercel conhecidos e previews vercel.app.

Não coloque um .env real no GitHub. Use as variáveis do Vercel/Render.
