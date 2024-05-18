import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Icon } from '@mui/material';
import axios from 'axios';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import RouteIcon from '@mui/icons-material/Route';

const ReportPage = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:8082/report');
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Report
      </Typography>
      {report ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShippingIcon fontSize="large" color="primary" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">Total Deliveries</Typography>
                    <Typography variant="h4">{report.totalDeliveries}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsCarIcon fontSize="large" color="primary" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">Total Vehicles</Typography>
                    <Typography variant="h4">{report.totalVehicles}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RouteIcon fontSize="large" color="primary" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">Total Distance</Typography>
                    <Typography variant="h4">{(report.totalDistanceTraveled / 1000).toFixed(2)} km</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QueryBuilderIcon fontSize="large" color="primary" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">Avg Delivery Time</Typography>
                    <Typography variant="h4">{report.averageDeliveryTime.toFixed(2)} min</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading report...</Typography>
      )}
    </Box>
  );
};

export default ReportPage;
