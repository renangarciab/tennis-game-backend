import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb+srv://admin:Sw9jnrBp6sVQI7dz@cluster0.zagon.mongodb.net/tennisGame?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
		),
		PlayersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
