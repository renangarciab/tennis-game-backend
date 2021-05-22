import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
	constructor(
		@InjectModel('Player') private readonly playerModule: Model<Player>,
	) {}

	private readonly logger = new Logger(PlayersService.name);

	private isPlayerIdFound(_id: string): Promise<Player> {
		const playerFound = this.playerModule.findOne({ _id }).exec();

		if (!playerFound) {
			throw new NotFoundException(`Player id ${_id} not found`);
		}
		return playerFound;
	}

	async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
		const { email } = createPlayerDto;

		const playerFound = await this.playerModule.findOne({ email }).exec();

		if (playerFound) {
			throw new BadRequestException(`Player ${email} already existis`);
		}
		const playerCreated = new this.playerModule(createPlayerDto);

		return await playerCreated.save();
	}

	async updatePlayer(
		_id: string,
		updatePlayerDto: UpdatePlayerDto,
	): Promise<void> {
		this.isPlayerIdFound(_id);

		await this.playerModule
			.findOneAndUpdate({ _id }, { $set: updatePlayerDto })
			.exec();
	}

	async getAllPlayers(): Promise<Player[]> {
		return await this.playerModule.find().exec();
	}

	async getPlayerById(_id: string): Promise<Player> {
		return await this.isPlayerIdFound(_id);
	}

	async deletePlayer(_id: string): Promise<any> {
		this.isPlayerIdFound(_id);

		return await this.playerModule.deleteOne({ _id }).exec();
	}
}
