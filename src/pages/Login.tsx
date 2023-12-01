import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonCard, IonCardContent } from '@ionic/react';
import { FC } from 'react';
import {useHistory} from 'react-router-dom';
import "@codetrix-studio/capacitor-google-auth";

import './Login.css';
import { OAUTH_CONFIG } from '../config';

const Login: FC = () => {
    const history = useHistory();
    const signIn = async () => {
        const app = initializeApp(OAUTH_CONFIG);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        const result: any = await signInWithPopup(auth, provider);
        if (result) {
            console.log(result);
            history.push('/home', { name: result.user.name || result.user.displayName, email: result.user.email, image: result.user.photoURL })
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle>Ionic App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardContent>
                        <IonRow>
                            <IonCol className="text-center">
                                <IonImg className="title-img" src="logo.png" ></IonImg>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="text-center">
                                <IonText className="title">
                                    Sign In with Google
                                </IonText>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol offset='5' size='2'>
                                <IonButton onClick={() => signIn()} color='secondary'>
                                    Signin with Google
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}


export default Login;