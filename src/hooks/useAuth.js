import React, { createContext } from 'react';

const AuthContext = createContext();

/**
 *
 * @param children child components
 * @returns wrapped components provided with access to auth object
 */
export const ProvideAuth = () => {
  return <AuthContext.Provider value="test">test</AuthContext.Provider>;
};
