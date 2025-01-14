const stocks = [
    { name: "Commerad Shipping Inc. (CSHI)", price: 175.23 },
    { name: "Staylor Weed and Lethals (SWAL)", price: 285.67 },
    { name: "Rhino Under fur trade (RUFT)", price: 132.89 },
    { name: "Ms.America Guns and weapons (MAG)", price: 123.45 },
    { name: "Drive to Canada Pills (DTCP)", price: 315.55 },
    { name: "Tarazan Hacks (TRZH)", price: 510.10 },
    { name: "John Doe IDs (JDID)", price: 634.65 },
    { name: "Killer Whale Exotic Animals (KWEA)", price: 257.12 }
];

const portfolio = {};

function renderStocks() {
    const watchlist = document.getElementById("watchlist");
    watchlist.innerHTML = "";
    stocks.forEach((stock, index) => {
        const stockCard = document.createElement("div");
        stockCard.className = "stock-card";
        stockCard.innerHTML = `
            <h3>${stock.name}</h3>
            <p>Price: $${stock.price.toFixed(2)}</p>
            <button onclick="buyStock(${index})">Buy</button>
        `;
        watchlist.appendChild(stockCard);
    });
}

function buyStock(index) {
    const stock = stocks[index];
    const quantity = prompt(`How many shares of ${stock.name} would you like to buy?`);
    if (quantity && !isNaN(quantity)) {
        const qty = parseInt(quantity);
        if (portfolio[stock.name]) {
            portfolio[stock.name].quantity += qty;
        } else {
            portfolio[stock.name] = { quantity: qty, price: stock.price };
        }
        alert(`Bought ${qty} shares of ${stock.name}`);
        renderPortfolio();
    } else {
        alert("Invalid quantity. Please enter a valid number.");
    }
}

function renderPortfolio() {
    const portfolioContainer = document.getElementById("portfolio");
    portfolioContainer.innerHTML = "";
    Object.keys(portfolio).forEach(stockName => {
        const stock = stocks.find(S => s.name === stockName);
        const latestPrice = stock ? stock.price : portfolio[stockName].price;
        const quantity = portfolio[stockName].quantity;
        const totalValue = (quantity * latestPrice).toFixed(2);
        const portfolioCard = document.createElement("div");
        portfolioCard.className = "portfolio-card";
        portfolioCard.innerHTML = `
            <h3>${stockName}</h3>
            <p>Quantity: ${quantity}</p>
            <p>Total Value: $${totalValue}</p>
        `;
        portfolioContainer.appendChild(portfolioCard);
    });
}

function updatePrices() {
    stocks.forEach(stock => {
        const change = (Math.random() - 0.5) * 2;
        stock.price += change;
        stock.price = Math.max(stock.price, 0.1);
    });
    renderStocks();
    renderPortfolio();
    priceChart.data.datasets[0].data = stocks.map(stock => stock.price);
    priceChart.update();
}

const priceChartCtx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(priceChartCtx, {
    type: "bar",
    data: {
        labels: stocks.map(stock => stock.name),
        datasets: [{
            label: "Stock Prices",
            data: stocks.map(stock => stock.price),
            backgroundColor: [
                "rgba(45, 85, 255, 0.5)",
                "rgba(85, 45, 255, 0.5)",
                "rgba(255, 85, 45, 0.5)",
                "rgba(45, 255, 85, 0.5)",
                "rgba(255, 255, 45, 0.5)",
                "rgba(45, 85, 255, 0.5)",
                "rgba(255, 45, 85, 0.5)",
                "rgba(85, 255, 45, 0.5)"
            ],
            borderColor: [
                "rgba(45, 85, 255, 1)",
                "rgba(85, 45, 255, 1)",
                "rgba(255, 85, 45, 1)",
                "rgba(45, 255, 85, 1)",
                "rgba(255, 255, 45, 1)",
                "rgba(45, 85, 255, 1)",
                "rgba(255, 45, 85, 1)",
                "rgba(85, 255, 45, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            X: { title: { display: true, text: "Stocks" } },
            Y: { title: { display: true, text: "Price (USD)" } }
        }
    }
});

setInterval(updatePrices, 1000);
renderStocks();
