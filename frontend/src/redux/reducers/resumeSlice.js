import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const fetchResumeData = createAsyncThunk(
  'resume/fetchResumeData',
  async (userId) => {
      const response = await fetch(`${BASE_URL}/resumes/aggregate/user/${userId}`);
      console.log(response);
      if (!response.ok) {
          if (response.headers.get('Content-Type').includes('text/html')) {
              throw new Error('Backend returned an HTML response instead of JSON');
          } else {
            console.log(response);
              throw new Error('Failed to fetch resume data');
          }
      }
      const data = await response.json();
      console.log(data);
      return data;
  }
);

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        data: {
            name: '',
            email: '',
            phone: '',
            address: '',
            education: '',
            experience: [],
            skills: [],
            projects: [],
            certifications: [],
        },
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        updateResume: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumeData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResumeData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchResumeData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { updateResume } = resumeSlice.actions;

export default resumeSlice.reducer;
