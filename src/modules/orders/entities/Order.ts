import { Column, CreateDateColumn, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { User } from "../../users/entities/User";

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    total: number;

    @Column()
    quantitie: number;

    @ManyToMany(() => Game, (game) => game.orders)
    @JoinTable()
    games: Game[];

    @ManyToOne(() => User, (user) => user.orders)
    @JoinTable()
    user: User;

    @CreateDateColumn()
    create_at: Date;
}