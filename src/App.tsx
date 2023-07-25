import { useEffect, useState } from 'react';
import { getContribuionsData } from './api';
import ContributionGraph from './components/ContributionGraph';
import Palette from './components/Palette/Palette';
import { IContributionsData } from './types';
import { getToday } from './utils';

function App() {
  const [contributions, setContributions] = useState<IContributionsData>({});
  const [today, setToday] = useState<string>('');

  useEffect(() => {
    getContribuionsData().then((res) => setContributions(res));
  }, []);

  useEffect(() => {
    setToday(getToday());
  }, []);

  return (
    <div style={{ width: '1024px', margin: '0 auto' }}>
      <ContributionGraph values={contributions} until={today} />
      <Palette />
    </div>
  );
}

export default App;
