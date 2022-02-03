function bookTickets() {
  const SENIOR_BENEFIT = 0.5;
  const BASIC_BENEFIT = 1;
  const ticketsType = document.querySelectorAll(
    '.booking__radio'
  ) as NodeListOf<HTMLInputElement>;
  const basicTickets = document.querySelector(
    '#basic-input'
  ) as HTMLInputElement;
  const seniorTickets = document.querySelector(
    '#senior-input'
  ) as HTMLInputElement;
  const ticketsTotal = document.querySelector('.booking__data-total');
  const reservationBasic = document.querySelector(
    '.reservation__basic'
  ) as HTMLInputElement;
  const reservationSenior = document.querySelector(
    '.reservation__senior'
  ) as HTMLInputElement;
  const overviewBasic = document.querySelector(
    '.tickets-number_basic'
  ) as HTMLInputElement;
  const overviewSenior = document.querySelector(
    '.tickets-number_senior'
  ) as HTMLInputElement;
  const typeSelect = document.querySelector(
    '.reservation__select'
  ) as HTMLSelectElement;
  const reservationDate = document.querySelector(
    '.reservation__date'
  ) as HTMLInputElement;
  const reservationTime = document.querySelector(
    '.reservation__time'
  ) as HTMLInputElement;
  const overviewDateOutput = document.querySelector(
    '.overview__date-output'
  ) as HTMLInputElement;
  const overviewTimeOutput = document.querySelector(
    '.overview__time-output'
  ) as HTMLInputElement;
  const overviewTypeOutput = document.querySelector(
    '.overview__type-output'
  ) as HTMLInputElement;
  const overviewTotalBasic = document.querySelector(
    '.tickets-cost-basic'
  ) as HTMLInputElement;
  const overviewTotalSenior = document.querySelector(
    '.tickets-cost-senior'
  ) as HTMLInputElement;
  const overviewTotalSum = document.querySelector(
    '.overview__total-sum'
  ) as HTMLInputElement;

  let radioIndex: number;
  let type: number;

  if (sessionStorage.length) {
    basicTickets.value = sessionStorage.getItem('basicNumber');
    seniorTickets.value = sessionStorage.getItem('seniorNumber');
    ticketsType[+sessionStorage.getItem('typeIndex')].setAttribute(
      'checked',
      'checked'
    );

    calculateTotal();
    setReservationData();
  }

  (function numberInput() {
    document.querySelectorAll('.number-input__minus').forEach((i) =>
      i.addEventListener('click', (e) => {
        (
          (e.target as HTMLElement).nextElementSibling as HTMLInputElement
        ).stepDown();
        calculateTotal();
        if (i.classList.contains('booking__number-value')) {
          setReservationData();
        } else updateData();
      })
    );

    document.querySelectorAll('.number-input__plus').forEach((i) =>
      i.addEventListener('click', (e) => {
        (
          (e.target as HTMLElement).previousElementSibling as HTMLInputElement
        ).stepUp();
        calculateTotal();
        if (i.classList.contains('booking__number-value')) {
          setReservationData();
        } else updateData();
      })
    );
  })();

  ticketsType.forEach((i) =>
    i.addEventListener('click', () => {
      calculateTotal();
      setReservationData();
    })
  );

  function calculateTotal() {
    ticketsType.forEach((i, index) => {
      if (i.checked) {
        type = +i.getAttribute('data-cost');
        radioIndex = index;
      }
    });

    const totalSum =
      (+basicTickets.value * BASIC_BENEFIT +
        +seniorTickets.value * SENIOR_BENEFIT) *
      type;
    if (totalSum) (ticketsTotal as HTMLElement).innerText = String(totalSum);

    sessionStorage.setItem('typeIndex', String(radioIndex));
    sessionStorage.setItem('basicNumber', basicTickets.value);
    sessionStorage.setItem('seniorNumber', seniorTickets.value);
  }

  function setReservationData() {
    reservationBasic.value = basicTickets.value;
    reservationSenior.value = seniorTickets.value;
    overviewBasic.value = reservationBasic.value;
    overviewSenior.value = reservationSenior.value;
    typeSelect.options.selectedIndex = radioIndex + 1;
    (
      document.querySelectorAll(
        '.overview__basic-price'
      ) as NodeListOf<HTMLElement>
    ).forEach((i) => {
      i.innerText = String(type * BASIC_BENEFIT);
    });
    (
      document.querySelectorAll(
        '.overview__senior-price'
      ) as NodeListOf<HTMLElement>
    ).forEach((i) => {
      i.innerText = String(type * SENIOR_BENEFIT);
    });
    updateData();
  }
  calculateTotal();
  setReservationData();

  const today = new Date(Date.now());
  const dd = +String(today.getDate()).padStart(2, '0');
  const mm = +String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  reservationDate.min = `${yyyy}-${dd}-${mm}`;

  reservationDate.addEventListener('input', updateData);
  reservationTime.addEventListener('input', updateData);
  typeSelect.addEventListener('input', updateData);

  function updateData() {
    const date = new Date(reservationDate.value);
    if (reservationDate.value && +date > Date.now())
      overviewDateOutput.value = date.toDateString();
    if (reservationTime.value) overviewTimeOutput.value = reservationTime.value;
    overviewTypeOutput.value = typeSelect.value;
    overviewBasic.value = reservationBasic.value;
    overviewSenior.value = reservationSenior.value;
    type =
      +ticketsType[typeSelect.options.selectedIndex - 1].getAttribute(
        'data-cost'
      );
    overviewTotalBasic.value = `${
      +reservationBasic.value * type * BASIC_BENEFIT
    } €`;
    overviewTotalSenior.value = `${
      +reservationSenior.value * type * SENIOR_BENEFIT
    } €`;
    overviewTotalSum.value = `${
      (BASIC_BENEFIT * +reservationBasic.value +
        SENIOR_BENEFIT * +reservationSenior.value) *
      type
    } €`;
    (
      document.querySelectorAll(
        '.overview__basic-price'
      ) as NodeListOf<HTMLElement>
    ).forEach((i) => {
      i.innerText = String(type * BASIC_BENEFIT);
    });
    (
      document.querySelectorAll(
        '.overview__senior-price'
      ) as NodeListOf<HTMLElement>
    ).forEach((i) => {
      i.innerText = String(type * SENIOR_BENEFIT);
    });
  }
}

export default bookTickets;
