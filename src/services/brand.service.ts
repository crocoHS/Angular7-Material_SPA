import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore ,AngularFirestoreCollection } from '@angular/fire/firestore';

import { BrandInt ,BrandItemItr } from '../storelocatto.interfaces';

@Injectable()
export class Brand {
    //items ngFor
    items:Observable<BrandItemItr[]>;
    //firestore collection with type brand
    itemsCollection:AngularFirestoreCollection<BrandInt>;

    constructor(private db: AngularFirestore) { }

    ngOnInit() {
        this.itemsCollection = this.db.collection<BrandInt>('brands');
        this.items = this.itemsCollection.snapshotChanges()
        .pipe(
          map( changes => changes.map((change)=>{
              const doc = change.payload.doc.data() as BrandInt;
              const brand_id = change.payload.doc.id;
              return {brand_id,...doc};
            })
          )
        );
      }

      getAllItems() {
          return this.items;
      }

      addItem(item:BrandInt) {
        this.itemsCollection.add(item);
      }
    
      deleteItem(id:string) {
        this.itemsCollection.doc(id).delete();
      }
    
      updateItem(item:any) {
        this.itemsCollection.doc(item.id).update(item);
      }
}