import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Базовий URL для API
const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

// Асинхронний thunk для отримання списку кемперів
export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (page, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}?page=${page}&limit=5`);
            return response.data.items;
        } catch (error) {
            // Обробка помилки з передачею повідомлення через rejectWithValue
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch campers');
        }
    }
);

// Асинхронний thunk для отримання деталей окремого кемпера
export const fetchCamperDetails = createAsyncThunk(
    'campers/fetchCamperDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            // Обробка помилки з передачею повідомлення через rejectWithValue
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch camper details');
        }
    }
);

// Початковий стан
const initialState = {
    campers: [],
    selectedCamper: null,
    status: 'idle',
    error: null,
    page: 1,
};

// Slice для управління станом кемперів
const camperSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        loadMore: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        // Обробка стану під час завантаження списку кемперів
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Скидаємо попередні помилки при новому запиті
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.campers = [...state.campers, ...action.payload]; // Додаємо нові кемпери
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Зберігаємо повідомлення про помилку
            })
            // Обробка стану під час завантаження деталей кемпера
            .addCase(fetchCamperDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Скидаємо попередні помилки при новому запиті
            })
            .addCase(fetchCamperDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCamper = action.payload;
            })
            .addCase(fetchCamperDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Зберігаємо повідомлення про помилку
            });
    },
});

export default camperSlice.reducer;
export const { loadMore } = camperSlice.actions;
