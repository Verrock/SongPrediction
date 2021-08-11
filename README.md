# SongPrediction

##### Table of Contents

- [Description](#description)
- [Data](#data)
- [Processing](#processing)
- [K-means](#kmeans)
- [K-NN](#knn)
- [Usages](#usages)
- [Improvements](#improvements)
- [Sources](#sources)


<a name="description"/>

## Description

Data Science project made in duo with Julen Pellat during my last year of MSc in Computer Science.

Julien Pellat : JavaScript (Front & Back)

Nathanaël Mélouki : Python (Data Analysis & Machine Learning)


We wanted to make a recommendation algorithm for music based on previous listenings on Spotify.

The models were made using python 3.7 and the user web interface was made in JavaScript.

<a name="data"/>

## Data

For the data, we wanted to use the [Spotify API](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-audio-features) to get a track, artists, genre and it's features (instrumentalness, loundess, duration, vocals etc etc...).
But it appeared that such dataset already exist with 600 000 tracks ([Kaggle challenge DataSet](https://www.kaggle.com/yamaerenay/spotify-dataset-19212020-160k-tracks?select=tracks.csv)). Which is far enough for our power of computation with our little computer. So we used this dataset instead of reinventing the wheel.

This data can be found in [/back/src/model/data.csv](https://github.com/Verrock/SongPrediction/blob/master/back/src/model/data.csv) (Too much data for github to display).

Still using the Spotify API, we are retrieving the last hundreds song listened by the user (see [ModelService.ts](https://github.com/Verrock/SongPrediction/blob/master/back/src/model/ModelService.ts). The data retrieved can be found in [/back/src/model/user_top_tracks_features.csv](https://github.com/Verrock/SongPrediction/blob/master/back/src/model/user_top_tracks_features.csv), each time a user connect the data is updated.

<a name="processing"/>

## Processing

There is diverses possibilities to create a recommendation algorithm.

Since we don't have a lot of users other than ourself, we can't make a collaborative filtering or a matrix decomposition. 
We don't have enough computation power to do have a deep learning approch ([such as the youtube algorithm](https://dl.acm.org/doi/abs/10.1145/2959100.2959190)).

So we decided to have a clustering approache. Creating a "map" with a K-Means an fitting the user on this map with a K-Nearest Neighbours.

In the dataset with 600 000 tracks, we have the following features : id, name, artists, id_artists, duration_ms, explicit, popularity, release_date, year, mode, key, danceability , energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo, time_signature.

The following features are discarded : 

- id : not relevant about the music. 
- name : Create relation between tracks with a similar name but different genre (ex : Four seasons Vivaldi and a metal version of it).
- artists : A single artist may perform different genre of music, and to facilitate the serendipity factor we decided to remove this feature.
- id_artists : Same idea as artists.
- duration_ms : The lenghth of a music does not determine its genre. A feature we chosed to remove.
- explicit : If there is explicit content (rap with explicit lyrics for exemple). Can be used later on (for exemple filter if the user is a children) But not used for this first iteration.
- popularity : Can be used to weight on decisions, but for the first iteration of this we will do without.
- release_date : Release date carry a part of information (if it was released in 1940 it is more likely to be jazz than metal or eletrco) but it is not a major factor for clustering so we removed it.
- year : Duplicate of release date.
- mode : There is major and minor music in every genre of music. Doesn't help to dissociate classical music from rock or electro to create relevant cluster. 
- key : Same as the mode. Every key are used in different genre of music.


Here is the Spotify API description of each features we keep, which describe precisely how the music is (loud, calm, with lyrics, fast or slow etc...).  :

- danceability : Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

- energy : Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.

- loudness : The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.

- speechiness : Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.

- acousticness : A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.

- instrumentalness : Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.

- liveness : Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.

- valence : A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).

- tempo : The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

- time_signature : An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).


For the user data (the last 100 songs he listened), we retrieve the exact same features using the Spotify API.

We then standarize the values with StandardScaler() from scikit-learn.

<a name="kmeans"/>

## K-means

Once the data processed, using Kmeans with scikit-learn we are creating a "map" with 20 clusters with the 600 000 tracks.

We used the elbow method to determine that 20 clusters was the optimal number of clusters with thoses data and features.


<a name="knn"/>

## K-NN


<a name="usages"/>

## Usages


<a name="improvements"/>

## Improvements


<a name="sources"/>

## Sources
