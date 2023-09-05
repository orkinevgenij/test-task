import { Stack } from '@mui/material';
import React, { useState } from 'react';

export const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <Stack
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={preview} width='100%' alt='' />
    </Stack>
  );
};
