import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { CountryInt, CountryItemIrt } from '../storelocatto.interfaces';

@Injectable()
export class Country {
  //items ngFor
  items: Observable<CountryItemIrt[]>;
  //firestore collection with type brand
  itemsCollection: AngularFirestoreCollection<CountryInt>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection<CountryInt>('countries');
  }

  getAllItems() {
    this.items = this.itemsCollection.snapshotChanges()
      .pipe(
        map(changes => changes.map((change) => {
          const doc = change.payload.doc.data() as CountryInt;
          const country_id = change.payload.doc.id;
          return { country_id, ...doc };
        })
      )
    );
    return this.items;
  }

  addItem(item: CountryInt) {
    return this.itemsCollection.add(item);
  }

  deleteItem(id: string) {
    return this.itemsCollection.doc(id).delete();
  }

  updateItem(item: any) {
    return this.itemsCollection.doc(item.country_id).update(item.body);
  }

  find_country(search_value: string) {
    return this.db.collection('countries',ref => ref
    .orderBy("country_name")
    .startAt(search_value.toLocaleLowerCase())
    .endAt(search_value.toLocaleLowerCase()+"\uf8ff"));
  }

  get_country(value:string) {
    return this.db.collection('countries',ref => ref.where('country_name','==',value))
    .valueChanges();
  }

}