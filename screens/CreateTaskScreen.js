// CreateTaskScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../utils/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const CreateTaskScreen = ({ navigation, route }) => {
  const { refreshTasks } = route.params; // Rep la funció refreshTasks com a prop
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = async () => {
    if (!title) {
      Alert.alert("Error", "El títol és obligatori.");
      return;
    }

    try {
      // Afegir tasca a Firebase
      await addDoc(collection(db, 'TodoList'), {
        title,
        deadline,
        completed: false
      });

      // Actualitzar les tasques a la pantalla de llistat (sense necessitat de refrescar)
      if (refreshTasks) {
        refreshTasks(prevTasks => [...prevTasks, { title, deadline, completed: false }]);
      }

      // Un cop afegida la tasca, tornem a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error("Error afegint tasca:", error); // Log d'error
      Alert.alert("Error", "Ha ocorregut un error al crear la tasca.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Data límit (opcional)"
        value={deadline}
        onChangeText={setDeadline}
      />
      <Button
        title="Afegir Tasca"
        onPress={handleAddTask}
        color="#6A4C9C" // Morat
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
});

export default CreateTaskScreen;
