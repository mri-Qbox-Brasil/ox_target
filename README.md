# ox_target

![](https://img.shields.io/github/downloads/mri-Qbox-Brasil/ox_target/total?logo=github)
![](https://img.shields.io/github/downloads/mri-Qbox-Brasil/ox_target/latest/total?logo=github)
![](https://img.shields.io/github/contributors/mri-Qbox-Brasil/ox_target?logo=github)
![](https://img.shields.io/github/v/release/mri-Qbox-Brasil/ox_target?logo=github)


Um recurso de "third-eye" (alvo) independente, performático e flexível, com funcionalidades adicionais para frameworks suportados.

ox_target é o sucessor do qtarget, que era um fork em grande parte compatível com o bt-target.
Para corrigir várias falhas de design, o ox_target foi reescrito do zero e deixou de lado o suporte aos padrões bt-target/qtarget, embora compatibilidade parcial esteja sendo implementada onde possível.


## 📚 Documentação

https://docs.mriqbox.com.br/overextended/ox_target

## 💾 Download

https://github.com/mri-Qbox-Brasil/ox_target

## ✨ Funcionalidades

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
set ox_target:color #ff8800
set ox_target:color_shadow #ff880080
set ox_target:eye_svg diamond
```

Notas:

- As variantes de SVG ficam em `web/svg/` e são carregadas dinamicamente pela NUI. Se um nome inválido for configurado, a interface volta para `circle`.
- A cor primária é aplicada através de variáveis CSS; a interface web será atualizada quando o cliente enviar as mensagens NUI `themeColor`/`themeShadow`/`themeSvg`.
