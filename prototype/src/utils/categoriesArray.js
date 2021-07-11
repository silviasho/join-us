import { compareAsc } from 'date-fns';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'semantic-ui-react';
const useStyles = makeStyles((theme) => ({

  margin: {
    display: "block",
    flexWrap: "wrap",
    flexDirection: "row"
  },
}));


export const categories = [
  { key: 1, text: 'sport', value: 'sport' },
  { key: 2, text: 'culture', value: 'culture' },
  { key: 3, text: 'Nature and hiking', value: 'Nature and hiking' },
  { key: 4, text: 'life style', value: 'life style' },
  { key: 5, text: 'extreme', value: 'extreme' },
  { key: 6, text: 'enrichment', value: 'enrichment' },
  { key: 7, text: 'Vacations', value: 'Vacations' },
]

export const validDate = (value) => {
  const today = new Date()
  const userInputDate = new Date(value)
  const validDate = compareAsc(today, userInputDate)
  if (validDate === 1) return false
  return true
}





export function RadioButtonsGroup(props) {
  const classes = useStyles();
  const { seter, value } = props
  const handleChange = (event) => {
    seter(!value);
  };

  return (
    <FormControl component="fieldset" >
      <RadioGroup aria-label="gender" name="privet" value={value} onChange={handleChange} className={classes.margin} >
        <FormControlLabel value={true} control={<Radio />} label="privet" />
        <FormControlLabel value={false} control={<Radio />} label="public" />

      </RadioGroup>
    </FormControl>

  );
}

