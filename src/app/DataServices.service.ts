// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { Empleado, empleadoConverter } from "./empleado.model";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuaX3TdS_csiCaqKh5u-0MJblu7duKjTg",
  authDomain: "mis-clientes-eca4d.firebaseapp.com",
  projectId: "mis-clientes-eca4d",
  storageBucket: "mis-clientes-eca4d.firebasestorage.app",
  messagingSenderId: "438938499679",
  appId: "1:438938499679:web:7911b47a81c60d8d7cb9ea",
  measurementId: "G-QQ3WXR9GYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export async function getCities(db: Firestore){
    const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}


// 3. How to use it to add a document to Firestore
const empleadosCollectionRef = collection(db, 'empleados').withConverter(empleadoConverter);


export async function anadirEmpleado(empleado: Empleado, db: Firestore) 
{
  const docRef = await addDoc(empleadosCollectionRef, empleado);
  //const docRef = await addDoc(collection(db, 'empleados'), empleado);

    console.log("Documento de empleado añadido con ID: ", docRef.id);

    return docRef.id; // Retorna el ID del nuevo documento
}

export async function getEmpleados(db: Firestore){
  console.error("Entramos en getEmpleados");
    const empleadosCol = collection(db, 'empleados').withConverter(empleadoConverter);
    
  const empleadoSnapshot = await getDocs(empleadosCol);
  const empleadoList = empleadoSnapshot.docs.map(doc => doc.data());
  
  console.log(empleadoList);
  return empleadoList;
}



export async function quitarEmpleado(id: string) {

  try {

    const docRef = doc(db, 'empleados', "KZyALec7pOPDpKRWj3tL");

    await deleteDoc(docRef);

    console.log(`Documento de empleado con ID: KZyALec7pOPDpKRWj3tL eliminado exitosamente.`);

  } catch (error) {

    console.error('Error al eliminar el documento del empleado:', error);

  }
}

  export async function cambiarEmpleado (id: string, datosActualizados: Partial<Empleado>) { 
    try {

      const docRef = doc(db, 'empleados', id).withConverter(empleadoConverter);

      await updateDoc(docRef, datosActualizados);

      console.log(`Documento de empleado con ID: ${id} actualizado exitosamente.`);

    } catch (error) {

      console.error('Error al actualizar el documento del empleado:', error);

    }
  } 


