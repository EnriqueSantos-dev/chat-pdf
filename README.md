# Chat com PDF

Aplicativo para interagir com qualquer PDF usando a api de Embeddings da **OpenAI** e o framework **LangChain**. Com esse app vc pode fazer qualquer tipo de pergunta relacionada ao PDF upado.

## Tecnologias usadas

- Clerk.dev
- Docker
- Redis
- LangChain
- NextJS 14
- Drizzle ORM
- ShadcnUI

## Como rodar o projeto

Para conseguir rodar o projeto é necessário ter criar um projeto na [clerk](https://clerk.com), uma conta na [openai](https://openai.com) e ter o [docker](https://docs.docker.com/get-docker) instalado na sua máquina.

### Variáveis de ambiente

Crie um arquivo .env.local no seu projeto e preencha com as suas variáveis de ambiente.

```bash
cp .env.example .env.local
```

### Instalando dependências

```bash
npm install -g pnpm@latest && pnpm install
```

### Iniciando os containers Docker

```bash
docker compose up -d
```

### Iniciando a aplicação NextJS

```
pnpm dev
```

Agora vc pode acessar a aplicação através da url [http://localhost:3000](http://localhost:3000) e se tudo ocorreu bem já poderá usar o app
