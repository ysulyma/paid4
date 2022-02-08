(function () {
  window.speakers = function speakers() {
    const video = document.querySelector("video");
    const div = document.createElement("div");
    div.classList.add("speaker-select");
    
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (const item of paid4.times) {
      const tr = document.createElement("tr");

      // button
      {
        const td = e("td");
        const button = e("button");
        button.textContent = "Goto";
        button.dataset.time = item.time;
        td.appendChild(button);
        tr.appendChild(td);
      }

      // select
      {
        const td = e("td");
        td.appendChild(senatorSelect());
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }
    const selects = table.querySelectorAll("select");

    div.appendChild(table);
    table.addEventListener("click", e => {
      if (!(e.target instanceof HTMLButtonElement))
        return;
        e.target.closest("tr").classList.add("checked");
      const time = parseFloat(e.target.dataset.time);
      video.currentTime = time;
    });
    table.addEventListener("change", e => {
      if (!(e.target instanceof HTMLSelectElement))
        return;

      const index = Array.from(tbody.childNodes).indexOf(e.target.closest("tr"));
      const thisItem = paid4.times[index];

      for (let i = index + 1; i < paid4.times.length; ++i) {
        const item = paid4.times[i];
        if (item.speaker === thisItem.speaker) {
          selects[i].value = e.target.value;
        }
      }
    });
    document.body.appendChild(div);
  }

  function senatorSelect() {
    const select = document.createElement("select");
    select.innerHTML = `<option>None</option>` + paid4.senators.map(senator => {
      return `<option value="${senator.id}">${senator.lastName}</option>`;
    });

    return select;
  }

  function e(tagName) {
    return document.createElement(tagName);
  }
})();
