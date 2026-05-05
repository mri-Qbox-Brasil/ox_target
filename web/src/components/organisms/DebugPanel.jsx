import { useState } from 'react';
import { MriButton } from '@mriqbox/ui-kit';
import mockOptions from '../../mock/data';

const sendEvent = (eventName, data = {}) => {
  window.postMessage({ event: eventName, ...data }, "*");
};

export default function DebugPanel() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <MriButton 
        variant="secondary" 
        size="sm" 
        className="fixed bottom-4 right-4 z-[9999]"
        onClick={() => setVisible(true)}
      >
        Mostrar Debug
      </MriButton>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] p-3 bg-black/85 rounded-lg text-white font-sans text-xs flex flex-col gap-2 min-w-[160px]">
      <div className="font-bold text-center mb-1">Ox Target Debug</div>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("visible", { state: true })}>
        Mostrar UI
      </MriButton>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("visible", { state: false })}>
        Esconder UI
      </MriButton>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("setTarget", mockOptions)}>
        Entrar no Alvo
      </MriButton>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("leftTarget")}>
        Sair do Alvo
      </MriButton>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("theme", { themeColor: "#3498db", themeShadow: "rgba(52,152,219,0.4)" })}>
        Tema Azul
      </MriButton>
      
      <MriButton size="sm" variant="secondary" className="w-full" onClick={() => sendEvent("theme", { themeColor: "#00e58c", themeShadow: "rgba(0,229,140,0.4)" })}>
        Tema Verde
      </MriButton>
      
      <MriButton size="sm" variant="destructive" className="w-full mt-1" onClick={() => setVisible(false)}>
        Fechar
      </MriButton>
    </div>
  );
}
