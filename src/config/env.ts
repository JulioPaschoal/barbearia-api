import 'dotenv/config';

import { z } from 'zod';

// SCHEMA: DESCREVE O FORMATO E O TIPO DE DADOS QUE CADA VARIÁVEL DE AMBIENTE DEVE TER \\
const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('production'),
    // TUDO NO PROCESS.ENV É UMA STRING, ENTÃO USAMOS O Z.COERCE PARA CONVERTER PARA NÚMERO \\
    PORT: z.coerce.number().default(3333),
});

// SAFEPARSE: NÃO LANÇA ERRO, ELE RETORNA UM OBJETO COM SUCESSO OU ERRO \\
const parsed = envSchema.safeParse(process.env);

// SE HOUVER ERRO, LANÇA UM ERRO COM A MENSAGEM \\
if (!parsed.success) {
    console.error('❌ Variáveis de ambiente inválidas', parsed.error.format());
    process.exit(1); // ENCERRA A APLICAÇÃO \\
}

// SE TUDO ESTIVER CERTO, EXPORTA AS VARIÁVEIS DE AMBIENTE \\
export const env = parsed.data;
