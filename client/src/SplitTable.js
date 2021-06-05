import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';

function weekday(n) {
  return {0: 'LUNEDÌ', 1: 'MARTEDÌ', 2: 'MERCOLEDÌ',                          
    3: 'GIOVEDÌ', 4: 'VENERDÌ', 5: 'SABATO',                          
    6: 'DOMENICA'}[(n-1) % 7]    
}


function SplitCell(props) {
  const theme = useTheme();
  console.log(theme.palette)

  return (
    <td style={{backgroundColor: (props.marked ? theme.palette.secondary.main : '')}}> 
      <Typography align="center">
        {props.groups.join(' & ')} 
      </Typography>
    </td>
  );
}

function SplitRow(props) {
  const [marked, setMarked] = useState(false)
  const handleClick = () => {
    setMarked(!marked)
    props.handleClick(props.row, !marked)
  }
  const cols = props.cols
  const n = props.row

  return (
    <tr key={n.toString()}
      onClick={handleClick}>
      <td align="left"> 
        <Typography>
          {weekday(n)}
        </Typography>
      </td>
      <SplitCell marked={marked} handleClick={props.handleClick} groups={cols[0]}/>
      <SplitCell marked={marked} handleClick={props.handleClick} groups={cols[1]}/>
      <SplitCell marked={marked} handleClick={props.handleClick} groups={cols[2]}/>
      <SplitCell marked={marked} handleClick={props.handleClick} groups={[]}/>
    </tr>
  );
}

function SplitTable(props) {

  const groups = {'CHEST': 0, 'BACK':0, 'LEGS':0, 'ARMS':0, 'DELTS':0}
  const numbers = Array.from({length:props.days},(v,k)=>k+1)
  const split = props.split

  const rows = numbers.map((n) => {
    var cols = [[], [], []]

    if (split != null) {
      for (var group in groups) {
        if (split[n-1].includes(group)) {
          cols[groups[group]].push(group)
          groups[group] += 1
        }
      }
    }
    return (<SplitRow handleClick={props.handleClick} row={n} cols={cols} />);
  });

  return (
    <table align="center">
      <tr> 
        <th> </th>
        <th>
          <Typography>
            ROTAZIONE I 
          </Typography>
        </th>
        <th>
          <Typography>
            ROTAZIONE II
          </Typography>
        </th>
        <th>
          <Typography>
            ROTAZIONE III
          </Typography>
        </th>
        <th>
          <Typography>
            RICHIAMO
          </Typography>
        </th>
      </tr>
      {rows}
    </table>
  );

}

export default SplitTable
