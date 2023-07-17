import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  saveGroup,
  deleteGroupByName,
} from '../../api/groups'; // Reemplaza 'your-file' con el nombre de tu archivo
import {signUp,
    logIn,
    signOut, 
    getDBUserList,
} from '../../api/user';
const feature = loadFeature('./groups.feature');

defineFeature(feature, (test) => {
  beforeEach(async () => {
    // Configura cualquier configuración inicial necesaria, como iniciar sesión con un usuario de prueba
  });

  afterEach(async () => {
    // Realiza cualquier limpieza necesaria, como cerrar sesión después de cada prueba
    await signOut();
  });

  test('Create a new group', ({ given, when, then }) => {
    given('I am logged in', async () => {
      // Realiza la acción para iniciar sesión con un usuario de prueba
      await signUp({ email: 'test@example.com', password: 'password', userName: 'Test User' });
    });

    when('I create a new group with name {string} and description {string}', async (groupName, groupDescription) => {
      // Realiza la acción para crear un nuevo grupo con los parámetros proporcionados
      await saveGroup({ name: groupName, description: groupDescription });
    });

    then('the group should be created successfully', async () => {
      // Verifica que el grupo se haya creado correctamente
      const userGroups = await getDBUserList(); // Obtiene la lista de grupos del usuario
      // Realiza las aserciones necesarias para verificar que el grupo se haya creado correctamente
      expect(userGroups.length).toBeGreaterThan(0);
    });
  });

  test('Delete a group', ({ given, and, when, then }) => {
    given('I am logged in', async () => {
      // Realiza la acción para iniciar sesión con un usuario de prueba
      await signUp({ email: 'test@example.com', password: 'password', userName: 'Test User' });
    });

    and('I have a group with name {string}', async (groupName) => {
      // Realiza la acción para crear un grupo de prueba con el nombre proporcionado
      await saveGroup({ name: groupName, description: 'Test Group Description' });
    });

    when('I delete the group with name {string}', async (groupName) => {
      // Realiza la acción para eliminar el grupo con el nombre proporcionado
      await deleteGroupByName(groupName);
    });

    then('the group should be deleted successfully', async () => {
      // Verifica que el grupo se haya eliminado correctamente
      const userGroups = await getDBUserList(); // Obtiene la lista de grupos del usuario
      // Realiza las aserciones necesarias para verificar que el grupo se haya eliminado correctamente
      expect(userGroups.length).toBe(0);
    });
  });
});