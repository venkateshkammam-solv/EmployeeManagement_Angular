export function calculateAge(dob: string): number {
  const [year, month, day] = dob.split('-').map(Number);

  const birthDate = new Date(year, month - 1, day);
  const diff = Date.now() - birthDate.getTime();

  return Math.floor(diff / (1000 * 3600 * 24 * 365.25));
}
