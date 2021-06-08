import { Module } from '@nestjs/common';
import { ModelModule } from './model/ModelModule';
import { SpotifyApiModule } from './spotifyApi/SpotifyApiModule';

@Module({
  imports: [
    ModelModule,
    SpotifyApiModule
  ],
})
export class AppModule {}
