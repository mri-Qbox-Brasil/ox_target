import { useEffect, useState, type MouseEvent } from 'react';
import { isHexColor, setSuiteAccent, setSuiteBackground } from '@mriqbox/ui-kit';
import { fetchNui, isEnvBrowser } from './lib/nui';
import { applySuiteUiConfig, type SuiteUiConfig } from './lib/uiConfig';

interface TargetOption {
  label: string;
  icon?: string;
  iconColor?: string;
  hide?: boolean;
}

interface TargetItem {
  key: string;
  type: string;
  id: number;
  zoneId?: number;
  option: TargetOption;
}

interface SetTargetMessage {
  options?: Record<string, TargetOption[]>;
  zones?: TargetOption[][];
}

/** Mesma ordem do upstream: opções por tipo, depois as das zonas. */
function toItems({ options, zones }: SetTargetMessage): TargetItem[] {
  const items: TargetItem[] = [];

  if (options) {
    for (const type in options) {
      options[type].forEach((option, index) => {
        items.push({ key: `${type}:${index}`, type, id: index + 1, option });
      });
    }
  }

  zones?.forEach((zone, zoneIndex) => {
    zone.forEach((option, index) => {
      items.push({ key: `zones:${zoneIndex}:${index}`, type: 'zones', id: index + 1, zoneId: zoneIndex + 1, option });
    });
  });

  return items.filter((item) => !item.option.hide);
}

function onSelect(event: MouseEvent<HTMLDivElement>, item: TargetItem) {
  // Quando o nui focus sai depois do clique, o hover nunca é liberado (mesmo contorno do upstream).
  const element = event.currentTarget;
  element.style.pointerEvents = 'none';

  fetchNui('select', [item.type, item.id, item.zoneId]);
  setTimeout(() => (element.style.pointerEvents = 'auto'), 100);
}

const browserPreview: TargetItem[] = toItems({
  options: {
    __global: [
      { label: 'Trancar/Destrancar', icon: 'fas fa-key' },
      { label: 'Abrir porta-malas', icon: 'fas fa-car-rear' },
    ],
  },
  zones: [[{ label: 'Loja de roupas', icon: 'fas fa-shirt' }]],
});

export default function App() {
  const [visible, setVisible] = useState(isEnvBrowser());
  const [items, setItems] = useState<TargetItem[]>(isEnvBrowser() ? browserPreview : []);
  const hasTarget = items.length > 0;

  useEffect(() => {
    fetchNui<{ accentColor?: string; backgroundColor?: string }>('getConfig').then((data) => {
      if (isHexColor(data?.accentColor)) setSuiteAccent(data.accentColor);
      setSuiteBackground(data?.backgroundColor);
    });

    fetchNui<SuiteUiConfig | false>('getUiConfig').then((cfg) => cfg && applySuiteUiConfig(cfg));

    const onMessage = ({ data }: MessageEvent) => {
      if (!data || typeof data !== 'object') return;

      // Contrato do upstream (client/main.lua e client/state.lua).
      switch (data.event) {
        case 'visible':
          setItems([]);
          return setVisible(!!data.state);
        case 'leftTarget':
          return setItems([]);
        case 'setTarget':
          return setItems(toItems(data));
      }

      // Tema da suíte (mri/client.lua).
      switch (data.action) {
        case 'updateAccentColor':
          if (isHexColor(data.data?.accentColor)) setSuiteAccent(data.data.accentColor);
          return;
        case 'updateBackgroundColor':
          return setSuiteBackground(data.data?.backgroundColor);
        case 'applyUiConfig':
          return applySuiteUiConfig(data.data);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!visible) return null;

  return (
    <>
      <svg
        className={`absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          hasTarget ? 'fill-primary' : 'fill-foreground/40'
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>

      <div className="absolute left-[calc(50%+18pt)] top-[48.4%] flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.key}
            onClick={(event) => onSelect(event, item)}
            className="mri-surface-card flex h-[22pt] min-w-[150pt] cursor-pointer items-center gap-2 rounded-md border border-border bg-card pl-2 pr-3 text-[11pt] text-foreground/80 transition-colors duration-200 hover:border-primary hover:text-foreground"
          >
            <i
              className={`fa-fw ${item.option.icon ?? ''} text-primary`}
              style={item.option.iconColor ? { color: item.option.iconColor } : undefined}
            />
            {/* Label como HTML, igual ao upstream (resources mandam texto formatado). */}
            <p className="font-medium" dangerouslySetInnerHTML={{ __html: item.option.label }} />
          </div>
        ))}
      </div>
    </>
  );
}
