import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const getUser = (): firebase.User | null => firebase.auth().currentUser;

export const onAuthStateChanged = (args: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)): firebase.Unsubscribe =>
    firebase.auth().onAuthStateChanged(args);

export const signUp = async ({ email = '', password = '' }: { email: string; password: string }): Promise<void> => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await sendVerification();
};

export const logIn = ({ email = '', password = '' }: { email: string; password: string }): Promise<firebase.auth.UserCredential> =>
    firebase.auth().signInWithEmailAndPassword(email, password);

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

export const reauthenticate = ({ email = '', password = '' }: { email: string; password: string }): Promise<firebase.auth.UserCredential> => {
  const user = getUser();
  if (user) {
    return user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
    );
  }
  return Promise.reject('No user found');
};

export const updatePassword = ({ password = '' }: { password: string }): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.updatePassword(password);
  }
  return Promise.reject('No user found');
};

export const sendPasswordReset = ({ email = '' }: { email: string }): Promise<void> =>
    firebase.auth().sendPasswordResetEmail(email);
