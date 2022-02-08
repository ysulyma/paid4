(function() {

const popupDuration = 5;

// currencyDisplay: narrowSymbol doesn't work on old iOS
const Money = new Intl.NumberFormat();

window.dings = function dings() {
  const bar = document.querySelector(".amp-progress");
  const video = document.querySelector("video");

  // XXX store in db
  const duration = 10790.621000000001;
  const popups = [];

  /* popups */
  for (const donation of paid4.donations) {
    const industry = paid4.industries.find(_ => _.id === donation.industryId);
    const person = paid4.senators.find(_ => _.id === donation.personId);

    const popup = makePopup({donation, industry, person});
    document.body.appendChild(popup);
  }

  /* scrubber bar indicators */
  for (const item of paid4.times) {
    if (item.speaker === null)
      continue;
        
    // scrubber bar indicators
    const div = document.createElement("div");
    div.classList.add("ding");
    
    div.style.left = `calc(${item.time / duration * 100}% - .25em)`;

    bar.appendChild(div);
  }

  video.addEventListener("timeupdate", () => {
    const active = {};
    for (const donation of paid4.donations) {
      active[`popup-p${donation.personId}i${donation.industryId}`] = false;
    }

    for (const item of paid4.times) {
      if (item.time < video.currentTime && video.currentTime < item.time + popupDuration) {
        active[`popup-p${item.speaker}i${item.industry}`] = true;
      }
    }

    for (const id in active) {
      if (active[id]) {
        console.log(id);
      }
      document.getElementById(id).classList.toggle("active", active[id]);
    }
  });
}

function makePopup({donation, industry, person}) {
  const aside = document.createElement("aside");
  aside.id = `popup-p${person.id}i${industry.id}`;
  aside.classList.add("donation");
  aside.innerHTML = `
    <span class="amount">$${Money.format(donation.amount)}</span>
    <span class="industry">from ${industry.name} (<a href="${osUrl(person)}" target="_blank">OpenSecrets</a>)</span>`;

  return aside;  
}

function osUrl(person) {
  const name = (person.firstName + "-" + person.lastName).toLowerCase().replace(/[^a-z-]/g, "");
  return `https://www.opensecrets.org/members-of-congress/${name}/industries?cid=${person.openSecrets}`;
}

})();