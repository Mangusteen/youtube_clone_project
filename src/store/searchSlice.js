import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/common";


export const getVideosByQuery = createAsyncThunk('search/getVideosByQuery', async (query, token = '', thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        q: query,
        regionCode: 'RU',
        maxResults: '25',
        token: token
      }
    })
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    searchQuery: null,
    queryList: [],
    token: null
  },
  reducers: {
    getSearchQuery: ((state, { payload }) => {
      state.searchQuery = payload;
    }),
    clearQueryList: ((state) => {
      state.queryList = [];
      state.token = null;
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getVideosByQuery.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getVideosByQuery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.nextPageToken;
        if (state.token) {
          state.queryList = [...state.queryList, ...payload.items];
        } else {
          state.queryList = payload.items;
        }
      }),
      builder.addCase(getVideosByQuery.rejected, (state) => {
        state.loading = false;
      })
  }
})

export const { getSearchQuery, clearQueryList } = searchSlice.actions;
export default searchSlice.reducer;