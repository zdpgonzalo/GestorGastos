import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  useColorScheme
} from 'react-native';

import { Colors } from '@/constants/theme';
import Svg, { Path } from 'react-native-svg';

const colors = Colors.dark;


const BAR_HEIGHT = 78;
const BUTTON_SIZE = 65;
const CURVE_HEIGHT = 18;

const CUTOUT_GAP = 7;
const CUTOUT_RADIUS = BUTTON_SIZE / 2 + CUTOUT_GAP;

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
  emitter,
  navigateToTab,
} : {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  emitter: {
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
  };
  navigateToTab: (routeKey: string) => void;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'light' ? 'light' : 'dark'];

  const router = useRouter();
  const [pressed, setPressed] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const center = barWidth / 2;
  const sidePadding = 24;

  const buttonCenterY = -2 + BUTTON_SIZE / 2;

  const cutoutRadius = CUTOUT_RADIUS;

  const verticalDistance = buttonCenterY - CURVE_HEIGHT;

  const halfCutoutWidth = Math.sqrt(
    Math.max(
      0,
      cutoutRadius * cutoutRadius -
        verticalDistance * verticalDistance
    )
  );

  const curveStart = center - halfCutoutWidth;
  const curveEnd = center + halfCutoutWidth;

  const barPath = barWidth
    ? [
        `M ${sidePadding} ${CURVE_HEIGHT}`,
        `L ${curveStart} ${CURVE_HEIGHT}`,
        `A ${cutoutRadius} ${cutoutRadius} 0 1 0 ${curveEnd} ${CURVE_HEIGHT}`,
        `L ${barWidth - sidePadding} ${CURVE_HEIGHT}`,
        `Q ${barWidth} ${CURVE_HEIGHT} ${barWidth} ${CURVE_HEIGHT + 24}`,
        `L ${barWidth} ${BAR_HEIGHT - 24}`,
        `Q ${barWidth} ${BAR_HEIGHT} ${barWidth - 24} ${BAR_HEIGHT}`,
        `L 24 ${BAR_HEIGHT}`,
        `Q 0 ${BAR_HEIGHT} 0 ${BAR_HEIGHT - 24}`,
        `L 0 ${CURVE_HEIGHT + 24}`,
        `Q 0 ${CURVE_HEIGHT} ${sidePadding} ${CURVE_HEIGHT}`,
        'Z',
      ].join(' ')
    : '';

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
      const event = emitter.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if(!focused && !event?.defaultPrevented){
        navigateToTab(route.key);
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
        <Ionicons
          name={focused ? item.activeIcon : item.icon}
          size={27}
          color={focused ? colors.accent : colors.textSecondary}
        />
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
      <View 
        style={styles.barWrapper}
        onLayout={(event) => {
          setBarWidth(event.nativeEvent.layout.width);
        }}
      >
        {barWidth > 0 && (
          <Svg
            pointerEvents="none"
            width={barWidth}
            height={BAR_HEIGHT}
            viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
            style={StyleSheet.absoluteFill}
          >
            <Path
              d={barPath}
              fill={colors.backgroundElement}
              stroke={colors.border}
              strokeWidth={1}
            />
          </Svg>
        )}

        <View style={styles.tabsRow}>
          {/* Render the tabs positioned before the central action button. */}
          {LEFT_TABS.map(renderTab)}

          <View style={styles.centerSlot}/>

          {/* Render the tabs positioned after the central action button. */}
          {RIGHT_TABS.map(renderTab)}
        </View>
        

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
            size={38}
            color={colors.text}
          />
        </Pressable>
      
      </View>
    </View>
  );
}


export default function AppTabs() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'light' ? 'light' : 'dark'];

  return (
    <Tabs
      tabBar={(props) => 
        <FloatingTabBar {...props} />
    }
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
          paddingBottom: BAR_HEIGHT + 12,
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  barWrapper: {
    width: '100%',
    maxWidth: 440,
    height: BAR_HEIGHT,
    position: 'relative',
    overflow: 'visible',
    bottom:12,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,

    // Shadow for Android
    elevation: 10,
  },
  tabsRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  labelContainer: {
    height: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelPill: {
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  activeLabelPill: {
    backgroundColor: colors.accent,
    width: 26,
    height: 4,
  },
  labelDot: {
    display: 'none',
  },
  activeLabelDot: {
    display: 'none',
  },
  centerSlot: {
    flex: 1.5,
  },
  addButton: {
    position: 'absolute',
    top: -2,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    zIndex: 10,
  },
  addButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.94 }],
  },
});