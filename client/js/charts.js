let temp = 34;
// Chart Options
const tempOptions = {
  // Data
  series: [temp],
  // Chart Type/Design
  chart: {
    height: 250,
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
          offsetY: -30,
          show: true,
          color: '#ccc',
          fontSize: '24px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + ' °C';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '36px',
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

let humidity = 60;
// Chart Options
const humidOptions = {
  // Data
  series: [humidity],
  // Chart Type/Design
  chart: {
    height: 250,
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
          offsetY: -30,
          show: true,
          color: '#ccc',
          fontSize: '24px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + ' %';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '36px',
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
    height: 250,
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
          offsetY: -30,
          show: true,
          color: '#ccc',
          fontSize: '24px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + ' %';
          },
          offsetY: 10,
          color: '#ccc',
          fontSize: '36px',
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
