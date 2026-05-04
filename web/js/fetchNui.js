const resource = typeof GetParentResourceName !== 'undefined' ? GetParentResourceName() : 'ox_target';

window.fetchNui = async function(eventName, data) {
  if (typeof GetParentResourceName === 'undefined') {
    console.log(`[Mock Fetch] Event: ${eventName}, Data:`, data);
    return { status: 'ok' };
  }

  const resp = await fetch(`https://${resource}/${eventName}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  return await resp.json();
}
