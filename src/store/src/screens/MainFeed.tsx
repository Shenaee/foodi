import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRecipes } from '../store/recipes';

const CATS = ['All','Breakfast','Lunch','Dinner','Dessert','Vegan','Quick'];

export default function MainFeed({ navigation }: any) {
  const { recipes } = useRecipes();
  const [cat, setCat] = useState('All');
  const filtered = useMemo(
    () => cat === 'All' ? recipes : recipes.filter(r => r.category === cat || r.category?.includes(cat)),
    [recipes, cat]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 12 }}>
        {CATS.map(c => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={{
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
            backgroundColor: c === cat ? '#333' : '#eee', marginRight: 8
          }}>
            <Text style={{ color: c === cat ? '#fff' : '#333' }}>{c}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Text style={{ marginLeft: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#ffd54f' }}>★ Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyFood')}>
          <Text style={{ marginLeft: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#90caf9' }}>👤 My Food</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { id: item.id })} style={{ marginBottom: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', elevation: 2 }}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={{ height: 160 }} />
            ) : (
              <View style={{ height: 160, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                <Text>📷 No image</Text>
              </View>
            )}
            <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
              <Text>{item.difficulty ?? ''}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No recipes yet.</Text>}
      />
    </View>
  );
}
