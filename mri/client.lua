--[[
    Modificacoes MRI no client do ox_target: tema da suite na NUI.
]]

RegisterNUICallback('getConfig', function(_, cb)
    cb({
        accentColor = GetConvar('mri:color', '#00E699'),
        backgroundColor = GetConvar('mri:backgroundColor', ''),
    })
end)

RegisterNUICallback('getUiConfig', function(_, cb)
    local uiConfig = lib.callback.await('ox_lib:getUiConfig', false)

    cb(type(uiConfig) == 'table' and uiConfig or false)
end)

RegisterNetEvent('ox_target:accentColorChanged', function(newColor)
    SendNUIMessage({ action = 'updateAccentColor', data = { accentColor = newColor } })
end)

RegisterNetEvent('ox_target:backgroundColorChanged', function(newColor)
    SendNUIMessage({ action = 'updateBackgroundColor', data = { backgroundColor = newColor or '' } })
end)

RegisterNetEvent('ox_lib:uiConfigChanged', function(newConfig)
    if type(newConfig) ~= 'table' then return end
    SendNUIMessage({ action = 'applyUiConfig', data = newConfig })
end)
