import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signUp, signOut, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  imageUrl?: string;
  publicMetadata?: Record<string, any>;
  unsafeMetadata?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, attributes?: any) => Promise<any>;
  signOut: () => Promise<void>;
  forceSignOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<any>;
  resendConfirmationCode: (email: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<any>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    checkAuthState();
    
    Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signedIn':
          checkAuthState();
          break;
        case 'signedOut':
          setUser(null);
          setIsLoaded(true);
          break;
      }
    });
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
      
      setUser({
        id: currentUser.username,
        email: userAttributes.email,
        firstName: userAttributes.given_name,
        lastName: userAttributes.family_name,
        fullName: `${userAttributes.given_name || ''} ${userAttributes.family_name || ''}`.trim(),
        publicMetadata: {},
        unsafeMetadata: {},
      });
    } catch (error) {
      console.log('No authenticated user found');
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  };

  const signInMethod = async (email: string, password: string) => {
    try {
      // First check if there's already a signed-in user
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          // If there's already a user signed in, sign them out first
          await signOut();
          setUser(null);
        }
      } catch (error) {
        // No current user, proceed with sign in
      }

      const user = await signIn({ username: email, password });
      await checkAuthState();
      return { status: 'complete', user };
    } catch (error: any) {
      // Handle specific "already signed in" error
      if (error.message?.includes('already signed in') || error.name === 'UserAlreadyAuthenticatedException') {
        // Force sign out and try again
        try {
          await signOut();
          setUser(null);
          const user = await signIn({ username: email, password });
          await checkAuthState();
          return { status: 'complete', user };
        } catch (retryError: any) {
          throw retryError;
        }
      }
      throw error;
    }
  };

  const signUpMethod = async (email: string, password: string, attributes: any = {}) => {
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            given_name: attributes.firstName || '',
            family_name: attributes.lastName || '',
          },
        },
      });
      
      if (result.isSignUpComplete) {
        return { status: 'complete', user: result };
      } else {
        return { status: 'pending', user: result };
      }
    } catch (error: any) {
      throw error;
    }
  };

  const confirmSignUpMethod = async (email: string, code: string) => {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      return { status: 'complete' };
    } catch (error: any) {
      throw error;
    }
  };

  const resendConfirmationCodeMethod = async (email: string) => {
    try {
      await resendSignUpCode({ username: email });
    } catch (error: any) {
      throw error;
    }
  };

  const forgotPasswordMethod = async (email: string) => {
    try {
      await resetPassword({ username: email });
    } catch (error: any) {
      throw error;
    }
  };

  const confirmForgotPasswordMethod = async (email: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword });
    } catch (error: any) {
      throw error;
    }
  };

  const signOutMethod = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error: any) {
      throw error;
    }
  };

  const forceSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      // Clear any cached data
      localStorage.removeItem('amplify-authenticator-authToken');
      sessionStorage.clear();
    } catch (error: any) {
      console.error('Error during force sign out:', error);
      // Even if signOut fails, clear the local state
      setUser(null);
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      // For now, return a mock token since we're not using Identity Pool
      return 'mock-token';
    } catch (error) {
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    isSignedIn: !!user,
    isLoaded,
    signIn: signInMethod,
    signUp: signUpMethod,
    signOut: signOutMethod,
    forceSignOut,
    confirmSignUp: confirmSignUpMethod,
    resendConfirmationCode: resendConfirmationCodeMethod,
    forgotPassword: forgotPasswordMethod,
    confirmForgotPassword: confirmForgotPasswordMethod,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useUser = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  return { user, isSignedIn, isLoaded };
};