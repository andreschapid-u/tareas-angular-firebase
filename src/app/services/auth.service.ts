import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import { User } from '../models/user';
import {MessageService} from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log("Usuario logeado 1", user)
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        console.log("Usuario no logeado 1")
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  setUserData(user: User) {
    console.log("Se va a guardar el usuario", user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    console.log("Usuario logeado 2", userData)
    return userRef.set(userData, {
      merge:true
    }).then(()=>{
      localStorage.setItem('user', JSON.stringify(userData));
    }).catch((error)=>{
      console.log("Error al guardar el usuario", error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido guardar el usuario'});
    });
  }

  login(email:string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(result=>{
      console.log("Usuario logeado", result.user);
      let user: User = {
        uid: result.user?.uid!,
        email: result.user?.email!,
        displayName: result.user?.displayName!,
        photoURL: result.user?.photoURL!,
        password: '',
        emailVerified: result.user?.emailVerified!
      }
      this.setUserData(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['tasks']);
    }).catch(()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La contraseña o el correo son incorrectos'});
    })
  }

  register(usuario: User){
    return this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password)
    .then(result=>{
      result.user?.sendEmailVerification();
      let user: User = {
        uid: result.user?.uid!,
        email: result.user?.email!,
        displayName: usuario.displayName,
        photoURL: '',
        password: '',
        emailVerified: result.user?.emailVerified!
      }
      console.log("Usuario creado", user);
      this.setUserData(user);
      console.log("redireccionando a login");
      this.router.navigate(['login']);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Cuenta creada exitosamente'});
    }).catch(()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido crear la cuenta'});
    })
  }

  logout(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login'])
    })
  }

  isLoging(){
    return JSON.parse(localStorage.getItem('user')!);
  }
}
