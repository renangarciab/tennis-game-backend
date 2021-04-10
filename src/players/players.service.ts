import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
	private readonly logger = new Logger(PlayersService.name);
	private players: Player[] = [];

	async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
		const { email } = createPlayerDto;

		const playerFound = this.players.find(
			(player) => player.email === email,
		);

		if (playerFound) {
			await this.update(playerFound, createPlayerDto);
		} else {
			await this.create(createPlayerDto);
		}
	}

	async getAllPlayers(): Promise<Player[]> {
		return await this.players;
	}

	async getPlayerByEmail(email: string): Promise<Player> {
		const playerFound = this.players.find(
			(player) => player.email === email,
		);

		if (!playerFound) {
			throw new NotFoundException(
				`Player with email: ${email} not found`,
			);
		}

		return playerFound;
	}

	async deletePlayer(email: string): Promise<void> {
		const playerFound = this.players.find(
			(player) => player.email === email,
		);

		this.players = this.players.filter(
			(player) => player.email !== playerFound.email,
		);
	}

	private create(createPlayerDto: CreatePlayerDto): void {
		const { name, email, phone } = createPlayerDto;

		const player: Player = {
			_id: uuidv4(),
			name,
			email,
			phone,
			ranking: 'A',
			positionRanking: 1,
			urlPlayerPicture: 'https://placeholder.com/150',
		};

		this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
		this.players.push(player);
	}

	private update(
		playerFound: Player,
		createPlayerDto: CreatePlayerDto,
	): void {
		const { name } = createPlayerDto;

		playerFound.name = name;
	}
}
