import { Module } from '@nestjs/common';
import { SpotifyApiModule } from 'src/spotifyApi/SpotifyApiModule';
import { ModelController } from './ModelController';
import { ModelRepository } from './ModelRepository';
import { ModelService } from './ModelService';

@Module({
  imports: [SpotifyApiModule],
  controllers: [ModelController],
  providers: [ModelRepository, ModelService],
})
export class ModelModule {}
