export function callVueEvent(event: string, focus = true) {
  if (focus) SetNuiFocus(true, false);
  SendNuiMessage(
    JSON.stringify({
      event,
    })
  );
}

type VueCallback = (data: object, callback: (data: object) => void) => void;

export function onVueCallback(
  event: string,
  callback: VueCallback,
  unfocus = true
) {
  RegisterNuiCallbackType(event);

  const onEvent: VueCallback = (data, cb) => {
    if (unfocus) SetNuiFocus(false, false);
    callback(data, cb);
  };

  on(`__cfx_nui:${event}`, onEvent);
}
