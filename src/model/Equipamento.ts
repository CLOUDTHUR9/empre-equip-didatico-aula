import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

export class Equipamento {
    private idEquipamento: number = 0;
    private nome: string;
    private categoria: string;
    private statusEquipamento: string;

    constructor(
    _nome:string,
    _categoria:string,
    _status:string
    ) {
        this.nome = _nome;
        this.categoria= _categoria;
        this.statusEquipamento= _status;
    }




    public getIdEquipamento(): number {
        return this.idEquipamento;
    }

    public setIdEquipamento(idEquipamento:number): void{
        this.idEquipamento = idEquipamento;
    }




    public getNome (): string {
        return this.nome;
    }

    public setNome (nome:string): void {
        this.nome = nome;
    }




    public getCategoria (): string{
        return this.categoria;
    }
    public setCategoria (categoria:string): void{
        this.categoria= categoria;
    }




    public getStatusEquipamento (): string{
        return this.statusEquipamento;
    }
    public setStatusEquipamento (statusEquipamento:string):void {
        this.statusEquipamento = statusEquipamento;
    }

    static async listarEquipamentos(): Promise<Array<Equipamento> | null> {
        let listaDeEquipamentos: Array<Equipamento> = [];
        try {
            const querySelectEquipamentos= `SELECT * FROM equipamento`;

            const respostaBD = await database.query(querySelectEquipamentos);

            respostaBD.rows.forEach((equipamento) => {
                let novoEquipamento = new Equipamento(
                    equipamento.nome,
                    equipamento.tipo_usuario,
                    equipamento.contato
                );
                novoEquipamento.setIdEquipamento(equipamento.id_equipamento);
                listaDeEquipamentos.push(novoEquipamento);
            });

            return listaDeEquipamentos;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return null;
        }

    }

}

