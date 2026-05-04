/**
 * Script de depuração para testar a interface do ox_target no navegador.
 * Este script simula os eventos enviados pelo FiveM.
 */

const sampleOptions = {
  options: {
    client: [
      {
        label: "Interagir com Objeto",
        icon: "fas fa-hand-paper",
        iconColor: "#3498db"
      },
      {
        label: "Ver Informações",
        icon: "fas fa-info-circle",
        iconColor: "#f1c40f"
      },
      {
        label: "Remover Item",
        icon: "fas fa-trash",
        iconColor: "#e74c3c"
      }
    ]
  }
};

const sendEvent = (event, data = {}) => {
  window.postMessage({ event, ...data }, "*");
};

// Força visibilidade do body se estiver no navegador
if (typeof GetParentResourceName === 'undefined') {
  document.body.style.visibility = "visible";
}

// Adiciona controles na tela para facilitar o teste
const debugMenu = document.createElement("div");
debugMenu.style.position = "fixed";
debugMenu.style.bottom = "20px";
debugMenu.style.right = "20px";
debugMenu.style.display = "flex";
debugMenu.style.flexDirection = "column";
debugMenu.style.gap = "10px";
debugMenu.style.zIndex = "9999";
debugMenu.style.padding = "10px";
debugMenu.style.background = "rgba(0,0,0,0.8)";
debugMenu.style.borderRadius = "8px";
debugMenu.style.color = "white";
debugMenu.style.fontFamily = "Arial, sans-serif";
debugMenu.style.fontSize = "12px";

const title = document.createElement("div");
title.innerText = "Target Debug Menu";
title.style.fontWeight = "bold";
title.style.textAlign = "center";
title.style.marginBottom = "5px";
debugMenu.appendChild(title);

const createButton = (label, onClick) => {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.style.padding = "5px 10px";
  btn.style.cursor = "pointer";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.background = "#444";
  btn.style.color = "white";
  btn.onmouseover = () => btn.style.background = "#666";
  btn.onmouseout = () => btn.style.background = "#444";
  btn.onclick = onClick;
  debugMenu.appendChild(btn);
};

createButton("Mostrar UI", () => sendEvent("visible", { state: true }));
createButton("Esconder UI", () => sendEvent("visible", { state: false }));
createButton("Entrar no Alvo (Hover)", () => sendEvent("setTarget", sampleOptions));
createButton("Sair do Alvo", () => sendEvent("leftTarget"));

createButton("Mudar Tema (Azul)", () => sendEvent("theme", { 
  themeColor: "#3498db", 
  themeShadow: "rgba(52, 152, 219, 0.4)" 
}));

createButton("DEBUG: Forçar Opções", () => {
  console.log("Forçando criação de opções via código direto...");
  if (window.createOptions) {
    window.createOptions("client", { label: "OPÇÃO FORÇADA 1", icon: "fas fa-bug" }, 1);
    window.createOptions("client", { label: "OPÇÃO FORÇADA 2", icon: "fas fa-tools" }, 2);
  } else {
    console.error("Função window.createOptions não existe!");
  }
});

document.body.appendChild(debugMenu);

// Auto-start para facilitar o teste inicial
setTimeout(() => {
  sendEvent("visible", { state: true });
  sendEvent("setTarget", sampleOptions);
  console.log("Simulação inicial ativada! Se não vir nada, clique no botão 'Entrar no Alvo (Hover)'.");
}, 1000);

console.log("Ox Target Debug Mode Loaded!");
console.log("Use os botões no canto inferior direito para testar.");
