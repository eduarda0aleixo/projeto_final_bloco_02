import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../service/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller('produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {} 

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoService.findByNome(nome);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.produtoService.delete(id);
        return { message: `Produto ${id} deletado com sucesso` };
    }
    
}