import { HttpService, Injectable } from '@nestjs/common';

type timeRange = "long_term" | "medium_term" | "short_term"

@Injectable()
export class SpotifyApiService {
  constructor(private readonly httpService: HttpService) {}

  private accessToken: string;

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public async getSongs(accessToken: string) {
    this.setAccessToken(accessToken);
    // return await this.httpService
    // .get("https://api.spotify.com/v1/me/top/tracks", {
    //   headers: {
    //     Authorization: `Bearer ${this.accessToken}`
    //   },
    //   params: {
    //     time_range: timeRange,
    //     limit,
    //     offset,
    //   }
    // })
    // .toPromise()
    // .then((resp) => resp.data)
    // .catch((err) => console.error(err));
  }

  public async getTopTracks(timeRange: timeRange, limit: number, offset: number): Promise<any> {
    return await this.httpService
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: this.accessToken
        },
        params: {
          time_range: timeRange,
          limit,
          offset,
        }
      })
      .toPromise()
      .then((resp) => resp.data)
      .catch((err) => console.error(err));
  }

  public async getTrackFeatures(trackIds: string) {
    return await this.httpService
    .get("https://api.spotify.com/v1/audio-features/", {
      headers: {
        Authorization: this.accessToken
      },
      params: {
        ids: trackIds
      }
    })
    .toPromise()
    .then((resp) => resp.data.audio_features)
    .catch((err) => console.error(err));
  }
}
