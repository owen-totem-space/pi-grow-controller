// import ApexCharts from 'apexcharts';
// import { humidityAutomation } from './classes/Humidity-auto.js';
// import tempAutomation from './classes/Temp-auto.js';

// let temp = tempAutomation.getTemp();
let temp = 50;

// Chart Options
const tempOptions = {
  // Data
  series: [temp],
  // Chart Type/Design
  chart: {
    height: 200,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
    // background: '#333',
    // foreColor: '#333',
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        margin: 0,
        size: '80%',
        background: 'transparent',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: '#fff',
        strokeWidth: '20%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -20,
          show: true,
          color: '#ccc',
          fontSize: '20px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val / 2) + ' °C';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '28px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#A91b0d'],
      // inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'butt',
    colors: '#000',
  },
  labels: ['Temp'],
};
// Init Chart
const tempChart = new ApexCharts(document.querySelector('#temp-gauge'), tempOptions);
// Render Chart
tempChart.render();

let humidity = await fetch('/getState')
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data.humidity);
    return data.humidity;
  });

// async _fetchState() {

// }
// Chart Options
const humidOptions = {
  // Data
  series: [humidity],
  // Chart Type/Design
  chart: {
    height: 200,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
    // background: '#333',
    // foreColor: '#333',
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        margin: 0,
        size: '80%',
        background: 'transparent',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: '#fff',
        strokeWidth: '20%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -20,
          show: true,
          color: '#ccc',
          fontSize: '20px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + ' %';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '28px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#A91b0d'],
      // inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'butt',
    colors: '#000',
  },
  labels: ['Humidity'],
};
// Init Chart
const humidChart = new ApexCharts(document.querySelector('#humid-gauge'), humidOptions);
// Render Chart
humidChart.render();

let soil = 85;
// Chart Options
const soilOptions = {
  // Data
  series: [soil],
  // Chart Type/Design
  chart: {
    height: 200,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
    // background: '#333',
    // foreColor: '#333',
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        margin: 0,
        size: '80%',
        background: 'transparent',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: '#fff',
        strokeWidth: '20%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -20,
          show: true,
          color: '#ccc',
          fontSize: '20px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + ' %';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '28px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#A91b0d'],
      // inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'butt',
    colors: '#000',
  },
  labels: ['Soil'],
};

// Init Chart
const soilChart = new ApexCharts(document.querySelector('#soil-gauge'), soilOptions);

// Render Chart
soilChart.render();

/**
 * Update Charts
 */
function update(chart, getValueFunction) {
  chart.updateSeries([getValueFunction()]);
}
// setInterval(update, 5000, humidChart, humidityAutomation.getHumidity);
// setInterval(update, 5000, soilChart, )
// setInterval(update, 5000, tempChart, tempAutomation.getTemp);
