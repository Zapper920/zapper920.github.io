// selector for the element
// const clickButton = document.querySelector(".clickButton");

// listen for the 'click' event, then do two things:
// - print literal text to the console
// - print all the info about the event that triggered this
// clickButton.addEventListener("click", (event) => {
// 	console.log("Click Event On Button");
// 	console.log(event);
// })

const colorMap = {
	"red": "#e33030",
	"blue": "#4149eb",
	"yellow": "#ebe361",
	"green": "#92cb61",
	"black": "#282830",
	"brown": "#d38230",
	"purple": "#ba79f3",
	"gray": "#b2b2ba",
	"white": "#f3f3f3",
	"pink": "#fb82eb"
}

const birthdayTabBtn = document.getElementById("birthday-tab");
const selectTabBtn = document.getElementById("select-tab");
const randomTabBtn = document.getElementById("random-tab");
const birthdayInputContent = document.getElementById("birthday-input-content");
const selectInputContent = document.getElementById("select-input-content");
const randomInputContent = document.getElementById("random-input-content");
const loadedContent = document.getElementById("loaded-content");
const birthdayLoadPokemon = document.getElementById("birthday-load-pokemon");
const selectLoadPokemon = document.getElementById("select-load-pokemon");
const randomLoadPokemon = document.getElementById("random-load-pokemon");

const pokemonSprite = document.getElementById("pokemon-sprite");
const pokemonId = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonTypes = document.getElementById("pokemon-types");
const pokemonFlavorText = document.getElementById("pokemon-flavor-text");

const errorMessage = document.getElementById("error-message");

const birthdayMonth = document.getElementById("birthday-month");
const birthdayDay = document.getElementById("birthday-day");

const selectAssociatedBirthday = document.getElementById("select-associated-birthday");

const randomAssociatedBirthday = document.getElementById("random-associated-birthday");

birthdayMonth.addEventListener("change", () => {
  const daysInMonth = new Date(2000, birthdayMonth.value, 0).getDate();

  birthdayDay.innerHTML = '<option value="">DD</option>';

  for (let day = 1; day <= daysInMonth; day++) {
    birthdayDay.innerHTML += `<option value="${day}">${String(day).padStart(2, "0")}</option>`;
  }
});

birthdayInputContent.style.display = "flex";
selectInputContent.style.display = "none";
randomInputContent.style.display = "none";
birthdayTabBtn.style.backgroundColor = "#4e4f4d";
selectTabBtn.style.backgroundColor = "#d24637";
randomTabBtn.style.backgroundColor = "#d24637";

birthdayTabBtn.addEventListener("click", () => {
  birthdayInputContent.style.display = "flex";
  selectInputContent.style.display = "none";
  randomInputContent.style.display = "none";
  birthdayTabBtn.style.backgroundColor = "#4e4f4d";
  selectTabBtn.style.backgroundColor = "#d24637";
  randomTabBtn.style.backgroundColor = "#d24637";
  resetContent();
});
selectTabBtn.addEventListener("click", () => {
  birthdayInputContent.style.display = "none";
  selectInputContent.style.display = "flex";
  randomInputContent.style.display = "none";
  birthdayTabBtn.style.backgroundColor = "#d24637";
  selectTabBtn.style.backgroundColor = "#4e4f4d";
  randomTabBtn.style.backgroundColor = "#d24637";
  resetContent();
});
randomTabBtn.addEventListener("click", () => {
  birthdayInputContent.style.display = "none";
  selectInputContent.style.display = "none";
  randomInputContent.style.display = "flex";
  birthdayTabBtn.style.backgroundColor = "#d24637";
  selectTabBtn.style.backgroundColor = "#d24637";
  randomTabBtn.style.backgroundColor = "#4e4f4d";
  resetContent();
});

const maxPokemonId = 1025;
const birthdayPokemonChoices = [];
const birthdayPokemonById = new Map();

function getBirthdayPokemonId(month, day) {
  return Number(
    `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`,
  );
}

for (let month = 1; month <= 12; month++) {
  const daysInMonth = new Date(2000, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const id = getBirthdayPokemonId(month, day);

    if (id <= maxPokemonId) {
      const choice = { month, day, id };
      birthdayPokemonChoices.push(choice);
      birthdayPokemonById.set(id, choice);
    }
  }
}

birthdayLoadPokemon.addEventListener("click", () => {
  resetContent();

  const month = Number(birthdayMonth.value);
  const day = Number(birthdayDay.value);

  if (!month || !day) {
    returnError("Please input a valid value");
    return;
  }

  const id = getBirthdayPokemonId(month, day);

  if (!birthdayPokemonById.has(id)) {
    returnError(
      "Unfortunately, the largest current Pokémon ID is #1025. Please check back later to see if your birthday Pokémon has been added!",
    );
    return;
  }

  loadPokemon(id);
});

function formatBirthday({ month, day }) {
  return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
}
selectLoadPokemon.addEventListener("click", () => {
  resetContent();

  const input = document.getElementById("select-input").value.trim();
  const id = Number(input);

  const associatedBirthday = birthdayPokemonById.get(id);

  if (!Number.isInteger(id) || !associatedBirthday) {
    returnError("Please input a valid birthday Pokémon ID");
    return;
  }

  selectAssociatedBirthday.textContent = formatBirthday(associatedBirthday);

  loadPokemon(id);
});

randomLoadPokemon.addEventListener("click", () => {
  resetContent();

  const randomIndex = Math.floor(
    Math.random() * birthdayPokemonChoices.length
  );

  const randomChoice = birthdayPokemonChoices[randomIndex];

  randomAssociatedBirthday.textContent = formatBirthday(randomChoice);

  loadPokemon(randomChoice.id);
});

async function loadPokemon(id) {
  class Pokemon {
    constructor(pokemonData, speciesData) {
      this.id = pokemonData.id;
      this.name = pokemonData.name;
      this.image = pokemonData.sprites.front_default;
      this.types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

      this.color = speciesData.color.name;
      const flavorEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en",
      );

      this.flavorText = flavorEntry.flavor_text.replace(/[\n\f]/g, " ");
    }

    getDisplayName() {
      return this.name[0].toUpperCase() + this.name.slice(1);
    }
  }

  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
  ]);

  const [pokemonData, speciesData] = await Promise.all([
    pokemonResponse.json(),
    speciesResponse.json(),
  ]);

  const pokemon = new Pokemon(pokemonData, speciesData);

  console.log(pokemonData);
  console.log(speciesData);

  pokemonId.innerHTML = `#${String(pokemon.id).padStart(4, "0")}`;
  pokemonName.innerHTML = pokemon.getDisplayName();
  pokemonSprite.src = pokemon.image;
  pokemonTypes.innerHTML = pokemon.types
    .map((type) => `<span class="type type-${type}">${type}</span>`)
    .join("");
  pokemonFlavorText.textContent = pokemon.flavorText;

  loadedContent.style.display = "flex";
  loadedContent.style.backgroundColor = colorMap[pokemon.color]

  console.log(pokemon.getDisplayName());
  console.log(pokemon.types);
}

function resetContent() {
  errorMessage.innerHTML = "";
  errorMessage.style.display = "none";
  pokemonId.innerHTML = "";
  pokemonName.innerHTML = "";
  pokemonSprite.src = undefined;
  pokemonTypes.innerHTML = "";
  pokemonFlavorText.textContent = "";
  loadedContent.style.display = "none";
  selectAssociatedBirthday.textContent = "";
  randomAssociatedBirthday.textContent = "";
}

function returnError(error) {
  errorMessage.style.display = "block";
  errorMessage.innerHTML = error;
}
