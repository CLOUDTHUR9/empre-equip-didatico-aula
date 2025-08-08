import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

export class Usuario {
    private idUsuario: number = 0;
    private nome: string;
    private tipoUsuario: string;
    private contato: string;

    constructor(
    _nome:string,
    _tipoUsuario:string,
    _contato:string
    ) {
        this.nome = _nome;
        this.tipoUsuario= _tipoUsuario;
        this.contato= _contato;
    }




    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(idUsuario:number): void{
        this.idUsuario = idUsuario;
    }




    public getNome (): string {
        return this.nome;
    }

    public setNome (nome:string): void {
        this.nome = nome;
    }




    public getTipoUsuario (): string{
        return this.tipoUsuario;
    }
    public setTipoUsuario (tipoUsuario:string): void{
        this.tipoUsuario= tipoUsuario;
    }




    public getContato (): string{
        return this.contato;
    }
    public setContato (contato:string):void {
        this.contato = contato;
    }

    static async listarUsuarios(): Promise<Array<Usuario> | null> {
        let listadeUsuarios: Array<Usuario> = [];
        try {
            const querySelectUsuarios= `SELECT * FROM usuario`;

            const respostaBD = await database.query(querySelectUsuarios);

            respostaBD.rows.forEach((usuario) => {
                let novoUsuario = new Usuario(
                    usuario.nome,
                    usuario.tipo_usuario,
                    usuario.contato
                );
                novoUsuario.setIdUsuario(usuario.id_usuario);
                listadeUsuarios.push(novoUsuario);
            });

            return listadeUsuarios;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return null;
        }

    }

}

