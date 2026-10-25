import { z } from 'zod';

import { timeToMinutes } from '../../../shared/utils/time.js';

// REGEX: 00:00 ATÈ 23:59
const timeSchema = z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use o formato HH:mm');

const workDaysSchema = z
    .array(z.number().int().min(0).max(6))
    .min(1, 'Informe ao menos um dia de trabalho')
    //SET REMOVE OS REPETIDOS: SE O TEMANHO MUDOU HAVIA DUPLICADO
    .refine((days) => new Set(days).size === days.length, 'Há dias Repitidos');

//SCHEMA "base": SÓ OS CAMPOS SEM AS REGRAS CRUZADAS
const barberBaseSchema = z.object({
    name: z.string().trim().min(3, 'O nome precisa ter ao menos 3 caracteres'),
    email: z.email('E-mail inválido'),
    phone: z.string().trim().min(10).max(15).optional(),
    workDays: workDaysSchema,
    startTime: timeSchema,
    endTime: timeSchema,
});

//CRIAÇÃO: BASE + REGRAS QUE COMPARA DOIS CAMPOS
export const createBarberSchema = barberBaseSchema.refine(
    (data) => timeToMinutes(data.startTime) < timeToMinutes(data.endTime),
    {
        error: 'O horário de início deve ser antes do horário de fim',
        path: ['endTime'], // EM QUAL CAMPO O ERRO VAI APARECER
    },
);

//ATUALIZAÇÃO: PARTE DO BASE, E NãO DO CREATEBARBERSCHEMA PORQUE
export const updateBarberSchema = barberBaseSchema.partial();
export const barberIdParamSchema = z.object({
    id: z.uuid('ID inválido'),
});

export type CreateBarberDTO = z.infer<typeof createBarberSchema>;
export type UpdateBarberDTO = z.infer<typeof updateBarberSchema>;
