declare function GetParentResourceName(): void;

export default function useSendEvent() {
  const sendEvent = async (eventName: string, body: object = {}) => {
    const response = await fetch(
      `https://${GetParentResourceName()}/${eventName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body),
      }
    );
    return response.json();
  };

  return { sendEvent };
}
