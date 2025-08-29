const aftercontain = document.querySelector(".aftercontain");
const iid = document.querySelector("#iid");
const select = document.querySelector("#select");

let primarycolor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary")
  .trim();

let labelcolor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-label")
  .trim();

let fontfamily = getComputedStyle(document.documentElement)
  .getPropertyValue("--font-family")
  .trim();
async function fetchCrowdCount() {
  try {
    const response = await fetch("http://192.168.17.116:3000/data");
    const data = await response.json();
  } catch (e) {
    console.log(e);
  }
}

let defaultOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    width: "100%",
    height: 180,
    offsetY: 18,
  },
  dataLabels: {
    enabled: false,
  },
};

let crowdOptions = {
  ...defaultOptions,

  chart: {
    ...defaultOptions.chart,
    type: "area",
  },

  tooltip: {
    enabled: true,
    style: {
      fontFamily: fontfamily,
    },
    y: {
      formatter: (value) => `${value} people`,
    },
  },

  series: [
    {
      name: "Crowd Count",
      data: [120, 34, 78, 90, 150, 200],
    },
  ],
  colors: [primarycolor],

  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  stroke: {
    colors: [primarycolor],
  },

  xaxis: {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  },

  yaxis: {
    min: 0,
    max: 250,
    tickAmount: 5,
  },
};

let chart = new ApexCharts(document.querySelector(".chart-area"), crowdOptions);

chart.render();

iid.addEventListener("click", function () {
  // Clone the select element
  const selectClone = select.cloneNode(true);
  // Append the clone to aftercontain
  aftercontain.appendChild(selectClone);
});
// Function to fetch crowd count from the server
async function fetchCrowdCount() {
  try {
    // Replace with your server endpoint
    const response = await fetch("http://192.168.17.116:3000/data");
    const data = await response.json(); // Parse the JSON response

    // Log the count to the console
    console.log("Current crowd count:", data.count);
  } catch (error) {
    console.error("Error fetching crowd count:", error);
  }
}
let datas;
// Fetch data continuously every 2 seconds
setInterval(fetchCrowdCount, 2000);
async function fetchCrowdCount() {
  try {
    // Replace with your server endpoint
    const response = await fetch("http://192.168.17.116:3000/data");
    datas = await response.json(); // Parse the JSON response

    // Log the count to the console
    console.log("Current crowd count:", datas.count);
  } catch (error) {
    console.error("Error fetching crowd count:", error);
  }
}

// Fetch data continuously every 2 seconds
setInterval(fetchCrowdCount, 2000);
