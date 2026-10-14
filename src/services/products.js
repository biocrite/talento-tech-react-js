
import { collection, getDocs } from "firebase/firestore";
import { db } from "@firebase-config/firebase.js";

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "awesomeshop"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
