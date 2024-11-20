// TaskListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../utils/firebaseConfig'; // Firebase config
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  // Aquest useEffect llegeix les tasques de Firebase en temps real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'TodoList'), (querySnapshot) => {
      const tasksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log('Tareas en tiempo real:', tasksData); // Afegeix aquest log per depurar
      setTasks(tasksData);
    });

    // Cleanup listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar",
      "Estàs segur que vols eliminar aquesta tasca?",
      [
        { text: "Cancel·lar" },
        { text: "OK", onPress: async () => {
          await deleteDoc(doc(db, "TodoList", id));
        } }
      ]
    );
  };

  const handleEdit = (task) => {
    // Funció per editar tasca, navegarem a la pantalla d'edició
    navigation.navigate('EditTask', { task });
  };

  return (
    <View style={styles.container}>
      
      {/* Botó Afegir Nova Tasca */}
      <View style={styles.addButtonContainer}>
        <Button 
          title="Afegir nova tasca" 
          onPress={() => navigation.navigate('CreateTask', { refreshTasks: setTasks })} 
          color="#6A4C9C" // Morat
        />
      </View>
      
      {/* Llistat de Tasques */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            
            {/* Títol de la tasca */}
            <Text style={[styles.taskText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
              {item.title} {item.deadline ? `- ${item.deadline}` : ''}
            </Text>
            
            {/* Botons Editar i Eliminar */}
            <View style={styles.buttonContainer}>
              <Button 
                title="Editar" 
                onPress={() => handleEdit(item)} 
                color="#6A4C9C" // Morat
              />
              <Button 
                title="Eliminar" 
                onPress={() => handleDelete(item.id)} 
                color="#D9534F" // Roig per eliminar
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Estils de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  
  // Contenedor de Botón Afegir Nova Tasca
  addButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  // Contenedor de cada tasca
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // Estils de text de cada tasca
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },

  // Contenedor de Botons Editar i Eliminar
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
    gap: 5,
  },
});

export default TaskListScreen;
