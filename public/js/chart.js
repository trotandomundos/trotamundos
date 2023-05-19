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

// window.addEventListener("load", async () => {
//   const { data } = await bookService.getAllBooks();
//   const titles = data.map(b => b.title);
//   const ratings = data.map(b => b.rating);
//   printChart(titles, ratings);
// });
