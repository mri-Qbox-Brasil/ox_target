--[[
    Modificacoes MRI no server do ox_target: repassa as cores da suite
    (convars mri:color / mri:backgroundColor) quando mudam, sem restart.
]]

AddConvarChangeListener('mri:color', function(name)
    if name ~= 'mri:color' then return end

    local color = GetConvar('mri:color', '#00E699')
    if not color:match('^#%x%x%x%x%x%x$') then return end

    TriggerClientEvent('ox_target:accentColorChanged', -1, color)
end)

AddConvarChangeListener('mri:backgroundColor', function(name)
    if name ~= 'mri:backgroundColor' then return end

    local color = GetConvar('mri:backgroundColor', '')
    if color ~= '' and not color:match('^#%x%x%x%x%x%x$') then return end

    TriggerClientEvent('ox_target:backgroundColorChanged', -1, color)
end)
