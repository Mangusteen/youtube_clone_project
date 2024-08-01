import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/common";


export const getCommentsByVideoId = createAsyncThunk('comments/getCommentsByVideoId', async (videoId, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/commentThreads`, {
      params: {
        part: 'snippet',
        videoId: videoId,
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
      }
    })
    return res.data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    isLoading: false,
    comments: [],
    comment: {},
    likesList: []
  },
  reducers: {
    addLikes: ((state, { payload }) => {
      state.likesList.push(payload);
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsByVideoId.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getCommentsByVideoId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      }),
      builder.addCase(getCommentsByVideoId.rejected, (state) => {
        state.isLoading = false;
      })

  }
})

export const { addLikes } = commentsSlice.actions;
export default commentsSlice.reducer;