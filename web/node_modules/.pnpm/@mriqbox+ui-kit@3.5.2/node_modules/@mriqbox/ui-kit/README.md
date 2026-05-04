# Mri UI

![CI](https://github.com/mri-Qbox-Brasil/mri-ui-kit/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/@mriqbox/ui-kit)

Biblioteca oficial de componentes de UI para o ecossistema Mri.

Desenhada para ser moderna, responsiva e com suporte nativo a temas escuros (Dark Mode), utilizando **React**, **Tailwind CSS**, **Radix UI** e seguindo a arquitetura do **shadcn/ui**.

## 🚀 Como usar

Você pode utilizar esta biblioteca de duas formas principais:

### 1. Pacote NPM (Uso Tradicional)
Ideal se você quer apenas usar os componentes prontos e receber atualizações automáticas.

```bash
pnpm add @mriqbox/ui-kit
# ou
npm install @mriqbox/ui-kit
```

**Uso:**
```tsx
import { MriButton } from '@mriqbox/ui-kit';

export default function MyComponent() {
  return <MriButton>Clique aqui</MriButton>;
}
```

### 2. Shadcn CLI / Copy & Paste (Controle Total)
Ideal se você quer ter o código dos componentes no seu projeto para customizá-los livremente ("Own your UI").

Este projeto contém um arquivo `components.json` na raiz, permitindo o uso da CLI do shadcn.

**Adicionar componente via CLI (Novo):**
Você pode adicionar componentes individualmente (estilo Shadcn) direto do nosso repositório:

```bash
npx @mriqbox/ui-kit add mri-button
```
Isso irá baixar o código fonte do `MriButton.tsx` para `src/components/ui/MriButton.tsx` (ou diretório configurado, se detectado).

**Nota:** A CLI irá baixar apenas o arquivo do componente. Verifique se ele possui dependências de outros componentes `Mri*` e adicione-os também se necessário.

## ⚙️ Configuração (Para uso via NPM)

Se você instalou via NPM, precisa configurar seu projeto para carregar os estilos corretamente.

### 1. Importar CSS Global
Adicione no seu arquivo de entrada (ex: `main.tsx` ou `App.tsx`):
```tsx
import '@mriqbox/ui-kit/dist/style.css';
```

### 2. Configurar Tailwind CSS
No seu `tailwind.config.js`, adicione o caminho da biblioteca para o `content`:

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@mriqbox/ui-kit/dist/**/*.{js,mjs}" // <--- Adicione esta linha
  ],
  // ...
}
```

## 📚 Documentação
Para ver todos os componentes disponíveis e suas propriedades, consulte nosso Storybook:
[**Acessar Storybook**](https://ui.mriqbox.com.br)

## 🛠️ Desenvolvimento Local

1. Clone o repositório.
2. Instale dependências: `pnpm install`
3. Inicie o Storybook: `pnpm storybook`
