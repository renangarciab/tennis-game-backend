import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
	constructor(
		@InjectModel('Player') private readonly playerModule: Model<Player>,
	) {}

	private readonly logger = new Logger(PlayersService.name);

	async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
		const { email } = createPlayerDto;

		const playerFound = await this.playerModule.findOne({ email }).exec();

		if (playerFound) {
			await this.update(createPlayerDto);
		} else {
			await this.create(createPlayerDto);
		}
	}

	async getAllPlayers(): Promise<Player[]> {
		return await this.playerModule.find().exec();
	}

	async getPlayerByEmail(email: string): Promise<Player> {
		const playerFound = await this.playerModule.findOne({ email }).exec();

		if (!playerFound) {
			throw new NotFoundException(
				`Player with email: ${email} not found`,
			);
		}

		return playerFound;
	}

	async deletePlayer(email: string): Promise<any> {
		return await this.playerModule.remove({ email }).exec();
	}

	private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
		const playerCreated = new this.playerModule(createPlayerDto);
		return await playerCreated.save();
	}

	private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
		return await this.playerModule
			.findOneAndUpdate(
				{ email: createPlayerDto.email },
				{ $set: createPlayerDto },
			)
			.exec();
	}
}
