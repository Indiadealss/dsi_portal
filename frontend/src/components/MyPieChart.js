    import React from 'react';
    import { Pie } from 'react-chartjs-2';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

    // Register Chart.js components
    ChartJS.register(ArcElement, Tooltip, Legend);

    const MyPieChart = () => {
      const data = {
        labels: ['Principal Amount', 'Interest Amount'],
        datasets: [
          {
            label: '# of Amount',
            data: [500000, 400000],
            backgroundColor: [
            
              'rgb(14, 14, 66)',
                'rgb(89, 207, 181)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom', //'top', // or 'bottom', 'left', 'right'
          },
          title: {
            display: true,
            text: 'My Sample Pie Chart',
          },
        },
      };

      return (
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={data} options={options} />
        </div>
      );
    };

    export default MyPieChart;