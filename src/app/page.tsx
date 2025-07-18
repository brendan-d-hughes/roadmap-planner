"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getIdToken, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [secureResp, setSecureResp] = useState<string>("");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function doSignIn() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function testSecure() {
    if (!auth.currentUser) {
      console.log("No currentUser");
      return;
    }
    const origin = window.location.origin;
    const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
    const res = await fetch(`${origin}/api/secure`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: "same-origin"
    });
    console.log("DEBUG fetch status:", res.status);
    const text = await res.text();
    console.log("DEBUG response text:", text);
    setSecureResp(text);
  }

  

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      {!user && <button onClick={doSignIn}>Sign in with Google</button>}
      {user && (
        <>
          <div>Signed in as <strong>{user.email}</strong></div>
          <button onClick={testSecure}>Test Secure Endpoint</button>{" "}
          <button onClick={() => signOut(auth)}>Sign Out</button>
          <pre style={{ background: "#111", color: "#0f0", padding: 12 }}>{secureResp}</pre>
        </>
      )}
    </main>
  );
}


