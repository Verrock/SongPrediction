import { Req, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { ModelService } from './ModelService';

@Controller()
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('top-tracks/update')
  updateUserTopTracks(@Req() request: Request): Promise<boolean> {
    return this.modelService.updateUserTopTracks(request.headers.authorization)
      .then(() => true)
      .catch((err) => {
        console.error(err)
        return false;
      });
  }

  @Post('predict')
  predict() {
    return this.modelService.predict();
  }
}
