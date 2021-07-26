// import ApexCharts from 'apexcharts';

/**
 *
 * Variables for chart inputs
 *
 */
let temp = await getData('temperature');
let humidity = await getData('humidity');
let soil = await getData('soil');

/**
 *
 * Temperature Chart
 *
 */
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
            return parseInt(val) + ' °C';
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

/**
 *
 * Humdidity Guage
 *
 */
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

/**
 *
 * Init Charts
 *
 */
const tempChart = new ApexCharts(document.querySelector('#temp-gauge'), tempOptions);
const humidChart = new ApexCharts(document.querySelector('#humid-gauge'), humidOptions);
const soilChart = new ApexCharts(document.querySelector('#soil-gauge'), soilOptions);

/**
 *
 * Render Charts
 *
 */
tempChart.render();
soilChart.render();
humidChart.render();

/**
 *
 * Update Charts
 *
 */
async function update(chart, getData, key) {
  chart.updateSeries([await getData(key)]);
}

setInterval(update, 5000, humidChart, getData, 'humidity');
setInterval(update, 5000, soilChart, getData, 'soil');
setInterval(update, 5000, tempChart, getData, 'temperature');

function getData(key) {
  return fetch('/getState')
    .then((res) => res.json())
    .then((data) => data[key])
    .catch((err) => console.log(err));
}
