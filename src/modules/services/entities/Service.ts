export interface Service {
    id: string;
    name: string;
    description: string | null;
    priceInCents: number;
    durationInMinutes: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
