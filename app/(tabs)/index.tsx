import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TabIndex() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/dashboard");
  }, []);
  
  return null;
}