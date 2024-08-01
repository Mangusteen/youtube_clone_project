import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/common";

export const getVideos = createAsyncThunk('videos/getVideos', async (token = '', thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'RU',
        maxResults: '20',
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        pageToken: token
      },
      headers: {
        Accept: 'application/json'
      }
    })
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getVideo = createAsyncThunk('videos/getVideo', async (id, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: id,
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
      }
    })
    return res.data.items[0];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    isLoading: false,
    loading: false,
    videos: [],
    nextPageToken: null,
    video: [],
    error: null
  },
  reducers: {
    clearVideosList: ((state) => {
      state.videos = [];
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getVideos.fulfilled, (state, { payload }) => {
        const token = state.nextPageToken = payload.nextPageToken;
        state.videos = token !== '' ? [...state.videos, ...payload.items] : payload.items;
        state.isLoading = false;
        state.activeCategory = payload.category;
      }),
      builder.addCase(getVideos.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getVideo.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(getVideo.fulfilled, (state, { payload }) => {
        state.video = payload;
        state.loading = false;
      }),
      builder.addCase(getVideo.rejected, (state) => {
        state.loading = false;
        state.error = error.message;
      })
  }
})

export const { clearVideosList } = videosSlice.actions;
export default videosSlice.reducer;