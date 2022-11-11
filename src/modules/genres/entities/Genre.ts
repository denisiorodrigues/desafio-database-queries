import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Game } from "../../games/entities/Game";


@Entity('genre')
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    name: string;
    
    @ManyToMany(() => Game, (game) => game.genres)
    @JoinTable()
    games : Game[];

    @CreateDateColumn()
    created_at: Date;
}