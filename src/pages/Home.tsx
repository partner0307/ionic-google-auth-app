import { IonContent, IonText, IonRow, IonItem, IonThumbnail, IonLabel, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {useHistory} from 'react-router-dom';
import "@codetrix-studio/capacitor-google-auth";
import { OAUTH_CONFIG } from '../config';

const Home: FC = (props) => {
    const history: any = useHistory();
    const [user, setUser] = useState({ name: history?.location?.state?.name, image: history?.location?.state?.image, email: history?.location?.state?.email });

    const logOut = async () => {
        const app = initializeApp(OAUTH_CONFIG);
        const auth = getAuth(app);
        signOut(auth);
        history.push('/signin');
    }

    console.log(user.image);
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Logged in ... </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRow>
                    <IonCol className="text-center">
                        <IonText className="title">
                            You are logged in !
                        </IonText>
                    </IonCol>
                </IonRow>
                {user.name &&
                    <IonRow>
                        <IonCol size='2' offset='4'>
                            <IonThumbnail slot="start">
                                <img src={user.image} />
                            </IonThumbnail>
                        </IonCol>
                        <IonCol size='2'>
                            <IonLabel>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                }
                <IonRow>
                    <IonCol offset='5' size='2'>
                        <IonButton onClick={() => logOut()} color='secondary'>
                            Signin with Google
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Home;