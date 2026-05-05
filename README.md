# ox_target

![](https://img.shields.io/github/downloads/overextended/ox_target/total?logo=github)
![](https://img.shields.io/github/downloads/overextended/ox_target/latest/total?logo=github)
![](https://img.shields.io/github/contributors/overextended/ox_target?logo=github)
![](https://img.shields.io/github/v/release/overextended/ox_target?logo=github)


A performant and flexible standalone "third-eye" targeting resource, with additional functionality for supported frameworks.

ox_target is the successor to qtarget, which was a mostly-compatible fork of bt-target.
To improve many design flaws, ox_target has been written from scratch and drops support for bt-target/qtarget standards, though partial compatibility is being implemented where possible.


## 📚 Documentation

https://overextended.dev/ox_target

## 💾 Download

https://github.com/overextended/ox_target/releases/latest/download/ox_target.zip

## ✨ Features

- Colisão de entidades e mundo melhorada em relação ao predecessor.
- Melhor tratamento de erros ao executar código externo.
- Menus para opções de alvo aninhadas.
- Compatibilidade parcial com qtarget (a base do qb-target).
- Registrar opções não sobrescreve opções existentes.
- Verificação de grupos e itens para frameworks suportados.

## 🔧 Configuração de tema (NUI)

Este projeto suporta personalizar o tema do NUI via convars (variáveis de console) do servidor/cliente. Convars disponíveis:

- `ox_target:color` — Cor primária do tema (hex). Padrão: `#40c057`.
- `ox_target:color_shadow` — Cor da sombra/blur usada para efeitos (hex ou hex com alpha). Se não definida, usa `ox_target:color` + `70`.
- `ox_target:eye_svg` — Nome do SVG do ícone "olho" exibido na interface. Valores suportados por padrão: `circle`, `diamond`, `heart`, `star`, `square`. Padrão: `circle`.

Exemplos (adicione em `server.cfg` ou defina via console):

```txt
# Cor principal do target (hex, ex: #00e58c para verde MRI, #40c057 para verde padrão)
setr ox_target:color "#00e58c"
# Cor da sombra/glow das linhas (deixe vazio para usar a cor principal com 70% de opacidade)
setr ox_target:color_shadow "#00e58c70"
```

Notas:

- As variantes de SVG ficam em `web/svg/` e são carregadas dinamicamente pela NUI. Se um nome inválido for configurado, a interface volta para `circle`.
- A cor primária é aplicada através de variáveis CSS; a interface web será atualizada quando o cliente enviar as mensagens NUI `themeColor`/`themeShadow`/`themeSvg`.
