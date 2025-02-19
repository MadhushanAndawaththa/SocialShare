import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const viewShotRef = React.useRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Hard-coded scores
  const scores = {
    hole1: 4,
    hole2: 3,
    hole3: 5,
    hole4: 4,
    hole5: 3,
    hole6: 4,
    hole7: 5,
    hole8: 3,
    hole9: 4,
  };

  const captureAndShare = async () => {
    try {
      // Capture the view as an image
      const uri = await viewShotRef.current.capture();
      
      // Prepare sharing options
      const shareOptions = {
        title: 'My Golf Score',
        message: 'Check out my golf score from today! 🏌️‍♂️',
        url: uri,
        type: 'image/jpeg',
      };

      // Show the share dialog
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing score:', error);
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'jpg',
          quality: 0.9,
        }}
        style={styles.scoreCard}
      >
        {/* Background Image */}
        <Image
          source={require('./assets/golf-background.jpg')}  // Make sure to add this image to your assets
          style={styles.backgroundImage}
        />
        
        {/* Scores Overlay */}
        <View style={styles.scoresContainer}>
          <Text style={styles.courseTitle}>Mountain View Golf Club</Text>
          <View style={styles.scoresGrid}>
            {Object.entries(scores).map(([hole, score], index) => (
              <View key={hole} style={styles.scoreItem}>
                <Text style={styles.holeText}>Hole {index + 1}</Text>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.totalScore}>
            Total Score: {Object.values(scores).reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      </ViewShot>

      <TouchableOpacity 
        style={styles.shareButton}
        onPress={captureAndShare}
      >
        <Text style={styles.shareButtonText}>Share My Score</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreCard: {
    width: '100%',
    height: 500,  // Adjust this value based on your needs
    marginVertical: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scoresContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E4052',
  },
  scoresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scoreItem: {
    width: '30%',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  holeText: {
    fontSize: 16,
    color: '#2E4052',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B998B',
  },
  totalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#2E4052',
  },
  shareButton: {
    backgroundColor: '#1B998B',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;