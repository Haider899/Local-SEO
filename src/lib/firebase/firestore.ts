import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  organization?: string;
  plan?: "Starter Free" | "Growth Pro" | "Agency Enterprise";
  createdAt?: any;
  lastLoginAt?: any;
}

export interface WorkspaceDocument {
  id?: string;
  userId: string;
  name: string;
  domain: string;
  location?: string;
  overallScore?: number;
  grade?: string;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Sync or create user profile in Firestore
 */
export async function syncUserProfile(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  organization?: string;
}): Promise<void> {
  try {
    const userRef = doc(db, "users", user.uid);
    const existing = await getDoc(userRef);

    if (!existing.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
        organization: user.organization || "My Agency",
        plan: "Starter Free",
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    } else {
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        ...(user.displayName ? { displayName: user.displayName } : {}),
        ...(user.photoURL ? { photoURL: user.photoURL } : {}),
      });
    }
  } catch (error) {
    console.warn("Firestore syncUserProfile error (check security rules / offline):", error);
  }
}

/**
 * Save an audit result to Firestore under user's audits subcollection
 */
export async function saveAuditToFirestore(userId: string, auditData: any): Promise<string | null> {
  try {
    const auditsRef = collection(db, "users", userId, "audits");
    const docRef = await addDoc(auditsRef, {
      ...auditData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore saveAudit error:", error);
    return null;
  }
}

/**
 * Get all workspaces for a user
 */
export async function getUserWorkspaces(userId: string): Promise<WorkspaceDocument[]> {
  try {
    const q = query(collection(db, "workspaces"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as WorkspaceDocument));
  } catch (error) {
    console.warn("Firestore getUserWorkspaces error:", error);
    return [];
  }
}
