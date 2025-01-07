import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ComplexAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animated values
  const mainBoxAnim = useRef(new Animated.ValueXY()).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const satellite1Anim = useRef(new Animated.Value(0)).current;
  const satellite2Anim = useRef(new Animated.Value(0)).current;
  const satellite3Anim = useRef(new Animated.Value(0)).current;

  // PanResponder for dragging
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: mainBoxAnim.x, dy: mainBoxAnim.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(mainBoxAnim, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const startAnimation = () => {
    setIsAnimating(true);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 4,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.loop(
        Animated.timing(satellite1Anim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        { iterations: -1 }
      ),
      Animated.loop(
        Animated.timing(satellite2Anim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        { iterations: -1 }
      ),
      Animated.loop(
        Animated.timing(satellite3Anim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        { iterations: -1 }
      ),
    ]).start(() => setIsAnimating(false));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '1440deg'],
  });

  const satellite1Position = satellite1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });

  const satellite2Position = satellite2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });

  const satellite3Position = satellite3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mainBox,
          {
            transform: [
              { translateX: mainBoxAnim.x },
              { translateY: mainBoxAnim.y },
              { rotate: spin },
              { scale: scaleAnim },
            ],
            opacity: opacityAnim,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.mainBoxText}>🚀</Text>
        <Animated.View
          style={[
            styles.satellite,
            {
              transform: [
                {
                  translateX: satellite1Position.interpolate({
                    inputRange: [0, Math.PI, Math.PI * 2],
                    outputRange: [-50, 50, -50],
                  }),
                },
                {
                  translateY: satellite1Position.interpolate({
                    inputRange: [0, Math.PI / 2, Math.PI, Math.PI * 3 / 2, Math.PI * 2],
                    outputRange: [0, -50, 0, 50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.satelliteText}>🌟</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.satellite,
            {
              transform: [
                {
                  translateX: satellite2Position.interpolate({
                    inputRange: [0, Math.PI, Math.PI * 2],
                    outputRange: [50, -50, 50],
                  }),
                },
                {
                  translateY: satellite2Position.interpolate({
                    inputRange: [0, Math.PI / 2, Math.PI, Math.PI * 3 / 2, Math.PI * 2],
                    outputRange: [0, 50, 0, -50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.satelliteText}>🌙</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.satellite,
            {
              transform: [
                {
                  translateX: satellite3Position.interpolate({
                    inputRange: [0, Math.PI, Math.PI * 2],
                    outputRange: [0, 0, 0],
                  }),
                },
                {
                  translateY: satellite3Position.interpolate({
                    inputRange: [0, Math.PI, Math.PI * 2],
                    outputRange: [-70, 70, -70],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.satelliteText}>💫</Text>
        </Animated.View>
      </Animated.View>
      <TouchableOpacity
        style={[styles.button, isAnimating && styles.buttonDisabled]}
        onPress={startAnimation}
        disabled={isAnimating}
      >
        <Text style={styles.buttonText}>
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1b26',
  },
  mainBox: {
    width: 100,
    height: 100,
    backgroundColor: '#7aa2f7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7dcfff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  mainBoxText: {
    fontSize: 40,
  },
  satellite: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bb9af7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  satelliteText: {
    fontSize: 20,
  },
  button: {
    marginTop: 50,
    backgroundColor: '#f7768e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#ff9e64',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#565f89',
    shadowColor: '#565f89',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComplexAnimation;

