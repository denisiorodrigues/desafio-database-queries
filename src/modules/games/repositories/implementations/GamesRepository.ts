import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder("game") 
      .where("UPPER(game.title) like UPPER(:title)", {title: `%${param}%`})
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    return await this.repository.query(`SELECT COUNT(*) FROM games`); 
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    
    const game = await this.repository.createQueryBuilder("game")
    .innerJoinAndSelect("game.users","user")
    .where("game.id = :game_id", {game_id: id})
    .getOneOrFail();

    return game?.users;
  }
}
