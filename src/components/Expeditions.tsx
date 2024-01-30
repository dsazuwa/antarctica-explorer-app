import { useEffect } from 'react';

import {
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { useAppSelector, useLazyGetExpeditionsQuery } from '@/store';
import Expedition from './Expedition';

function Expeditions() {
  const {
    expeditions: { data, currentPage },
    cruiseLines,
    cruiseLineOptions,
    selectedItemsPerPage,
    selectedSort,
    filters,
  } = useAppSelector((s) => s.state);

  const [fetchExpeditions] = useLazyGetExpeditionsQuery();

  useEffect(() => {
    const durationFilter =
      filters.duration !== durationOptions.length - 1
        ? {
            'duration.min': durationOptions[filters.duration].min,
            'duration.max': durationOptions[filters.duration].max,
          }
        : {};

    fetchExpeditions({
      page: currentPage,
      size: itemsPerPageOptions[selectedItemsPerPage],
      sort: selectedSort === 0 ? '' : sortOptions[selectedSort].sort,
      dir: sortOptions[selectedSort].dir === 'asc' ? '' : 'desc',
      cruiseLines: filters.cruiseLines
        .map((x) => cruiseLineOptions[x].displayName)
        .join(','),
      ...durationFilter,
    });
  }, [
    currentPage,
    selectedItemsPerPage,
    selectedSort,
    filters,
    cruiseLineOptions,
    fetchExpeditions,
  ]);

  return (
    <div
      id='expeditions-list'
      className='flex flex-col items-center space-y-6 overflow-y-auto'
    >
      {data.map((expedition, index) => (
        <Expedition
          key={'expedition' + index}
          expedition={expedition}
          cruiseLine={cruiseLines[expedition.cruiseLine]}
        />
      ))}
    </div>
  );
}

export default Expeditions;
