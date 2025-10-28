import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainFeed from '../screens/MainFeed';
import RecipeDetails from '../screens/RecipeDetails';
import Favorites from '../screens/Favorites';
import MyFood from '../screens/MyFood';
import EditRecipe from '../screens/EditRecipe';
import BackButton from '../components/BackButton';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      >
        <Stack.Screen name="Feed" component={MainFeed} options={{ title: 'Foodie' }} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ title: 'Recipe' }} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="MyFood" component={MyFood} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} options={{ title: 'Add / Edit Recipe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
