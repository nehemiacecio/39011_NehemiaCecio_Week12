import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {collection, addDoc} from "firebase/firestore";
import {getFirestore, getDocs} from "firebase/firestore";
import '../firebase_config';
import React, {useEffect, useRef, useState} from "react";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";



const Home: React.FC = () => {
    const nim = useRef<HTMLIonInputElement>(null);
    const nama = useRef<HTMLIonInputElement>(null);
    const prodi = useRef<HTMLIonInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState('');
    const storage = getStorage();
    const db = getFirestore();

    useEffect (()=> {

    })
    const addData = async (url:string) => {
        try {
            const docRef = await addDoc(collection(db,"students"), {
                nim: nim.current?.value,
                nama: nama.current?.value,
                prodi: prodi.current?.value,
                foto: fileName,
                fotoUrl: url
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.log("Error: ", e);

        }
    }
    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setSelectedFile(event.target!.files![0]);
        setFileName(event.target!.files![0].name);
    };
    const insertHandler = async () => {
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, selectedFile as Blob).then((snapshot)=>{
            console.log('upload file success');
            getDownloadURL(ref(storage, fileName)).then((url)=>{
                addData(url);

            })
        })

    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonItem>
              <IonLabel position="floating">NIM</IonLabel>
              <IonInput ref={nim}></IonInput>
          </IonItem>
          <IonItem>
              <IonLabel position="floating">Nama</IonLabel>
              <IonInput ref={nama}></IonInput>
          </IonItem>
          <IonItem>
              <IonLabel position="floating">Prodi</IonLabel>
              <IonInput ref={prodi}></IonInput>
          </IonItem>
          <IonItem>
              <input type="file" onChange={fileChangeHandler}/>
          </IonItem>

          <IonButton onClick={insertHandler}>Simpan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
