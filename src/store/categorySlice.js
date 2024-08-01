import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/common";


export const getVideosByCategory = createAsyncThunk('search/getVideosByCategory', async (category, token = '', thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        q: category,
        regionCode: 'RU',
        maxResults: '25',
        pageToken: token
      }
    })
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    categoryList: [],
    pageToken: null,
    activeCategory: 'Все',

  },
  reducers: {
    getActiveCategory: ((state, { payload }) => {
      state.activeCategory = payload;
    }),
    clearCategoryList: ((state) => {
      state.categoryList = [];
      state.pageToken = null;
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getVideosByCategory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getVideosByCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.pageToken = payload.nextPageToken;
        if (state.pageToken) {
          state.categoryList = [...state.categoryList, ...payload.items];
        } else {
          state.categoryList = payload.items;
        }
      }),
      builder.addCase(getVideosByCategory.rejected, (state) => {
        state.loading = false;
      })
  }
})

export const { getActiveCategory, clearCategoryList } = searchSlice.actions;
export default searchSlice.reducer;