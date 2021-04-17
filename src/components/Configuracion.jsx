import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//ACTIONS DE REDUX
import { FullscreenExitOutlined } from "@ant-design/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Configuracion = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Configuración"
        bordered={false}
        style={{ width: FullscreenExitOutlined }}
      >
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Empresa" {...a11yProps(0)} />
            <Tab label="Categorias" {...a11yProps(1)} />
            <Tab label="Dependencias" {...a11yProps(2)} />
            <Tab label="Tipo de Inventario" {...a11yProps(3)} />
            <Tab label="Proveedores" {...a11yProps(4)} />
            <Tab label="Marcas" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            Empresa
          </TabPanel>
          <TabPanel value={value} index={1}>
            Categorias
          </TabPanel>
          <TabPanel value={value} index={2}>
            Dependencias
          </TabPanel>
          <TabPanel value={value} index={3}>
            Tipo de Inventario
          </TabPanel>
          <TabPanel value={value} index={4}>
            Proveedores
          </TabPanel>
          <TabPanel value={value} index={5}>
            Marcas
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </div>
      </Card>
    </div>
  );
};

export default Configuracion;
