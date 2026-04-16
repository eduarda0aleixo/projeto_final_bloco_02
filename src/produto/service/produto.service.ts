import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {
        
        const produto =await this.produtoRepository.findOne(
            { where: { id },
        relations: {
            categoria: true
        } });
        
        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({ 
            where: { 
                nome: ILike(`%${nome}%`)},
            relations: {
                categoria: true // Carrega a categoria
            } 
        });
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        
        await this.findById(produto.id);

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<Produto> {
        
        const produto =await this.findById(id);

        if (!produto) {
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND
            );
        }

        await this.produtoRepository.remove(produto);
        return produto;
    }
}