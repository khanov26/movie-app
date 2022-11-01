import { Actor } from '../../types/actor';
import { convertObjectToFormData } from '../../utils/data';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActors: builder.query<Actor[], void>({
      query: () => '/actors',
      providesTags: (actors) =>
        actors
          ? [
              ...actors.map(({ id }) => ({ type: 'Actor' as const, id })),
              { type: 'Actor', id: 'LIST' },
            ]
          : [{ type: 'Actor', id: 'LIST' }],
    }),
    searchActors: builder.query<Actor[], string>({
      query: (name) => ({
        url: '/actors',
        params: name ? { name } : undefined,
      }),
    }),
    getActor: builder.query<Actor, string>({
      query: (actorId) => `/actor/${actorId}`,
      providesTags: (_result, _error, id) => [{ type: 'Actor', id }],
    }),
    deleteActor: builder.mutation<void, Actor>({
      query: (actor) => ({
        url: `/actor/${actor.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Actor', id: 'LIST' }],
    }),
    addActor: builder.mutation<Actor, { actor: Actor; profile: File | null }>({
      query: ({ actor, profile }) => {
        const data = convertObjectToFormData(actor);

        if (profile) {
          data.set('profile', profile);
        }

        return {
          url: '/actor/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Actor', id: 'LIST' }],
    }),
    updateActor: builder.mutation<
      Actor,
      { actor: Actor; profile: File | null }
    >({
      query: ({ actor, profile }) => {
        const data = convertObjectToFormData(actor);

        if (profile) {
          data.set('profile', profile);
        }

        return {
          url: '/actor/',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { actor: { id } }) => [
        { type: 'Actor', id: 'LIST' },
        { type: 'Actor', id },
      ],
    }),
  }),
});

export const {
  useGetActorsQuery,
  useSearchActorsQuery,
  useDeleteActorMutation,
  useAddActorMutation,
  useUpdateActorMutation,
  useGetActorQuery,
} = extendedApiSlice;
