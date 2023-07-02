import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const getUser = (): firebase.User | null => firebase.auth().currentUser;

export const onAuthStateChanged = (args: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)): firebase.Unsubscribe =>
    firebase.auth().onAuthStateChanged(args);

export const signUp = async ({ email = '', password = '' }: {email: string; password: string}): Promise<void> => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
          (userCredential) => {
            console.log('Registro exitoso');
            return userCredential;
          }
      ).catch((error) => {
        console.error('Error al registrarse:', error);
        throw error;
      });
  await sendVerification();
};

export const logIn = ({ email = '', password = '' }: {
  email: string;
  password: string;
}): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Inicio de sesión exitoso');
        return userCredential;
      })
      .catch((error) => {
        console.log('Error al iniciar sesión:', error);
        throw error;
      });
};

export const sendVerification = (): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.sendEmailVerification();
  }
  return Promise.reject('No user found');
};

export const signOut = (): Promise<void> => firebase.auth().signOut();

export const reload = (): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.reload();
  }
  return Promise.reject('No user found');
};

export const reauthenticate = ({ email = '', password = '' }: {
  email: string;
  password: string
}): Promise<firebase.auth.UserCredential> => {
  const user = getUser();
  if (user) {
    return user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
    );
  }
  return Promise.reject('No user found');
};

export const updatePassword = ({ password = '' }: {password: string}): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.updatePassword(password);
  }
  return Promise.reject('No user found');
};

export const sendPasswordReset = ({ email = '' }: {email: string}): Promise<void> =>
    firebase.auth().sendPasswordResetEmail(email);
