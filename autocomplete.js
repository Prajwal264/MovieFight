const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
    </div>
    `;

  // get references
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

  const onInput = async event => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    items.forEach(item => {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultWrapper.appendChild(option);
    });
  };

  // add an event listener to the input tag
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
