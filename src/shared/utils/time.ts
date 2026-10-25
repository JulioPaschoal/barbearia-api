export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// 570 -> "09:30"
export function minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    //PASDSTART GARANTE 2 DIGIOTOS: 0 -> "09"
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
