import {
  collection,
  doc,
  getDoc,
  getDocs,
  query, 
  where,
    addDoc,
  deleteDoc,
  updateDoc,
  // limit,
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


export const createProduct = async (product) => {
  const existingProducts = await getProducts();

  const nextId =
    Math.max(0, ...existingProducts.map((item) => Number(item.id) || 0)) + 1;

  const productData = { ...product, id: nextId };
  const reference = await addDoc(productsCollection, productData);

  return { ...productData, docId: reference.id };
};

export const updateProduct = async (docId, product) => {
  const { docId: ignored, ...productData } = product;

  await updateDoc(doc(productsCollection, docId), productData);

  return { ...productData, docId };
};

export const deleteProduct = async (docId) => {
  await deleteDoc(doc(productsCollection, docId));
};
