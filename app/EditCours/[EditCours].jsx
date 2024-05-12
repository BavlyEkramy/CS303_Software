import React from 'react';
import { StyleSheet, View } from 'react-native';
import CourseDetailsScreenInEditing from '../../components/EditingCourse/InEditing/CourseDetailsScreenInEditing'
import { useGlobalSearchParams } from 'expo-router';
const EditCours = () => {
    const { EditCours } = useGlobalSearchParams();
    return (
        <CourseDetailsScreenInEditing courseid={EditCours} />
    );
}

const styles = StyleSheet.create({})

export default EditCours;
