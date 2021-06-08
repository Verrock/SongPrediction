import { HttpModule, Module } from '@nestjs/common';
import { SpotifyApiController } from './SpotifyApiController';
import { SpotifyApiService } from './SpotifyApiService';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  controllers: [SpotifyApiController],
  providers: [SpotifyApiService],
  exports: [SpotifyApiService]
})
export class SpotifyApiModule {}
