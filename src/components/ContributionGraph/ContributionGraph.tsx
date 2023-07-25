import { FC } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { formatRussianDate, getPanelPosition, makeCalendarData, setPanelColor } from '../../utils';
import { columns, monthNames, panelSize, tooltipStyles, weekNames } from '../../constants';
import { IContributionsData } from '../../types';

interface Props {
  values: IContributionsData;
  until: string;
}

const ContributionGraph: FC<Props> = (props) => {
  const contributions = makeCalendarData(props.values, props.until, columns);
  const innerDom: JSX.Element[] = [];

  // panels
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < 7; j++) {
      const contribution = contributions[i][j];
      if (contribution === null) continue;
      const pos = getPanelPosition(i, j);
      const color = setPanelColor(contribution.value);
      const dom = (
        <rect
          data-tooltip-id={'my-tooltip'}
          data-tooltip-html={`<b>${contribution.value} contributions<br /></b> ${formatRussianDate(
            contribution.date,
          )}`}
          data-tooltip-place="top"
          key={'panel_key_' + i + '_' + j}
          x={pos.x}
          y={pos.y}
          width={panelSize}
          height={panelSize}
          fill={color}
        />
      );
      innerDom.push(dom);
    }
  }

  // week texts
  for (let i = 0; i < weekNames.length; i++) {
    const textBasePos = getPanelPosition(0, i);
    const dom = (
      <text
        key={'week_key_' + i}
        style={{
          fontSize: 12,
          alignmentBaseline: 'central',
          fill: '#AAA',
        }}
        x={textBasePos.x - panelSize / 2 - 2}
        y={textBasePos.y + panelSize / 2}
        textAnchor={'middle'}>
        {weekNames[i]}
      </text>
    );
    innerDom.push(dom);
  }

  // month texts
  let prevMonth = -1;
  for (let i = 0; i < columns; i++) {
    const c = contributions[i][0];
    if (c === null) continue;
    if (columns > 1 && i == 0 && c.month !== contributions[i + 1][0]?.month) {
      // skip first month name to avoid text overlap
      continue;
    }
    if (c.month !== prevMonth) {
      const textBasePos = getPanelPosition(i, 0);
      innerDom.push(
        <text
          key={'month_key_' + i}
          style={{
            fontSize: 12,
            alignmentBaseline: 'central',
            fill: '#AAA',
          }}
          x={textBasePos.x + panelSize / 2}
          y={textBasePos.y - panelSize / 2 - 2}
          textAnchor={'middle'}>
          {monthNames[c.month]}
        </text>,
      );
    }
    prevMonth = c.month;
  }

  return (
    <>
      <svg
        style={{
          width: '100%',
          height: '140px',
        }}
        height="110">
        {innerDom}
      </svg>
      <Tooltip id="my-tooltip" style={{ ...tooltipStyles }} />
    </>
  );
};

export default ContributionGraph;
