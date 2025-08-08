import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

export class Emprestimo {
    private idEmprestimo: number = 0;
    private idUsuario: number;
    private idEquipamento: number;
    private dataEmprestimo: Date;
    private dataPrevistaDevolucao: Date;
    private dataRealDevolucao: Date;
    private statusEmprestimo: string;


    constructor(
    _idUsuario:number,
    _idEquipamento:number,
    _dataEmprestimo:Date,
    _dataPrevistaDevolucao:Date,
    _dataRealDevolucao:Date,
    _statusEmprestimo:string
    ) {
        this.idUsuario = _idUsuario;
        this.idEquipamento= _idEquipamento;
        this.dataEmprestimo= _dataEmprestimo;
        this.dataPrevistaDevolucao= _dataPrevistaDevolucao;
        this.dataRealDevolucao= _dataRealDevolucao;
        this.statusEmprestimo= _statusEmprestimo;
    }




    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(idEmprestimo:number): void{
        this.idEmprestimo = idEmprestimo;
    }


    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(idUsuario:number): void{
        this.idUsuario = idUsuario;
    }


    public getIdEquipamento(): number {
        return this.idEquipamento;
    }

    public setIdEquipamento(idEquipamento:number): void{
        this.idEquipamento = idEquipamento;
    }




    public getDataEmprestimo (): Date{
        return this.dataEmprestimo;
    }
    public setDataEmprestimo (dataEmprestimo:Date): void{
        this.dataEmprestimo= dataEmprestimo;
    }


    public getDataPrevistaDevolucao (): Date {
        return this.dataPrevistaDevolucao;
    }

    public setDataPrevistaDevolucao (dataPrevistaDevolucao:Date): void {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }



    public getDataRealDevolucao (): Date {
        return this.dataRealDevolucao;
    }

    public setDataRealDevolucao (dataRealDevolucao:Date): void {
        this.dataRealDevolucao = dataRealDevolucao;
    }




    public getStatusEmprestimo (): string{
        return this.statusEmprestimo;
    }
    public setStatusEmprestimo (statusEmprestimo:string):void {
        this.statusEmprestimo = statusEmprestimo;
    }



    static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
        let listaDeEmprestimos: Array<Emprestimo> = [];
        try {
            const querySelectEmprestimos= `SELECT * FROM emprestimo`;

            const respostaBD = await database.query(querySelectEmprestimos);

            respostaBD.rows.forEach((emprestimo) => {
                let novoEmprestimo = new emprestimo(
                    emprestimo.id_equipamento,
                    emprestimo.id_usuario,
                    emprestimo.data_emprestimo,
                    emprestimo.data_prevista_devolucao,
                    emprestimo.data_real_devolucao,
                    emprestimo.status_emprestimo
                );
                novoEmprestimo.setIdEmprestimo(emprestimo.id_emprestimo);
                listaDeEmprestimos.push(novoEmprestimo);
            });

            return listaDeEmprestimos;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return null;
        }

    }

}

