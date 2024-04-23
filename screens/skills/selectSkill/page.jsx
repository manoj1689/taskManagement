import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const SelectSkillScreen = ({ navigation }) => {
 
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleSelectJob = (job) => {
    const index = selectedJobs.indexOf(job);
    if (index === -1) {
      setSelectedJobs([...selectedJobs, job]); // Add job if not already selected
    } else {
      setSelectedJobs(selectedJobs.filter(item => item !== job)); // Remove job if already selected
    }
 
  };

  const storeSelectedJobs = async () => {
    try {
      await AsyncStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
      navigation.navigate('SignIn'); // Navigate to SignIn screen after storing selected jobs
    } catch (error) {
      console.error('Error storing selected jobs:', error);
    }
  };

  const renderJobSuggestions = () => {
    return JobProfileSuggestions.map((job, index) => (
      <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => handleSelectJob(job)}>
        <Text>{job}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for your Skill"
        onFocus={() => navigation.navigate('SearchSkill')}
      />
      {selectedJobs.length > 0 && (
        <View style={styles.selectedJobsContainer}>
          <Text>Selected Jobs:</Text>
          <View style={styles.selectedJobs}>
            {selectedJobs.map((job, index) => (
              <Text key={index} style={styles.selectedJob}>{job}</Text>
            ))}
          </View>
        </View>
      )}
      <View style={styles.suggestionsContainer}>
        {renderJobSuggestions()}
      </View>
      <Button
        title="DONE"
        onPress={storeSelectedJobs}
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
    backgroundColor: '#f0f0f0',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  selectedJobsContainer: {
    marginBottom: 20,
  },
  selectedJobs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  selectedJob: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default SelectSkillScreen;
