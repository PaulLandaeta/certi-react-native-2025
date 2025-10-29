import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Alert, ActivityIndicator, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { logout } from '../../src/services/loginEmail';
import { auth } from '../../src/data/firebase';
import { getUserByUid, updateUserPhoto } from '../../src/services/userService';
import { uploadToCloudinary } from '../../src/services/cloudinary';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import { FadeView } from '../../src/components/FadeView';
import { useFade } from '../../src/hooks/useFade';

const ProfileScreen = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [email, setEmail] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [uploading, setUploading] = useState(false);
  const titleProfile = useFade(0, -80, 'down');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setLoadingProfile(false);
      return;
    }
    setEmail(currentUser.email ?? null);

    const loadProfile = async () => {
      try {
        const userDoc = await getUserByUid(currentUser.uid);
        setPhotoUrl(userDoc?.photoUrl ?? currentUser.photoURL ?? undefined);
      } catch (error) {
        console.warn('No se pudo obtener el perfil del usuario', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.warn('No se pudo cerrar sesión', error);
    }
  };

  const requestMediaPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos acceso a tus fotos para actualizar tu imagen de perfil.'
      );
      return false;
    }
    return true;
  }, []);

  const handlePickImage = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert('Sesión expirada', 'Vuelve a iniciar sesión para cambiar tu foto.');
      return;
    }

    const hasPermission = await requestMediaPermission();
    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.8
    });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    const asset = result.assets[0];
    if (!asset.uri) {
      Alert.alert('Error', 'No pudimos leer la imagen seleccionada.');
      return;
    }

    try {
      setUploading(true);
      const uploadResponse = await uploadToCloudinary(asset.uri, {
        fileName: asset.fileName ?? 'profile-photo.jpg',
        mimeType: asset.mimeType ?? 'image/jpeg'
      });

      const secureUrl = uploadResponse.secure_url;
      if (!secureUrl) {
        throw new Error('Cloudinary no devolvió una URL pública.');
      }

      await updateUserPhoto(currentUser.uid, secureUrl);
      await updateProfile(currentUser, { photoURL: secureUrl });
      setPhotoUrl(secureUrl);
      Alert.alert('Listo', 'Tu foto de perfil se actualizó correctamente.');
    } catch (error: any) {
      console.warn('Error subiendo imagen', error);
      Alert.alert('Error', error?.message ?? 'No se pudo subir tu foto.');
    } finally {
      setUploading(false);
    }
  }, [requestMediaPermission]);

  const initials = useMemo(() => {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return '?';
  }, [email]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <FadeView opacity={titleProfile.opacity} styles={{transform: titleProfile.transform}}>
          <Text style={styles.title}>Perfil</Text>
        </FadeView>
        <Button title="Fade In Title" 
          onPress={() => titleProfile.fadeIn({ duration: 500 })}>
        </Button>
        <Button title="Fade In Title" 
          onPress={() => titleProfile.fadeOut({ duration: 500 })}>
        </Button>
        {email && <Text style={styles.subtitle}>{email}</Text>}
        <View style={styles.avatarWrapper}>
          {loadingProfile ? (
            <ActivityIndicator color="#f9738f" />
          ) : photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{initials}</Text>
            </View>
          )}
        </View>
        <Pressable
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handlePickImage}
          disabled={uploading}
        >
          <Text style={styles.uploadLabel}>
            {uploading ? 'Subiendo...' : 'Cambiar foto de perfil'}
          </Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutLabel}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#fda4af',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff8f9',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: '700',
    color: '#f9738f',
  },
  uploadButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: '#f9738f',
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  divider: {
    width: '70%',
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: '#f9738f',
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
