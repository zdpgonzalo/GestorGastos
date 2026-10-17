import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.dark;

/**
 * Defines the configuration required to render a tab item
 * in the custom floating tab bar.
 * @property name - The route name associated with the tab item.
 * @property label - The text label displayed for the tab item.
 * @property icon - The name of the icon to display when the tab is inactive.
 * @property activeIcon - The name of the icon to display when the tab is active.
 */
type TabItem = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const LEFT_TABS: TabItem[] = [
  {
    name: 'index',
    label: 'Inicio',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    name: 'statistics',
    label: 'Estadísticas',
    icon: 'stats-chart-outline',
    activeIcon: 'stats-chart',
  }
];

const RIGHT_TABS: TabItem[] = [
  {
    name: 'transactions',
    label: 'Transacciones',
    icon: 'list-outline',
    activeIcon: 'list',
  },
  {
    name: 'profile',
    label: 'Perfil',
    icon: 'person-outline',
    activeIcon: 'person',
  }
];

/**
 * Defines the props required by the custom floating tab bar.
 *
 * @property state - The current navigation state, including the active
 * route index and the list of available routes.
 *
 * @property navigation - Provides the navigation methods required to
 * handle tab presses and navigate between routes.
 */
type FloatingTabBarProps = {
  state:{
    index: number;
    routes: { key: string; name: string }[];
  };

  navigation: {
    emit: (event:{
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

/** Renders the custom floating tab bar and manages tab selection,
 * navigation events, safe area spacing, and the central action button.
 * @param state - Current tab navigator state, including available routes
 * and the index of the currently active route.
 * @param navigation - Navigation object providing methods to handle
 * tab presses and navigate between routes.
 */
function FloatingTabBar({
  state,
  navigation,
} : FloatingTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  /** Renders an individual tab based on its configuration and current
   * navigation state.
   * @param item - Configuration defining the route, label and icons.
   * @returns The tab element, or null if the route is not registered.
   */
  const renderTab = (item: TabItem) =>{
    const routeIndex = state.routes.findIndex(
      (route) => route.name === item.name,
    );

    if(routeIndex === -1) return null;

    const route = state.routes[routeIndex];
    const focused = state.index === routeIndex;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if(!focused && !event?.defaultPrevented){
        navigation.navigate(route.name);
      }
    };

    return (
      <Pressable
        key={item.name}
        accessibilityRole="tab"
        accessibilityLabel={item.label}
        accessibilityState={{ selected: focused }}
        onPress={onPress}
        style={styles.tabButton}
      >
        <View 
          style={[
            styles.iconCircle,
            focused && styles.activeIconCircle,
          ]}
        >
          <Ionicons
            name={focused ? item.activeIcon : item.icon}
            size={21}
            color={focused ? colors.accent : colors.textSecondary}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
      ]}
    >
      <View style={styles.bar}>
        {/* Render the tabs positioned before the central action button. */}
        {LEFT_TABS.map(renderTab)}

        {/* Provide direct access to the transaction creation screen. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Añadir transacción"
          onPress={() => router.push('/transaction/new')}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style= {[
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
        >
          <Ionicons
            name="add"
            size={24}
            color={colors.text}
          />
        </Pressable>

        {/* Render the tabs positioned after the central action button. */}
        {RIGHT_TABS.map(renderTab)}
      </View>
    </View>
  );
}


export default function AppTabs() {
  return (
    <Tabs
      tabBar = {(props) => (
        <FloatingTabBar
          state={props.state}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen name="index" options={{title: 'Inicio'}} />
      <Tabs.Screen name="statistics" options={{title: 'Estadísticas'}} />
      <Tabs.Screen name="transactions" options={{title: 'Transacciones'}} />
      <Tabs.Screen name="profile" options={{title: 'Perfil'}} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  bar: {
    width: '100%',
    maxWidth: 390,
    minHeight: 70,
    borderRadius: 38,
    backgroundColor: colors.backgroundElement,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeIconCircle: {
    backgroundColor: colors.text,
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    marginHorizontal: 3,
  },
  addButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.94 }],
  },
});