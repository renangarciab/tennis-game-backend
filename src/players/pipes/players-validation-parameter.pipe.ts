import {
	PipeTransform,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';

export class PlayersValidationParameterPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (!value) {
			throw new BadRequestException(
				`The value of ${metadata.data} should be informed`,
			);
		}

		return value;
	}
}
