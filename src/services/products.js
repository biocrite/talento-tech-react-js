import {
  collection,
  doc,
  getDoc,
  getDocs,
  query, 
  where
} from "firebase/firestore";
import { db } from "@firebase-config/firebase.js";

const productsCollection = collection(db, "products");

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
};

export const getProductById = async (id) => {

  const productRef = doc(productsCollection, id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getProductsByCategory = async (category) => {
  const queryRef = category
    ? query(
        productsCollection,
        where("categories", "array-contains", category)
      )
    : productsCollection;

  const snapshot = await getDocs(queryRef);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
};