import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import { Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
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
      <TouchableOpacity
        key={index}
        style={[
          styles.suggestionItem,
          selectedJobs.includes(job) && styles.selectedSuggestionItem, // Apply different style if selected
        ]}
        onPress={() => handleSelectJob(job)}
      >
        <Text
          style={[
            styles.suggestionItemText,
            selectedJobs.includes(job) && styles.selectedSuggestionItemText, // Change text color if selected
          ]}
        >
          {job}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.screenView} >
    <View style={styles.headerTittle}>
    <Icon
      name="arrow-back-outline"
      type="font-awesome"
      size={22}
      style={styles.icon}
      onPress={()=>navigation.navigate('Name')}
    />
    <Text style={styles.text}>Select Skill</Text>
    </View>
    <View style={styles.inputContainer}>
          <Icon
            name="search"
            type="font-awesome"
            size={22}
            style={styles.iconContainer}
          />
          <TextInput
         style={styles.input}
        placeholder="Search for your Skill"
        onFocus={() => navigation.navigate('SearchSkill',{selectedJobsList:selectedJobs})}
      />
        </View>
    
  </View>
      {selectedJobs.length > 0 && (
        <View style={styles.selectedJobsContainer}>
          
          <View style={styles.selectedJobs}>
            {selectedJobs.map((job, index) => (
              <Text key={index} style={styles.selectedJob}>{job}</Text>
            ))}
          </View>
        </View>
      )}
      <View style={styles.bottomButton}>
      <View style={styles.suggestionsContainer}>
        {renderJobSuggestions()}
      </View>
      <Button
        title="DONE"
        onPress={storeSelectedJobs}
        buttonStyle={{backgroundColor: '#02093B',borderRadius:0 ,padding:15,margin:0}} // Change button color here
      />
      </View>
      
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  screenView:{
   padding:20,
  },
  headerTittle:{
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center children vertically
    fontWeight:'600'
  },
  icon: {
    marginRight: 8, // Add space between icon and text
    color: 'black', // Set color to black
  },
  text: {
    marginLeft:30,
    fontSize:24,
    color: 'black',
  },
  inputContainer: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    padding: 9,
    backgroundColor: '#e6e6e6',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#e6e6e6',
    backgroundColor: '#e6e6e6',
    paddingLeft: 8,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#e6e6e6",
    paddingTop:30,
    paddingBottom:20
  },
  suggestionItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 5,
   
  },
  suggestionItemText:{
    color:'#020B4A'
  },
  selectedSuggestionItem: {
    backgroundColor: '#02093B', // Light blue for selected items
  },
  selectedSuggestionItemText: {
    color: 'white', // Blue for selected text
  },
  selectedJobsContainer: {
    margin: 20,
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
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    color:'white',
    backgroundColor:'#02093B'
  },
  bottomButton: {
    width:'100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SelectSkillScreen;

