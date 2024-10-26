// src/store/camperSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

const initialState = {
    campers: [],
    selectedCamper: null,
    status: 'idle',
    error: null,
    page: 1,
};

// Define fetchCampers thunk without exporting yet
const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async ({ page, filters = {} }, thunkAPI) => {
        try {
            let query = `page=${page}&limit=5`;
            if (filters.location) query += `&location=${encodeURIComponent(filters.location)}`;
            Object.entries(filters.filters || {}).forEach(([key, value]) => {
                if (value) query += `&${key.toLowerCase()}=true`;
            });
            Object.entries(filters.vehicleType || {}).forEach(([key, value]) => {
                if (value) query += `&form=${encodeURIComponent(key)}`;
            });

            const response = await axios.get(`${BASE_URL}?${query}`);
            return { items: response.data.items, page };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch campers';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Define fetchCamperDetails thunk without exporting yet
const fetchCamperDetails = createAsyncThunk(
    'campers/fetchCamperDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch camper details';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

const camperSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        loadMore: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                const { items, page } = action.payload;
                state.status = 'succeeded';
                state.campers = page === 1 ? items : [...state.campers, ...items];
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCamperDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCamperDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCamper = action.payload;
            })
            .addCase(fetchCamperDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Step 1: Export actions and reducer only (no thunks yet)
export const { loadMore } = camperSlice.actions;
export default camperSlice.reducer;

// Step 2: Add the exports for thunks one by one
export { fetchCampers, fetchCamperDetails };
