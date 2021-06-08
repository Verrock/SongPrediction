import { Req, Controller, Get } from '@nestjs/common';
import { Request } from 'express';
import { SpotifyApiService } from './SpotifyApiService';

@Controller()
export class SpotifyApiController {
  constructor(private readonly spotifyApiService: SpotifyApiService) {}

  @Get('songs')
  getSongs(@Req() request: Request): Promise<any> {
    return this.spotifyApiService.getSongs(request.headers.authorization)
      .then(() => true)
      .catch((err) => {
        console.error(err)
        return false;
      });
  }
}
