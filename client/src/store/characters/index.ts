import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as characterService from '../../services/characterService';
import { Character } from '../../types/character';
import { CharactersSearchParams, CharactersState } from './types';

const initialState: CharactersState = {
  isLoading: false,
  items: [],
  error: '',
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetch',
  ({ movieId, actorId }: CharactersSearchParams) => {
    if (movieId) {
      return characterService.getByMovieId(movieId);
    }
    if (actorId) {
      return characterService.getByActorId(actorId);
    }
    throw new Error('Неправильный параметр');
  }
);

export const createCharacter = createAsyncThunk(
  'characters/create',
  (character: Character) => {
    return characterService.create(character);
  }
);

export const deleteCharacter = createAsyncThunk(
  'characters/delete',
  (character: Character) => {
    characterService.deleteById(character.id!);
    return character;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (character) => action.payload.id !== character.id
        );
      });
  },
});

export default charactersSlice.reducer;
