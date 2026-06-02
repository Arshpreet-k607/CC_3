import { firestore } from '../../../config/firebaseConfig';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';

export class FirestoreRepository<T extends { id?: string }> {
  private collection: CollectionReference<DocumentData>;

  constructor(collectionName: string) {
    this.collection = firestore.collection(collectionName);
  }

  async create(item: T) {
    const docRef = await this.collection.add(item as DocumentData);
    const snapshot = await docRef.get();
    return { id: docRef.id, ...(snapshot.data() as T) } as T & { id: string };
  }

  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
  }

  async findById(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...(doc.data() as T) };
  }

  async update(id: string, item: Partial<T>) {
    const docRef = this.collection.doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return null;
    }
    await docRef.update(item as DocumentData);
    return this.findById(id);
  }

  async delete(id: string) {
    const docRef = this.collection.doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return false;
    }
    await docRef.delete();
    return true;
  }
}

const repositoryFor = <T extends { id?: string }>(collectionName: string) =>
  new FirestoreRepository<T>(collectionName);

export async function createDocument<T extends { id?: string }>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> {
  return repositoryFor<T>(collectionName).create(data);
}

export async function getAllDocuments<T extends { id?: string }>(
  collectionName: string
): Promise<(T & { id: string })[]> {
  return repositoryFor<T>(collectionName).findAll();
}

export async function getDocumentById<T extends { id?: string }>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> {
  return repositoryFor<T>(collectionName).findById(id);
}

export async function updateDocument<T extends { id?: string }>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<(T & { id: string }) | null> {
  return repositoryFor<T>(collectionName).update(id, data);
}

export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<boolean> {
  return repositoryFor(collectionName).delete(id);
}
