import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//iconos

import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
        //   variant="scrollable"
        //   scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          centered
        >
          <Tab label="NUEVOS" icon={<LocalOfferRoundedIcon />} {...a11yProps(0)} />
          <Tab label="PROCESO" icon={<RepeatRoundedIcon />} {...a11yProps(1)} />
          <Tab label="RESUELTOS" icon={<DoneAllRoundedIcon />} {...a11yProps(2)} />
          <Tab label="CANCELADOS" icon={<CloseRoundedIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        NUEVOS
      </TabPanel>
      <TabPanel value={value} index={1}>
        PROCESO
      </TabPanel>
      <TabPanel value={value} index={2}>
        RESUELTOS
      </TabPanel>
      <TabPanel value={value} index={3}>
        CANCELADOS
      </TabPanel>
     
    </div>
  );
}