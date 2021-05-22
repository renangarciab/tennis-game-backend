import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Put,
	Query,
	Delete,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParameterPipe } from './pipes/players-validation-parameter.pipe';

@Controller('api/v1/players')
export class PlayersController {
	constructor(private readonly playersService: PlayersService) {}

	@Post()
	@UsePipes(ValidationPipe)
	async createPlayer(
		@Body() createPlayerDto: CreatePlayerDto,
	): Promise<Player> {
		return await this.playersService.createPlayer(createPlayerDto);
	}

	@Put('/:_id')
	@UsePipes(ValidationPipe)
	async updatePlayer(
		@Body() updatePlayerDto: UpdatePlayerDto,
		@Param('_id', PlayersValidationParameterPipe) _id: string,
	): Promise<void> {
		await this.playersService.updatePlayer(_id, updatePlayerDto);
	}

	@Get()
	async getPlayers(): Promise<Player | Player[]> {
		return await this.playersService.getAllPlayers();
	}

	@Get('/:_id')
	async getPlayerById(
		@Param('_id', PlayersValidationParameterPipe) _id: string,
	): Promise<Player> {
		return await this.playersService.getPlayerById(_id);
	}

	@Delete('/:_id')
	async deletePlayer(
		@Param('_id', PlayersValidationParameterPipe) _id: string,
	): Promise<void> {
		this.playersService.deletePlayer(_id);
	}
}
