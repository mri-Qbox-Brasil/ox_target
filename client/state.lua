local state = {}

local isActive = false

---@return boolean
function state.isActive()
    return isActive
end

---@param value boolean
function state.setActive(value)
    isActive = value

    if value then
        local color = GetConvar('ox_target:color', '#40c057')
        local shadow = GetConvar('ox_target:color_shadow', color .. '70')
        local svg = GetConvar('ox_target:eye_svg', 'circle')
        SendNuiMessage('{"event": "visible", "state": true, "themeColor": "' .. color .. '", "themeShadow": "' .. shadow .. '", "themeSvg": "' .. svg .. '"}')
    end
end

local nuiFocus = false

---@return boolean
function state.isNuiFocused()
    return nuiFocus
end

---@param value boolean
function state.setNuiFocus(value, cursor)
    if value then SetCursorLocation(0.5, 0.5) end

    nuiFocus = value
    SetNuiFocus(value, cursor or false)
    SetNuiFocusKeepInput(value)
end

local isDisabled = false

---@return boolean
function state.isDisabled()
    return isDisabled
end

---@param value boolean
function state.setDisabled(value)
    isDisabled = value
end

return state
