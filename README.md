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

Data Science project made during my last year of MSc in Computer Science. 
The purpose was to make a recommendation algorithm for music based on previous listenings on Spotify.

The models were made using python 3.7 and the user web interface was made in JavaScript.

<a name="data"/>

## Data

For the data, I wanted to use the [Spotify API](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-audio-features) to get a track, artists, genre and it's features (instrumentalness, loundess, duration, vocals etc etc...).
But it appeared that such dataset already exist with 600 000 tracks ([Kaggle challenge DataSet](https://www.kaggle.com/yamaerenay/spotify-dataset-19212020-160k-tracks?select=tracks.csv)). Which is enough for my power of computation with my little computer. So we used this dataset instead of reinventing the wheel.

This data can be found in /back/src/model/data.csv (Too much data for github to display).

Still using the Spotify API, we are retrieving the last hundreds song listened by the user. This data can be found in [/back/src/model/user_top_tracks_features.csv](https://github.com/Verrock/SongPrediction/blob/master/back/src/model/user_top_tracks_features.csv) 

<a name="processing"/>

## Processing

There is diverses possibilities to create a recommendation algorithm.

Since we don't have a lot of users other than ourself, we can't make a collaborative filtering or a matrix decomposition. 
We don't have enough computation power to do have a deep learning approch ([such as the youtube algorithm](https://dl.acm.org/doi/abs/10.1145/2959100.2959190)).

So we decided to have a clustering approache. Creating a "map" with a K-Means an fitting the user on this map with a K-Nearest Neighbours.

In the dataset with 600 000 tracks, we have the following features :

The following features are discarded : 

- id : not relevant about the music. 
- name : Create relation between tracks with a similar name but different genre (ex : Four seasons Vivaldi and a metal version of it).
- artists : A single artist may perform different genre of music, and to facilitate the serendipity factor we decided to remove this feature.
- id_artists : Same idea as artists.
- duration_ms : The lenghth of a music does not determine its genre. A feature we chosed to remove.
- explicit : If there is explicit content (rap with explicit lyrics for exemple). Can be used later on (for exemple filter if the user is a children) But not used for this first iteration.
- popularity : Can be used to weight on decisions, but for the first iteration of this we will do without.
- release_date : Release date carry a part of information, but it is not a major factor for clustering so we remove it.
- year : Duplicate of release date.
- mode : There is major and minor music in every genre of music. Doesn't help to dissociate tracks to create cluster. 
- key : Same as the mode. Every key are used in different genre of music.



- danceability
- energy
- loudness
- speechiness
- acousticness
- instrumentalness
- liveness
- valence
- tempo
- time_signature

<a name="kmeans"/>

## K-means


<a name="knn"/>

## K-NN


<a name="usages"/>

## Usages


<a name="improvements"/>

## Improvements


<a name="sources"/>

## Sources
