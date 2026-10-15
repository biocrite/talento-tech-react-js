
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
} from "firebase/firestore";

import { db } from "@firebase-config/firebase.js";

const productsCollection = collection(db, "products");

// Get all products
export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
    docId: item.id,
  }));
};

// Get one product by its Firestore document ID
export const getProductById = async (id) => {
  if (!id) return null;

  const productRef = doc(productsCollection, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;

  return {
    ...snapshot.data(),
    id: snapshot.id,
    docId: snapshot.id,
  };
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const queryRef = category
    ? query(
        productsCollection,
        where("categories", "array-contains", category)
      )
    : productsCollection;

  const snapshot = await getDocs(queryRef);

  return snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
    docId: item.id,
  }));
};

// Create a product
export const createProduct = async (product) => {
  const existingProducts = await getProducts();

  // Generate the next numeric product ID
  const nextId =
    Math.max(
      0,
      ...existingProducts.map((item) => Number(item.id) || 0)
    ) + 1;

  const productData = { ...product, id: nextId };

  const reference = await addDoc(productsCollection, productData);

  return {
    ...productData,
    id: reference.id,
    docId: reference.id,
  };
};

// Update a product
export const updateProduct = async (docId, product) => {
  if (!docId) {
    throw new Error("Cannot update product: missing Firestore document ID.");
  }

  const { docId: ignored, ...productData } = product;

  await updateDoc(doc(productsCollection, docId), productData);

  return { ...productData, id: docId, docId };
};

// Delete a product
export const deleteProduct = async (docId) => {
  if (!docId) {
    throw new Error("Cannot delete product: missing Firestore document ID.");
  }

  await deleteDoc(doc(productsCollection, docId));
};
