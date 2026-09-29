# mri/: Modificações MRI Qbox no ox_target

Esta pasta isola o **código específico da MRI Qbox Brasil** sobre o ox_target
upstream (Overextended). Assim `client/`, `server/` e `locales/` ficam
idênticos ao upstream e os merges entram sem conflito.

## Conteúdo

```
mri/
├── client.lua      Tema da suíte na NUI: callbacks getConfig (convars
│                   mri:color / mri:backgroundColor) e getUiConfig (/uiconfig
│                   do ox_lib), e os eventos que atualizam ao vivo.
├── server.lua      Broadcast das convars de cor da suíte quando mudam.
├── qb-target.lua   Compatibilidade parcial com os exports do qb-target
│                   (o upstream só tem a do qtarget). Vários resources da
│                   base chamam exports['qb-target'].
└── README.md       Este arquivo.
```

## Fora desta pasta

- `fxmanifest.lua`: carrega os arquivos de `mri/`, aponta o `ui_page` para
  `web/build/index.html` e faz `provide 'qb-target'`;
- `web/`: a interface, reescrita em React com o `@mriqbox/ui-kit`. Segue o
  mesmo contrato de mensagens do upstream (`visible`, `leftTarget`,
  `setTarget` e o callback `select`), então o Lua do upstream não muda.
  Correções do upstream em `web/js` precisam ser portadas à mão para
  `web/src/App.tsx`. Depois de mexer em `web/src`, rodar `pnpm build`
  dentro de `web/` e versionar o `web/build`.

## Tema da suíte

A NUI segue o mesmo padrão do ox_lib, ox_inventory e mri_Qadmin: todo o
visual usa os tokens do `@mriqbox/ui-kit`, então trocar o tema no ox_lib muda
o target junto.

| O que | De onde vem | Atualiza ao vivo por |
|---|---|---|
| Cor de destaque (olho e ícones) | convar `mri:color` (callback `getConfig`) | `ox_target:accentColorChanged` |
| Cor de fundo | convar `mri:backgroundColor` (callback `getConfig`) | `ox_target:backgroundColorChanged` |
| Tema dark/glass, fonte, radius, cores de status, opacidade, override de accent/fundo | painel `/uiconfig` do ox_lib (`ox_lib:getUiConfig`, pedido pelo callback `getUiConfig`) | `ox_lib:uiConfigChanged` |

As opções são `mri-surface-card` (reflexo no tema glass). A fonte vem do CSS
do kit, nada é hospedado aqui. Os ícones continuam no Font Awesome pelo CDN,
como no upstream, porque os resources mandam as classes (`fas fa-key`).

Os sprites das zonas (desenhados no Lua) seguem as cores do upstream.
