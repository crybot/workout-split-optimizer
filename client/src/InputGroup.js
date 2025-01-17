import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, Typography, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PreferenceList from './PreferenceList'
import InputTooltip from './InputTooltip'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '90%',
    margin: '0px',
  },
}));
// TODO: export
function mapGroup(group) {
  return {
    'chest': 'PETTO',
    'back': 'SCHIENA',
    'legs': 'GAMBE',
    'arms': 'BRACCIA',
    'delts': 'SPALLE'
  }[group.toLowerCase()]
}

function IntegerField(props) {
  const classes = useStyles();
  const [state, setState] = useState({'error': false})

  function validateInput(value) {
    if (!value || isNaN(value) || !Number.isInteger(parseFloat(value))) {
      return false
    } 
    if (value.startsWith(".") || value.endsWith(".")) {
      return false
    }
    if (value < 0) {
      return false
    }
    if (props.min && value < props.min) {
      return false
    }
    if (props.max && value > props.max) {
      return false
    }
    return true
  }

  function handleChange(event) {
    props.onChange(event)
    const error = !validateInput(event.target.value)
    if (props.onError) {
      props.onError(event.target.name, error)
    }
    setState({'error': error})
  }

  return (
    <InputTooltip title={props.tooltip}>
      <TextField
        className={classes.textField}
        name={props.name}
        error={state.error}
        value={props.value}
        label={props.label}
        variant={props.variant || "outlined"}
        onChange={handleChange}/>
    </InputTooltip>
  );
}

export default function InputGroup(props) {
  const groups = ['PETTO', 'SCHIENA', 'GAMBE', 'BRACCIA', 'SPALLE']
  const classes = useStyles();

  return (
    <Grid className={classes.grid} alignItems="center" container spacing={1}>

      <Grid item xs={12} md={1}>
        <Typography
          component="h1" 
          variant="body1">
          {props.label}:
        </Typography>
      </Grid>

      <Grid item xs={12} md={2}>
        <IntegerField
          tooltip="Recupero minimo (in giorni) tra due sessioni consecutive del gruppo muscolare"
          onError={props.onError}
          name={props.name + '_rest_min'}
          value={props.value[props.name + '_rest_min']} label="Min Recupero"
          onChange={props.onChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <IntegerField
          tooltip="Recupero massimo (in giorni) tra due sessioni consecutive del gruppo muscolare"
          onError={props.onError}
          name={props.name + '_rest_max'} 
          value={props.value[props.name + '_rest_max']} label="Max Recupero"
          onChange={props.onChange}/>
      </Grid>

      <Grid item xs={12} md={2}>
        <IntegerField
          tooltip="Numero di rotazioni del gruppo muscolare da eseguire all'interno del microciclo"
          onError={props.onError}
          name={props.name + '_rotations'} 
          value={props.value[props.name + '_rotations']} label="Rotazioni"
          min={0}
          max={3}
          onChange={props.onChange}/>
      </Grid>
      <Grid item xs={12} md={2}>
        <InputTooltip
          title="Specifica se il gruppo muscolare deve essere eseguito soltanto dopo un giorno di riposo">
          <FormControlLabel 
            /* style={{marginBottom: "22px"}} /* hack to make the checkbox centered */
            control={
              <Checkbox 
                name={props.name + '_after_rest'}
                checked={props.value[props.name + '_after_rest']}
                onChange={props.onChange}
              />
            }
            labelPlacement="end"
            label={<Typography variant="body1">Dopo Rest Day</Typography>}/>
        </InputTooltip>
      </Grid>
      <Grid item xs={12} md={3}>
        <PreferenceList
          tooltip="Specifica l'insieme di altri distretti con cui è possibile allenare il gruppo muscolare"
          name={props.name + '_preference'}
          value={props.value}
          onChange={props.onChange}
          items={groups.filter((e) => e !== mapGroup(props.name))}>
        </PreferenceList>
      </Grid>

    </Grid>
  );
}

export { InputGroup, IntegerField }
