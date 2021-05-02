export function playerFivemId(): string {
  const totalIds = GetNumPlayerIdentifiers(source);

  for (let i = 0; i < totalIds; i++) {
    const id = GetPlayerIdentifier(source, i);
    if (id.startsWith('fivem')) return id;
  }

  console.error(`Missing FiveM ID for ${source}`);
  throw new Error('Failed to find fivem id');
}
