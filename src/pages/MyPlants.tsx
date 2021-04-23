import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import waterdrop from "../assets/waterdrop.png";
import Header from "../components/Header";
import Loading from "../components/Loading";
import PlantCardSecondary from "../components/PlantCardSecondary";
import { loadPlants, PlantProps, removePlant } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// import { Container } from './styles';

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData?.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover! 😥");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} daqui ${nextTime}.`
      );

      setMyPlants(plantsStorage);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
    lineHeight: 20,
  },

  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 25,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;
