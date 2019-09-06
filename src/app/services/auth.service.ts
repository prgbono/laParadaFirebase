import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFirestore } from '@angular/fire/firestore'; 
import * as firebase from 'firebase/app';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore) 
  { 

  }

  // A function to return the currently logged user anywhere from the app  
  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  // A function to log-in a user with email and password
  loginUser(newEmail: string, newPassword: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  // A function to log-in a user anonymously
  anonymousLogin(): Promise<firebase.auth.UserCredential> { 
    return this.afAuth.auth.signInAnonymously();
  }

  // A function to link email and password credentials to an anonymous user
  linkAccount(email: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.currentUser .linkAndRetrieveDataWithCredential(credential)
    .then(
      userCredential => {
        this.firestore.doc(`/userProfile/${userCredential.user.uid}`).update({ email });
      },
      error => {
      console.log('There was an error linking the account', error); }
    ); 
  }

  // A function to send a reset password link via email to your users
  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
     
  //A function to log out from the app
  logoutUser(): Promise<void> { 
    return this.afAuth.auth.signOut();
  }
    
}
