import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export default function VideoPlayer() {
    const playbackInstance = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { linked, videoSection } = useGlobalSearchParams();
    const router=useRouter();
    const togglePlayPause = () => {
        if (playbackInstance.current) {

            if (isPlaying) {
                playbackInstance.current.pauseAsync();
            } else {
                playbackInstance.current.playAsync();
            }
            setIsPlaying(!isPlaying);
            console.log(linked)
        }
    };

    return (
        <View style={{flex:1,marginTop:10}}>
            <Pressable
                style={{ width: 100, flexDirection: 'row', alignItems: "center" }}
                onPress={() => {
                    router.back();
                }}
            ><Ionicons name="arrow-back-circle-outline" size={40} color={"black"} />
                <Text style={{}}>back</Text>
            </Pressable>
            <View style={styles.container}>
                <Text style={styles.header}>{videoSection}</Text>
                <View style={styles.videoContainer}>
                    {linked ? (
                        <Video
                            ref={playbackInstance}
                            style={styles.video}
                            useNativeControls={true}
                            source={{ uri: linked }}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            onError={error => console.error('Video playback error:', error)}
                        />
                    ) : (
                        <Text style={styles.noVideoText}>No video available</Text>
                    )}
                </View>
                <Pressable style={styles.playButton} onPress={togglePlayPause}>
                    <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6857E8',
    },
    videoContainer: {
        width: '95%',
        aspectRatio: 16 / 12, // Set aspect ratio to maintain the video's original proportions
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    noVideoText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: '50%',
        fontSize: 16,
    },
    playButton: {
        backgroundColor: '#6857E8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

