import { z } from 'zod';

// SCHEMA DE CRIAÇÃO O QUE O CLIENTE PRECISA ENVIAR
export const createServiceSchema = z.object({
    name: z.string().trim().min(3, 'O nome precisa ter ao menos 3 caracteres'),
    description: z.string().trim().max(255).optional(),
    priceInCents: z.number().int('Use centavos (número inteiro)').positive(),
    durationInMinutes: z.number().int().min(5).max(240),
});

// SCHEMA DE ATUALIZAÇÃO: OS MESMO COMPOS MAS TODOS OPCIONAIS (.PARTIAL)
// E MAIS O "ACTIVE" PARA PODER DESATIVAR UM SERVIÇO
export const updateServiceSchema = createServiceSchema.partial().extend({
    active: z.boolean().optional(),
});

// VALIDAR O :ID DA URL
export const serviceIdParamSchema = z.object({
    id: z.uuid('ID inválido'),
});

// DTOs: O ZOD GERA OS TIPOS TYPESCRIPT A PARTIR DOS SCHEMAS \\
// VOCÊ ESCREVE A REGRA UMA VEZ SÓ E GANHA VALIDAÇÃO + TIPAGEM \\
export type createServiceDTO = z.infer<typeof createServiceSchema>;
export type UpdateServiceDTO = z.infer<typeof updateServiceSchema>;
