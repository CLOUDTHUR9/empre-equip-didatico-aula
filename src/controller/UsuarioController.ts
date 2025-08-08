import { Usuario } from "../model/Usuario.js";
import type { Request, Response } from "express";

/**
 * Interface UsuarioDTO
 * Define os atributos que devem ser recebidos do usuario nas requisições
 */
interface UsuarioDTO {
    nome: string;
    tipoUsuario: string;
    contato: string
}

/**
 * Controlador para operações relacionadas aos usuarios.
 */
class UsuarioController extends Usuario {

    static async todos(req: Request, res: Response): Promise<any> {
        
        try {
            const listaDeUsuarios = await Usuario.listarUsuarios();
            
            return res.status(200).json(listaDeUsuarios);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

           return res.status(400).json("Erro ao recuperar as informações do Usuário");
        }
    }    
    
}

export default UsuarioController;