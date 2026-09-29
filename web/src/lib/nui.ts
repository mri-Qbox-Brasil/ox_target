const resourceName: string = (window as any).GetParentResourceName?.() ?? 'ox_target';

/** true fora do FiveM (vite dev no navegador). */
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

export async function fetchNui<T = unknown>(eventName: string, data?: unknown): Promise<T | undefined> {
  if (isEnvBrowser()) return undefined;

  const resp = await fetch(`https://${resourceName}/${eventName}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  });

  return resp.json();
}
