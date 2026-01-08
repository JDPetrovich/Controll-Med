PRAGMA foreign_keys = ON;

--   TABELA PERMISSAO
CREATE TABLE permissao (
    SeqPermissao INTEGER PRIMARY KEY,
    SeqUsuario INTEGER,
    CodUsuario TEXT,
    NomeUsuario TEXT,
    EmailUsuario TEXT,
    TipoUsuario TEXT,
    NivelUsuario INTEGER,
    Acesso INTEGER,
    UsuarioUltAlteracao TEXT,
    DatahoraUltAlteracao TEXT
);

CREATE TABLE permissaogrupousuario (
    seqgrupousuario INTEGER PRIMARY KEY,
    seqgrupo INTEGER,
    sequsuario INTEGER,
    codusuario TEXT,
    nomeusuario TEXT,
    emailusuario TEXT,
    tipousuario TEXT,
    nivelusuario INTEGER
);

-- LOG DE IMPORTAÇÃO (CABECALHO)
CREATE TABLE LogImportacao (
    SeqLogImportacao INTEGER PRIMARY KEY AUTOINCREMENT,
    DataHora TEXT,
    SeqUsuario INTEGER,
    CodUsuario TEXT,
    NomeArquivo TEXT,
    Situacao TEXT,
    QtnValida INTEGER,
    QtnInvalida INTEGER
);

-- LOG DE IMPORTAÇÃO DE VERBAS (ITENS)
CREATE TABLE LogVerbaImportacao (
    SeqLogImportacao INTEGER,
    SeqLote INTEGER,
    NroLinha INTEGER,
    Status TEXT,
    Mensagem TEXT,
    Divisao TEXT,
    NomeDivisao TEXT,
    Empresas TEXT,
    NomeEmpresas TEXT,
    Segmento INTEGER,
    NomeSegmento TEXT,
    ProdutoFamilia TEXT,
    Codigo TEXT,
    NomeProdutoFamilia TEXT,
    DataInicial TEXT,
    DataFinal TEXT,
    Embalagem TEXT,
    TipoVerba TEXT,
    ValorVerba REAL,
    QtnLimite TEXT,
    Fornecedor TEXT,
    NomeFornecedor TEXT,
    Comprador TEXT,
    NomeComprador TEXT,
    Observacao TEXT,
    TipoAcordo TEXT,
    NomeTipoAcordo TEXT,
    FOREIGN KEY (SeqLogImportacao) REFERENCES LogImportacao (SeqLogImportacao)
);