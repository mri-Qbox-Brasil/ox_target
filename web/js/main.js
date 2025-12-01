import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eyeContainer = document.getElementById("eye");
let eye = null;

async function loadSvg(name = 'circle') {
  try {
    const res = await fetch(`svg/${name}.svg`);
    if (!res.ok) throw new Error('SVG not found');
    const text = await res.text();
    eyeContainer.innerHTML = text;
    eye = document.getElementById('eyeSvg');
    // If the container held the hover class before loading, transfer it to the svg
    if (eyeContainer.classList.contains('eye-hover')) {
      eye.classList.add('eye-hover');
      eyeContainer.classList.remove('eye-hover');
    }
  } catch (e) {
    // fallback to circle if specific svg not found
    if (name !== 'circle') return loadSvg('circle');
  }
}

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  // Apply theme color and shadow from client (shadow convar optional)
  if (event.data?.themeShadow) {
    document.documentElement.style.setProperty('--color-shadow', event.data.themeShadow);
  }

  if (event.data?.themeColor) {
    const theme = event.data.themeColor;
    document.documentElement.style.setProperty('--color-default', theme);

    // If a specific shadow wasn't provided, fall back to theme + '70'
    if (!event.data?.themeShadow) {
      document.documentElement.style.setProperty('--color-shadow', theme + '70');
    }
  }

  // If the client sends a preferred svg name, try to load it
  if (event.data?.themeSvg) {
    loadSvg(event.data.themeSvg);
  } else if (!eye) {
    // ensure at least default svg is loaded once
    loadSvg('circle');
  }

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      if (eye) {
        return eye.classList.remove("eye-hover");
      }

      return eyeContainer.classList.remove("eye-hover");
    }

    case "leftTarget": {
      if (eye) {
        return eye.classList.remove("eye-hover");
      }

      return eyeContainer.classList.remove("eye-hover");
    }

    case "setTarget": {
      if (eye) {
        eye.classList.add("eye-hover");
      } else {
        eyeContainer.classList.add("eye-hover");
      }

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});