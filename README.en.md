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

- Improved entity and world collision than its predecessor.
- Improved error handling when running external code.
- Menus for nested target options.
- Partial compatibility for qtarget (the thing qb-target is based on, I made the original idiots).
- Registering options no longer overrides existing options.
- Groups and items checking for supported frameworks.

## 🔧 Theme configuration (NUI)

This project supports customizing the NUI theme via server/client convars. Available convars:

- `ox_target:color` — Primary theme color (hex). Default: `#40c057`.
- `ox_target:color_shadow` — Shadow/blur color used for glows (hex or 8-digit hex). If not set, defaults to `ox_target:color` + `70`.
- `ox_target:eye_svg` — Name of the eye SVG to display in the UI. Supported values by default: `circle`, `diamond`, `heart`, `star`, `square`. Default: `circle`.

Examples (add to `server.cfg` or set from console):

```txt
set ox_target:color #ff8800
set ox_target:color_shadow #ff880080
set ox_target:eye_svg diamond
```

Notes:

- SVG variants are stored under `web/svg/` and loaded dynamically by the NUI. If a non-existent SVG name is configured, the UI falls back to `circle`.
- The primary color is applied via CSS variables; the web UI will update when the client sends the `themeColor`/`themeShadow`/`themeSvg` NUI message.
