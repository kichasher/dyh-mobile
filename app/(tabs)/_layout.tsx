import React, { useRef, useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import {
  Redirect,
  Tabs,
  useNavigation,
  useRouter,
  useSegments,
} from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import {
  GraduationCap,
  Briefcase,
  Users,
  Leaf,
  Home,
  MoreHorizontal,
  WandSparkles,
  Book,
} from "lucide-react-native";
import BottomSheetComp from "@/components/ui/bottom-sheet-modal";
import { Text } from "@/components/ui/text";

type FourE = "education" | "employment" | "engagement" | "environment";

interface IconConfig {
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  label: string;
  route: `four-es/${string}`;
}

const ICON_CONFIGS: Record<FourE, IconConfig> = {
  education: {
    icon: <GraduationCap size={24} color="#3B82F6" />,
    color: "#d8e7ff",
    borderColor: "#3B82F6",
    label: "Education",
    route: "four-es/education",
  },
  employment: {
    icon: <Briefcase size={24} color="#8B5CF6" />,
    color: "#e5e0ff",
    borderColor: "#8B5CF6",
    label: "Employment",
    route: "four-es/employment",
  },
  engagement: {
    icon: <Users size={24} color="#F59E0B" />,
    color: "#ffecd9",
    borderColor: "#F59E0B",
    label: "Engagement",
    route: "four-es/engagement",
  },
  environment: {
    icon: <Leaf size={24} color="#10B981" />,
    color: "#daf2e5",
    borderColor: "#10B981",
    label: "Environment",
    route: "four-es/environment",
  },
};

const CIRCLE_ANGLES = [0, 120, 240];

const getPositionFromAngle = (angle: number, radius: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  };
};

const MINI_ICON_POSITIONS = [
  { x: -12, y: -12 },
  { x: 12, y: -12 },
  { x: -12, y: 12 },
  { x: 12, y: 12 },
];

const TabLayout = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedE, setSelectedE] = useState<FourE | null>(null);
  const isMenuOpen = useSharedValue(0);
  const rotation = useSharedValue(0);
  const navigation = useNavigation();
  const router = useRouter();
  const segments = useSegments()

  useEffect(() => {
    const checkAndNavigate = async () => {
      const pathSegments = segments as string[];
      if (!pathSegments || pathSegments.length <= 1 || !pathSegments.includes('dashboard')) {
        await router.replace("/dashboard");
      }
    };
    checkAndNavigate();
  }, []);

  const currentSegments = segments as string[];
  const isFourEs = currentSegments.some((segment) => segment === "four-es");

  const handleESelect = (e: FourE) => {
    setSelectedE(e);
    bottomSheetRef.current?.dismiss();
    isMenuOpen.value = withSpring(1);
    router.push(ICON_CONFIGS[e].route as any);
  };

  const handleCenterPress = () => {
    if (isFourEs) {
      const newMenuState = isMenuOpen.value === 0 ? 1 : 0;
      isMenuOpen.value = withSpring(newMenuState);
      rotation.value = withSpring(rotation.value + 180);
    }
    bottomSheetRef.current?.present();
  };
  const AnimatedIcon = ({ type, index }: { type: FourE; index: number }) => {
    const config = ICON_CONFIGS[type];
    const isCenter = type === selectedE;
    let position = { x: 0, y: 0 };

    if (!isCenter && selectedE !== null) {
      const otherIcons = (Object.keys(ICON_CONFIGS) as FourE[]).filter(
        (t) => t !== selectedE
      );
      const indexInOthers = otherIcons.indexOf(type);
      position = getPositionFromAngle(CIRCLE_ANGLES[indexInOthers], 40);
    }

    const miniPosition = MINI_ICON_POSITIONS[index];

    const animatedStyle = useAnimatedStyle(() => {
      let scale, translateX, translateY, opacity;

      if (isFourEs && selectedE !== null) {
        // Expanded state in four-es section with selection
        scale = withSpring(isCenter ? 1.2 : 0.5);
        translateX = withSpring(isMenuOpen.value * (isCenter ? 0 : position.x));
        translateY = withSpring(isMenuOpen.value * (isCenter ? 0 : position.y));
        opacity = withSpring(isCenter ? 1 : isMenuOpen.value);
      } else {
        // Compact state (default or in other tabs)
        scale = withSpring(0.35);
        translateX = withSpring(miniPosition.x);
        translateY = withSpring(miniPosition.y);
        opacity = withSpring(1);
      }

      return {
        transform: [{ translateX }, { translateY }, { scale }],
        opacity,
        zIndex: isCenter ? 0 : 1,
        borderWidth: withSpring(isCenter && isFourEs ? 1 : 0),
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 68,
            height: 68,
            borderRadius: 100,
            backgroundColor: config.color,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -16,
            borderColor: config.borderColor,
            borderStyle: "solid",
            borderWidth: 1,
          },
          animatedStyle,
        ]}
      >
        {config.icon}
      </Animated.View>
    );
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 80,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIconStyle: {
            height: 36,
            width: 36,
            marginBottom: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ color }) => <Home color={color} />,
            tabBarLabel: "Dashboard",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            tabBarIcon: ({ color }) => <Book color={color} />,
            tabBarLabel: "Library",
          }}
        />
        <Tabs.Screen
          name="four-es"
          options={{
            tabBarLabel: "4E",
            tabBarButton: () => (
              <Pressable
                onPress={handleCenterPress}
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 34,
                  borderWidth: selectedE === null || !isFourEs ? 1 : 0,
                  borderColor: "lightgreen",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -16,
                }}
              >
                {(Object.keys(ICON_CONFIGS) as FourE[]).map((type, index) => (
                  <AnimatedIcon key={type} type={type} index={index} />
                ))}
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="counsellor"
          options={{
            tabBarIcon: ({ color }) => <WandSparkles color={color} />,
            tabBarLabel: "Counsellor",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color }) => <MoreHorizontal color={color} />,
            tabBarLabel: "More",
          }}
        />
      </Tabs>

      <BottomSheetComp ref={bottomSheetRef}>
        <View className="p-4">
          {(Object.keys(ICON_CONFIGS) as FourE[]).map((type) => (
            <Pressable
              key={type}
              className="flex-row items-center p-4 mb-2 rounded-lg"
              style={{
                backgroundColor:
                  selectedE === type
                    ? `${ICON_CONFIGS[type].color}20`
                    : "white",
              }}
              onPress={() => handleESelect(type)}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: ICON_CONFIGS[type].color,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {ICON_CONFIGS[type].icon}
              </View>
              <Text className="ml-3 text-base font-medium">
                {ICON_CONFIGS[type].label}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetComp>
    </>
  );
};

export default TabLayout;
