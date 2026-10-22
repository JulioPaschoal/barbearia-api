// ERRO "ESPERADO" DA APLICAÇÃO: ALGO QUE PODE ACONTECER
// ( DADOS INVÁLIDOS, RECURSO INEXISTENTE, HORÁRIO OCUPADO)

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message); // CHAMA O CONSTRUTOR DA CLASSE ERRO (A CLASSE PAI)
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}
