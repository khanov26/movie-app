import React, { ChangeEvent } from 'react';
import { Box, InputBase, InputLabel, Typography } from '@mui/material';

interface Props {
  title: string;
  imageRatio: string;
  onUpload: (file: File) => void;
  imagePreview?: string;
  isDisabled?: boolean;
}

const ImageUploader: React.FC<Props> = ({
  title,
  imageRatio,
  onUpload,
  imagePreview,
  isDisabled = false,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const [file] = event.target.files;
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
      <Box
        sx={{
          aspectRatio: imageRatio,
          overflow: 'hidden',
          border: '1px solid',
          display: 'grid',
          gridTemplateAreas: '"upload"',
        }}
      >
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            sx={{
              gridArea: 'upload',
              objectPosition: 'center',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        )}
        <InputLabel
          sx={{
            gridArea: 'upload',
            cursor: 'pointer',
            display: isDisabled ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <InputBase
            type="file"
            onChange={handleChange}
            sx={{ display: 'none' }}
          />

          <Typography sx={{ textAlign: 'center', color: 'white' }}>
            Загрузить <br /> изображение
          </Typography>
        </InputLabel>
      </Box>
    </Box>
  );
};

export default ImageUploader;
