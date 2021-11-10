/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ProfileContent from '../../../commons/ProfileContent';
import Box from '../../../foundation/layout/Box';

export default function ProfileScreen() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
      paddingTop={{
        xs: '24px',
        md: '32px',
      }}
      overflow="auto"
    >
      <ProfileContent />
    </Box>
  );
}
