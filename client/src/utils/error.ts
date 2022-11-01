import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export function parseRTKQueryError(
  error: FetchBaseQueryError | SerializedError
) {
  if ('status' in error) {
    if ('data' in error) {
      return error.data;
    }

    return error.error;
  }

  return error.message;
}
