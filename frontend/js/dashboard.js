async function loadDashboard(){

  try{

    const res = await fetch(`${API_URL}/stats`);

    const data = await res.json();

    document.getElementById("status").innerHTML =
      data.currentStatus === "UP"
      ? `<span class="status-up">UP</span>`
      : `<span class="status-down">DOWN</span>`;

    document.getElementById("uptime").innerText =
      data.uptimePercentage + "%";

    document.getElementById("checks").innerText =
      data.totalChecks;

    document.getElementById("downtime").innerText =
      data.downtimeCount;

    document.getElementById("contractBalance").innerText =
      data.contractBalance + " ETH";

    document.getElementById("providerBalance").innerText =
      data.providerBalance + " ETH";

    document.getElementById("clientBalance").innerText =
      data.clientBalance + " ETH";

    document.getElementById("website").innerText =
      data.website;

    document.getElementById("provider").innerText =
      data.provider;

    document.getElementById("client").innerText =
      data.client;

    document.getElementById("penalty").innerText =
      data.penaltyAmount;

    document.getElementById("penaltyStatus").innerHTML =
      data.penaltyPaid
      ? `<span class="status-down">Penalty Paid</span>`
      : `<span class="status-up">No Penalty</span>`;

  }catch(err){

    console.log(err);

  }

}

loadDashboard();

setInterval(loadDashboard,5000);