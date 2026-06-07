async function loadLogs(){

  try{

    const res = await fetch(`${API_URL}/logs`);

    const logs = await res.json();

    const table = document.getElementById("logsTable");

    table.innerHTML = "";

    logs.reverse().forEach(log=>{

      table.innerHTML += `

        <tr>

          <td>
            ${new Date(log.timestamp).toLocaleString()}
          </td>

          <td class="${
            log.status === "UP"
            ? "status-up"
            : "status-down"
          }">

            ${log.status}

          </td>

          <td>
            ${log.responseTime} ms
          </td>

        </tr>

      `;

    });

  }catch(err){

    console.log(err);

  }

}

loadLogs();

setInterval(loadLogs,5000);