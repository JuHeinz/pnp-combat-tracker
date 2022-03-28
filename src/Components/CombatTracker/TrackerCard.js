import React from "react";

export default function TrackerCard(props) {
  //State for Dice rolls (Attack, defence, damage) of combatants
  const [diceRolls, setDiceRolls] = React.useState({
    attackRoll: "Roll!",
    defenceRoll: "Roll!",
    damageRoll: "Roll!",
  });

  /* Find the corresponding modifiers for attacking and defending,
   convert array of strings ["DEX", "STR"] into corresponding array of integers [1,2]  */
  let defenceMods = [];
  props.DefenceModifier.map((modifierWord) => {
    if (modifierWord === "STR") {
      defenceMods.push(props.Strength);
    } else {
      defenceMods.push(props.Dexterity);
    }
  });

  let attackMods = [];
  props.AttackModifier.map((modifierWord) => {
    if (modifierWord === "STR") {
      attackMods.push(props.Strength);
    } else {
      attackMods.push(props.Dexterity);
    }
  });

  //Determine what the dice was rolled for (type = damage/defence/attack) and change state accordingly
  function roll(type) {
    let num = 0;
    switch (type) {
      case "damageRoll":
        num = Math.floor(Math.random() * props.damageDice) + 1;
        break;
      case "defenceRoll":
        num = roll2D6() + defenceMods[0] + defenceMods[1];
        break;
      case "attackRoll":
        num = roll2D6() + attackMods[0] + attackMods[1];
        break;
      default:
        break;
    }
    //Change that attribute of the state that has been rolled, update state
    setDiceRolls((prevDiceRolls) => {
      const newDiceRolls = {
        ...prevDiceRolls,
        [type]: num,
      };
      return newDiceRolls;
    });
  }
  function roll2D6() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    return num1 + num2;
  }

  //HP MANAGEMENT
  const [health, setHealth] = React.useState(props.currentHP);

  let currentHPinPercent = (health / props.MaxHP) * 100;

  function adjustHP(modifier) {
    setHealth((prevHealth) => {
      return prevHealth + modifier;
    });
  }

  return (
    <div
      className={
        health < 1
          ? "card mb-3 tracker-card combatantDefeated"
          : "card mb-3 tracker-card"
      }
    >
      {/* Name */}
      <div className="card-header">
        <div>
          <p className="combatant-name">
            <span className="badge initiative-badge">{props.initiative}</span>
            {props.cName}
          </p>
        </div>
        {/* Attack, Defend, Damage Button Group */}
        <div
          className="btn-group "
          role="group"
          aria-label="Attack, defend, damage buttons"
        >
          {/* Attack Button */}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => roll("attackRoll")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="100%"
              height="100%"
              className="action-icon"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m146.326 6.15 87.813 128.725-60.87-39.916 34.925 62.864L38.56 48.06h-.003c40.207 71.33 82.046 134.913 129.23 191.764L303.94 103.67c-45.164-37.052-96.674-69.324-157.614-97.52zm347.145 9.496L372.983 61.713l-214.59 214.09 13.213 13.215L383.367 77.75l78.078-29.85-29.402 78.56-211.746 211.25 13.213 13.214 214.61-214.106 45.35-121.172zM407.177 89.13l-259.95 259.95c-11.956-17.32-11.687-40.444.25-57.764l-31.26-31.255c-28.637 34.832-28.588 85.102.167 119.864L52.336 443.97a22.29 22.29 0 0 0-7.842-1.43c-5.74 0-11.476 2.216-15.908 6.647-8.864 8.865-8.866 22.953 0 31.82 8.864 8.863 22.954 8.863 31.818 0 6.512-6.513 8.234-15.844 5.178-23.853l64.057-64.056c34.788 28.437 85.12 28.65 119.817.203l-31.262-31.26c-17.28 11.84-40.352 11.907-57.68.18L420.39 102.347l-13.214-13.215zm-2.196 117.01L268.186 342.937c55.29 48.057 118.235 90.138 192.464 127.216L398.783 351.41l102.78 68.85-117.75-164.645 86.816 42.908c-20.895-33.04-42.523-63.772-65.65-92.382z"
              ></path>
            </svg>
            Attack: {diceRolls.attackRoll}
          </button>
          {/* Defend Button */}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => roll("defenceRoll")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="action-icon"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M17.47 26.563v20.875L84.812 81.06l-14.5 30.47 155.968 24.03L109.313 29.626 92.876 64.188 17.47 26.562zm354.842 32.5c-4.43.024-8.844.136-13.218.343-45.09 2.137-86.237 14.54-113.28 38.782.172 77.194 5.056 152.54 23.124 213.687 17.983 60.865 48.327 106.972 99.687 129.906 45.97-20.273 76.837-71.63 95.97-138.56 19.067-66.71 26.205-147.742 26.592-224.126-34.766-12.206-75.27-19.68-114.437-20.03-1.48-.015-2.96-.01-4.438-.002zm-6.5 27.968c1.047-.006 2.107-.008 3.157 0 29.384.265 59.388 6.713 85.03 17.44l5.72 2.405v6.22c0 58.435-4.575 121.105-18.064 173.78-13.488 52.675-35.843 96.5-74.375 113.688l-3.905 1.718-3.844-1.78c-40.63-18.93-63.79-58.79-76.592-107.156-12.803-48.366-15.813-106.07-15.813-164.5v-3.688l2.5-2.687c21.535-23.147 53.538-33.397 86.813-35.157 3.12-.166 6.235-.26 9.375-.282zm3 18.69c-3.82-.04-7.618.05-11.375.25-28.647 1.514-54.426 10.133-71.562 26.81.145 56.383 3.362 111.343 15.125 155.782 11.566 43.697 30.844 76.442 62.5 93 27.89-14.766 47.736-51.3 60.03-99.312 12.383-48.354 17.045-107.17 17.376-162.78-22.038-8.363-47.53-13.5-72.094-13.75zM91.875 162.155l-2.844 33.78-71.56-6.592v18.75l69.968 6.47-2.844 33.624 146.97-30.875-139.69-55.157zm9.97 128.156 8.03 27.532L17.47 344.47v19.467l97.624-28.187 9.437 32.344 118.25-76.688-140.936-1.094zm171.436 85.094-145.155 44.438 19.03 28.5-70.093 46.78.376.563h32.468l47.625-31.78 19.032 28.53 96.72-117.03z"
              ></path>
            </svg>
            Defend: {diceRolls.defenceRoll}
          </button>
          {/* Damage Button */}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => roll("damageRoll")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="action-icon"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m495.52 21.816-11.305 1.043-82.805 7.644-258.045 258.053c-15.554-22.716-27.955-46.57-35.414-70.16l-4.098-12.96-10.633 8.47c-19.564 15.59-31.423 31.095-36.855 46.65-5.43 15.554-3.958 30.888 1.717 44.084 9.88 22.977 30.975 40.096 51.26 52.862-24.534 31.35-52.64 56.51-82.09 80.21l-3.486 2.808v4.474c0 14.772 4.732 27.31 13.584 35.684 8.85 8.375 21.067 12.126 34.222 12.125h4.7l2.802-3.774c22.927-30.88 48.28-59.133 79.71-82.04 10.91 17.653 26.147 38.022 48.323 48.664 12.948 6.214 28.392 8.625 44.922 4.35 16.53-4.275 33.916-14.868 52.42-33.373l10.88-10.88-14.672-4.637c-25.307-7.998-49.583-21.334-72.77-37.787l32.987-32.988a55.097 55.097 0 0 0-1.963 2.412l3.89-4.34 2.78-2.78c16.614-13.837 33.616 1.5 43.3 59.98 6.67-64.68 35.053-74.725 38.56-47.342V502.98h18.687V316.715l.175 1.828c4.48-49.957 29.634-39.048 33.996 24.996v152.835h18.69v-69.408c5.9-43.874 38.74-54.97 47.68-10.248l-.295 84.575 18.688.066 1.36-390.126 9.097-89.418zm-20.89 20.696-6.53 64.162L199.223 375.56l8.58 6.467c22.645 17.077 46.745 31.5 72.267 41.534-12.25 10.186-23.203 15.888-32.72 18.35-12.33 3.19-22.537 1.512-32.16-3.105-19.24-9.235-35.212-31.906-45.618-49.928l-5.017-8.69-8.31 5.624c-36.06 24.4-64.17 55.143-88.975 88.002-7.447-.676-13.15-2.994-17.075-6.708-4.023-3.807-6.73-9.497-7.435-17.99 31.122-25.274 61.537-52.874 87.783-88.485l6.2-8.413-9.05-5.225c-21.07-12.165-44.11-30.36-52.443-49.736-4.166-9.688-5.14-19.37-1.242-30.537 3.067-8.784 9.632-18.68 20.832-29.36 9.388 24.544 23.015 48.677 39.63 71.308l6.44 8.775 268.942-268.95 64.777-5.98zm-46.06 32.552L164.334 339.3l13.215 13.216L441.786 88.28l-13.215-13.216zm22.18 125.686c7.306 0 14.617 7.55 14.617 18.78s-7.308 18.78-14.617 18.78c-7.306 0-14.617-7.552-14.617-18.78 0-11.23 7.308-18.78 14.617-18.78zm-20.535 49.844c3.373 0 7.69 2.54 11.73 9.53 4.042 6.987 6.955 17.67 6.955 29.595 0 11.923-2.912 22.607-6.953 29.594-4.04 6.988-8.357 9.53-11.732 9.53-3.373 0-7.69-2.542-11.73-9.53-4.042-6.988-6.956-17.67-6.956-29.595 0-11.926 2.913-22.61 6.954-29.597 4.042-6.988 8.356-9.53 11.73-9.53z"
              ></path>
            </svg>
            Damage: {diceRolls.damageRoll}
          </button>
        </div>
      </div>
      {/*HEALTH*/}
      <div className="card-body">
        <div className="HPBox">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="100%"
              height="100%"
              className="health-icon"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m192 17.65 16 34h96l16-34zm-9 53v51.95h32v22.2c-19.3-9-42.6-8.2-55-8.2-50.5 0-82.1 21.9-99.5 48-17.4 26.1-21.5 55.5-21.5 73 0 52.5 38.6 94.4 83.3 131C167 425.1 219 457.3 249.6 488l6.4 6.3 6.4-6.3c30.6-30.7 82.6-62.9 127.3-99.4 44.7-36.6 83.3-78.5 83.3-131 0-17.5-4.1-46.9-21.5-73s-49-48-99.5-48c-12.4 0-35.7-.8-55 8.2v-22.2h32V70.65zm18 18h110v15.95H201zm32 33.95h46v60.7l15.4-15.3c11.7-11.8 41.6-13.4 57.6-13.4 45.5 0 69.9 18.1 84.5 40 14.6 21.9 18.5 48.5 18.5 63 0 43.5-33.4 81.7-76.7 117-40.7 33.4-89 63.5-122.3 94.7-33.3-31.2-81.6-61.3-122.3-94.7-43.3-35.3-76.7-73.5-76.7-117 0-14.5 3.9-41.1 18.5-63s39-40 84.5-40c16 0 45.9 1.6 57.6 13.4l15.4 15.3zm-41 71c-64 0-80 48-80 80 0 64 80 96 144 144 64-48 144-80 144-144 0-32-16-80-80-80-32 0-48 0-64 48-16-48-32-48-64-48zm125.7 14.6c3.6-.1 5.9.3 5.8.6-16.5 7.3-33.9 24.4-44.6 41.7 0 0-3.2-17.7 9.9-31.9 7.4-8.1 21.1-10.3 28.9-10.4zM192 209.6c-24 21.5-41.3 58.2-47.2 90.4 0 0-19.5-23.7-7.7-53.4 9.8-24.5 50.1-36.5 54.9-37z"
              ></path>
            </svg>
            {health} / {props.MaxHP}
          </span>

          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={currentHPinPercent}
              style={{ width: currentHPinPercent + "%" }}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div
            className="btn-group HPButtonGroup"
            role="group"
            aria-label="Increase and Decrease Health"
          >
            <button
              type="button"
              disabled={health < 1 ? true : false}
              className="btn btn-outline-primary"
              onClick={() => adjustHP(-1)}
            >
              -
            </button>

            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={health >= props.MaxHP ? true : false}
              onClick={() => adjustHP(+1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
