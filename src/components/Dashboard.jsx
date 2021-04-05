import React from "react";
import { Card } from "antd";

//#region MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { FullscreenExitOutlined, AudioOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
//#endregion

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Dashboard"
        bordered={true}
        style={{ width: FullscreenExitOutlined }}
      >
        <Paper className={classes.root}></Paper>
      </Card>
    </div>
  );
};

export default Dashboard;
