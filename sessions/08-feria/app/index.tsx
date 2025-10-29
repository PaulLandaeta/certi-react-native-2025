import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function HomeRedirect() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const resolveRoute = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        if (!isMounted) return;
        setInitialRoute(value ? '/(auth)/login' : '/onboarding');
      } catch (error) {
        console.warn('[Onboarding] No se pudo leer AsyncStorage, usando onboarding por defecto.', error);
        if (isMounted) {
          setInitialRoute('/onboarding');
        }
      }
    };

    resolveRoute();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#f9738f" />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}
