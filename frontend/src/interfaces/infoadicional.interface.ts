interface IInfoAdicional {
    identificadorBanco: string;
}

export interface IInfoAdicionalIpc {
    sucesso: boolean;
    mensagem: string;
    dados: IInfoAdicional;
}