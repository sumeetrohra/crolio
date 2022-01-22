import React, { useState, useRef } from 'react';
import { UploadedDocFace, UploadedKYCDocType, _uploadURLs } from '../../../../types/kyc';
import Input from '@mui/material/Input';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { uploadFile, verifyDoc, verifySelfie } from '../../../../api/kyc';

interface IKYCUploaderProps {
  uploadURLs: _uploadURLs;
}

enum DocumentType {
  AADHAR_CARD_FRONT = 'AADHAR_CARD_FRONT',
  AADHAR_CARD_BACK = 'AADHAR_CARD_BACK',
  PAN_CARD_FRONT = 'PAN_CARD_FRONT',
  SELFIE = 'SELFIE',
}

const getHeaderText = (docType: DocumentType): string => {
  const uploadInfo = 'The image should be jpeg and less than 5 MBs';
  switch (docType) {
    case DocumentType.AADHAR_CARD_FRONT: {
      return `Please upload your Aadhar card front image. ${uploadInfo}`;
    }

    case DocumentType.AADHAR_CARD_BACK: {
      return `Please upload your Aadhar card back image. ${uploadInfo}`;
    }

    case DocumentType.PAN_CARD_FRONT: {
      return `Please upload your Pan card front image. ${uploadInfo}`;
    }

    case DocumentType.SELFIE: {
      return `Please upload your Selfie. ${uploadInfo}`;
    }
  }
  return '';
};

const KYCDocsUploader: React.FC<IKYCUploaderProps> = (props) => {
  const { uploadURLs } = props;
  const [filesArr, setFilesArr] = useState<FileList | null>();
  const [currentDocument, selectCurrentDocument] = useState<DocumentType>(
    DocumentType.AADHAR_CARD_FRONT,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fileInputRef = useRef(null);

  // TODO: complete this and add kycstatus in Router page to configure the flow
  const requestKYCApproval = (): void => {
    setLoading(true);
    setLoading(false);
  };

  const uploadAndVerifyDocument = async ({
    uploadUrl,
    docType,
    docFace,
    nextFn,
  }: {
    uploadUrl: string;
    docType?: UploadedKYCDocType;
    docFace?: UploadedDocFace;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextFn?: any;
  }): Promise<void> => {
    if (filesArr && filesArr.length > 0) {
      setLoading(true);
      let uploadFileData;
      try {
        uploadFileData = await uploadFile(uploadUrl, filesArr[0]);
      } catch (err) {
        setError('Could not upload file please try again');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fileInputRef.current as any).value = '';
        return;
      }
      if (uploadFileData?.status === 200) {
        const verificationData =
          currentDocument !== DocumentType.SELFIE && docType && docFace
            ? await verifyDoc({
                documentType: docType,
                frontOrBack: docFace,
              })
            : await verifySelfie();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fileInputRef.current as any).value = '';
        if (!verificationData.data.success) {
          setError('Could not verify uploaded image successfully, please try again');
        } else {
          nextFn();
          setFilesArr(null);
          setError('');
          setLoading(false);
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    switch (currentDocument) {
      case DocumentType.AADHAR_CARD_FRONT: {
        await uploadAndVerifyDocument({
          uploadUrl: uploadURLs.documentFront,
          docType: UploadedKYCDocType.AADHAR,
          docFace: UploadedDocFace.FRONT,
          nextFn: () => selectCurrentDocument(DocumentType.AADHAR_CARD_BACK),
        });
        return;
      }

      case DocumentType.AADHAR_CARD_BACK: {
        await uploadAndVerifyDocument({
          uploadUrl: uploadURLs.documentBack,
          docType: UploadedKYCDocType.AADHAR,
          docFace: UploadedDocFace.BACK,
          nextFn: () => selectCurrentDocument(DocumentType.PAN_CARD_FRONT),
        });
        return;
      }

      case DocumentType.PAN_CARD_FRONT: {
        await uploadAndVerifyDocument({
          uploadUrl: uploadURLs.panCard,
          docType: UploadedKYCDocType.PAN_CARD,
          docFace: UploadedDocFace.FRONT,
          nextFn: () => selectCurrentDocument(DocumentType.SELFIE),
        });
        return;
      }

      case DocumentType.SELFIE: {
        await uploadAndVerifyDocument({
          uploadUrl: uploadURLs.selfie,
          nextFn: () => requestKYCApproval(),
        });
        return;
      }
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
      <Typography component="h6" variant="h6">
        {getHeaderText(currentDocument)}
      </Typography>
      <Input
        inputRef={fileInputRef}
        type="file"
        onChange={(e) => setFilesArr((e.target as HTMLInputElement).files)}
        required
      />
      <Typography component="p">{error}</Typography>
      <Button
        disabled={!(filesArr && filesArr.length > 0) || loading}
        type="submit"
        fullWidth
        variant="outlined"
      >
        {loading ? <CircularProgress /> : 'submit'}
      </Button>
    </Box>
  );
};

export default KYCDocsUploader;
