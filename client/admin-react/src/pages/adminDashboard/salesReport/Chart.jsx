import {ChartsGrid} from '@mui/x-charts/ChartsGrid';
import * as React from 'react';
import Box from '@mui/material/Box';
import {LineChart} from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

function Chart() {
    // You can define all series settings here
    const series = [
        {
            categories: pData,
            label: 'pv',
            yAxisId: 'leftAxisId',
            // Suggested styles (exact names may vary by version)
            color: '#4f46e5',        // Line color
            lineWidth: 3,            // Line thickness
            // If supported by library: curve type ('linear'|'monotone'|'step')
            curve: 'monotone',
            // Show points on the line
            showPoints: true,
            pointSize: 6,
            // If you want area under the line:
            area: true,
            areaOpacity: 0.08
        },
        {
            categories: uData,
            label: 'uv',
            yAxisId: 'rightAxisId',
            color: '#10b981',
            lineWidth: 2,
            curve: 'monotone',
            showPoints: true,
            pointSize: 5
        }
    ];

    return (
        <div className="p-2 flex-10/12">
            <Box sx={{
                width: '100%',
                height: 320,
                bgcolor: 'rgba(255,255,255,0.53)',
                p: 2,
                borderRadius: 5,
                border: 2,
                borderColor: "#262626",
                boxShadow: '0 0 12px rgba(0,0,0,0.7)'
            }}>
                <LineChart
                    series={series}
                    xAxis={[
                        {
                            scaleType: 'point',
                            categories: xLabels,
                            // Label for x axis
                            label: 'Pages',
                            tickLabelStyle: {fill: "#fff", fontSize: 14, fontFamily: "roboto"},
                            // If you want to rotate ticks (e.g. for long names)
                            tickRotation: 0,
                            // Tick formatting (if needed)
                            // tickFormat: (val) => val.toUpperCase(),
                        }
                    ]}
                    yAxis={[
                        {
                            id: 'leftAxisId',
                            width: 60,
                            tickLabelStyle: {fill: "#fff", fontSize: 14, fontFamily: "roboto"},
                            // Manual min/max (if needed)
                            // min: 0,
                            // max: 10000,
                            // Display for ticks (e.g. thousands separator)
                            tickFormat: (v) => v.toLocaleString()
                        },
                        {
                            id: 'rightAxisId',
                            position: 'right',
                            width: 60,
                            tickFormat: (v) => v.toLocaleString()
                        }
                    ]}
                    slotProps={{
                        legend: {labelStyle: {fill: "#fff"}},
                        tooltip: {sx: {backgroundColor: "#ea0000", color: "#fff"}},
                    }}
                    // General chart options (chart padding)
                    padding={{left: 10, right: 10, top: 10, bottom: 30}}
                    // If supported by library: theme or styles prop can be here
                >
                    {/* Grid — direct svg style */}
                    <ChartsGrid
                        vertical={true}
                        horizontal={true}
                        />
                </LineChart>
            </Box>
        </div>
    );
}

export default Chart;
