import { db } from '../firebase';
import { User } from '@firebase/auth';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from '@firebase/firestore';

export class ExampleClient {
  user: User|null;

  constructor(user: User|null) {
    this.user = user;
  }

  async create(title: string, desc: string, sharedUrl: string) {
    await addDoc(collection(db, 'examples'), {
      author: this.user?.email,
      title: title,
      desc: desc,
      sharedUrl: sharedUrl
    })
  }

  async list(userOnly: boolean) {
    if (userOnly) {
      const q = query(
        collection(db, 'examples'),
        where('author', '==', this.user?.email)
      );
      const snapshot = await getDocs(q)
      var ls: any[] = [];
      snapshot.forEach((doc: any) => {
        ls.push({id: doc.id, ...doc.data()})
      });
      return ls;
    } else {
      const snapshot = await getDocs(collection(db, 'examples'))
      var ls: any[] = [];
      snapshot.forEach((doc: any) => {
        ls.push({id: doc.id, ...doc.data()})
      });
      return ls;
    }
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'examples', id));
  }
}
