// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Share,
  Alert,
  Animated,
  PanResponder,
  Modal,
  Easing,
  Platform,
  ImageBackground,
  ScrollView,
  Pressable
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import { sampleWallpapers } from './data/samplewallpapers';

// Define TypeScript interfaces
interface Wallpaper {
  id: string;
  url: string;
  author: string;
  title?: string;
  description?: string;
  category?: string;
  color?: string;
}

export default function App() {
  // State management
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Animation values
  const scrollX = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const downloadAnim = useRef(new Animated.Value(0)).current;
  const swipeAnim = useRef(new Animated.Value(0)).current;
  
  // Add a new ref for the FlatList to control its scrolling
  const flatListRef = useRef<FlatList>(null);

  // Screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Initialize
  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setWallpapers(sampleWallpapers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
        setLoading(false);
      }
    };

    fetchWallpapers();
    checkMediaLibraryPermissions();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (viewMode === 'swipe') {
        setViewMode('grid');
        return true; // Prevent default behavior (exit app)
      }
      return false; // Allow default behavior for other views
    };
  
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  
    return () => backHandler.remove();
  }, [viewMode]);  

  // Check for required permissions
  const checkMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setPermissionGranted(status === 'granted');
  };

  // Modified PanResponder for better horizontal swipe detection
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        swipeAnim.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow horizontal movement if it's more horizontal than vertical
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          swipeAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const swipeThreshold = screenWidth * 0.25;

        if (gestureState.dx > swipeThreshold && currentIndex > 0) {
          // Swipe right - previous image
          Animated.timing(swipeAnim, {
            toValue: screenWidth,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(prevIndex => prevIndex - 1);
            swipeAnim.setValue(0);
          });
        } else if (gestureState.dx < -swipeThreshold && currentIndex < wallpapers.length - 1) {
          // Swipe left - next image
          Animated.timing(swipeAnim, {
            toValue: -screenWidth,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
            swipeAnim.setValue(0);
          });
        } else {
          // Return to original position if swipe wasn't enough
          Animated.spring(swipeAnim, {
            toValue: 0,
            tension: 40,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Animate button on press
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Download wallpaper with progress tracking
  const downloadWallpaper = async (wallpaper: Wallpaper) => {
    if (!permissionGranted) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'We need permission to save wallpapers to your device.');
        return;
      }
      setPermissionGranted(true);
    }

    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      
      // Animate download button
      Animated.timing(downloadAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();

      const fileUri = FileSystem.documentDirectory + wallpaper.id + '.jpg';
      const downloadResumable = FileSystem.createDownloadResumable(
        wallpaper.url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Wallpapers', asset, false);
      
      setIsDownloading(false);
      downloadAnim.setValue(0);
      
      Alert.alert('Success', 'Wallpaper saved to gallery!');
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
      Alert.alert('Error', 'Failed to download wallpaper');
      setIsDownloading(false);
      downloadAnim.setValue(0);
    }
  };

  // Share wallpaper
  const shareWallpaper = async (wallpaper: Wallpaper) => {
    animateButton();
    try {
      const result = await Share.share({
        message: `Check out this wallpaper by ${wallpaper.author}`,
        url: wallpaper.url,
      });
    } catch (error) {
      console.error('Error sharing wallpaper:', error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (wallpaperId: string) => {
    if (favorites.includes(wallpaperId)) {
      setFavorites(favorites.filter(id => id !== wallpaperId));
    } else {
      setFavorites([...favorites, wallpaperId]);
    }
    animateButton();
  };
  
  // Render grid view items
  const renderWallpaperItem = ({ item, index }: { item: Wallpaper, index: number }) => {
    // Calculate animation values for grid items
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];
    
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.wallpaperItem, { transform: [{ scale }] }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setCurrentIndex(index);
            setViewMode('swipe');
          }}
        >
          <Image
            source={{ uri: item.url }}
            style={styles.wallpaperThumbnail}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.wallpaperTitle} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            <Text style={styles.wallpaperAuthor} numberOfLines={1}>
              By {item.author}
            </Text>
          </LinearGradient>
          {favorites.includes(item.id) && (
            <View style={styles.favoriteIcon}>
              <Ionicons name="heart" size={20} color="#FF4057" />
            </View>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Implementation of horizontal swipe view with FlatList
  const renderHorizontalSwipeView = () => {
    if (wallpapers.length === 0) return null;
    
    return (
      <View style={styles.swipeContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={wallpapers}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(newIndex);
          }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: screenWidth, height: screenHeight }}>
                <Image
                  source={{ uri: item.url }}
                  style={styles.fullImage}
                  resizeMode="cover"
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        
        {/* Top controls */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setViewMode('grid')}
          >
            <Feather name="grid" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.paginationIndicator}>
            {wallpapers.map((_, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => {
                  setCurrentIndex(index);
                  flatListRef.current?.scrollToIndex({ index, animated: true });
                }}
              >
                <View 
                  style={[
                    styles.paginationDot,
                    index === currentIndex && styles.paginationDotActive
                  ]} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Bottom controls with blur/gradient */}
        <BlurView intensity={50} style={styles.bottomControlsContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.bottomGradient}
          >
            <View style={styles.wallpaperInfo}>
              <Text style={styles.swipeTitle}>{wallpapers[currentIndex].title}</Text>
              <Text style={styles.swipeAuthor}>by {wallpapers[currentIndex].author}</Text>
            </View>
            
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity 
                style={styles.circleButton}
                onPress={() => toggleFavorite(wallpapers[currentIndex].id)}
              >
                <Ionicons 
                  name={favorites.includes(wallpapers[currentIndex].id) ? "heart" : "heart-outline"} 
                  size={24} 
                  color={favorites.includes(wallpapers[currentIndex].id) ? "#FF4057" : "#ffffff"} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => setDetailsModalVisible(true)}
              >
                <Text style={styles.infoButtonText}>Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.circleButton}
                onPress={() => shareWallpaper(wallpapers[currentIndex])}
              >
                <Feather name="share" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            {/* Navigation buttons */}
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={[styles.navButton, { opacity: currentIndex > 0 ? 1 : 0.5 }]}
                onPress={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                    flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
                  }
                }}
                disabled={currentIndex === 0}
              >
                <Feather name="chevron-left" size={24} color="#ffffff" />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.navButton, { opacity: currentIndex < wallpapers.length - 1 ? 1 : 0.5 }]}
                onPress={() => {
                  if (currentIndex < wallpapers.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
                  }
                }}
                disabled={currentIndex === wallpapers.length - 1}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <Feather name="chevron-right" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>
        
        {/* Modal for wallpaper details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => setDetailsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: 'rgba(0, 0, 0, 0.85)' }]}>
              <ScrollView style={styles.modalScroll}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{wallpapers[currentIndex].title}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setDetailsModalVisible(false)}
                  >
                    <Feather name="x" size={24} color="#333333" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalImageContainer}>
                  <Image
                    source={{ uri: wallpapers[currentIndex].url }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                </View>
                
                <View style={styles.detailsSection}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Artist:</Text>
                    <Text style={styles.detailValue}>{wallpapers[currentIndex].author}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Category:</Text>
                    <View style={[styles.categoryBadge, styles.modalCategoryBadge]}>
                      <Text style={styles.categoryText}>{wallpapers[currentIndex].category}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{wallpapers[currentIndex].description}</Text>
                  
                  <View style={styles.modalActions}>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.favoriteButton]}
                      onPress={() => toggleFavorite(wallpapers[currentIndex].id)}
                    >
                      <Ionicons 
                        name={favorites.includes(wallpapers[currentIndex].id) ? "heart" : "heart-outline"} 
                        size={20} 
                        color={favorites.includes(wallpapers[currentIndex].id) ? "#ffffff" : "#ffffff"} 
                      />
                      <Text style={styles.modalButtonText}>
                        {favorites.includes(wallpapers[currentIndex].id) ? "Favorited" : "Add to Favorites"}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.downloadButton]}
                      onPress={() => {
                        setDetailsModalVisible(false);
                        downloadWallpaper(wallpapers[currentIndex]);
                      }}
                    >
                      <Feather name="download" size={20} color="#ffffff" />
                      <Text style={styles.modalButtonText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading wallpapers...</Text>
      </View>
    );
  }

  // Main render
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      {viewMode === 'grid' ? (
        <>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e' }}
            style={styles.headerBackground}
            blurRadius={10}
          >
            <BlurView intensity={70} style={styles.headerBlur}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Wallpapers</Text>
                <Text style={styles.headerSubtitle}>Find your perfect background</Text>
              </View>
            </BlurView>
          </ImageBackground>
          
          <Animated.FlatList
            data={wallpapers}
            renderItem={renderWallpaperItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.wallpaperList}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
        </>
      ) : (
        renderHorizontalSwipeView()
      )}
    </SafeAreaView>
  );
}

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerBackground: {
    height: 160,
  },
  headerBlur: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 + 16 : 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#eeeeee',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#eeeeee',
  },
  wallpaperList: {
    padding: 8,
  },
  wallpaperItem: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 220,
  },
  wallpaperThumbnail: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    height: 80,
    justifyContent: 'flex-end',
  },
  wallpaperTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  wallpaperAuthor: {
    fontSize: 12,
    color: '#eeeeee',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(74, 144, 226, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  swipeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  parallaxContainer: {
    flex: 1,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  navigationIndicators: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  navArrow: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    left: 16,
  },
  rightArrow: {
    right: 16,
  },
  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomControlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomGradient: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  wallpaperInfo: {
    marginBottom: 16,
  },
  swipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  swipeAuthor: {
    fontSize: 14,
    color: '#eeeeee',
    marginTop: 4,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
  },
  infoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonText: {
    color: '#ffffff',
    marginHorizontal: 4,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    maxHeight: height * 0.8,
  },
  modalScroll: {
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  detailsSection: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: 'bold',
    width: 80,
  },
  detailValue: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  modalCategoryBadge: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
    marginHorizontal: 8,
  },
  favoriteButton: {
    backgroundColor: '#FF4057',
  },
  downloadButton: {
    backgroundColor: '#4A90E2',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 8,
  }
});
