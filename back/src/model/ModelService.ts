import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { PythonShell } from 'python-shell';
import * as path from 'path';
import { SpotifyApiService } from 'src/spotifyApi/SpotifyApiService';
import { ModelRepository } from './ModelRepository';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly spotifyApiService: SpotifyApiService
  ) {}

  private formatFeatures(audioFeaturesArr: {[key: string]: any}[])  {
    return audioFeaturesArr.map((audioFeatures) => {
      return {
        acousticness: audioFeatures.acousticness,
        danceability: audioFeatures.danceability,
        duration_ms: audioFeatures.duration_ms,
        energy: audioFeatures.energy,
        instrumentalness: audioFeatures.instrumentalness,
        liveness: audioFeatures.liveness,
        loudness: audioFeatures.loudness,
        speechiness: audioFeatures.speechiness,
        tempo: audioFeatures.tempo,
        valence: audioFeatures.valence,
      }
    })
  }

  private addNameAndArtist(topTrackFeatures: any[], topTrackName: any[], topTrackArtist: any[]) {
    return topTrackFeatures.map((features: any[], index: number) => {
      return {
        ...features,
        name: topTrackName[index],
        artist: topTrackArtist[index],
      }
    });
  }

  private writeFile(records: {[key: string]: any}[]) {
    const csvWriter = createObjectCsvWriter({
      path: './src/model/user_top_tracks_features.csv',
      header: [
        {id: 'acousticness', title: 'acousticness'},
        {id: 'danceability', title: 'danceability'},
        {id: 'duration_ms', title: 'duration_ms'},
        {id: 'energy', title: 'energy'},
        {id: 'instrumentalness', title: 'instrumentalness'},
        {id: 'liveness', title: 'liveness'},
        {id: 'loudness', title: 'loudness'},
        {id: 'speechiness', title: 'speechiness'},
        {id: 'tempo', title: 'tempo'},
        {id: 'valence', title: 'valence'},
        {id: 'name', title: 'name'},
        {id: 'artist', title: 'artist'},
      ]
    });

    csvWriter.writeRecords(records)
      .then(() => {
        console.log('Update user_top_tracks_features.csv successfully');
      });
  }

  public async updateUserTopTracks(accessToken: string): Promise<void> {
    this.spotifyApiService.setAccessToken(accessToken);
    const topTracks = [
      ...(await this.spotifyApiService.getTopTracks("medium_term", 49, 0)).items,
      ...(await this.spotifyApiService.getTopTracks("medium_term", 50, 49)).items
    ];
    const topTrackIds = topTracks.map((track: any): string => track.id).join(',')
    const topTrackName = topTracks.map((track: any): string => track.name)
    const topTrackArtist = topTracks.map((track: any): string => track.artists[0].name)
    const topTrackFeatures = await this.spotifyApiService.getTrackFeatures(topTrackIds);
    const formattedTopTrackFeatures = this.formatFeatures(topTrackFeatures);
    const formattedTopTrackFeaturesWithName = this.addNameAndArtist(formattedTopTrackFeatures, topTrackName, topTrackArtist);
    this.modelRepository.writeFile(
      './src/model/user_top_tracks_features.csv', [
        {id: 'acousticness', title: 'acousticness'},
        {id: 'danceability', title: 'danceability'},
        {id: 'duration_ms', title: 'duration_ms'},
        {id: 'energy', title: 'energy'},
        {id: 'instrumentalness', title: 'instrumentalness'},
        {id: 'liveness', title: 'liveness'},
        {id: 'loudness', title: 'loudness'},
        {id: 'speechiness', title: 'speechiness'},
        {id: 'tempo', title: 'tempo'},
        {id: 'valence', title: 'valence'},
        {id: 'name', title: 'name'},
        {id: 'artist', title: 'artist'},
      ],
      formattedTopTrackFeaturesWithName
    );
  }

  private async runPythonScript(scriptPath: string): Promise<any> {
    const result = await new Promise((resolve, reject): any[] | void => {
      PythonShell.run(scriptPath, {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'],
        args: []
      }, (err, results): any[] | void => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
    return result;
  }

  public async predict(): Promise<any> {
    const scriptPath = path.resolve('./src/model/model.py');
    const output = await this.runPythonScript(scriptPath)
    let slicedOutput = [], i = 0, n = output.length;
    while (i < n) {
      slicedOutput.push(output.slice(i, i += 2));
    }
    const recommandations = slicedOutput.map((output) => {
      return {
        'relatedArtists': output[0].split(', '),
        'recommandedSongIds': output[1].split(', ')
      };
    })
    return recommandations;
  }
}
