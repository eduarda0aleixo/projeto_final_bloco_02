import { Transform } from "class-transformer";
import { IsNotEmpty} from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({name: "tb_categoria"})
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 250, nullable: false })
    nome!: string;

    @IsNotEmpty()
    @Column({ length: 250})
    descricao!: string;

    @OneToMany(() => Produto, (produto) => produto.categoria) 
    produtos!: Produto[]; 
     
}