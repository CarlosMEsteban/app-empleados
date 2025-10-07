import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { App } from "../app";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class loginService
{
    constructor(private router: Router)
    {
    }

firebaseConfig = {
  apiKey: "AIzaSyDuaX3TdS_csiCaqKh5u-0MJblu7duKjTg",
  authDomain: "mis-clientes-eca4d.firebaseapp.com",
  projectId: "mis-clientes-eca4d",
  storageBucket: "mis-clientes-eca4d.firebasestorage.app",
  messagingSenderId: "438938499679",
  appId: "1:438938499679:web:7911b47a81c60d8d7cb9ea",
  measurementId: "G-QQ3WXR9GYF"
};

// Initialize Firebase
//app = initializeApp(this.firebaseConfig);    

    token: string = "";

    login(eMail: string, password: string)
    {
        
const app = initializeApp(this.firebaseConfig);  
console.log("222222");
const auth = getAuth(app);
console.log("Auth: " + auth);
signInWithEmailAndPassword(auth, eMail, password).then(
    response=>{
                auth.currentUser?.getIdToken().then(
                    token=>{
                        this.token=token;
                        console.log(this.token);
                        this.router.navigate(['/']);
                    }
                )
            }
)

        /*firebase.auth().signInWithEmailAndPassword(eMail, password).then(

            response=>{
                firebase.auth().currentUser?.getIdToken().then(
                    token=>{

                        this.token=token;
                        this.router.navigate(['/']);
                    }
                )
            }
        );*/

    }

    getIdToken(){
        return this.token;
    }
}