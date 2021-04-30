export function callVueEvent(event: string) {
  SendNuiMessage(
    JSON.stringify({
      event,
    })
  );
}

export function onVueCallback(
  event: string,
  callback: (data: object, callback: (data: object) => void) => void
) {
  RegisterNuiCallbackType(event);
  on(`__cfx_nui:${event}`, callback);
}
