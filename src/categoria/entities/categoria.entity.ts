import { Transform } from "class-transformer";
import { IsNotEmpty} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @Transform(({ value }) => value ? new Date(value).toLocaleDateString('pt-BR') : null)
    dataFabricacao!: Date;

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @Transform(({ value }) => value ? new Date(value).toLocaleDateString('pt-BR') : null)
    dataValidade!: Date;
}