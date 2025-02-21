"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { User } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// 建立 Context
interface AuthContextType {
  user: User | null;
  idToken: string | null;
  initializeFirebase: (config: Record<string, unknown>) => void;
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;
  copyIdToken: () => void;
  showAlert: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!firebaseInitialized) return;
    const auth = getAuth();
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIdToken(user ? await user.getIdToken() : null);
    });
  }, [firebaseInitialized]);

  const initializeFirebase = (config: Record<string, unknown>) => {
    if (!getApps().length) {
      initializeApp(config);
      setFirebaseInitialized(true);
    }
  };

  const signIn = async () => {
    if (!firebaseInitialized) return console.error("請先上傳 Firebase 設定檔");
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    setIdToken(await result.user.getIdToken());
  };

  const signOutUser = async () => {
    await signOut(getAuth());
    setUser(null);
    setIdToken(null);
  };

  const copyIdToken = () => {
    if (idToken) {
      navigator.clipboard.writeText(idToken);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <AuthContext.Provider value={{ user, idToken, initializeFirebase, signIn, signOutUser, copyIdToken, showAlert }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const ConfigUploader = () => {
  const authContext = useAuth();
  if (!authContext) {
    return null; // or handle the null case appropriately
  }
  const { initializeFirebase } = authContext;
  const handleConfigUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      initializeFirebase(JSON.parse(text));
    } catch (error) {
      console.error("載入 config 時發生錯誤:", error);
    }
  };

  return (
    <input
      type="file"
      accept=".json"
      onChange={handleConfigUpload}
      className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
    />
  );
};

const AuthButtons = () => {
  const authContext = useAuth();
  if (!authContext) {
    return null; // or handle the null case appropriately
  }
  const { user, signIn, signOutUser, copyIdToken, showAlert } = authContext;
  return (
    <>
      {!user ? (
        <Button onClick={signIn} className="w-full">
          使用 Google 登入
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-sm">
            <span className="font-medium">目前使用者: </span>
            {user.displayName}
          </div>
          <div className="flex gap-2">
            <Button onClick={copyIdToken} variant="outline">
              複製 ID Token
            </Button>
            <Button onClick={signOutUser} variant="destructive">
              登出
            </Button>
          </div>
        </div>
      )}
      {showAlert && (
        <Alert>
          <AlertDescription>ID Token 已複製到剪貼簿</AlertDescription>
        </Alert>
      )}
    </>
  );
};

const FirebaseAuth = () => {
  return (
    <FirebaseAuthProvider>
      <Card className="w-full max-w-md mx-auto p-4">
        <CardContent>
          <div className="space-y-4">
            <ConfigUploader />
            <AuthButtons />
          </div>
        </CardContent>
      </Card>
    </FirebaseAuthProvider>
  );
};

export default FirebaseAuth;
