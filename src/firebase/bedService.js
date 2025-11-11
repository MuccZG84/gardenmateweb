import { db } from './config';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export async function saveBed(userId, bedData) {
  try {
    const docRef = await addDoc(collection(db, 'beds'), {
      userId,
      ...bedData, // ← direktno ubacujemo name i grid
      createdAt: serverTimestamp(),
    });
    console.log('✅ Gredica spremljena:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Greška pri spremanju gredice:', error);
    throw error;
  }
}

export async function getBedsByUser(userId) {
  try {
    const q = query(collection(db, 'beds'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Greška pri dohvaćanju gredica:', error);
    throw error;
  }
}

export async function deleteBed(bedId) {
  try {
    await deleteDoc(doc(db, 'beds', bedId));
    console.log('🗑️ Gredica obrisana:', bedId);
  } catch (error) {
    console.error('❌ Greška pri brisanju gredice:', error);
    throw error;
  }
}