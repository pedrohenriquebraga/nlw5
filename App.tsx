import React, { useEffect } from "react";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import Routes from "./src/routes";
import * as Notification from "expo-notifications";
import { PlantProps } from "./src/libs/storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subscription = Notification.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    );

    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return <Routes />;
}
