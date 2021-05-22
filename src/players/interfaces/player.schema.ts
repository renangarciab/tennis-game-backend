import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
	{
		phone: { type: String },
		email: { type: String, unique: true },
		name: String,
		ranking: String,
		positionRanking: Number,
		urlPlayerPicture: String,
	},
	{ timestamps: true, collection: 'players' },
);
