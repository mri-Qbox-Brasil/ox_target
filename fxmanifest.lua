-- FX Information
fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
nui_callback_strict_mode 'true'
lua54 'yes'
game 'gta5'

-- Resource Information
name 'ox_target'
author 'Overextended'
version '1.18.1'
repository 'https://github.com/overextended/ox_target'
description ''

-- Manifest
-- MRI: interface em React (web/src), build em web/build (ver mri/README.md).
ui_page 'web/build/index.html'

shared_scripts {
    '@ox_lib/init.lua',
}

client_scripts {
    'client/main.lua',
    -- MRI: modificacoes isoladas em mri/ (ver mri/README.md).
    'mri/qb-target.lua',
    'mri/client.lua',
}

server_scripts {
    'server/main.lua',
    'mri/server.lua',
}

files {
    'web/build/**',
    'locales/*.json',
    'client/api.lua',
    'client/utils.lua',
    'client/state.lua',
    'client/debug.lua',
    'client/defaults.lua',
    'client/framework/nd.lua',
    'client/framework/ox.lua',
    'client/framework/esx.lua',
    'client/framework/qbx.lua',
    'client/compat/qtarget.lua',
}

provide 'qtarget'
provide 'qb-target'
dependency 'ox_lib'
