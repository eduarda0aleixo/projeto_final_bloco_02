import { Transform } from "class-transformer";
import { IsNotEmpty} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 250, nullable: false })
    nome!: string;

    @IsNotEmpty()
    @Column({ length: 250})
    descricao!: string;

    @IsNotEmpty()
    @Column({ nullable: false })
    preco!: number;

    @IsNotEmpty()
    @Column({ length: 250, nullable: false })
    fabricante!: string;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @Transform(({ value }) => value ? new Date(value).toLocaleDateString('pt-BR') : null)
    dataFabricacao!: Date;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @Transform(({ value }) => value ? new Date(value).toLocaleDateString('pt-BR') : null)
    dataValidade!: Date;
    
    @IsNotEmpty()
    @Column({ type: 'int', nullable: false })
    quantidadeEstoque!: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { 
        eager: false,
        onDelete: 'CASCADE' })
    @JoinColumn({ name: "categoria_id" }) 
    categoria!: Categoria;

    @Column({ name: "categoria_id", nullable: false })
    categoriaId!: number;
}