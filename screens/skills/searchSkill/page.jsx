import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
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

const SearchSkillScreen = ({ navigation,route }) => {

  const selectedJobsList = route.params?.selectedJobsList || []; 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState(selectedJobsList);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const storeSelectedJobs = async () => {
    try {
      await AsyncStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
    } catch (error) {
      console.error('Error storing selected jobs:', error);
    }
  };

  useEffect(() => {
    storeSelectedJobs();
  }, [selectedJobs]);

  const handleSelectJob = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const handleAddData = () => {
    if (inputValue.trim() !== '') {
      setSelectedJobs([...selectedJobs, inputValue]);
      setInputValue('');
      setModalVisible(false);
    }
  };

  const renderJobSuggestions = () => {
    const filteredJobs = JobProfileSuggestions.filter((job) =>
      job.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredJobs.length === 0) {
      return <Text>No matching job profiles found.</Text>;
    }

    return (
      <ScrollView style={styles.suggestionsContainer}>
       
          <>
         {filteredJobs.map((job, index) => (
        <View
          key={index}
          style={[
            styles.suggestionListCol,
            selectedJobs.includes(job) && styles.selectedBackground, // Change background color when checked
          ]}
        >
          <CheckBox
            checked={selectedJobs.includes(job)}
            onPress={() => handleSelectJob(job)}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#02093B"
          />
          <Text
            style={[
              styles.jobText,
              selectedJobs.includes(job) && { fontWeight:500 }, // Change text color when checked
            ]}
          >
            {job}
          </Text>
        </View>
      ))}
           
          </>
         
       
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Icon
          name="arrow-back-outline"
          size={22}
          style={styles.icon}
          onPress={() => navigation.goBack()} 
        />
        <Text style={styles.text}>Search for Your Skills</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="search" size={22} style={styles.iconContainer} />
        <TextInput
          style={styles.input}
          placeholder="Search for job profiles"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSelectedJobs([]);
          }}
        />
      </View>

      {renderJobSuggestions()}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
      <Icon name="add-outline" size={38} style={styles.addIcon} />
      </TouchableOpacity> 

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Skill</Text>
            <Text style={styles.modalTagline}>Please Enter Skill you want to Add</Text>
            <TextInput
              placeholder="Enter new skill"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
            <View style={styles.alertText}>
            <Icon name="alert-circle" size={18} style={styles.NotifyIcon} />
            <Text style={styles.alertTagline}>New Skill will be approved by admin</Text>
            </View>
            <TouchableOpacity onPress={handleAddData} style={{backgroundColor: '#02093B' ,width:"100%",borderRadius:0 ,padding:15,margin:0}}><Text style={styles.modelAddText}>ADD</Text></TouchableOpacity>
           
          </View>
        </View>
      </Modal>

      <View style={styles.doneButtonContainer}>
        <Button
          title="DONE"
          onPress={() => navigation.navigate('SignIn')}
          buttonStyle={{backgroundColor: '#02093B',borderRadius:0 ,padding:15,margin:0}} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  headerTitle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10, 
    color: 'black',
  },
  text: {
    flex: 1, 
    fontSize: 24,
    color: 'black',
    textAlign: 'center', 
  },
  inputContainer: {
    margin:20,
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
    marginTop: 10,
  },
  jobText:{
    color:"#020E5D"
  },
  selectedBackground:{
    backgroundColor:'#dcebf1'
  },
  suggestionListCol:{
    flexDirection: 'row',
    alignItems:'center',
    borderBottomWidth:1,
    borderBlockColor:'#99FFFF',
    marginHorizontal:10,
    backgroundColor:'#fff'
  },
  doneButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    width:"100%",
    fontSize: 18,
    fontWeight: 'bold',
    color:'#020E5D',
    padding:10,
    textAlign:'center',
    borderBottomWidth:1,
    borderBottomColor:'#99FFFF',
  },
  modalTagline:{
    color:"black",
    fontSize:14,
    marginTop:30
  },
  alertTagline:{
    color:'black',
    fontSize:12,
    marginBottom:30,
    paddingLeft:10
  },
  alertText:{
    flexDirection: 'row',
  },
  NotifyIcon:{
    color:'#02093B'
  },
  modelAddText:{
    color:'white',
    textAlign:'center',
    fontSize:16
  },
  addButton: {
    position: 'absolute', 
    bottom: 80,          
    right: 20,            
    borderWidth: 0,       
    borderColor: 'gray',
    borderRadius: 50,    
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#02093B', 
    elevation: 6,         
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 15,         
  },
  addIcon:{
    color:'#fff'
  }
});

export default SearchSkillScreen;
