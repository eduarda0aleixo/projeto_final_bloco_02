import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { Produto } from './entities/produto.entity';
import { CategoriaModule } from '../categoria/categoria.module'; // Importe o CategoriaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    CategoriaModule
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [TypeOrmModule]
})
export class ProdutoModule {}