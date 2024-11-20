// EditTaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../utils/firebaseConfig'; // Firebase config
import { doc, updateDoc } from 'firebase/firestore';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params; // Recibe la tarea a editar desde la navegación

  const [title, setTitle] = useState(task.title); // Título de la tarea
  const [deadline, setDeadline] = useState(task.deadline || ''); // Fecha límite

  // Función para guardar los cambios
  const handleSave = async () => {
    if (!title) {
      Alert.alert('Error', 'El títol és obligatori');
      return;
    }

    try {
      const taskRef = doc(db, 'TodoList', task.id);
      await updateDoc(taskRef, {
        title: title,
        deadline: deadline,
      });
      Alert.alert('Èxit', 'Tasca actualitzada amb èxit');
      navigation.goBack(); // Volver a la pantalla de tareas
    } catch (error) {
      Alert.alert('Error', 'No s\'ha pogut actualitzar la tasca');
      console.error(error);
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
      <Button title="Desar" onPress={handleSave} color="#6A4C9C" />
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

export default EditTaskScreen;
