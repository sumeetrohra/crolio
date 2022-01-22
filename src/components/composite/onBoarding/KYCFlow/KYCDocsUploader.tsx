import React, { useEffect, useState } from 'react';
import { _uploadURLs } from '../../../../types/kyc';
import Input from '@mui/material/Input';
import { Box, Button } from '@mui/material';
import { uploadFile } from '../../../../api/kyc';

interface IKYCUploaderProps {
  uploadURLs: _uploadURLs;
}

const KYCDocsUploader: React.FC<IKYCUploaderProps> = (props) => {
  const { uploadURLs } = props;
  const [filesArr, setFilesArr] = useState<FileList | null>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filesArr && filesArr.length > 0) {
      uploadFile(uploadURLs.documentFront, filesArr[0]).then((data) => console.log(data));
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        my: 8,
        mt: 0,
        mx: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Input
        type="file"
        onChange={(e) => setFilesArr((e.target as HTMLInputElement).files)}
        placeholder="Please upload aadhar card front"
      />
      <Button type="submit" fullWidth variant="outlined">
        submit
      </Button>
    </Box>
  );
};

export default KYCDocsUploader;
