import { Equipamento } from "../model/Equipamento.js";
import type { Request, Response } from "express";

/**
 * Interface EquipamentoDTO
 * Define os atributos que devem ser recebidos do Equipamento nas requisições
 */
interface EquipamentoDTO {
    nome: string;
    categoria: string;
    status: string
}

/**
 * Controlador para operações relacionadas aos Equipamentos.
 */
class EquipamentoController extends Equipamento {

    static async todos(req: Request, res: Response): Promise<any> {
        
        try {
            const listaDeEquipamentos = await Equipamento.listarEquipamentos();
            
            return res.status(200).json(listaDeEquipamentos);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

           return res.status(400).json("Erro ao recuperar as informações do Usuário");
        }
    }    
    
}

export default EquipamentoController;