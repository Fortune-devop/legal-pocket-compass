import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    }
  },
  API: {
    REST: {
      LegalPocketAPI: {
        endpoint: import.meta.env.VITE_API_URL || 'http://localhost:4000',
        region: 'us-east-1',
      }
    }
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig; 