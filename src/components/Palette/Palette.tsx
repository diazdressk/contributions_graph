import React, { Fragment } from 'react';
import { colorsContributions, textStyles, tooltipStyles } from '../../constants';
import { Tooltip } from 'react-tooltip';
import { showContributionsTooltip } from '../../utils';

type PaletteProps = {};

const Palette: React.FC<PaletteProps> = () => {
  return (
    <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <p style={{ ...textStyles }}>Меньше</p>
      <div style={{ display: 'flex', gap: '2px' }}>
        {colorsContributions.map(({ color, contributions }) => (
          <Fragment key={contributions}>
            <div
              data-tooltip-id={`${contributions}`}
              style={{ background: color, width: '15px', height: '15px' }}></div>
            <Tooltip id={`${contributions}`} style={{ ...tooltipStyles }}>
              <div>
                {showContributionsTooltip(contributions)}
              </div>
            </Tooltip>
          </Fragment>
        ))}
      </div>
      <p style={{ ...textStyles }}>Больше</p>
    </div>
  );
};

export default Palette;
