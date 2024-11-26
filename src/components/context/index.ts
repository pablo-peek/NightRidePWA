import { createContext } from 'react';
import { AuthContextType } from './provider';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;