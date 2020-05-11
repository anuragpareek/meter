import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import EnhancedTable from "components/Table/EnhancedTable.js"
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {
  chart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [readingsData, setReading] = React.useState([]);
  const [readingChartData, setReadingChartData] = React.useState(false);

  useEffect(() => {
    setReadingChartData(chart(readingsData));
  }, [readingsData]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Meter Data (Server Side)</h4>
            </CardHeader>
            <CardBody>
              <EnhancedTable setReading={setReading} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      { readingChartData.animation && 
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={readingChartData.whData.data}
                type="Line"
                options={readingChartData.whData.options}
                listener={readingChartData.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Readings WH</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={readingChartData.varhData.data}
                type="Line"
                options={readingChartData.varhData.options}
                listener={readingChartData.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Readings VARH</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      }
    </div>
  );
}
