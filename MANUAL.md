# 🎯 ox_target - Manual de Funcionalidades

Sistema "third-eye" de alta performance para FiveM com colisão de entidades, menus aninhados e compatibilidade com frameworks.

**Versão:** Latest | **Framework:** Todos | **Licença:** Custom

---

## 🎯 O que o ox_target faz

O ox_target é um sistema de interação baseado em mira (terceira pessoa) que permite aos jogadores interagir com entidades do jogo (vehicles, peds, objetos) e pontos do mundo através de um sistema de opções contextuais. É o sucessor do qtarget com melhor performance e design redesenhado.

---

## ⚙️ Como funciona

O ox_target usa colisão otimizada para detectar quando o jogador mira em entidades ou pontos do mundo. Quando uma entidade é detectada, as opções registradas para ela são exibidas em uma interface NUI. O sistema suporta menus aninhados, verificação de grupos/itens e execução de código externo com tratamento de erros.

### Diferenças do qtarget/bt-target
- Escrito do zero (não é fork)
- Melhor performance de colisão
- Menus para opções aninhadas
- Opções registradas não sobrescrevem existentes
- Compatibilidade parcial com padrões antigos

---

## 🔧 Configuração

### Configuração de Tema (NUI)
Personalize a aparência via convars no `server.cfg`:

```cfg
# Cor principal do target (hex)
setr ox_target:color "#40c057"

# Cor da sombra/glow das linhas (hex com alpha)
setr ox_target:color_shadow "#40c05770"

# Ícone do "olho" (circle, diamond, heart, star, square)
setr ox_target:eye_svg "circle"
```

### SVG Personalizado
Os arquivos SVG ficam em `web/svg/`. Para usar um customizado:
1. Adicione seu SVG em `web/svg/meu_icone.svg`
2. Configure: `setr ox_target:eye_svg "meu_icone"`

---

## 📤 Exports

### Registrar Opção em Entidade (Cliente)
```lua
exports.ox_target:addEntityZone(
    entity,                     -- Entidade (ped, vehicle, object)
    {
        name = 'zona_veiculo',
        heading = 0,
        debugPoly = false,
        minZ = pos.z - 1,
        maxZ = pos.z + 1,
        options = {
            {
                name = 'verificar_veiculo',
                icon = 'fas fa-car',
                label = 'Verificar Veículo',
                distance = 2.0,
                groups = {'police'},        -- Restrição de grupo
                items = {'lockpick'},        -- Restrição de item
                onSelect = function(data)
                    local entity = data.entity
                    print(('Veículo: %s'):format(GetEntityModel(entity)))
                end
            }
        }
    }
)
```

### Registrar Opção Global (Cliente)
```lua
-- Para todos os veículos de um modelo
exports.ox_target:addModel('police', {
    {
        name = 'confiscar',
        icon = 'fas fa-gavel',
        label = 'Confiscar Veículo',
        groups = {'police'},
        onSelect = function(data)
            TriggerServerEvent('policia:confiscar', VehToNet(data.entity))
        end
    }
})
```

### Registrar Opção de Ponto no Mundo
```lua
exports.ox_target:addBoxZone(
    'spawn_veiculo',
    vec3(25.0, -1345.0, 29.5),
    2.0, 2.0,                  -- Largura, profundidade
    {
        name = 'zona_spawn',
        heading = 0,
        debugPoly = true,
        minZ = 28.5,
        maxZ = 31.5,
        options = {
            {
                name = 'spawnar',
                icon = 'fas fa-plus',
                label = 'Spawnar Veículo',
                onSelect = function()
                    TriggerServerEvent('veiculos:spawn')
                end
            }
        }
    }
)
```

### Remover Zonas/Opções
```lua
-- Remover zona
exports.ox_target:removeZone('spawn_veiculo')

-- Remover opção específica
exports.ox_target:removeEntityZoneOption(entity, 'confiscar')
```

### Verificar se Target está ativo
```lua
local isActive = exports.ox_target:isTargetActive()
```

---

## 📡 Eventos

### Eventos do Cliente
| Evento | Descrição | Parâmetros |
|--------|-----------|-------------|
| `ox_target:select` | Disparado ao selecionar opção | `optionName` (string), `entity` (int) |
| `ox_target:close` | Fecha interface do target | None |

---

## 🎮 Comandos

O ox_target não possui comandos diretos. A interação é feita através da tecla de mira (padrão: Right Mouse Button).

### Configuração de Tecla
A tecla de ativação é gerenciada pelo FiveM (botão de mira). Não há comando para alternar.

---

## 🔗 Integrações

### Compatibilidade com qtarget
O ox_target possui compatibilidade parcial com recursos escritos para qtarget:
```lua
-- Sintaxe qtarget (suportada parcialmente)
exports['qtarget']:AddTargetModel('police', {
    options = {
        {
            label = 'Verificar',
            action = function(entity)
                print('Verificando...')
            end
        }
    }
})
```

### Frameworks Suportados
- **ox_core** - Verificação nativa de grupos
- **ESX** - Verificação de jobs
- **QBCore** - Verificação de jobs
- **Standalone** - Verificação via itens personalizados

### Verificação de Itens e Grupos
```lua
options = {
    {
        name = 'abrir_porta',
        label = 'Abrir Porta',
        icon = 'fas fa-door-open',
        groups = {'police', 'ambulance'},    -- Apenas estes grupos
        items = {'key_policia'},             -- Ou possui este item
        onSelect = function() end
    }
}
```

---

## 💡 Casos de Uso

### Sistema de Roubo de Veículo
```lua
exports.ox_target:addModel({'adder', 'kuruma'}, {
    {
        name = 'roubar',
        icon = 'fas fa-car-burst',
        label = 'Roubar Veículo',
        items = {'lockpick'},
        distance = 2.0,
        onSelect = function(data)
            local vehicle = data.entity
            if math.random(100) > 30 then
                TaskEnterVehicle(PlayerPedId(), vehicle, 10000, -1, 2.0, 1, 0)
            else
                TriggerClientEvent('ox_lib:notify', source, {
                    title = 'Falhou',
                    description = 'A fechadura não cedeu',
                    type = 'error'
                })
            end
        end
    }
})
```

### Interação com NPCs
```lua
exports.ox_target:addEntityZone(ped, {
    name = 'npc_loja',
    options = {
        {
            name = 'comprar',
            icon = 'fas fa-shopping-cart',
            label = 'Comprar Itens',
            onSelect = function()
                TriggerEvent('loja:abrirMenu')
            end
        },
        {
            name = 'vender',
            icon = 'fas fa-dollar-sign',
            label = 'Vender Itens',
            groups = {'trader'},
            onSelect = function()
                TriggerEvent('loja:venderItens')
            end
        }
    }
})
```

### Menu Aninhado (Submenu)
```lua
exports.ox_target:addBoxZone('opcoes_veiculo', coords, 2.0, 2.0, {
    options = {
        {
            name = 'menu_veiculo',
            icon = 'fas fa-car',
            label = 'Opções do Veículo',
            menu = 'submenu_veiculo'  -- Abre submenu
        }
    }
})

-- Registrar submenu
exports.ox_target:registerMenu('submenu_veiculo', {
    {
        name = 'ligar',
        label = 'Ligar Veículo',
        icon = 'fas fa-power-off',
        onSelect = function(data)
            SetVehicleEngineOn(data.entity, true, false, false)
        end
    }
})
```

---

## ⚠️ Solução de Problemas

### Target não aparece ao mirar
- Verifique se o ox_target está startado antes de outros recursos
- Confirme que a entidade tem opções registradas
- Verifique se o jogador atende aos requisitos (grupos/itens)

### Performance baixa
- Reduza o número de zonas ativas simultâneas
- Use `debugPoly = false` em produção
- Evite registrar opções em loops

### Opções não aparecem para certos jogadores
- Verifique as restrições de `groups` e `items`
- Confirme que o jogador tem o job/grupo correto
- Verifique se o item está no inventário

### Conflito com outros sistemas de target
- O ox_target NÃO é compatível com bt-target ou qtarget simultaneamente
- Remova outros recursos de target antes de usar ox_target
- Use apenas um sistema de target por servidor

### Erro "export not found"
- Confirme que o recurso está nomeado como `ox_target`
- Verifique se `ensure ox_target` está no server.cfg
- Reinicie o servidor após instalação

---

## 📚 Documentação Completa
https://overextended.dev/ox_target
