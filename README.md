# 🎯 ox_target
Sistema third-eye/target de alta performance para FiveM com integração de framework e UI personalizável.

![Version](https://img.shields.io/badge/version-1.18.1-blue)
![Framework](https://img.shields.io/badge/framework-All-green)
![License](https://img.shields.io/badge/license-GPL--3.0-orange)

## ✨ Funcionalidades
- 🚀 Melhor colisão de entidade/mundo vs predecessores
- 🛡️ Melhor tratamento de erros para código externo
- 📋 Menus aninhados para opções de target
- 🔄 Compatibilidade parcial com qtarget/qb-target
- 👥 Validação de grupo e item para frameworks
- 🎨 Interface no tema da suíte MRI (`@mriqbox/ui-kit`), controlada pelo `/uiconfig` do ox_lib
- 🌐 Suporte multi-idioma
- 🔧 Bridges de framework (ox, esx, qbx, nd)

## 📦 Dependências
| Dependência | Obrigatório | Descrição |
|------------|----------|-------------|
| [ox_lib](https://github.com/overextended/ox_lib) | ✅ | Biblioteca de utilitários |
| [FiveM](https://fivem.net/) | ✅ | Framework do jogo |

## 📂 Estrutura de Arquivos
```
ox_target/
├── client/
│   ├── main.lua          # Lógica principal do cliente
│   ├── api.lua           # Funções da API
│   ├── utils.lua         # Utilitários
│   ├── state.lua         # Gerenciamento de estado
│   ├── debug.lua         # Ferramentas de debug
│   ├── defaults.lua      # Opções padrão
│   ├── framework/        # Bridges de framework
│   └── compat/           # Compatibilidade qtarget
├── server/
│   └── main.lua          # Lógica do servidor
├── mri/                  # Modificações MRI (ver mri/README.md)
├── web/
│   ├── src/              # Interface em React
│   └── build/            # Build da interface (carregado pelo jogo)
├── locales/
│   └── *.json             # Arquivos de tradução
├── fxmanifest.lua         # Manifest do resource
└── README.md              # Este arquivo
```

## 🔧 Configuração
O visual segue o tema da suíte MRI: cor de destaque pela convar `mri:color`,
fundo pela `mri:backgroundColor` e o resto (tema, fonte, radius, opacidade)
pelo `/uiconfig` do ox_lib. Detalhes em `mri/README.md`.

## 📋 Exports
### Adicionar Box Zone
```lua
exports.ox_target:addBoxZone({
    coords = vector3(x, y, z),
    size = vector3(2.0, 2.0, 2.0),
    rotation = 0,
    debug = false,
    options = {
        {
            icon = 'fas fa-car',
            label = 'Interagir',
            onSelect = function(data)
                print('Selecionado', data.entity)
            end
        }
    }
})
```

### Adicionar Entity Target
```lua
exports.ox_target:addLocalEntity(entity, {
    {
        icon = 'fas fa-key',
        label = 'Trancar/Destrancar',
        onSelect = function()
            -- Lógica de trancar/destrancar
        end
    }
})
```

## 📡 Eventos
### Eventos do Cliente
| Evento | Descrição |
|-------|-------------|
| `ox_target:client:addZone` | Adicionar nova zona de target |
| `ox_target:client:removeZone` | Remover zona de target |

## 🎮 Comandos
Sem comandos diretos, use exports para registrar targets.

## 🚀 Instalação
1. Baixe do [GitHub](https://github.com/overextended/ox_target)
2. Coloque no diretório `resources`
3. Adicione ao `server.cfg`:
   ```cfg
   ensure ox_lib
   ensure ox_target
   ```
4. Reinicie o servidor

## 🔄 Compatibilidade
Fornece compatibilidade para:
- `qtarget` (parcial)
- `qb-target` (parcial)

## 📚 Documentação
Docs completos: https://docs.mriqbox.com.br/overextended/ox_target

## 🤝 Créditos
- [Overextended](https://github.com/overextended) - Desenvolvimento core
- [mri-Qbox-Brasil](https://github.com/mri-Qbox-Brasil) - Localização e adições de tema
