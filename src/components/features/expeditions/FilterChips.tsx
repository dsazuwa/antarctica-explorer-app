import clsx from 'clsx';
import { useRouter } from 'next/router';

import Chip from '@/components/common/Chip';
import { capacityOptions, durationOptions } from '@/lib/constants';
import {
  getCapacityParam,
  getCruiseLinesParam,
  getDateParam,
  getDurationParam,
  toggleCruiseLine,
  updateDateParam,
  updateQueryParam,
} from '@/lib/param.utils';
import { formatDate } from '@/lib/utils';

function FilterChips() {
  const router = useRouter();
  const { query } = router;

  const startDate = getDateParam(query.startDate);
  const endDate = getDateParam(query.endDate);
  const cruiseLine = getCruiseLinesParam(query.cruiseLines);
  const capacity = getCapacityParam(query);
  const duration = getDurationParam(query);

  const isFilteredByStartDate = startDate !== null;
  const isFilteredByEndDate = endDate !== null;
  const isFilteredByCruise = cruiseLine.length !== 0;
  const isFIlteredByCapacity = capacity !== capacityOptions.length - 1;
  const isFIlteredByDuration = duration !== durationOptions.length - 1;
  const isFiltered =
    isFilteredByStartDate ||
    isFilteredByEndDate ||
    isFilteredByCruise ||
    isFIlteredByCapacity ||
    isFIlteredByDuration;

  return (
    <div
      className={clsx(
        { 'flex flex-row flex-wrap gap-2': isFiltered },
        { hidden: !isFiltered },
      )}
    >
      {isFilteredByStartDate && (
        <Chip
          label={`Start: ${formatDate(startDate, 'LLL dd, y')}${isFilteredByEndDate ? ` End: ${formatDate(endDate, 'LLL dd, y')}` : ''}`}
          handleClick={() => updateDateParam(router, undefined, undefined)}
        />
      )}

      {isFilteredByCruise &&
        cruiseLine.map((x, i) => (
          <Chip
            key={`cruiseLineChip${i}`}
            label={x}
            handleClick={() => toggleCruiseLine(router, x)}
          />
        ))}

      {isFIlteredByCapacity && (
        <Chip
          label={`Capacity: ${capacityOptions[capacity].displayText}`}
          handleClick={() =>
            updateQueryParam(router, {
              param: 'capacity',
              value: Math.max(capacityOptions.length - 1, 0),
            })
          }
        />
      )}

      {isFIlteredByDuration && (
        <Chip
          label={`Duration: ${durationOptions[duration].displayText}`}
          handleClick={() =>
            updateQueryParam(router, {
              param: 'duration',
              value: Math.max(durationOptions.length - 1, 0),
            })
          }
        />
      )}
    </div>
  );
}

export default FilterChips;
