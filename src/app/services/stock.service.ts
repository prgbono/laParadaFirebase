import { Injectable } from '@angular/core';
/* IMPORTS... 
• AngularFireAuth to handle the connection with the authentication.
• AngularFirestore to manage the connection with the database.
• AngularFirestoreCollection because we will be retrieving collections from the database and AF2 handles them as observables.
• AngularFirestoreDocument because we will be retrieving documents from the database and AF2 is going to take care of it as an observable.*/
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})

export class StockService {
  // stockList will keep a synced array of the list of stock we have stored in the database.
  // public billList: billList is tutorial name, for me is stockList
  public stockList: AngularFirestoreCollection<any>;
  public userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.stockList = this.firestore.collection(`/userProfile/${user.uid}/stockList`);
    });
  }

  getStockList(): AngularFirestoreCollection<any> {
    return this.stockList;
  }

  // TODO getStock? Habrá que dividir el stock en Categorías y Artículos... tendrá que haber un servicio para cada... por ahora de aprendizaje vale 8/9/2019
  // Esta función será getArticle o getCategory
  getStock(stockId: string): AngularFirestoreDocument<any> {
    console.log(`User id is ${this.userId}`);
    console.log(`Stock id is ${stockId}`);
    return this.firestore.doc(`/userProfile/${this.userId}/stockList/${stockId}`);
  }


  //TODO Ésta será la f(x) para añadir artículos. Los parámetros pasados son los campos propios de la entidad artículos
  async createStock(
    name: string,
    amount: number,
    dueDate: string = null,
    paid: boolean = false
  ): Promise<any> {
    const newStockRef: firebase.firestore.DocumentReference = await this.stockList.add(
      {}
    );
    /*
      With the this.billList.add({}) We’re creating an empty reference. This is because we want Firebase to create the auto-generated ID for this new bill, that way we can then pass the id: newBillRef.id as a property.
      We’re doing this because when AngularFire2 updated to v5, they removed the $ variables like $key which used to hold the object’s ID.
      If we don’t pass the ID as property, then we’ll need to create a couple of functions to retrieve that ID, and we don’t want to spend our resources doing that :)
    */

    return newStockRef.update({
      name,
      amount,
      dueDate,
      paid,
      id: newStockRef.id
    });
  }

  // TODO will be article/category.remove
  // The .delete() operation also returns a promise if by any chance you want to do something after the object is deleted.
  removeStock(stockId: string): Promise<any> {
    return this.stockList.doc(stockId).delete();
  }

  // TODO edit stock/category/article
  //  .update() function from AF2, we need to pass it the ID of the object we want to update and the data we want to update inside it.
  // payBill = updateStock
  updateStock(stockId: string): Promise<any> {
    // TODO Esta función tendrá que llevar al usuario a la vista del artículo y editar en el formulario
    return this.stockList.doc(stockId).update({ paid: true });
  }

  takeStockPhoto(stockId: string, imageURL: string): Promise<any> {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(`${this.userId}/${stockId}/stockPicture/`);
    return storageRef.putString(imageURL, 'base64', {
      contentType: 'image/png',
    })
    .then(() => {
      return this.stockList.doc(stockId).update({
        picture: storageRef.getDownloadURL(),
      });
    });
  }

}
