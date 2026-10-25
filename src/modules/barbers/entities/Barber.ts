export interface Barber {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    workDays: number[]; // 0 = DOMINGO, 1 = SEGUNDA ... 6 = SÁBADO
    startTime: string; // "09:00"
    endTime: string; // "18:00"
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
