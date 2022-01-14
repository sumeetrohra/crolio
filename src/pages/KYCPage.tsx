import React, { useEffect } from 'react';
import { createUserKYCDetails } from '../api/kyc';
import OnBoardingLayout from '../components/composite/onBoarding/OnBoardingLayout';

const KYCPage = () => {
  useEffect(() => {
    createUserKYCDetails({ firstName: 'John', lastName: 'doe' }).then((data) => console.log(data));
  }, []);
  return <OnBoardingLayout>KYC Page</OnBoardingLayout>;
};

export default KYCPage;
