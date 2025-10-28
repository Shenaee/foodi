import React, { useEffect } from 'react';
import RootNav from './src/navigation';
import { useRecipes } from './src/store/recipes';

export default function App() {
  const hydrate = useRecipes(s => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <RootNav />;
}
