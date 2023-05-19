const printChart = (labels, data) => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Books rating",
          backgroundColor: "lightblue",
          data,
        },
      ],
    },
  });
};
