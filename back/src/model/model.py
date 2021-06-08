import os
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import re
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
import pickle

if __name__ == "__main__":
	df_with_name = pd.read_csv('./src/model/data.csv')
	df_user_with_name_and_artist = pd.read_csv('./src/model/user_top_tracks_features.csv').drop(['duration_ms'], axis=1)
	df = df_with_name.drop(['artists', 'duration_ms', 'explicit', 'popularity', 'release_date', 'year', 'id', 'key', 'mode', 'name', 'popularity'], axis=1)
	df_user = df_user_with_name_and_artist.drop(['name', 'artist'], axis=1)
	filenameKmeans = './src/model/finalized_kmeans_model.sav'

	scaled_features = StandardScaler().fit_transform(df)
	scaled_user_features = StandardScaler().fit_transform(df_user)

	if os.path.isfile(filenameKmeans):
		km = pickle.load(open(filenameKmeans, 'rb'))
		predicted_genre = km.predict(scaled_user_features)
		df_user['genre'] = predicted_genre
		df_user_with_name_and_artist['genre'] = predicted_genre
	else:
		km = KMeans(n_clusters=20) # The elbow method show that 20 was an optimal number of clusters
		km = km.fit(scaled_features)
		predicted_genre = km.predict(scaled_user_features)
		df_user['genre'] = predicted_genre
		df_user_with_name_and_artist['genre'] = predicted_genre
		pickle.dump(km, open(filenameKmeans, 'wb'))

	df_arr_name_artist = []
	for genre in np.unique(predicted_genre):
		df_arr_name_artist.append(df_user_with_name_and_artist.groupby(df_user_with_name_and_artist.genre).get_group(genre))
	df_arr_name_filtered = list(filter(lambda df: len(df.index) > 10 , df_arr_name_artist))

	filenameKnn = './src/model/finalized_knn_model.sav'
	if os.path.isfile(filenameKnn):
		nbrs = pickle.load(open(filenameKnn, 'rb'))
	else:
		nbrs = NearestNeighbors(n_neighbors=2, algorithm='auto').fit(df)
		pickle.dump(nbrs, open(filenameKnn, 'wb'))


	df_arr_features_filtered = []
	for df_name_filtered in df_arr_name_filtered:
		df_arr_features_filtered.append(df_name_filtered.drop(['name', 'artist', 'genre'], axis=1))
	distances_arr = []
	indices_arr = []
	for df_features in df_arr_features_filtered:
		distances, indices = nbrs.kneighbors(df_features)
		distances_arr.append(distances)
		indices_arr.append(indices)

	for i in range(0, len(df_arr_name_filtered)):
		df_name_no_duplicates = df_arr_name_filtered[i].drop_duplicates(subset='artist')
		print(', '.join(df_name_no_duplicates['artist'].tolist()))
		recommended_songs = []
		for indices in indices_arr[i]:
			recommended_songs.append(', '.join(df_with_name.iloc[indices]['id'].tolist()))
		print(', '.join(recommended_songs))
