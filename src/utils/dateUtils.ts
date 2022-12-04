export function incrementDay(days: number) {
  const sightingDate = new Date();
  sightingDate.setDate(sightingDate.getDate() + Math.abs(days));
  return sightingDate;
}

export function decrementDay(days: number) {
  const sightingDate = new Date();
  sightingDate.setDate(sightingDate.getDate() - Math.abs(days));
  return sightingDate;
}
