# 🎮 FURIA Chatbot Frontend

Este é o frontend do **FURIA Chatbot**, um sistema de perguntas e respostas sobre a organização da FURIA. A aplicação é construída com **Next.js** e fornece uma interface simples e intuitiva para os usuários interagirem com a API do chatbot. Usuários podem fazer perguntas sobre a FURIA e receber respostas em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** (Framework para construção da aplicação React)
- **React** (Biblioteca para construção de interfaces)
- **TypeScript** (Para maior segurança no desenvolvimento)
- **Tailwind CSS** (Framework de estilização utilitária)
- **NextAuth.js** (Autenticação)
- **Shadcn UI** (Componentes acessíveis e configuráveis)

---

## 📁 Estrutura do Projeto

```bash
.
├── public/                          # Arquivos estáticos (imagens, etc.)
│   ├── logo-furia.png               # Logo da FURIA
│   └── bg.png                       # Imagem de fundo
├── src/                             # Fonte do projeto
│   ├── app/                         # Páginas e rotas do Next.js
│   │   ├── api/                     # API routes (autenticação com o OAuth)
│   │   ├── chat/                    # Página do Chat
│   │   └── home/                    # Página de login
│   │   └── globals.css              # Arquivo global de estilização
│   │   └── layout.tsx               # Layout da aplicação
│   │   └── page.tsx                 # Página inicial da aplicação
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── chat/                    # Componentes específicos do chat
│   │   ├── home/                    # Componentes de home e login
│   │   └── ui/                      # Componentes do Shadcn UI
│   ├── hooks/                       # Hooks personalizados
│   ├── lib/                         # Bibliotecas auxiliares e funções de utilidade
├── .env                             # Variáveis de ambiente
├── package.json                     # Dependências do projeto e scripts
└── tsconfig.json                    # Configurações do TypeScript
```

## 📌 Funcionalidades

**Página Inicial (Home):**

- Tela de login com redirecionamento para o chat se o usuário estiver autenticado.
- Exibe um login simples com botões de autenticação (pode ser via Google e GitHub).
- Oferece uma imagem de fundo e o logo da FURIA.

**Página de Chat:**

- A interface de chat exibe o AppSidebar com foto e nome de usuário e botão de logout.
- O ChatCard permite enviar perguntas ao backend e exibir as respostas.

## 📲 Como Rodar Localmente

**1. Clone este repositório:**
```bash
git clone https://github.com/seu-usuario/furia-chat-frontend.git
cd furia-chat-frontend
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Crie o arquivo .env com as variáveis de ambiente necessárias:**
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret-key-here
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRETyour-client-secret
```

**4. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

**A aplicação estará disponível no http://localhost:3000 ou na porta configurada.**

## 💻 Como Funciona

**Login**
- Quando o usuário acessa o site pela primeira vez, ele é redirecionado para a página de login. O login é feito utilizando o NextAuth.js, e, uma vez autenticado, o usuário é redirecionado para a página de chat.

**Chat**
- A página de chat contém um componente de barra lateral (AppSidebar) e um card de chat (ChatCard). O ChatCard permite que o usuário faça perguntas, e as respostas são mostradas assim que o backend retornar a resposta.
- O ChatCard também envia as perguntas para o backend e exibe as respostas. Se uma pergunta não for reconhecida, ele retorna uma resposta padrão.

## 🔒 Autenticação
A aplicação utiliza o NextAuth.js para gerenciar a autenticação. O usuário pode se autenticar com provedores como Google e GitHub. Para configurar a autenticação localmente, é necessário configurar as variáveis de ambiente em um arquivo .env.

## 📝 Contribuição
Se você quiser sugerir melhorias ou contribuir com o código, fique à vontade para abrir um pull request.

## 👨‍💻 Autor
Desenvolvido por Felipe Santana, inspirado na organização da FURIA.






