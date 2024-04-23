import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button as RNButton } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const JobProfileSuggestions = [
  "Software Developer",
  "Data Analyst",
  "UX/UI Designer",
  "Project Manager",
  "Marketing Specialist",
  "Financial Analyst",
  "Customer Success Manager",
  "Product Manager",
  "Human Resources Coordinator",
  "Sales Representative",
];

const SearchSkillScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Store selected jobs in AsyncStorage whenever selectedJobs state changes
    storeSelectedJobs();
  }, [selectedJobs]);

  const handleSelectJob = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter(selectedJob => selectedJob !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
    setSearchQuery('');
  };

  const storeSelectedJobs = async () => {
    try {
      await AsyncStorage.setItem('selectedJobs', JSON.stringify(selectedJobs)); // Store selected jobs in AsyncStorage
    } catch (error) {
      console.error('Error storing selected jobs:', error);
    }
  };

  const handleAddData = () => {
    if (inputValue.trim() !== '') {
      setSelectedJobs([...selectedJobs, inputValue]); // Add inputValue to selectedJobs array
      setInputValue('');
      setModalVisible(false); // Close the modal after adding data
    }
  };

  const renderJobSuggestions = () => {
    if (searchQuery === '') {
      return null; // If search query is empty, don't render any suggestions
    }

    const filteredJobs = JobProfileSuggestions.filter(job =>
      job.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredJobs.length === 0) {
      return (
        <Text>No matching job profiles found.</Text>
      );
    }

    return (
      <ScrollView style={styles.suggestionsContainer}>
        {filteredJobs.map((job, index) => (
          <TouchableOpacity key={index} style={[styles.suggestionItem, selectedJobs.includes(job) && styles.selectedSuggestion]} onPress={() => handleSelectJob(job)}>
            <Text>{job}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for job profiles"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.selectedJobsContainer}>
        {selectedJobs.map((job, index) => (
          <TouchableOpacity key={index} style={styles.selectedJob} onPress={() => handleSelectJob(job)}>
            <Text>{job}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderJobSuggestions()}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text>Add Skill</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter data"
              value={inputValue}
              onChangeText={text => setInputValue(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddData}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <RNButton title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button
        title="DONE"
        onPress={() => navigation.navigate('SignIn')}
        buttonStyle={{ backgroundColor: '#02093B' }} // Change button color here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  suggestionsContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedSuggestion: {
    backgroundColor: 'lightblue',
  },
  selectedJobsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  selectedJob: {
    backgroundColor: 'lightblue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default SearchSkillScreen;
