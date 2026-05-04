// createOptions is loaded via window.createOptions

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");

window.addEventListener("message", (event) => {
<<<<<<< Updated upstream
=======
  console.log("Evento recebido:", event.data);
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

>>>>>>> Stashed changes
  switch (event.data.event) {
    case "visible": {
      optionsWrapper.innerHTML = "";
      body.style.visibility = event.data.state ? "visible" : "hidden";
      return eye.classList.remove("eye-hover");
    }

    case "leftTarget": {
      optionsWrapper.innerHTML = "";
      return eye.classList.remove("eye-hover");
    }

    case "setTarget": {
      optionsWrapper.innerHTML = "";
      eye.classList.add("eye-hover");

      if (event.data.options) {
        console.log("Processando opções...");
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            if (window.createOptions) {
              window.createOptions(type, data, id + 1);
            } else {
              console.error("ERRO: window.createOptions não encontrada!");
            }
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
